import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./components/ui/DrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import "react-native-gesture-handler";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";
import ConsumerManagementScreen from "./screens/dashboardScreens/ConsumerManagementScreen";
import ComplaintServiceManagementScreen from "./screens/dashboardScreens/ComplaintServiceManagementScreen";
import ReportsScreen from "./screens/dashboardScreens/ReportsScreen";
import StaffManagement from "./screens/dashboardScreens/StaffManagement";
import FullConsumerInfoScreen from "./screens/dashboardScreens/ConsumerManagementInternalScreens/FullConsumerInfoScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  function DrawerRoute() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
          drawerInactiveTintColor: "black",
          drawerActiveTintColor: "green",
          drawerLabelStyle: { marginLeft: -25 },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Dashboard"
          component={WelcomeScreen}
          options={{
            title: "Dashboard",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
            drawerIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="ConsumerManagement"
          component={ConsumerManagementRoutes}
          options={{
            title: "Consumer Management",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="ComplaintServiceManagement"
          component={ComplaintServiceManagementScreen}
          options={{
            title: "Complaint/Service Management",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="hand-left-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Reports"
          component={ReportsScreen}
          options={{
            title: "Reports",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="document-text-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="StaffManagement"
          component={StaffManagement}
          options={{
            title: "Staff Management",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="body-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
  function ConsumerManagementRoutes() {
    return (
      //CONSUMER MANAGEMENT SCREEN
      <Stack.Navigator
        defaultScreenOptions={ConsumerManagementRoutes}
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
      >
        <Stack.Screen
          name="ConsumerManagement"
          component={ConsumerManagementScreen}
          options={{
            headerShown: false,
            title: "Consumer Management",
          }}
        />
        <Stack.Screen
          name="FullConsumerData"
          component={FullConsumerInfoScreen}
          options={{
            headerShown: true,
            title: "",
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    //MAIN SCREENS
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={DrawerRoute}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
