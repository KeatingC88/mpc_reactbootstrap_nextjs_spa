"use client"

import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'

import { Application_Props } from '@Interfaces/Application_Props'
import { End_User_Props } from '@Interfaces/End_User_Props'
import { Error_Props } from '@Interfaces/Error_Props'
import { Third_Party_Api_Props } from '@Interfaces/Third_Party_Api_Props'

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

interface External_NextJS_Router_Props {
    application: Application_Props
    end_user: End_User_Props
    error: Error_Props
    api: Third_Party_Api_Props
    children?: ReactNode
}

const External_NextJS_Router = () => {

    const {
        application,
        end_user,
        error,
        api
    }: External_NextJS_Router_Props = useSelector((state: Current_Redux_State) => ({
        application: {
            community: {
                users: state.Application_Community_State_Reducer.users,
            },
            language_dictionaries: state.Application_Language_State_Reducer.language_dictionaries,
            profile_viewer: {
                id: state.Application_Profile_Viewer_State_Reducer.id,
                name: state.Application_Profile_Viewer_State_Reducer.name,
                created_on: state.Application_Profile_Viewer_State_Reducer.created_on,
                logout_on: state.Application_Profile_Viewer_State_Reducer.logout_on,
            },
            settings: {
                current_language: state.Application_Language_State_Reducer.current_language,
                theme: state.Application_Settings_State_Reducer.theme,
                alignment: state.Application_Settings_State_Reducer.alignment,
                text_alignment: state.Application_Settings_State_Reducer.text_alignment,
                flag: state.Application_Settings_State_Reducer.flag,
                nav_lock: state.Application_Settings_State_Reducer.nav_lock,
                gmt_time: state.Application_Settings_State_Reducer.gmt_time,
                local_time: state.Application_Settings_State_Reducer.local_time,
                date: state.Application_Settings_State_Reducer.date,
                location: state.Application_Settings_State_Reducer.location,
                grid_type: state.Application_Settings_State_Reducer.grid_type,
                navbar_css_display_value: state.Application_Settings_State_Reducer.navbar_css_display_value,
            },
            websocket: {
                chat_conversations: state.Application_WebSocket_State_Reducer.chat_conversations,
                conversation_sent_requests: state.Application_WebSocket_State_Reducer.conversation_sent_requests,
                conversation_received_approvals: state.Application_WebSocket_State_Reducer.conversation_received_approvals,
                conversation_received_requests: state.Application_WebSocket_State_Reducer.conversation_received_requests,
                conversation_sent_approvals: state.Application_WebSocket_State_Reducer.conversation_sent_approvals,
                conversation_sent_blocks: state.Application_WebSocket_State_Reducer.conversation_sent_blocks,
                conversation_received_blocks: state.Application_WebSocket_State_Reducer.conversation_received_blocks,
            }
        },
        end_user: {
            account: {
                id: state.End_User_Account_State_Reducer.id,
                public_id: state.End_User_Account_State_Reducer.public_id,
                token: state.End_User_Account_State_Reducer.token,
                token_expire: state.End_User_Account_State_Reducer.token_expire,
                account_type: state.End_User_Account_State_Reducer.account_type,
                roles: state.End_User_Account_State_Reducer.roles,
                email_address: state.End_User_Account_State_Reducer.email_address,
                name: state.End_User_Account_State_Reducer.name,
                online_status: state.End_User_Account_State_Reducer.online_status,
                custom_lbl: state.End_User_Account_State_Reducer.custom_lbl,
                avatar_url_path: state.End_User_Account_State_Reducer.avatar_url_path,
                avatar_title: state.End_User_Account_State_Reducer.avatar_title,
                login_on: state.End_User_Account_State_Reducer.login_on,
                logout_on: state.End_User_Account_State_Reducer.logout_on,
                created_on: state.End_User_Account_State_Reducer.created_on,
                phone_country_code: state.End_User_Account_State_Reducer.phone_country_code,
                phone_carrier: state.End_User_Account_State_Reducer.phone_carrier,
                telephone: state.End_User_Account_State_Reducer.telephone,
            },
            notification: {
                alert_color: ``,
                alert_text: ``,
            },
            discord: {
                id: state.End_User_Discord_Account_State_Reducer.id,
            },
            twitch: {
                id: state.End_User_Twitch_Account_State_Reducer.id,
            },
            profile: {
                first_name: state.End_User_Profile_State_Reducer.first_name,
                last_name: state.End_User_Profile_State_Reducer.last_name,
                middle_name: state.End_User_Profile_State_Reducer.middle_name,
                maiden_name: state.End_User_Profile_State_Reducer.maiden_name,
                gender: state.End_User_Profile_State_Reducer.gender,
                birth_month: state.End_User_Profile_State_Reducer.birth_month,
                birth_day: state.End_User_Profile_State_Reducer.birth_day,
                birth_year: state.End_User_Profile_State_Reducer.birth_year,
                ethnicity: state.End_User_Profile_State_Reducer.ethnicity,
                avatar_url_path: state.End_User_Account_State_Reducer.avatar_url_path,
                avatar_title: state.End_User_Account_State_Reducer.avatar_title,
            },
            custom_design: state.End_User_Custom_CSSDesign_State_Reducer.custom_design_obj,
        },
        error: {
            host: {
                id: state.Host_Error_State_Reducer.id,
            },
            network: {
                id: state.Network_Error_State_Reducer.id,
            },
        },
        api: {
            discord: {
                online_status: true,
            },
            twitch: {
                online_status: true,
            },
        },
    }))

    const Path = usePathname()
    const router = useRouter()

    const { token, account_type } = end_user.account

    const public_account = !token && account_type === 0
    const user_account = token && account_type === 1
    const moderator_user_account = token && account_type === 2
    const administrator_user_account = token && account_type === 3

    const [PUBLIC_ROUTES, SET_PUBLIC_ROUTES] = useState([
        '/LOGIN/USER/EMAIL',
        '/REGISTER/EMAIL',
        '/REGISTER/EMAIL/PASSWORD',
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
        '/PROFILE/MIRROR',
        '/SETTINGS',
        '/SUGGESTION'
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