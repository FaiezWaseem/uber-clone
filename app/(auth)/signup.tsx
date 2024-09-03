import CustomButton from '@/components/CustomButton';
import InputFeild from '@/components/InputFeild';
import OAuth from '@/components/OAuth';
import ThemedView from '@/components/ThemedView';
import { icons, images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import ReactNativeModal from 'react-native-modal';

export default function SignUp() {


    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()


    const [pendingVerification, setPendingVerification] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [code, setCode] = useState('')

    const [verificationState, setVerificationState] = useState('default')
    const [formErrors, setFormErrors] = useState({
        verificationError: '',
        formError: ''
    })



    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                username: form.name,
                emailAddress: form.email,
                password: form.password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setVerificationState('pending')
            setPendingVerification(true)
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))

            Alert.alert('Error', err.errors[0].longMessage)

            setFormErrors({
                ...formErrors,
                formError: err.errors[0].longMessage,
            })
        }
    }

    const onPressVerify = async () => {
        if (!isLoaded) {
            return
        }

        setLoading(true)

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            })

            // console.log(completeSignUp)

            if (completeSignUp.status === 'complete') {
                //TODO: Add User to DB

               const res =  await fetchAPI('/(api)/user', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId : completeSignUp.createdUserId
                    }),
                })

                console.log(res)

                await setActive({ session: completeSignUp.createdSessionId })
                router.replace('/(root)/(tabs)/home')
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2))
                setFormErrors({
                    ...formErrors,
                    verificationError: 'Some Thing Went Wrong!!',
                })
                setLoading(false)
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
            setFormErrors({
                ...formErrors,
                verificationError: err.errors[0].longMessage,
            })
            setLoading(false)
        }
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
                    <CustomButton title='Sign Up' className='mt-5' onPress={onSignUpPress} isLoading={pendingVerification} />

                    <OAuth />

                    <Link href={'/(auth)/signin'} className='text-center text-black dark:text-white my-5' >
                        <Text className='text-center text-black dark:text-white mt-5' >Already have an account? <Text className='text-primary-500' >Login</Text></Text>
                    </Link>
                </View>

                <ReactNativeModal isVisible={verificationState === 'pending'} onDismiss={() => setVerificationState('default')} >
                    <View className='px-7 bg-white py-9 rounded-2xl min-h-[300px]'>
                        <Text className='mt-5 text-lg font-JakartaMedium mx-auto text-center' >Verify Code</Text>
                        <Text className='text-sm text-gray-400 mx-auto text-center' >We have sent you a code on your email</Text>
                        <InputFeild value={code} placeholder="1234" onChangeText={(code) => setCode(code)} icon={icons.lock} />
                        <Text className='text-sm text-red-500 mx-auto text-center my-1' >{formErrors.verificationError}</Text>
                        <CustomButton title="Verify Email" onPress={onPressVerify} isLoading={isLoading} />
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={verificationState === 'complete'} >
                    <View className='px-7 bg-white py-9 rounded-2xl min-h-[300px]'>
                        <Image
                            source={icons.checkmark}
                            className='w-[110px] h-[110px] mx-auto my-5'
                        />
                        <Text className='my-5 text-lg font-JakartaMedium mx-auto text-center' >You Have successfully Verified your Account</Text>
                        <CustomButton title="Browse home" onPress={() => router.replace('/(root)/(tabs)/home')} />
                    </View>
                </ReactNativeModal>
            </ThemedView >
        </ScrollView>
    );
}