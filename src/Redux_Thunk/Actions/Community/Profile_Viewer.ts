import {
    UPDATE_APPLICATION_PROFILE_VIEWER_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_NETWORK_ERROR_STATE
} from '@Constants'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import axios from 'axios'

export const Load_Profile_Viewer_Data = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    await axios.post(`/api/community/profile_viewer`, {
        id: value.toString()
    }, { withCredentials: true }).catch(async (error) => {
        return await new Promise(async (reject) => {
            error.id = `Application-Community-User-Load-Profile-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })
    }).then(async (response: any) => {
        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_APPLICATION_PROFILE_VIEWER_STATE, payload: response.data })
            resolve(response.data)
        })
    })

}