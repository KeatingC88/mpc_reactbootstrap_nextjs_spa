import Login_Email_Address_Password from "./User/Email/Login_Email_Address_Password"
import Login_Twitch from "./User/Twitch/Twitch_Login"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: [
        'Login with your Email Address and Password',
        'Login with your Twitch Account'
    ],
}

const Email_Address_Password_Login_Page = (): React.ReactElement => {
    return <>
             <Login_Email_Address_Password />
             <Login_Twitch />
           </>
}

export default Email_Address_Password_Login_Page