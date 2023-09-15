import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home, Player, Search, LoginScreen, Profile } from "../Screens"
import { screenOptions } from "../constants"
import { Header } from "../components"
import { AuthContext } from "../context/auth"
import { useContext } from "react"
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()
export const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            header: (props) => <Header {...props} />,
            statusBarColor: '#222',
        }}>
            <Stack.Screen name='Home'
                component={Home}
            />
            <Stack.Screen name='Profile'
                component={Profile}
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
            {data && data.token != undefined ? <LoginStack /> : <LogoutStack />}
        </NavigationContainer>
    )
}