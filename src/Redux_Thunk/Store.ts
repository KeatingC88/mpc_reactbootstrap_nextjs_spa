import { createStore, applyMiddleware, Middleware } from 'redux'

import { thunk, ThunkMiddleware } from 'redux-thunk'

import Combined_Reducers from './Combined_Reducers'

const Copied_Current_Redux_State_Reducers: Middleware = store => next => action => {

    const result = next(action)
    const state = store.getState()

    const sessionSet = (key: string, value: object) => {
        sessionStorage.setItem(key, JSON.stringify({ ...value }))
    }

    sessionSet('Host_Error_State', state.Host_Error_State_Reducer)
    sessionSet('Network_Error_State', state.Network_Error_State_Reducer)

    sessionSet('Twitch_API_State', state.Twitch_API_State_Reducer)
    sessionSet('Discord_API_State', state.Discord_API_State_Reducer)

    sessionSet('Application_Language_State', state.Application_Language_State_Reducer)
    sessionSet('Application_Settings_State', state.Application_Settings_State_Reducer)
    sessionSet('Application_Profile_Viewer_State', state.Application_Profile_Viewer_State_Reducer)
    sessionSet('Application_WebSocket_State', state.Application_WebSocket_State_Reducer)
    sessionSet('Application_Notification_State', state.Application_Notification_State_Reducer)
    sessionSet('Application_Community_State', state.Application_Community_State_Reducer)
    sessionSet('Application_Loading_Progress_State', state.Application_Loading_Progress_State_Reducer)

    sessionSet('End_User_Account_State', state.End_User_Account_State_Reducer)
    sessionSet('End_User_Profile_State', state.End_User_Profile_State_Reducer)
    sessionSet('End_User_Custom_CSSDesign_State', state.End_User_Custom_CSSDesign_State_Reducer)

    sessionSet('End_User_Discord_Account_State', state.End_User_Discord_Account_State_Reducer)

    sessionSet('End_User_Twitch_Account_State', state.End_User_Twitch_Account_State_Reducer)
    sessionSet('End_User_Twitch_Stream_State', state.End_User_Twitch_Stream_State_Reducer)
    sessionSet('End_User_Twitch_Channel_State', state.End_User_Twitch_Channel_State_Reducer)
    sessionSet('End_User_Twitch_Videos_State', state.End_User_Twitch_Videos_State_Reducer)
    sessionSet('End_User_Twitch_Clips_State', state.End_User_Twitch_Clips_State_Reducer)
    sessionSet('End_User_Twitch_Followers_State', state.End_User_Twitch_Followers_State_Reducer)

    return result
}

export const CreateStore = (preloadedState = {}) => createStore(
    Combined_Reducers,
    preloadedState,
    applyMiddleware(thunk as unknown as ThunkMiddleware, Copied_Current_Redux_State_Reducers)
)