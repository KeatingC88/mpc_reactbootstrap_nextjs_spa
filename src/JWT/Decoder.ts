export const JWT_Decoder = (token: String): String => {
    return JSON.parse(Buffer.from(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8'))
}