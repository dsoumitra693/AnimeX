import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Player, Search, LoginScreen, Profile } from "../Screens";
import { screenOptions } from "../constants";
import { Header } from "../components";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
export const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: true,
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="Player"
        component={Player}
        options={{...screenOptions, headerShown:false, statusBarStyle:"light",}}
      />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export const LogoutStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  const [data, _] = useContext(AuthContext);
  return (
    <NavigationContainer>
      {data && data.token != undefined ? <LoginStack /> : <LogoutStack />}
    </NavigationContainer>
  );
};
