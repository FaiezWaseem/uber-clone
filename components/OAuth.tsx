import { Text, View, Image } from "react-native";
import ThemedView from "./ThemedView";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";



export default function OAuth() {
    return <ThemedView>
        <View className="flex flex-row gap-4 mt-4 justify-center items-center" >
            <View className="flex-1 h-[1px] bg-general-100"></View>
            <Text className="text-lg font-Jakarta dark:text-white" >Or</Text>
            <View className="flex-1 h-[1px] bg-general-100"></View>
        </View>
        <CustomButton
            title="Log In with Google"
            className="mt-5 w-full shadow-none"
            onPress={() => { }}
            IconLeft={() => <Image source={icons.google} resizeMode="contain" className="w-5 h-5 mx-2" />}
            bgVariant="outline"
            textVariant="primary"
            txtClassName="dark:text-white"
        />
    </ThemedView>
}