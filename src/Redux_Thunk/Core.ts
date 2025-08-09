
import { createSelector } from 'reselect'

import { Current_Redux_State } from './Combined_Reducers'
import { Application_Props } from '@Redux_Thunk/Reducers/Interfaces/Application_Props'
import { End_User_Props } from '@Redux_Thunk/Reducers/Interfaces/End_User_Props'
import { Error_Props } from '@Redux_Thunk/Reducers/Interfaces/Error_Props'
import { Third_Party_Api_Props } from '@Redux_Thunk/Reducers/Interfaces/Third_Party_Api_Props'

interface Redux_Thunk_Core {
    application: Application_Props
    end_user: End_User_Props
    error: Error_Props
    api: Third_Party_Api_Props
}

export const Redux_Thunk_Core = createSelector(
    [(state: Current_Redux_State) => state],
    (state): Redux_Thunk_Core => ({
        application: {
            community: {
                users: state.Application_Community_State_Reducer.users,
                news: state.Application_News_Feed_State_Reducer.news,
                profile_viewer: {
                    id: state.Application_Profile_Viewer_State_Reducer.id,
                    name: state.Application_Profile_Viewer_State_Reducer.name,
                    created_on: state.Application_Profile_Viewer_State_Reducer.created_on,
                    logout_on: state.Application_Profile_Viewer_State_Reducer.logout_on,
                    online_status: state.Application_Profile_Viewer_State_Reducer.online_status,
                    gender: state.Application_Profile_Viewer_State_Reducer.gender,
                    custom_lbl: state.Application_Profile_Viewer_State_Reducer.custom_lbl,
                    avatar_url_path: state.Application_Profile_Viewer_State_Reducer.avatar_url_path,
                    avatar_title: state.Application_Profile_Viewer_State_Reducer.avatar_title,
                    language_code: state.Application_Profile_Viewer_State_Reducer.language_code,
                    region_code: state.Application_Profile_Viewer_State_Reducer.region_code,
                    login_on: state.Application_Profile_Viewer_State_Reducer.login_on,
                    login_type: state.Application_Profile_Viewer_State_Reducer.login_type,
                    account_type: state.Application_Profile_Viewer_State_Reducer.account_type,
                    birth_date: state.Application_Profile_Viewer_State_Reducer.birth_date,
                    ethnicity: state.Application_Profile_Viewer_State_Reducer.ethnicity,
                    first_name: state.Application_Profile_Viewer_State_Reducer.first_name,
                    last_name: state.Application_Profile_Viewer_State_Reducer.last_name,
                    maiden_name: state.Application_Profile_Viewer_State_Reducer.maiden_name,
                    middle_name: state.Application_Profile_Viewer_State_Reducer.middle_name
                },
            },
            language_dictionaries: state.Application_Language_State_Reducer.language_dictionaries,
            settings: {
                current_language: state.Application_Language_State_Reducer.current_language,
                current_language_value: state.Application_Language_State_Reducer.language,
                current_region_value: state.Application_Language_State_Reducer.region,
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
            },
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
                display_name: state.End_User_Twitch_Account_State_Reducer.display_name,
                login: state.End_User_Twitch_Account_State_Reducer.login,
                email_address: state.End_User_Twitch_Account_State_Reducer.email_address,
                profile_image_url: state.End_User_Twitch_Account_State_Reducer.profile_image_url
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
    })
)