import Login_Email_Address_Password from "./Login_Email_Address_Password"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Login with Email Address and Password'],
}

const Email_Address_Password_Login_Page = (): React.ReactElement => {
    return <Login_Email_Address_Password />
}

export default Email_Address_Password_Login_Page