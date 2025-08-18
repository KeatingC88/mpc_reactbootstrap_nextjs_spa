import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

import {
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

import Comment from "./Comment"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['MPC Community'],
}

const Comment_Page = async(): Promise<React.ReactElement> => {

    let token = null
    const cookie = await cookies()

    if (USERS_SERVER_COOKIE_NAME)
        token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

    if (!token)
        redirect("/Logout")

  return <Comment />
}

export default Comment_Page