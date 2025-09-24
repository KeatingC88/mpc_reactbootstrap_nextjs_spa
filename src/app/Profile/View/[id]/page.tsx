import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

import {
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

import Profile_Viewer from "./View"
import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Account Profile'],
}

import { JWT_Decoder } from "@JWT/Decoder"

const End_User_Profile_Viewer_Page = async(): Promise<React.ReactElement> => {
    let token = null
    const cookie = await cookies()

    if (USERS_SERVER_COOKIE_NAME)
        token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

    if (!token)
        redirect("/Logout")

    let jwt_data = JWT_Decoder(token)

    if (jwt_data[`exp`] >= Math.floor(Date.now() / 1000))
        redirect("/Logout")

    return <Profile_Viewer />
}

export default End_User_Profile_Viewer_Page