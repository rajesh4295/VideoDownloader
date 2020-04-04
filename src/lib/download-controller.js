import FBDownload from "./fb-video-download.js";
import * as data from "../lang_constants.json";
import InstagramVideoDownload from "./instagram-video-download.js";

class DownloadController {

    static beginDownload(url, website){
        return new Promise((resolve, reject) => {
            
            switch(website.text){
                case data.FACEBOOK: {
                                        FBDownload.beginDownload(url).then((res) => { resolve(res) }, err => reject());
                                        break;
                                    }
                case data.INSTAGRAM: {
                                        InstagramVideoDownload.beginDownload(url).then((res) => { resolve(res) }, err => reject());
                                        break;
                                    }
                default: return;
            }
        });
    }
}

export default DownloadController;