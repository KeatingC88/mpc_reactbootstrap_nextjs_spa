import {
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
} from '@Constants'

import axios from 'axios'

import type { AppDispatch } from '@Redux_Thunk/Provider'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { DTO } from '@JS/Required_DTO_Properties'

export const Renew_Session_Token = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let current_end_user_account_state = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (current_end_user_account_state.id !== null) {

        await axios.get(`/api/authentication/remove_token`).then( async () => {
            await axios.post(`/api/authentication/renew_token`, DTO({
                id: current_end_user_account_state.id,
                account_type: current_end_user_account_state.account_type,
                groups: current_end_user_account_state.groups,
                roles: current_end_user_account_state.roles,
                login_type: current_end_user_account_state.login_type,
                language: current_language_state.language,
                region: current_language_state.region
            })).catch((error) => {
                return new Promise(async (reject) => {
                    error.id = `Logout-Failed`
                    dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                    setTimeout(() => {
                        dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                        dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                    }, 1)
                    reject(error)
                })
            })
        })
    }
}