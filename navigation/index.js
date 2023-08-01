import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home, Player, Search, LoginScreen } from "../Screens"
import { screenOptions } from "../constants"
import { Header } from "../components"
import { AuthContext } from "../context/auth"
import { useContext, useEffect } from "react"
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator()
export const LoginStack = () => {
    const navigator = useNavigation()
    const [data, _] = useContext(AuthContext)
    useEffect(() => {
        if (!!data) navigator.navigate('Home')
    }, [data])

    return (
        <Stack.Navigator screenOptions={{
            header: (props) => <Header {...props} />,
            statusBarColor: '#222',
        }}>
            <Stack.Screen name='Home'
                component={Home}
            />
            <Stack.Screen name='Player'
                options={{ ...screenOptions, }}
                component={Player} />
            <Stack.Screen name='Search'
                options={screenOptions}
                component={Search} />
        </Stack.Navigator>
    )
}

export const LogoutStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            statusBarColor: '#222',
            ...screenOptions
        }}>
            <Stack.Screen name='Login'
                component={LoginScreen}
            />
        </Stack.Navigator>
    )

}

export const Navigation = () => {
    const [data, _] = useContext(AuthContext)


    return (
        <NavigationContainer>
            {data.token ? <LoginStack /> : <LogoutStack />}
        </NavigationContainer>
    )
}