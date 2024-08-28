import { onboarding } from '@/constants';
import { router } from 'expo-router';
import { Key, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';



export default function Welcome() {

    const swiperRef = useRef<Swiper>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <SafeAreaView className='flex h-full justify-between'>
            <TouchableOpacity className='w-full flex justify-end items-end p-5'
                onPress={() => router.replace('/(auth)/signin')}
            >
                <Text className='text-black text-md font-JakartaBold' >Skip</Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-md' />}
                activeDot={<View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-md' />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item, index: Key | null | undefined) => (
                    <View key={index} className='flex items-center justify-center'  >
                        <Image source={item.image} className='w-[300px] h-[300px] object-contain'
                            resizeMode='contain'
                        />
                        <View className='flex flex-row items-center justify-center w-full px-10 text-center' >
                            <Text className='text-black text-3xl font-bold text-center'>{item.title}</Text>
                        </View>
                        <Text className='text-gray-400 text-md font-semibold px-10 text-center'>{item.description}</Text>
                    </View>
                ))}


            </Swiper>

        </SafeAreaView>
    );
}