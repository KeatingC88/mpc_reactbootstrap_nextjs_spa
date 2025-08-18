import {
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_APPLICATION_NEWS_FEED_STATE
} from '@Constants'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import axios from 'axios'

export const Load_News_Feed = () => async (Dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    await axios.post(`/api/community/news/read`, {
        withCredentials: true
    }).catch(async(error) => {
        return await new Promise(async (reject) => {
            error.id = `Application-News-Feed-Request-Failed`
            await Dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                Dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                Dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })
    }).then(async (response: any) => {
        return await new Promise((resolve) => {
           Dispatch({ type: UPDATE_APPLICATION_NEWS_FEED_STATE, payload: response.data })
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

    await axios.post(`/api/community/news/create`, {
        user_id: end_user_account.id,
        headline: dto.headline,
        sub_headline: dto.sub_headline,
        byline: dto.byline,
        image_urls: JSON.stringify(dto.image_urls),
        body: JSON.stringify(dto.body),
        tags: JSON.stringify(dto.tags),
        source_urls: JSON.stringify(dto.source_urls),
        language: dto.language,
        region: dto.region
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

    await axios.put(`/api/community/news/update`, {
        user_id: end_user_account.id,
        document_id: dto.document_id,
        headline: dto.headline,
        sub_headline: dto.sub_headline,
        byline: dto.byline,
        image_urls: JSON.stringify(dto.image_urls),
        body: JSON.stringify(dto.body),
        tags: JSON.stringify(dto.tags),
        source_urls: JSON.stringify(dto.source_urls),
        language: dto.language,
        region: dto.region
    }, {
        headers: {
           "Content-Type": "application/json"
        }, withCredentials: true
    }).catch( async (error) => {
        return await new Promise((reject) => {
            error.id = `Application-News-Feed-Update-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })
    })
}

export const Delete_Article_By_ID = (value: string) => async (Dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    await axios.post(`/api/community/news/delete`, {
        article_id: value
    }).catch( async (error) => {
        return new Promise(async (reject) => {
            error.id = `Application-News-Feed-Deletion-Failed`
            await Dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                Dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                Dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })
    }).then( async (response) => {
        return await new Promise((resolve) => {
            let removed_article_from_list = getState().Application_News_Feed_State_Reducer.news?.filter((x: any) => x._id !== value)
            resolve(removed_article_from_list)
            Dispatch({ type: UPDATE_APPLICATION_NEWS_FEED_STATE, payload: removed_article_from_list })
        })
    })
}