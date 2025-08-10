import {
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    UPDATE_HOST_ERROR_STATE,
    UPDATE_END_USER_ACCOUNT_TOKEN,
    CLIENT_ADDRESS
} from '@Constants'

import { Decrypt } from '@AES/Decryptor'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

export const JWT_Decoder = (token: String): String => {
    return JSON.parse(Buffer.from(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8'))
}

export const JWT_Email_Validation = (data: {
    token: string,
    comparable_data: {
        account_type: number,
        email_address: string,
        id: BigInt,
        roles: string,
        groups: string
    }
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let jwt_data = JWT_Decoder(data.token)
    const fetch_key = Object.keys(jwt_data) as Array<keyof typeof jwt_data>

    switch (true) {
        case parseInt(Decrypt(`${jwt_data[fetch_key[0]]}`)) != data.comparable_data.account_type:
            return false
        case Decrypt(`${jwt_data[fetch_key[7]]}`) != JWT_ISSUER_KEY:
            dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `JWT-Mismatch` } })
            return false
        case Decrypt(`${jwt_data[fetch_key[8]]}`) != JWT_CLIENT_KEY:
            dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `JWT-Mismatch` } })
            return false
        case Decrypt(`${jwt_data[fetch_key[5]]}`) != data.comparable_data.email_address:
            dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `JWT-Mismatch` } })
            return false
        case parseInt(Decrypt(`${jwt_data[fetch_key[1]]}`)) != parseInt(`${data.comparable_data.id}`):
            dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `JWT-Mismatch` } })
            return false
        case Decrypt(`${jwt_data[fetch_key[2]]}`) != data.comparable_data.roles.slice(1, -1):
            dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `JWT-Mismatch` } })
            return false
        case Decrypt(`${jwt_data[fetch_key[4]]}`) != CLIENT_ADDRESS:
            dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `JWT-Mismatch` } })
            return false
        case Decrypt(`${jwt_data[fetch_key[3]]}`) != data.comparable_data.groups.slice(1, -1):
            dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `JWT-Mismatch` } })
            return false
    }
    console.log({ token: data.token, token_expire: parseInt(Decrypt(`${jwt_data[fetch_key[1]]}`)) })
    dispatch({ type: UPDATE_END_USER_ACCOUNT_TOKEN, payload: { token: data.token, token_expire: parseInt(Decrypt(`${jwt_data[fetch_key[1]]}`)) } })
    
    return true
}