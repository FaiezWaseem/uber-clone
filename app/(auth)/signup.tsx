import CustomButton from '@/components/CustomButton';
import InputFeild from '@/components/InputFeild';
import ThemedView from '@/components/ThemedView';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native'

export default function SignUp() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const signUp = () =>
    {
        console.log(form);
    }

    return (
        <ScrollView className='flex-1 bg-white dark:bg-slate-700' >
            <ThemedView className='flex-1'>
                <View className='relative w-full h-[250px]'>
                    <Image source={images.signUpCar} className='w-full z-0 h-[250px]' />
                    <Text className='text-2xl text-black font-JakartaBold bottom-5 left-5 absolute' >Create Your Account</Text>
                </View>

                <View className='flex-1 px-3'>
                    <InputFeild
                        label='Name'
                        labelStyle='text-black dark:text-white'
                        placeholder='Enter your name'
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(text) => setForm({ ...form, name: text })}
                     
                    />
                    <InputFeild
                        label='Email'
                        labelStyle='text-black dark:text-white'
                        placeholder='Enter your email'
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                    />
                    <InputFeild
                        label='Password'
                        labelStyle='text-black dark:text-white'
                        placeholder='Enter your password'
                        icon={icons.lock}
                        value={form.password}
                        onChangeText={(text) => setForm({ ...form, password: text })}
                        secureTextEntry
                    />
                    <CustomButton title='Sign Up' className='mt-5' onPress={signUp} />

                    <Link href={'/(auth)/signin'} className='text-center text-black dark:text-white mt-5' >
                       <Text className='text-center text-black dark:text-white mt-5' >Already have an account? <Text className='text-primary-500' >Login</Text></Text>
                    </Link>
                </View>
            </ThemedView >
        </ScrollView>
    );
}