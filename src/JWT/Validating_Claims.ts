import {
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS
} from '@Constants'

import { Decrypt } from '@AES/Decryptor'
import { JWT_Decoder } from '@JWT/Decoder'

export const Validating_Claims = (data: {
    token: string,
    comparable_data: {
        account_type: number,
        email_address: string,
        id: BigInt,
        roles: string,
        groups: string
    }
}): boolean => {

    let jwt_data: any = JWT_Decoder(data.token)
    const fetch_key = Object.keys(jwt_data) as Array<keyof typeof jwt_data>

    switch (true) {
        case jwt_data[`exp`] <= Math.floor(Date.now() / 1000):
        case parseInt(Decrypt(`${jwt_data[fetch_key[0]]}`)) != data.comparable_data.account_type:
        case Decrypt(`${jwt_data[fetch_key[7]]}`) != JWT_ISSUER_KEY:
        case Decrypt(`${jwt_data[fetch_key[8]]}`) != JWT_CLIENT_KEY:
        case Decrypt(`${jwt_data[fetch_key[5]]}`) != data.comparable_data.email_address:
        case parseInt(Decrypt(`${jwt_data[fetch_key[1]]}`)) != parseInt(`${data.comparable_data.id}`):
        case Decrypt(`${jwt_data[fetch_key[2]]}`) != data.comparable_data.roles:
        case Decrypt(`${jwt_data[fetch_key[4]]}`) != CLIENT_ADDRESS:
        case Decrypt(`${jwt_data[fetch_key[3]]}`) != data.comparable_data.groups:
            throw new Error("JWT MisMatch Data")
    }

    return true
}