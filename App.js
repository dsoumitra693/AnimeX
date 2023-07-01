import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import * as Font from 'expo-font'


export default function App() {
  React.useEffect(() => {
    Font.loadAsync({
          CooperHewitt: require('./assets/fonts/CooperHewitt.ttf')
        })
  }, [])

  return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
  );
}