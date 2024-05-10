import { Stack, withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../../Constants/Colors';

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator);

export default function AuthLayout() {
  return (
    <>
      <Stack.Screen
        options={{ title: 'Formula 1', headerBackTitleVisible: false }}
      />
      <TopTabs
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: 'F1-Bold',
          },
          tabBarStyle: { backgroundColor: Colors.primary },
          tabBarInactiveTintColor: 'gainsboro',
          tabBarActiveTintColor: 'white',
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
            height: 5,
          },
        }}
      >
        <TopTabs.Screen name="signin" options={{ title: 'Sign In' }} />
      </TopTabs>
    </>
  );
}