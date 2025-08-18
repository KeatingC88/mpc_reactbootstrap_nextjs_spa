import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

import {
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

import Profile_Mirror from "./Mirror"
import type { Metadata } from 'next'
export const metadata: Metadata = {
    keywords: ['Account Profile'],
}

import { JWT_Decoder } from "@JWT/Decoder"

const End_User_Profile_Mirror_Page = async(): Promise<React.ReactElement> => {
    let token = null
    const cookie = await cookies()

    if (USERS_SERVER_COOKIE_NAME)
        token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

    if (!token)
        redirect("/Logout")

    let jwt_data = JWT_Decoder(token)

    if (jwt_data[`exp`] <= Math.floor(Date.now() / 1000))
        redirect("/Logout")

    return <Profile_Mirror />
}

export default End_User_Profile_Mirror_Page