import Email_Register from "./Email_Register"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Email Account Registration'],
}

const Email_Registration_Page = (): React.ReactElement => {
  return <Email_Register />
}

export default Email_Registration_Page