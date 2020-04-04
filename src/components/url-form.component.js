import React from 'react';
import style from "../style/style";
import { Input, Button, Select, Layout } from '@ui-kitten/components';
import * as data from "../lang_constants.json";
import { showToast } from "../lib/util";
import downloadController from "../lib/download-controller";
import { connect } from 'react-redux';
import { DOWNLOAD_VIDEO_ACTION } from '../store/actions/downloads.action';
import { 
    AdMobInterstitial, 
  } from 'react-native-admob';
import { SafeAreaView } from 'react-native';
  

const mapStateToProps = (state) => {
    return {
        downloadHistory: state.downloadReducer.downloadHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onDownloadComplete: (payload) => {dispatch(DOWNLOAD_VIDEO_ACTION(payload))}
    }
}

class UrlForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputUrl: "",
            websiteSelectItem: [{text: data.FACEBOOK},{text: data.INSTAGRAM}],
            selectedWebsite: null
        }
    }

    downloadClick = () => {
        var me = this;

        if(this.state.inputUrl && this.state.selectedWebsite){
            showToast(data.DOWNLOAD_BEGIN_TOAST_MSG);
            AdMobInterstitial.setAdUnitID(data.INTERSTITIAL_AD_ID);
            AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(e => console.log(e));
            
            downloadController.beginDownload(this.state.inputUrl, this.state.selectedWebsite).then((successResponse) => {
                me.setState({inputUrl: ""}, ()=>{
                    showToast(data.DOWNLOAD_SUCCESS_TOAST_MSG);
                    this.props.onDownloadComplete(successResponse);
                    // this.props.navigation.navigate('Downloads');
                }, err => {
                    console.log("err",err)
                });
            }).catch(err => {
                console.log("err catch",err)
            });
        }else{
            showToast(data.URL_FORM_SELECT_INPUT_BLANK);
        }
        
    }

    handleSelect = (option) => {
        this.setState({selectedWebsite : option});       
    }

    handleInput = (value) => {
        this.setState({inputUrl: value});
    }
    
    render(){ 

        return(
            // <SafeAreaView>
                <Layout>
                <Select style={style.download_site_select} data={ this.state.websiteSelectItem } selectedOption = { this.state.selectedWebsite } onSelect = { this.handleSelect } status='basic' placeholder= { data.URL_FORM_SELECT_PLACEHOLDER } />
                    <Input style = { style.download_url_input } size='medium' value = { this.state.inputUrl } onChangeText = { this.handleInput } placeholder={ data.URL_FORM_INPUT_PLACEHOLDER }></Input>
                    <Button style = { style.download_video_button } status = 'success' onPress = { this.downloadClick }>{ data.DOWNLOAD_BUTTON_TEXT }</Button>
                </Layout>
                
            // </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlForm);