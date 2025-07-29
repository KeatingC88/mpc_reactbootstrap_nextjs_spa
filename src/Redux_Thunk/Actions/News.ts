import {
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    APPLICATION_NEWS_SERVER_ADDRESS,
    UPDATE_APPLICATION_NEWS_FEED_STATE
} from '@Constants'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import axios from 'axios'

export const Load_News_Feed = () => async (Dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    await axios.post(`${APPLICATION_NEWS_SERVER_ADDRESS}/get/articles/`, {
        token: getState().End_User_Account_State_Reducer.token
    }).catch((error) => {

        return new Promise( async (reject) => {
            error.id = `Application-News-Feed-Request-Failed`
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

export const Submit_Article = (dto: {

    language: string,
    region: string,
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

    await axios.post(`${APPLICATION_NEWS_SERVER_ADDRESS}/new/article/`, {
        user_id: await Encrypt(`${end_user_account.id}`),
        token: end_user_account.token,
        headline: await Encrypt(`${dto.headline}`),
        sub_headline: await Encrypt(`${dto.sub_headline}`),
        byline: await Encrypt(`${dto.byline}`),
        image_urls: await Encrypt(`${JSON.stringify(dto.image_urls)}`),
        body: await Encrypt(`${JSON.stringify(dto.body)}`),
        tags: await Encrypt(`${JSON.stringify(dto.tags)}`),
        source_urls: await Encrypt(`${JSON.stringify(dto.source_urls)}`),
        language: await Encrypt(`${dto.language}`),
        region: await Encrypt(`${dto.region}`)
    }).catch((error) => {

        return new Promise(async (reject) => {
            error.id = `Application-News-Feed-Submission-Failed`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })

    })
}

export const Update_Article_By_ID = (dto: {
    document_id: string,
    language: string,
    region: string,
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

    await axios.put(`${APPLICATION_NEWS_SERVER_ADDRESS}/edit/article/`, {
        user_id: await Encrypt(`${end_user_account.id}`),
        document_id: await Encrypt(`${dto.document_id}`),
        token: end_user_account.token,
        headline: await Encrypt(`${dto.headline}`),
        sub_headline: await Encrypt(`${dto.sub_headline}`),
        byline: await Encrypt(`${dto.byline}`),
        image_urls: await Encrypt(JSON.stringify(dto.image_urls)),
        body: await Encrypt(JSON.stringify(dto.body)),
        tags: await Encrypt(JSON.stringify(dto.tags)),
        source_urls: await Encrypt(JSON.stringify(dto.source_urls)),
        language: await Encrypt(`${dto.language}`),
        region: await Encrypt(`${dto.region}`)
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).catch((error) => {
        return new Promise(async (reject) => {
            error.id = `Application-News-Feed-Update-Failed`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })
    })
    
}

export const Delete_Article_By_ID = (value: string) => async (Dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    await axios.delete(`${APPLICATION_NEWS_SERVER_ADDRESS}/delete/article/`, {
        data: {
            token: getState().End_User_Account_State_Reducer.token,
            article_id: await Encrypt(`${value}`)
        }
    }).catch((error) => {

        return new Promise(async (reject) => {
            error.id = `Application-News-Feed-Deletion-Failed`
            await Dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                Dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                Dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })

    })

    return await new Promise( async () => {
        await Dispatch({ type: UPDATE_APPLICATION_NEWS_FEED_STATE, payload: getState().Application_News_Feed_State_Reducer.news?.filter((x: any) => x._id !== value) })
    })

}