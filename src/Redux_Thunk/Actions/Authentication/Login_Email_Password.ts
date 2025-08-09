import {
    Get_Nation_Flag_Value,
    Map_GUI_Values_For_Database_Storage,
    Map_Database_Values_For_ReactBootstrap
} from '@Redux_Thunk/Actions/Misc'

import axios from 'axios'

import {
    USERS_SERVER_ADDRESS, UPDATE_NETWORK_ERROR_STATE,
    UPDATE_END_USER_ACCOUNT_STATE, UPDATE_APPLICATION_SETTINGS_LOCAL_TIME,
    UPDATE_APPLICATION_SETTINGS_GLOBAL_TIME, UPDATE_APPLICATION_SETTINGS_DATE,
    UPDATE_APPLICATION_SETTINGS_LOCATION, UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE,
    UPDATE_END_USER_PROFILE_ACCOUNT_STATE, UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS,
    CLIENT_ADDRESS, JWT_ISSUER_KEY, JWT_CLIENT_KEY,
    UPDATE_APPLICATION_SETTINGS_FLAG, UPDATE_APPLICATION_SETTINGS_ALIGNMENT,
    UPDATE_APPLICATION_SETTINGS_NAV_LOCK, UPDATE_APPLICATION_SETTINGS_THEME,
    UPDATE_APPLICATION_SETTINGS_TEXT_ALIGNMENT, DEFAULT_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    UPDATE_HOST_ERROR_STATE,
    UPDATE_CSS_CUSTOM_DESIGN_STATE,
    USERS_CACHE_SERVER_ADDRESS,
    USERS_PROFILE_CACHE_SERVER_ADDRESS
} from '@Constants'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'
import { JWT_Decoder } from '@JWT/Decoder'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Login_Email_Password = (dto: {
    email_address: string
    password: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let current_setting = state.Application_Settings_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    
    let converted_alignment_numerically = await Map_GUI_Values_For_Database_Storage({
        alignment: current_setting.alignment,
        text_alignment: current_setting.text_alignment,
    })


    
     axios.put(`${USERS_SERVER_ADDRESS}/Authenticate/Login/Email`, {
        email_address:  Encrypt(dto.email_address),
        password:  Encrypt(dto.password),
        theme: Encrypt(`${current_setting.theme}`),
        alignment: Encrypt(`${converted_alignment_numerically.alignment}`),
        text_alignment: Encrypt(`${converted_alignment_numerically.text_alignment}`),
        grid_type: Encrypt(`${current_setting.grid_type}`),
        locked: Encrypt(`${current_setting.nav_lock}`),
        language: Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
        region: Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
        client_time:  Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
        location:  Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
        jwt_issuer_key:  Encrypt(`${JWT_ISSUER_KEY}`),
        jwt_client_key:  Encrypt(`${JWT_CLIENT_KEY}`),
        jwt_client_address:  Encrypt(`${CLIENT_ADDRESS}`),
        user_agent: Encrypt(`${Get_Device_Information().userAgent}`),
        orientation:  Encrypt(`${Get_Device_Information().orientation_type}`),
        screen_width:  Encrypt(`${Get_Device_Information().screen_width}`),
        screen_height:  Encrypt(`${Get_Device_Information().screen_height}`),
        color_depth:  Encrypt(`${Get_Device_Information().color_depth}`),
        pixel_depth:  Encrypt(`${Get_Device_Information().pixel_depth}`),
        window_width:  Encrypt(`${Get_Device_Information().window_width}`),
        window_height:  Encrypt(`${Get_Device_Information().window_height}`),
         connection_type: Encrypt(`${Get_Device_Information().effectiveType}`),
         down_link: Encrypt(`${Get_Device_Information().downlink}`),
         rtt: Encrypt(`${Get_Device_Information().rtt}`),
         data_saver: Encrypt(`${Get_Device_Information().saveData}`),
         device_ram_gb: Encrypt(`${Get_Device_Information().deviceMemory}`),
     }).catch((error) => {

        error.id = `Email-Login-Failed`
        dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
        setTimeout(() => {
            dispatch({ type: DEFAULT_HOST_ERROR_STATE })
            dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
        }, 1)

    }).then( async (response: any) => {
        console.log(response)
        if (!state.Network_Error_State_Reducer.id) {

            console.log(response.data.token)

            let jwt_data = JWT_Decoder(response.data.token)

            let jwt_client_issuer_match = false

            const fetch_key = Object.keys(jwt_data) as Array<keyof typeof jwt_data>

            Decrypt(`${jwt_data[fetch_key[7]]}`) === JWT_ISSUER_KEY &&
            Decrypt(`${jwt_data[fetch_key[8]]}`) === JWT_CLIENT_KEY ? (jwt_client_issuer_match = true) : (jwt_client_issuer_match = false)

            if (!jwt_client_issuer_match) {

                 dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `Client-Mismatch` } })

            } else {

                dispatch({ type: UPDATE_APPLICATION_SETTINGS_LOCAL_TIME })
                dispatch({ type: UPDATE_APPLICATION_SETTINGS_DATE })
                dispatch({ type: UPDATE_APPLICATION_SETTINGS_GLOBAL_TIME })
                dispatch({ type: UPDATE_APPLICATION_SETTINGS_LOCATION })

                let current_language = Decrypt(`${response.data.current_language}`)

                dispatch({
                    type: UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE, payload: {
                        current_language: current_language
                    }
                })

                let name_public_id = Decrypt(response.data.name).split(`#`)

                dispatch({
                    type: UPDATE_END_USER_ACCOUNT_STATE, payload: {
                        token: response.data.token,
                        token_expire: parseInt(Decrypt(`${jwt_data[fetch_key[1]]}`)),
                        account_type: (parseInt(Decrypt(`${jwt_data[fetch_key[0]]}`)) === parseInt(Decrypt(`${response.data.account_type}`))) ? parseInt(Decrypt(`${response.data.account_type}`)) : dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `Client-Mismatch` } }),
                        created_on: parseInt(Decrypt(`${response.data.created_on}`)),
                        email_address: (Decrypt(`${jwt_data[fetch_key[5]]}`) === Decrypt(`${response.data.email_address}`)) ? Decrypt(`${response.data.email_address}`) : dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `Client-Mismatch` } }),
                        id: (parseInt(Decrypt(`${jwt_data[fetch_key[1]]}`)) === parseInt(Decrypt(`${response.data.id}`))) ? parseInt(Decrypt(`${response.data.id}`)) : dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `Client-Mismatch` } }),
                        login_on: parseInt(Decrypt(`${response.data.login_on}`)),
                        name: name_public_id[0],
                        public_id: name_public_id[1],
                        roles: (Decrypt(`${jwt_data[fetch_key[2]]}`) === Decrypt(`${response.data.roles}`)) ? Decrypt(`${response.data.roles}`) : dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `Client-Mismatch` } }),
                        client_address: (Decrypt(`${jwt_data[fetch_key[4]]}`) === CLIENT_ADDRESS) ? CLIENT_ADDRESS : dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `Client-Mismatch` } }),
                        groups: (Decrypt(`${jwt_data[fetch_key[3]]}`) === Decrypt(`${response.data.groups}`)) ? Decrypt(`${response.data.groups}`) : dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `Client-Mismatch` } }),
                        logout_on: parseInt(Decrypt(`${response.data.logout_on}`)),
                        avatar_url_path: Decrypt(`${response.data.avatar_url_path}`),
                        avatar_title: Decrypt(`${response.data.avatar_title}`),
                        custom_lbl: Decrypt(`${response.data.custom_lbl}`),
                        online_status: parseInt(Decrypt(`${response.data.online_status}`)),
                        login_type: `EMAIL`
                    }
                })

                axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
                    token: response.data.token,
                    id: response.data.id,
                    online_status: response.data.online_status,
                    custom_lbl: response.data.custom_lbl,
                    name: response.data.name,
                    created_on: response.data.created_on,
                    avatar_url_path: response.data.avatar_url_path,
                    avatar_title: response.data.avatar_title,
                    language_code: await Encrypt(`${current_language.split(`-`)[0]}`),
                    region_code: await Encrypt(`${current_language.split(`-`)[1]}`),
                    login_on: response.data.login_on,
                    logout_on: response.data.logout_on,
                    login_type: await Encrypt(`EMAIL`),
                    account_type: response.data.account_type,
                    email_address: response.data.email_address
                })

                let birth_month = parseInt(Decrypt(`${response.data.birth_month}`))
                let birth_day = parseInt(Decrypt(`${response.data.birth_day}`))
                let birth_year = parseInt(Decrypt(`${response.data.birth_year}`))
        
                dispatch({
                    type: UPDATE_END_USER_PROFILE_ACCOUNT_STATE, payload: {
                        first_name: Decrypt(`${response.data.first_name}`),
                        last_name: Decrypt(`${response.data.last_name}`),
                        middle_name: Decrypt(`${response.data.middle_name}`),
                        maiden_name: Decrypt(`${response.data.maiden_name}`),
                        gender: parseInt(Decrypt(`${response.data.gender}`)),
                        birth_month: birth_month,
                        birth_day: birth_day,
                        birth_year: birth_year,
                        ethnicity: Decrypt(`${response.data.ethnicity}`)
                    }
                })

                axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                    token: response.data.token,
                    id: response.data.id,
                    birth_date: await Encrypt(`${birth_month}/${birth_day}/${birth_year}`),
                    ethnicity: response.data.ethnicity,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    middle_name: response.data.middle_name,
                    maiden_name: response.data.maiden_name,
                    gender: response.data.gender
                })

                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS, payload: {
                        grid_type: parseInt(Decrypt(`${response.data.grid_type}`))
                    }
                })
 
                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_FLAG, payload: {
                        flag: Get_Nation_Flag_Value(Decrypt(`${response.data.current_language}`))
                    }
                })

                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_THEME, payload: {
                        theme: parseInt(Decrypt(`${response.data.theme}`))
                    }
                })

                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_NAV_LOCK, payload: {
                        nav_lock: Decrypt(`${response.data.nav_lock}`) === 'True' ? true : false
                    }
                })

                let dto = Map_Database_Values_For_ReactBootstrap({
                    alignment: parseInt(Decrypt(`${response.data.alignment}`)),
                    text_alignment: parseInt(Decrypt(`${response.data.text_alignment}`))
                })
  
                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_ALIGNMENT, payload: {
                        alignment: dto.alignment
                    }
                })
      
                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_TEXT_ALIGNMENT, payload: {
                        text_alignment: dto.text_alignment
                    }
                })
 
                dispatch({
                    type: UPDATE_CSS_CUSTOM_DESIGN_STATE, payload: {
                        card_border_color: Decrypt(`${response.data.card_border_color}`),
                        card_header_font: Decrypt(`${response.data.card_header_font}`),
                        card_header_background_color: Decrypt(`${response.data.card_header_background_color}`),
                        card_header_font_color: Decrypt(`${response.data.card_header_font_color}`),
                        card_body_font: Decrypt(`${response.data.card_body_font}`),
                        card_body_background_color: Decrypt(`${response.data.card_body_background_color}`),
                        card_body_font_color: Decrypt(`${response.data.card_body_font_color}`),
                        card_footer_font: Decrypt(`${response.data.card_footer_font}`),
                        card_footer_background_color: Decrypt(`${response.data.card_footer_background_color}`),
                        card_footer_font_color: Decrypt(`${response.data.card_footer_font_color}`),
                        navigation_menu_background_color: Decrypt(`${response.data.navigation_menu_background_color}`),
                        navigation_menu_font_color: Decrypt(`${response.data.navigation_menu_font_color}`),
                        navigation_menu_font: Decrypt(`${response.data.navigation_menu_font}`),
                        button_background_color: Decrypt(`${response.data.button_background_color}`),
                        button_font_color: Decrypt(`${response.data.button_font_color}`),
                        button_font: Decrypt(`${response.data.button_font}`),
                    }
                })

            }
        }
    })
}