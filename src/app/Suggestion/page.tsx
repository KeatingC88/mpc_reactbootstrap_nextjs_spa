import Comment from "./Suggestion"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Suggestion Box'],
}

const Comment_Page = (): React.ReactElement => {
  return <Comment />
}

export default Comment_Page