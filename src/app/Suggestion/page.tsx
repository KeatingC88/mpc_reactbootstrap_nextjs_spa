import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

import {
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

import Suggestion from "./Suggestion"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Suggestion Box'],
}

const Suggestion_Page = async (): Promise<React.ReactElement> => {
    let token = null
    const cookie = await cookies()

    if (USERS_SERVER_COOKIE_NAME)
        token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

    if (!token)
        redirect("/Logout")

    return <Suggestion />
}

export default Suggestion_Page