import Discord_Login from "./Discord_Login"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Login with Twitch'],
}

const Discord_Login_Page = (): React.ReactElement => {
    return <Discord_Login />
}

export default Discord_Login_Page