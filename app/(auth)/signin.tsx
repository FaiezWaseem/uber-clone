import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
    return (
        <SafeAreaView className='flex-1 h-full items-center justify-center'>
            <View className='flex-1 items-center justify-center'>
                <Text className='dark:text-white text-3xl' >Sign-In</Text>
                <TouchableOpacity className='bg-black p-2 rounded-lg mt-4'>
                    <Text className='text-white'>Sign In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}