import {
    USERS_SERVER_COOKIE_NAME
} from '@Constants'
import { cookies } from "next/headers"

export const Securing_Cookie = async (
    cookie_header: string
): Promise<string> => {

    if (!USERS_SERVER_COOKIE_NAME)
        throw new Error("Constant file Cookie Name is Undefined")

    const verifying_cookie_with_constant_file = cookie_header[0].match(
        new RegExp(`${USERS_SERVER_COOKIE_NAME}=([^]+)`)
    )

    if (!verifying_cookie_with_constant_file) 
        throw new Error("Cookie Null")
    
    let jwt_token_from_cookie_header = verifying_cookie_with_constant_file[1].split(`;`)[0]

    let cookie = await cookies()

    await cookie.set(USERS_SERVER_COOKIE_NAME, jwt_token_from_cookie_header, { httpOnly: true, path: "/" })

    return await new Promise((resolve) => {
        resolve(jwt_token_from_cookie_header)
    })
}