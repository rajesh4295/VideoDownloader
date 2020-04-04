import { DOWNLOAD_VIDEO, DELETE_VIDEO} from "../constants/constants";

export function DOWNLOAD_VIDEO_ACTION (payload) {
    return {
        type: DOWNLOAD_VIDEO,
        payload: payload
    }
}

export function DELETE_VIDEO_ACTION (payload) {
    return {
        type: DELETE_VIDEO,
        payload: payload
    }
}