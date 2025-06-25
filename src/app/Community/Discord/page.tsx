import Community_Discord from "./Discord"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['MPC Community Discord'],
}

const Community_Discord_Page = (): React.ReactElement => {
    return <Community_Discord />
}

export default Community_Discord_Page