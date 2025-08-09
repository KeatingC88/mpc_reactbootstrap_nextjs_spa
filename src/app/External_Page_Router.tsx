"use client"

import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Redux_Thunk_Core } from '@Redux_Thunk/Core'

import Email_Register from './Register/Email/Email_Register'
import Community from './Community/Community'
import Comment from './Comment/Comment'
import Identity from './Identity/Identity'
import Faq from './Faq/FAQ'
import Help from './Help/Help'
import WebSocket_Chat from './Chat/Chat'
import Suggestion from './Suggestion/Suggestion'
import Integration from './Integration/Integration'
import Settings from './Settings/Settings'
import Profile_Mirror from './Profile/Mirror'
import Profile_View from './Profile/View'
import Community_Discord from './Community/Discord/Discord'
import Login_Email_Address_Password from './Login/User/Email/Login_Email_Address_Password'
import Navigation_Menu from '@Shared_Components/Navigation_Menu'
import Password_Register from './Register/Email/Password/Password_Register'
import Twitch_Register from './Login/User/Twitch/Twitch_Login'
import Twitch_Confirmation from './Login/User/Twitch/Confirmation/Twitch_Confirmation'
import Twitch_Login from './Login/User/Twitch/Twitch_Login'
import News_Feed from './News/News_Feed'

const External_NextJS_Router = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Path = usePathname()
    const router = useRouter()

    const { token, account_type } = props.end_user.account

    const public_account = !token && account_type === 0
    const user_account = token && account_type === 1
    const moderator_user_account = token && account_type === 2
    const administrator_user_account = token && account_type === 3

    const [PUBLIC_ROUTES, SET_PUBLIC_ROUTES] = useState([
        '/LOGIN/USER/EMAIL',
        '/LOGIN/USER/TWITCH',
        '/REGISTER/EMAIL',
        '/REGISTER/EMAIL/PASSWORD',
        '/REGISTER/TWITCH',
        '/REGISTER/TWITCH/CONFIRMATION',
        '/'
    ])

    const public_route = () => { return PUBLIC_ROUTES.includes(Path.toUpperCase()) }

    const [USER_ROUTES, SET_USER_ROUTES] = useState([
        '/',
        '/CHAT',
        '/COMMENT',
        '/COMMUNITY',
        '/COMMUNITY/DISCORD',
        '/FAQ',
        '/HELP',
        '/IDENTITY',
        '/INTEGRATION',
        '/NEWS',
        '/PROFILE/MIRROR',
        '/SETTINGS',
        '/SUGGESTION',
        '/REGISTER/TWITCH/CONFIRMATION',
    ])

    const user_route = () => {

        let path = Path.split(`/`)

        if (path[1].toUpperCase() == "PROFILE" && path[2].toUpperCase() == "VIEW") {
            USER_ROUTES.push(`/PROFILE/VIEW/${path[3]}`)
        }

        return USER_ROUTES.includes(Path.toUpperCase())

    }

    const [MODERATOR_USER_ROUTES, SET_MODERATOR_USER_ROUTES] = useState([
        '/SETTINGS',
        '/IDENTITY',
        '/COMMUNITY',
        '/'
    ])
    
    const moderator_route = () => { return MODERATOR_USER_ROUTES.includes(Path.toUpperCase()) }

    const [ADMINISTRATOR_USER_ROUTES, SET_ADMINISTRATOR_USER_ROUTES] = useState([
        '/SETTINGS',
        '/IDENTITY',
        '/COMMUNITY',
        '/'
    ])

    const administrator_route = () => { return ADMINISTRATOR_USER_ROUTES.includes(Path.toUpperCase()) }

    const user_account_user_route_component = () => {
        switch (Path.toUpperCase()) {
            case '/CHAT':
                return <WebSocket_Chat />
            case '/COMMUNITY':
                return <Community />
            case '/COMMUNITY/DISCORD':
                return <Community_Discord />
            case '/COMMENT':
                return <Comment />
            case '/IDENTITY':
                return <Identity />
            case '/INTEGRATION':
                return <Integration />
            case '/FAQ':
                return <Faq />
            case '/NEWS':
                return <News_Feed />
            case '/SUGGESTION':
                return <Suggestion />
            case '/HELP':
                return <Help />
            case '/SETTINGS':
                return <Settings />
            case `/PROFILE/VIEW/${Path.split('/').pop()}`:
                return <Profile_View />
            case '/PROFILE/MIRROR':
                return <Profile_Mirror />
            case '/REGISTER/TWITCH/CONFIRMATION':
                return <Twitch_Confirmation />
            default:
                return null
        }
    }

    const public_account_public_route_component = () => {

        switch (Path.toUpperCase()) {
            case '/REGISTER/EMAIL':
                return <Email_Register />
            case '/LOGIN/USER/EMAIL':
                return <Login_Email_Address_Password />
            case '/REGISTER/EMAIL/PASSWORD':
                return <Password_Register />
            case '/REGISTER/TWITCH':
                return <Twitch_Register />
            case '/REGISTER/TWITCH/CONFIRMATION':
                return <Twitch_Confirmation />
            case '/LOGIN/USER/TWITCH':
                return <Twitch_Login />
            default:
                return null
        }

    }

    useEffect(() => {

        if (public_account && !public_route ||
            user_account && !user_route ||
            moderator_user_account && !moderator_user_account ||
            administrator_user_account && !administrator_user_account) {
            router.replace('/')
        }
        
    },[
        public_account,
        public_route,
        Path,
        router,
        user_account,
        moderator_user_account,
        administrator_user_account,
        user_route,
        moderator_route,
        administrator_route
    ])

    switch (true)
    {
        case public_account && public_route():
            return (
                <>
                    <header>
                        <Navigation_Menu />
                    </header>
                    <main className="text-center" id="main">
                        { public_account_public_route_component() }
                    </main>
                    <footer>

                    </footer>
                </>
            )
        case user_account && user_route():
            return (
                <>
                    <header>
                        <Navigation_Menu />
                    </header>
                    <main className="text-center" id="main">
                        { user_account_user_route_component() }
                    </main>
                    <footer>

                    </footer>
                </>
            )
        case moderator_user_account && moderator_route():
            return (
                <>
                    <header>
                        <Navigation_Menu />
                    </header>
                    <main className="text-center" id="main">


                    </main>
                    <footer>

                    </footer>
                </>
            )
        case administrator_user_account && administrator_route():
            return (
                <>
                    <header>
                        <Navigation_Menu />
                    </header>
                    <main className="text-center" id="main">



                    </main>
                    <footer>

                    </footer>
                </>
            )

    }
}

export default External_NextJS_Router