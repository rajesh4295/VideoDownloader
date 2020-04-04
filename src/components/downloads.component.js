import React from 'react';
import { SafeAreaView, Image, Modal } from 'react-native';
import { Divider, Icon, Text, TopNavigation, TopNavigationAction, ListItem, List, OverflowMenu, Layout  } from '@ui-kitten/components';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import * as data from "../lang_constants.json";
import FileViewer from "react-native-file-viewer"
import Share from 'react-native-share';
import style from '../style/style.js';
import { DELETE_VIDEO_ACTION } from '../store/actions/downloads.action.js';
import {
  AdMobBanner, AdMobInterstitial
} from 'react-native-admob'

const mapStateToProps = (state) =>{
  return {
    downloadHistory: state.downloadReducer.downloadHistory
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onVideoDelete : (payload) => {dispatch(DELETE_VIDEO_ACTION(payload))}
  }
}

class DownloadHistoryScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      videoListRender: [],
      listSelectMenuItems: [
        { title: 'Open' },
        { title: 'Share' },
        { title: 'Delete' },
      ],
      menuVisible: false,
      selectedItem : null,
      selectedIndex: null,
    }
  }

  navigateBack = () => {
    this.props.navigation.goBack();
    AdMobInterstitial.setAdUnitID(data.INTERSTITIAL_AD_ID);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(e => console.log(e));
  };
  
  componentDidMount(){
    this.setVideoRenderList();
  }

  setVideoRenderList = () => {
    RNFetchBlob.fs.exists(data.DOWNLOAD_PATH).then((folderExist) => {
      if(folderExist){ 
          RNFetchBlob.fs.ls(data.DOWNLOAD_PATH).then((folderContent) => {
            let videos = [];
            if(Array.isArray(folderContent)){
              folderContent.map(videoName => {
                if(this.props.downloadHistory && Array.isArray(this.props.downloadHistory)){
                    this.props.downloadHistory.map(history => {
                      if(history.fileName === videoName){
                        videos.push(history);                   
                      }
                  });
                }
              });
              this.setState({videoListRender: videos});
            }
          });
      }
    });
  }

  handleListItemClick = (item) =>{

    this.setState({selectedItem: item});
    this.setState({menuVisible: true});
    // RNFetchBlob.fs.readFile(`file://${item.filePath}`, 'base64').then((base64Data) =>{
      
    //   Share.open({url: `data:video/mp4;base64,${base64Data}`}).then((res) => {
        
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   });
    // });
    
      // FileViewer.open(item.filePath,  { showOpenWithDialog: true })
      // .then(() => {
      // })
      // .catch(_err => {
      // });
  }

  onMenuItemSelect = (index) => {
    this.setState({menuVisible: false});
    this.setState({selectedIndex: index});
    let item = this.state.selectedItem;
    switch(index){
      case 0: {
        FileViewer.open(item.filePath,  { showOpenWithDialog: true })
        .then(() => {
        })
        .catch(_err => {
        });
        break;
      }
      case 1: {
        RNFetchBlob.fs.readFile(`file://${item.filePath}`, 'base64').then((base64Data) =>{
          Share.open({url: `data:video/mp4;base64,${base64Data}`}).then((res) => {
          })
          .catch(err => {
            console.log(err)
          });
        })
        .catch(err => {
          console.log(err)
        });
        break;
      }
      case 2: {
        this.props.onVideoDelete(item);
        RNFetchBlob.fs.unlink(item.filePath).then(() => {
          this.setVideoRenderList();
        }).catch(err => {
          console.log(err)
        });
        
        break;
      }
    }
  }

  toggleMenu = () => {
    this.setState({menuVisible: !this.state.menuVisible})
  }
  
  handleAderror = (error) => {
    console.log(error)
}

  render(){
    const renderItem = ({ item, index }) => {
      return (<>
        <ListItem onPress = {() => this.handleListItemClick(item)}><Image style={{width: 60, height: 60}} source={{uri: `file://${item.filePath}`}}></Image><Text style={{fontSize: 12, marginLeft: '5%'}}>{item.fileName}</Text></ListItem>
        <Divider></Divider>
        </>
        );
    };

    const BackIcon = (style) => (
       <Icon {...style} name='arrow-back' />
    );

    const BackAction = () => (
      <TopNavigationAction icon={ BackIcon } onPress={ this.navigateBack }/>
    );
    
    return (
      // <ScrollView>style={style.download_overflow_layout}
      <SafeAreaView style={{flex:1}}>
        <TopNavigation title='My Downloads' alignment='center' leftControl={ BackAction() }/>
        <Divider/>
        <Layout style={style.download_overflow_layout}>
        <OverflowMenu
          style = {style.download_overflow_menu}
          backdropStyle={style.download_menu_backdrop}
          data={this.state.listSelectMenuItems}
          visible={this.state.menuVisible}
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onMenuItemSelect}
          onBackdropPress={this.toggleMenu}>
          <Text></Text>
        </OverflowMenu>
        <List data={ this.state.videoListRender } renderItem={renderItem} />
        </Layout>
        <AdMobBanner
                adSize="fullBanner"
                adUnitID= {data.BANNER_AD_ID}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => this.handleAderror(error)}
                />
      </SafeAreaView>
        // </ScrollView>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadHistoryScreen)
