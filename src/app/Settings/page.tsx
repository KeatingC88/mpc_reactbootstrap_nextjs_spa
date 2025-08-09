import Settings from "./Settings"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    keywords: ['Account Settings'],
}

const End_User_Settings_Page = (): React.ReactElement => {

    return (
        <Settings />
    )
}

export default End_User_Settings_Page