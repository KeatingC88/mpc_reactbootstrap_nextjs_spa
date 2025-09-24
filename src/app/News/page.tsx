import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

import {
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

import News_Feed from "./News_Feed";
import type { Metadata } from 'next';

import { JWT_Decoder } from "@JWT/Decoder"

export const metadata: Metadata = {
    keywords: [
        'News & Updates',
        'Release Notes',
        'Product Updates',
        'System Announcements',
        'Change log',
        "What's New",
        'Update Log',
        'Latest News',
        'Newsfeed',
        'The Latest',
        'App Highlights',
        'Dev Updates',
        'Release Tracker',
        'Build Notes',
        'Deployment Feed'
    ]
}

const News_Feed_Page = async(): Promise<React.ReactElement> => {
    let token = null
    const cookie = await cookies()

    if (USERS_SERVER_COOKIE_NAME)
        token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

    if (!token)
        redirect("/Logout")

    let jwt_data = JWT_Decoder(token)

    if (jwt_data[`exp`] <= Math.floor(Date.now() / 1000))
        redirect("/Logout")

    return <News_Feed />
}

export default News_Feed_Page;
