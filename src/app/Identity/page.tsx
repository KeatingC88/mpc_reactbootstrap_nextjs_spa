import Identity from "./Identity"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['MPC Identity'],
}

const Identity_Page = (): React.ReactElement => {
  return <Identity />
}

export default Identity_Page