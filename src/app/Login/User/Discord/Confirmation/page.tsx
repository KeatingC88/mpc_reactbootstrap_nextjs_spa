import Discord_Confirmation from "./Discord_Confirmation"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Discord Account Confirmation'],
}

const Discord_Confirmation_Page = (): React.ReactElement => {
    return <Discord_Confirmation />
}

export default Discord_Confirmation_Page