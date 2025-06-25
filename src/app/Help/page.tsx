import Help from "./Help"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['MPC Help Page'],
}

const Help_Page = (): React.ReactElement => {
  return <Help />
}

export default Help_Page