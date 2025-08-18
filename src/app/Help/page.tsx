import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

import {
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

import Help from "./Help"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Help Page'],
}

const Help_Page = async (): Promise<React.ReactElement> => {
    let token = null
    const cookie = await cookies()

    if (USERS_SERVER_COOKIE_NAME)
        token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

    if (!token)
        redirect("/Logout")

  return <Help />
}

export default Help_Page