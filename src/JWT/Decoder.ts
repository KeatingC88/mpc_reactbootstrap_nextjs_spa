import {
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS
} from '@Constants'

import { Decrypt } from '@AES/Decryptor'

export const JWT_Decoder = (token: string): string => {
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
}): boolean => {
    let jwt_data = JWT_Decoder(data.token)

    const fetch_key = Object.keys(jwt_data) as Array<keyof typeof jwt_data>

    switch (true) {
        case jwt_data[`exp`] <= Math.floor(Date.now() / 1000):
            return false
        case parseInt(Decrypt(`${jwt_data[fetch_key[0]]}`)) != data.comparable_data.account_type:
            return false
        case Decrypt(`${jwt_data[fetch_key[7]]}`) != JWT_ISSUER_KEY:
            return false
        case Decrypt(`${jwt_data[fetch_key[8]]}`) != JWT_CLIENT_KEY:
            return false
        case Decrypt(`${jwt_data[fetch_key[5]]}`) != data.comparable_data.email_address:
            return false
        case parseInt(Decrypt(`${jwt_data[fetch_key[1]]}`)) != parseInt(`${data.comparable_data.id}`):
            return false
        case Decrypt(`${jwt_data[fetch_key[2]]}`) != data.comparable_data.roles:
            return false
        case Decrypt(`${jwt_data[fetch_key[4]]}`) != CLIENT_ADDRESS:
            return false
        case Decrypt(`${jwt_data[fetch_key[3]]}`) != data.comparable_data.groups:
            return false
    }

    return true
}