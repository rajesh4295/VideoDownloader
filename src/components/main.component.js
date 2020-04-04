import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation, ListItem, List, TopNavigationAction, OverflowMenu, Icon } from '@ui-kitten/components';

import style from "../style/style";
import * as data from "../lang_constants.json";
import UrlForm from "./url-form.component";
import { connect } from 'react-redux';
import {
    AdMobBanner
  } from 'react-native-admob'

const mapStateToProps = (state) => {
    return {
        downloadHistory: state.downloadReducer.downloadHistory
    }
}

const downloadIcon = (styles) => (
    <Icon {...styles} name= 'download-outline' />
);
const moreMenuIcon = (style) => (
    <Icon {...style} name='more-vertical' />
);

class MainScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuVisible: false,
            menuItems: [{title: "My Downloads", icon: downloadIcon}]
        }
    }

    gotoDownloadHistoryScreen = () => {
        this.props.navigation.navigate('Downloads');
    };

    onMenuItemSelect = (index) => {
        this.setState({menuVisible: false});
        switch(index){
            case 0: this.props.navigation.navigate('Downloads');
            default: null
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
            return <ListItem title={`${item.fileName}`}/>
        };

       
        
        const moreMenuAction = () =>(
            <OverflowMenu
                visible={this.state.menuVisible}
                data={this.state.menuItems}
                onSelect={this.onMenuItemSelect}
                onBackdropPress={this.toggleMenu}>
                <TopNavigationAction
                    icon={moreMenuIcon}
                    onPress={this.toggleMenu}
                />
            </OverflowMenu>
        );

        return(
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation title={ data.APP_HOME_HEADER_TEXT } alignment='center' rightControls = {moreMenuAction()}/>
                <Divider/>
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <UrlForm></UrlForm>
                   <Button style = { style.download_video_button } status = 'success' onPress = { this.gotoDownloadHistoryScreen }>History</Button>
                </Layout>
                <AdMobBanner
                adSize="fullBanner"
                adUnitID= {data.BANNER_AD_ID}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => this.handleAderror(error)}
                />
                {/* <List data={this.props.downloadHistory} renderItem={renderItem} /> */}
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps)(MainScreen);