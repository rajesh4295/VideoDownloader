// import React from 'react';
// import style from "../style/style";
// import {Root, Text, Button, Form, Item, Input, Label, Toast } from 'native-base';
// import { TextInput } from 'react-native';
import * as data from "../lang_constants.json";
import url from "url";
import axios from "axios";
import cio from 'cheerio-without-node-native';
import RNFetchBlob from 'rn-fetch-blob';
// import * as RNFS from 'react-native-fs';
import { showToast, stringIsAValidUrl } from "./util";

class InstagramVideoDownload {

    static beginDownload(inputUrl) {
        var me = this;
        return new Promise((resolve, reject) => {
            if(stringIsAValidUrl(inputUrl)){
                let parsedUrl = url.parse(inputUrl);
                if(parsedUrl.hostname.includes("instagram")){
                    let href = parsedUrl.href.toString();
                    
                    // let newUrl = href.replace("\/www","\/m");
                    
                    axios.get(href)
                      .then(function (response) {
                            const $ = cio.load(response.data);
                            // $("meta[property='og:title']").attr("content") || $("meta[property='twitter:title']").attr("content") ||
                            //+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                            let videoDownloadUrl = $('meta[property="og:video"]').attr("content") || $('meta[property="og:video:secure_url"]').attr("content");
                            let secondaryFileName = `SocialDownloader_${+new Date()}`;
                            let videoFileName =  secondaryFileName;
                            let fileType = $("meta[property='og:video:type']").attr("content") || "video/mp4";
                            let fullFileName = `${videoFileName}.${fileType.split("/")[1]}`;
                            // let dirs = RNFetchBlob.fs.dirs;
                            let path = `${data.DOWNLOAD_PATH}`.trim();
                            console.log(path)
                            if(videoDownloadUrl && videoDownloadUrl != ""){
                                RNFetchBlob
                                .config({
                                    addAndroidDownloads:{
                                        useDownloadManager: true,
                                        notification: true,
                                        mime: fileType,
                                        title: `${fullFileName}`,
                                        path : `${path}/${fullFileName}`,
                                    }
                                })
                                .fetch('GET', videoDownloadUrl, {
                                    
                                })
                                
                                .then((res) => {
                                    // let base64Image = res.base64();
                                    
                                    // const dirs = RNFetchBlob.fs.dirs;
                                    // let path = dirs.DownloadDir + "/"+videoFileName+".mp4";
    
                                    // RNFetchBlob.fs.writeFile(path, base64Image, 'base64')
                                    // .then((res) => {
                                        // console.log("File : ", res.path());
                                        let response = {
                                            fileName: fullFileName,
                                            type: data.INSTAGRAM,
                                            filePath: res.path()
                                        }
                                        resolve(response);
                                    // });
                                });
                            }
                            else{
                                showToast(data.DOWNLOAD_FAIL_NO_URL_TOAST_MSG, "warning");
                                reject();
                            }         
                        })
                        .catch(function (error) {
                            console.log(error);
                            reject(err);
                        });
                }else{
                    showToast(data.UNSUPPORTED_APP_TOAST_MSG, "warning");
                    reject();
                }
            }else{
                showToast(data.INVALID_URL_TOAST_MSG, "warning");
                reject();
            }
        });
    }
}

export default InstagramVideoDownload;