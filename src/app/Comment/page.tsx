import Comment from "./Comment"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['MPC Community'],
}

const Comment_Page = (): React.ReactElement => {
  return <Comment />
}

export default Comment_Page