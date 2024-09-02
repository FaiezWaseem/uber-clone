import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";



const TabIcon = ({ focused, source }: { focused: boolean, source: any }) => (
    <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
        <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}>
            <Image source={source} className={`w-6 h-6`} tintColor={'white'} resizeMode="contain" />
        </View>
    </View>
)
export default function Layout() {
    return <Tabs initialRouteName="index" screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: '#333',
            borderTopWidth: 0,
            borderRadius: 50,
            paddingBottom: 0,
            overflow: 'hidden',
            marginBottom: 20,
            marginHorizontal: 20,
            height: 78,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            position: 'absolute',
        }
    }}>

        <Tabs.Screen name="home" options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />,
        }} />
        <Tabs.Screen name="rides" options={{
            headerShown: false,
            title: 'Rides',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} />,
        }} />
        <Tabs.Screen name="chat" options={{
            headerShown: false,
            title: 'Chats',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />,
        }} />
        <Tabs.Screen name="profile" options={{
            headerShown: false,
            title: 'profile',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile} />,
        }} />

    </Tabs>
}