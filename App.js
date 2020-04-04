import React from 'react';
import { PermissionsAndroid, ScrollView} from 'react-native';
import "./global";
import  AppNavigator  from "./src/components/navigation.component"
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import RNFetchBlob from 'rn-fetch-blob';
import * as data from "./src/lang_constants.json";

const App: () => React$Node = () => {
  this.getPermission().then((permissions) => {
      if(!(permissions["android.permission.READ_EXTERNAL_STORAGE"] == data.PERMISSION_GRANTED) || !(permissions["android.permission.WRITE_EXTERNAL_STORAGE"]== data.PERMISSION_GRANTED)){
          alert("App needs storage read and write permission to work properly");
      }else{
        RNFetchBlob.fs.exists(data.DOWNLOAD_PATH).then((isPresent) => {
            if(!isPresent){
              RNFetchBlob.fs.mkdir(data.DOWNLOAD_PATH).then(()=> {});
            }
        });
      }
      
  });
      return (
            <React.Fragment>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider mapping={mapping} theme={lightTheme}>
                  {/* <MainScreen></MainScreen> */}
                  <AppNavigator></AppNavigator>
              </ApplicationProvider>
            </React.Fragment>
      );
  
};

getPermission = async() => {
  return new Promise(async(resolve, reject) =>{
    try {
      const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          ]);
        resolve(granted);
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('You can use the camera');
      // } else {
      //   console.log('Camera permission denied');
      // }
    } catch (err) {
      console.warn(err);
      reject(err)
    }
  });  
}


export default App;
