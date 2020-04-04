import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  MainScreen from './main.component';
import  DownloadHistoryScreen from './downloads.component';
import {store, persistor } from '../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ScrollView } from 'react-native';


const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Home' component={MainScreen}/>
    <Stack.Screen name='Downloads' component={DownloadHistoryScreen}/>
  </Stack.Navigator>
);

export default class AppNavigator extends React.Component{
  
  render(){
    return(
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                  <HomeNavigator/>
                </NavigationContainer>
              </PersistGate>
          </Provider>
    )
  }
}