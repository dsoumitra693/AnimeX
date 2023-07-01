import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home, Player, Search } from "../Screens"
import { screenOptions } from "../constants"
import { Header } from "../components"

const Stack = createNativeStackNavigator()
const HomeNavigtion = () => {
    return (
        <Stack.Navigator screenOptions={{
            header: (props) => <Header {...props} />,
            statusBarColor: '#222',
        }}>
            <Stack.Screen name='Home'
                component={Home}
            />
            <Stack.Screen name='Player'
                options={{ ...screenOptions, headerShown: false, }}
                component={Player} />
            <Stack.Screen name='Search'
                options={screenOptions}
                component={Search} />
        </Stack.Navigator>
    )
}

export default HomeNavigtion