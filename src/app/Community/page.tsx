import Community from "./Community"

import type { Metadata } from 'next'

export const metadata: Metadata = {
    keywords: ['MPC Community'],
}

const Community_Page = (): React.ReactElement => {
  return <Community />
}

export default Community_Page