import Logout from "./Logout"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: [
        'Logout',
    ],
}

const Logout_Page = (): React.ReactElement => {
    return <Logout />
}

export default Logout_Page