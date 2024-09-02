import CustomButton from '@/components/CustomButton';
import InputFeild from '@/components/InputFeild';
import OAuth from '@/components/OAuth';
import ThemedView from '@/components/ThemedView';
import { icons, images } from '@/constants';
import { Link, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native'
import { useSignIn } from '@clerk/clerk-expo'

export default function SignIn() {

    const { signIn, setActive, isLoaded } = useSignIn()

    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [error , setError] = useState('')

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
            return
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/(root)/(tabs)/home')
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(signInAttempt, null, 2))
                setError('Something Went Wrong!!')
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors[0].longMessage)
        }
    }, [isLoaded, form.email, form.password])




    return (
        <ScrollView className='flex-1 bg-white dark:bg-slate-700' >
            <ThemedView className='flex-1'>
                <View className='relative w-full h-[250px]'>
                    <Image source={images.signUpCar} className='w-full z-0 h-[250px]' />
                    <Text className='text-2xl text-black font-JakartaBold bottom-5 left-5 absolute' >Welcome</Text>
                </View>

                <View className='flex-1 px-3'>
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
                    {error && <Text className='text-red-500 text-center' >{error}</Text>}

                    <CustomButton title='Sign In' className='mt-5' onPress={onSignInPress} />

                    <OAuth />

                    <Link href={'/(auth)/signup'} className='text-center text-black dark:text-white my-5' >
                        <Text className='text-center text-black dark:text-white mt-5' >Dont have an account? <Text className='text-primary-500' >SignUp</Text></Text>
                    </Link>
                </View>
            </ThemedView >
        </ScrollView>
    );
}