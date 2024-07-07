import React from "react";
import {Image, Text, View, TouchableOpacity } from 'react-native'

import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'

const GOOGLE_ANDROID_CLIENT_ID = ""
const GOOGLE_iOS_CLIENT_ID = ""

export default function Login() {
    const [userInfo, setUserInfo] = useState('')

    /******************** Google SignIn *********************/
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_iOS_CLIENT_ID
    })

    useEffect(() => {
        handleSignInWithGoogle();
    }, [response])

    const handleSignInWithGoogle = async () => {
        if (response?.type === "Success") {
            await getUserInfo(response.authentication.accessToken);
        }
    }

    const getUserInfo = async (token) => {
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: {Authorization: `Bearer ${token}`}
            })

            const user = await response.json()

            console.log(user)
            setUserInfo(user)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            {/* Google */}
            <TouchableOpacity onPress = {() => { promptAsync() }} activeOpacity={0.7}>
                <Image source ={SocialGoogle} style={{ width: '100%', height: '100%', borderRadius: 25 }} />
            </TouchableOpacity>
        </>
    )
}