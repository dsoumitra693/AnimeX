import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import * as Font from 'expo-font'


export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(()=>{
    (async function(){
      await Font.loadAsync({
            CooperHewitt: require('./assets/fonts/CooperHewitt.ttf')
          })
          setIsLoaded(true)
    })()
  }, [])

  if (isLoaded)return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
  );
}