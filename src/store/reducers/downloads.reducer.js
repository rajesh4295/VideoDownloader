import { DOWNLOAD_VIDEO, DELETE_VIDEO} from "../constants/constants";
import { REHYDRATE } from "redux-persist";

const initialState = {
    downloadHistory: [
        // {
        //     fileName: "SocialDownloader_01.mp4",
        //     type: "Facebook",
        //     filePath: "Download/SocialDownloader_01.mp4"
        // }
    ]
}

export default function downloadReducer (state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case REHYDRATE : {
           return newState;
        }
        case DOWNLOAD_VIDEO : {
            if(newState.downloadHistory)   
                newState.downloadHistory.push(action.payload);
            else{
                newState.downloadHistory = [];
                newState.downloadHistory.push(action.payload);
            }
            return newState;
        }
        case DELETE_VIDEO : {
            let fileName = action.payload.fileName;
            let pos = newState.downloadHistory.map(history => history.fileName).indexOf(fileName);
            if(pos > -1){
                newState.downloadHistory.splice(pos, 1)
                return newState;
            }
        }
        default : return newState;
    }
}