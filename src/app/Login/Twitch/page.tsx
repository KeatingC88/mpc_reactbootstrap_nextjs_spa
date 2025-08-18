import Twitch_Login from "../User/Twitch/Twitch_Login"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Login with your Twitch Account'],
}

const Twitch_Login_Page = (): React.ReactElement => {
    return <Twitch_Login />
}

export default Twitch_Login_Page