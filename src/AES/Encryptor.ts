import CryptoJS from "crypto-js"

import { ENCRYPTION_KEY, ENCRYPTION_IV } from "@Constants"

export const Encrypt = (value: string): string => {

    if (ENCRYPTION_KEY && ENCRYPTION_IV) {
        const key = CryptoJS.SHA256(ENCRYPTION_KEY)
        const iv = CryptoJS.enc.Utf8.parse(ENCRYPTION_IV)

        const encrypted = CryptoJS.AES.encrypt(value, key, {
            mode: CryptoJS.mode.CBC,
            iv,
            padding: CryptoJS.pad.Pkcs7
        })

        return encrypted.toString()
    } else {
        return 'error'
    }
}
