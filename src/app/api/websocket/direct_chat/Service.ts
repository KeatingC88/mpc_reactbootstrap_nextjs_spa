import { USERS_CACHE_SERVER_ADDRESS } from '@Constants'
import axios from 'axios'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'

export const Fetch_Pariticpant_Data_From_Cache_Server = async ({
    response_data,
    token,
}: {
    response_data: any[];
    token: string | null;
}): Promise<any[]> => {

    const collected_data: any[] = [];

    for (let data of response_data) {

        let combine_permission_data_with_participant_profile_data = { ...data }

        await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/get/user`, {
            token: token,
            id: Encrypt(`${data.Participant_ID}`)
        }).then((response: any) => {

            let participant_data: any = {}

            Object.keys(response.data).forEach((index: any) => {
                const set_decrypted_string = Decrypt(`${response.data[index]}`)
                const set_decrypted_number = parseInt(set_decrypted_string)

                participant_data[index] = Number.isNaN(set_decrypted_number) ? set_decrypted_string : set_decrypted_number

            })

            Object.assign(combine_permission_data_with_participant_profile_data, participant_data)

            collected_data.push(combine_permission_data_with_participant_profile_data)
        })

    }

    return collected_data
}

export const Fetch_End_User_Data_From_Cache_Server = async ({
    response_data,
    token,
}: {
    response_data: any[];
    token: string | null;
}): Promise<any[]> => {

    let collected_data: any[] = []

    for (let data of response_data) {

        let combine_permission_data_with_participant_profile_data = { ...data }

        await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/get/user`, {
            token: token,
            id: Encrypt(`${data.User_ID}`)
        }).then((response: any) => {

            let participant_data: any = {}

            Object.keys(response.data).forEach((index: any) => {
                const set_decrypted_string = Decrypt(`${response.data[index]}`)
                const set_decrypted_number = parseInt(set_decrypted_string)

                participant_data[index] = Number.isNaN(set_decrypted_number) ? set_decrypted_string : set_decrypted_number

            })

            Object.assign(combine_permission_data_with_participant_profile_data, participant_data)

            collected_data.push(combine_permission_data_with_participant_profile_data)
        })

    }

    return collected_data
}