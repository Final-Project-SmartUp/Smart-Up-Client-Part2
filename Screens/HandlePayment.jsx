import React, { useState, useEffect } from "react"
import { WebView } from "react-native-webview"

    
export default function HandlePayment({route}) {
    // const [redirectUrl,setRedirectUrl] = useState("")
    const redirectUrl = route.params
   
    return (
        <>
            <WebView
                source={{
                    uri: redirectUrl,
                }}
                style={{ flex: 1 }}
            />
        </>
    )
}
