import {
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    CLIENT_ADDRESS,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    DEFAULT_NETWORK_ERROR_STATE,
    APPLICATION_NEWS_SERVER_ADDRESS,
    UPDATE_APPLICATION_NEWS_FEED_STATE
} from '@Constants'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'
import { JWT_Decoder } from '@JWT/Decoder'

import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import axios from 'axios'

export const Load_News_Feed = () => async (Dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.get(`${APPLICATION_NEWS_SERVER_ADDRESS}/articles/`, {
            params: {
                user_id: await Encrypt(`${end_user_account.id}`),
                token: end_user_account.token
            }
        }).catch((error) => {

            return new Promise( async (reject) => {
                error.id = `Application-New-Feed-Request-Failed`
                await Dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    Dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    Dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(async (response: any) => {
            return await new Promise(async (resolve) => {
                await Dispatch({ type: UPDATE_APPLICATION_NEWS_FEED_STATE, payload: JSON.parse(Decrypt(response.data)) })
            })
        })
    }
}

export const Submit_News_Feed = (dto: {

    id: BigInt,
    headline: string,
    sub_headline: string,
    byline: string,
    image_urls: string[],
    body: string[],
    tags: string[],
    source_urls: string[]

}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${APPLICATION_NEWS_SERVER_ADDRESS}/articles`, {
            id: await Encrypt(`${end_user_account.id}`),
            token: end_user_account.token,
            headline: await Encrypt(`${dto.headline}`),
            sub_headline: await Encrypt(`${dto.sub_headline}`),
            byline: await Encrypt(`${dto.byline}`),
            //published_on: await Encrypt(`${Date.now()}`),
            image_urls: await Encrypt(`${dto.image_urls}`),
            body: await Encrypt(`${dto.body}`),
            tags: await Encrypt(`${dto.tags}`),
            source_urls: await Encrypt(`${dto.source_urls}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            account_roles: await Encrypt(`${end_user_account.roles}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`)
        }).catch((error) => {

            return new Promise(async (reject) => {
                error.id = `Application-New-Feed-Submission-Failed`
                await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })
    }
}