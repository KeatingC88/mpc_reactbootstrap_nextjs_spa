import { Get_Device_Information } from './End_User_Device_Information'

import {
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS
} from '@Constants'

export const DTO = <T extends Record<string, any>>(dto: T) => {
    return {
        ...dto,
        client_time: new Date().getTime(),
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        jwt_issuer_key: JWT_ISSUER_KEY,
        jwt_client_key: JWT_CLIENT_KEY,
        jwt_client_address: CLIENT_ADDRESS,
        user_agent: Get_Device_Information().userAgent,
        orientation: Get_Device_Information().orientation_type,
        screen_width: Get_Device_Information().screen_width,
        screen_height: Get_Device_Information().screen_height,
        color_depth: Get_Device_Information().color_depth,
        pixel_depth: Get_Device_Information().pixel_depth,
        window_width: Get_Device_Information().window_width,
        window_height: Get_Device_Information().window_height,
        connection_type: Get_Device_Information().effectiveType,
        down_link:Get_Device_Information().downlink,
        rtt: Get_Device_Information().rtt,
        data_saver: Get_Device_Information().saveData,
        device_ram_gb: Get_Device_Information().deviceMemory,
    }
}