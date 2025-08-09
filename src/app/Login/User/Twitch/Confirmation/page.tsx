import Twitch_Confirmation from "./Twitch_Confirmation"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Twitch Account Confirmation'],
}

const Twitch_Confirmation_Page = (): React.ReactElement => {
    return <Twitch_Confirmation />
}

export default Twitch_Confirmation_Page