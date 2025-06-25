import Integration from "./Integration"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Login with Email Address and Password'],
}

const Integration_Page = (): React.ReactElement => {
    return <Integration />
}

export default Integration_Page