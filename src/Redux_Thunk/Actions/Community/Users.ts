import {
    UPDATE_APPLICATION_COMMUNITY_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_NETWORK_ERROR_STATE
} from '@Constants'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import axios from 'axios'

import { DTO } from '@JS/Required_DTO_Properties'

export const Load_Community_Users = (page_index?: number) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let current_language_state = state.Application_Language_State_Reducer
    let current_end_user_state = state.End_User_Account_State_Reducer

    await axios.post(`/api/community/users`, DTO({
        page_index: page_index ?? 1,
        login_type: current_end_user_state.login_type,
        language: `${current_language_state.current_language.split(`-`)[0]}`,
        region: `${current_language_state.current_language.split(`-`)[1]}`
    })).catch((error: any) => {

        return new Promise(async (reject) => {
            error.id = `Application-Community-Users-Load-Failed`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })

    }).then(async (response: any) => {

        return await new Promise(async (resolve) => {
            await dispatch({ type: UPDATE_APPLICATION_COMMUNITY_STATE, payload: { users: response.data } })
            resolve(response.data)
        })

    })
}