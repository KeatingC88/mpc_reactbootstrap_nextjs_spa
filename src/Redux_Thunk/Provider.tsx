'use client'

import { Current_Redux_State } from './Combined_Reducers'
import { CreateStore } from './Store'
import { Provider, useDispatch } from 'react-redux'

const get_all_reducers_initial_state_values = (): Partial<Current_Redux_State> => {

    const getSession = (key: string) => {
        if (typeof window === 'undefined') return {}
        const item = sessionStorage.getItem(key)
        return item ? JSON.parse(item) : {}
    }

    return {
        Host_Error_State_Reducer: getSession('Host_Error_State'),
        Network_Error_State_Reducer: getSession('Network_Error_State'),
        Twitch_API_State_Reducer: getSession('Twitch_API_State'),
        Discord_API_State_Reducer: getSession('Discord_API_State'),
        Application_Language_State_Reducer: getSession('Application_Language_State'),
        Application_Settings_State_Reducer: getSession('Application_Settings_State'),
        Application_Profile_Viewer_State_Reducer: getSession('Application_Profile_Viewer_State'),
        Application_WebSocket_State_Reducer: getSession('Application_WebSocket_State'),
        Application_Notification_State_Reducer: getSession('Application_Notification_State'),
        Application_Community_State_Reducer: getSession('Application_Community_State'),
        End_User_Account_State_Reducer: getSession('End_User_Account_State'),
        End_User_Profile_State_Reducer: getSession('End_User_Profile_State'),
        End_User_Discord_Account_State_Reducer: getSession('End_User_Discord_Account_State'),
        End_User_Twitch_Account_State_Reducer: getSession('End_User_Twitch_Account_State'),
        End_User_Twitch_Channel_State_Reducer: getSession('End_User_Twitch_Channel_State'),
        End_User_Twitch_Stream_State_Reducer: getSession('End_User_Twitch_Stream_State'),
        End_User_Twitch_Followers_State_Reducer: getSession('End_User_Twitch_Followers_State'),
        End_User_Twitch_Videos_State_Reducer: getSession('End_User_Twitch_Videos_State'),
        End_User_Twitch_Clips_State_Reducer: getSession('End_User_Twitch_Clips_State'),
        End_User_Custom_CSSDesign_State_Reducer: getSession('End_User_Custom_CSSDesign_State_Reducer')
    }
}

export const Redux_Store = CreateStore(get_all_reducers_initial_state_values())

export const dispatch = Redux_Store.dispatch
export type AppDispatch = ReturnType<typeof CreateStore>['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default function Redux_Provider({ children }: { children: React.ReactNode }) {
    return <Provider store={Redux_Store}>{children}</Provider>
}