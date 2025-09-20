import { combineReducers } from 'redux'

import Host_Error_State_Reducer from '@Redux_Thunk/Reducers/Error/Host_Error_State_Reducer'
import Network_Error_State_Reducer from '@Redux_Thunk/Reducers/Error/Network_Error_State_Reducer'
import Discord_API_State_Reducer from '@Redux_Thunk/Reducers/API/Discord_API_State_Reducer'
import Twitch_API_State_Reducer from '@Redux_Thunk/Reducers/API/Twitch_API_State_Reducer'

import Application_Language_State_Reducer from '@Redux_Thunk/Reducers/Application/Application_Language_State_Reducer'
import Application_WebSocket_State_Reducer from '@Redux_Thunk/Reducers/Application/Application_WebSocket_State_Reducer'
import Application_Settings_State_Reducer from '@Redux_Thunk/Reducers/Application/Application_Settings_State_Reducer'
import Application_Community_State_Reducer from '@Redux_Thunk/Reducers/Application/Application_Community_State_Reducer'
import Application_Loading_Progress_State_Reducer from '@Redux_Thunk/Reducers/Application/Application_Loading_Progress_State_Reducer'
import Application_Profile_Viewer_State_Reducer from '@Redux_Thunk/Reducers/Application/Application_Profile_Viewer_State_Reducer'
import Application_Notification_State_Reducer from '@Redux_Thunk/Reducers/Application/Application_Notification_State_Reducer'
import Application_News_Feed_State_Reducer from '@Redux_Thunk/Reducers/Application/Application_News_Feed_State_Reducer'

import End_User_Account_State_Reducer from '@Redux_Thunk/Reducers/End_User/End_User_Account_State_Reducer'
import End_User_Profile_State_Reducer from '@Redux_Thunk/Reducers/End_User/End_User_Profile_State_Reducer'
import End_User_Custom_CSSDesign_State_Reducer from '@Redux_Thunk/Reducers/End_User/End_User_Custom_CSSDesign_State_Reducer'

import End_User_Discord_Account_State_Reducer from '@Redux_Thunk/Reducers/End_User/End_User_Discord_Account_State_Reducer'

import End_User_Twitch_Account_State_Reducer from '@Redux_Thunk/Reducers/End_User/Twitch/End_User_Twitch_Account_State_Reducer'
import End_User_Twitch_Stream_State_Reducer from '@Redux_Thunk/Reducers/End_User/Twitch/End_User_Twitch_Stream_State_Reducer'
import End_User_Twitch_Channel_State_Reducer from '@Redux_Thunk/Reducers/End_User/Twitch/End_User_Twitch_Channel_State_Reducer'
import End_User_Twitch_Followers_State_Reducer from '@Redux_Thunk/Reducers/End_User/Twitch/End_User_Twitch_Followers_State_Reducer'
import End_User_Twitch_Clips_State_Reducer from '@Redux_Thunk/Reducers/End_User/Twitch/End_User_Twitch_Clips_State_Reducer'
import End_User_Twitch_Videos_State_Reducer from '@Redux_Thunk/Reducers/End_User/Twitch/End_User_Twitch_Videos_State_Reducer'

const Combined_Reducers: combineReducers = combineReducers({
    End_User_Custom_CSSDesign_State_Reducer,
    Host_Error_State_Reducer,
    Network_Error_State_Reducer,
    Discord_API_State_Reducer,
    Twitch_API_State_Reducer,
    Application_Language_State_Reducer,
    Application_WebSocket_State_Reducer,
    Application_Settings_State_Reducer,
    Application_Profile_Viewer_State_Reducer,
    Application_Community_State_Reducer,
    Application_Loading_Progress_State_Reducer,
    Application_Notification_State_Reducer,
    Application_News_Feed_State_Reducer,
    End_User_Account_State_Reducer,
    End_User_Profile_State_Reducer,
    End_User_Discord_Account_State_Reducer,
    End_User_Twitch_Account_State_Reducer,
    End_User_Twitch_Stream_State_Reducer,
    End_User_Twitch_Channel_State_Reducer,
    End_User_Twitch_Followers_State_Reducer,
    End_User_Twitch_Clips_State_Reducer,
    End_User_Twitch_Videos_State_Reducer,
})

export type Current_Redux_State = ReturnType<typeof Combined_Reducers>

export default Combined_Reducers
