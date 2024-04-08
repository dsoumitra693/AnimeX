import React, { useEffect, useState, Context } from 'react';
import { Navigation } from './navigation';
import * as Font from 'expo-font'
import { AuthProvider } from './context/auth';
import { View } from 'react-native';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    (async function () {
      await Font.loadAsync({
        CooperHewitt: require('./assets/fonts/CooperHewitt.ttf')
      })
      setIsLoaded(true)
    })()
  }, [])



  if (isLoaded) return (
    <View style={{flex:1, justifyContent:"center", backgroundColor:"red"}}>
    <AuthProvider>
      <Navigation />
    </ AuthProvider>
    </View>
  );
}