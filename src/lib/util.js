import {Toast } from 'native-base';
import {ToastAndroid} from 'react-native';


export function showToast(message, type){
    // Toast.show({
    //     text: message,
    //     textStyle: { color: "white" },
    //     buttonText: "Okay",
    //     type: type
    //   })
    ToastAndroid.show(message, ToastAndroid.LONG);

}

export function stringIsAValidUrl(url) {
    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    if(url === undefined || url === null || url === ""){
        return false;
    }
    return url.match(regex)?  true: false;
}