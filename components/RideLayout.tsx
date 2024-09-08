import { icons } from "@/constants"
import { router } from "expo-router"
import { Text, TouchableOpacity, View, Image } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Map from "./Map"
import { useRef } from "react"
import BottomSheet ,{ BottomSheetScrollView } from "@gorhom/bottom-sheet"


const RideLayout = ({ children, title }: { children: React.ReactNode, title?: string }) => {

    const bottomSheetRef = useRef<BottomSheet>(null)

    return <GestureHandlerRootView>
        <View className="flex-1 bg-white">
            <View className="flex flex-col h-screen bg-blue-500">

                <View className="flex flex-row items-center justify-center absolute z-10 top-16 px-5">
                    <TouchableOpacity onPress={() => router.back()}>
                        <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                            <Image source={icons.backArrow} className="w-6 h-6" />
                        </View>
                    </TouchableOpacity>
                    <Text className="mx-5 text-xl font-JakartaBold" >{title ?? 'Go Back'}</Text>
                </View>
                    <Map />

                    <BottomSheet keyboardBehavior="extend" ref={bottomSheetRef} snapPoints={['20%' , '30%','40%' , '50%','85%']} index={2} >
                        <BottomSheetScrollView className={'p-2'}>
                        {children}
                        </BottomSheetScrollView>
                    </BottomSheet>
            </View>
        </View>
    </GestureHandlerRootView>
}



export default RideLayout