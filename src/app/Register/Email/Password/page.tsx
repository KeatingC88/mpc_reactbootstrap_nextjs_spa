import Password_Register from "./Password_Register"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Email Password Submission'],
}

const Email_Address_And_Password_Registration_Page = async () => {
    return (
        <Password_Register />
    )
}

export default Email_Address_And_Password_Registration_Page