import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginStack, LogoutStack } from './navigation';
import * as Font from 'expo-font'
import { getCurrentUserInfo } from './auth/google';


export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState(undefined)
  useEffect(()=>{
    (async function(){
      await Font.loadAsync({
            CooperHewitt: require('./assets/fonts/CooperHewitt.ttf')
          })
          setIsLoaded(true)
    })()
  }, [])

  useEffect(() => {
    const currentUser = getCurrentUserInfo()
    setUser(currentUser)
  }, [])
  

  if (isLoaded)return (
      <NavigationContainer>
        {user ?<LoginStack/> : <LogoutStack />}
      </NavigationContainer>
  );
}