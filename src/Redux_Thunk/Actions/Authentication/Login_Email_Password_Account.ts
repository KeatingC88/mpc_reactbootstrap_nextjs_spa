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
import { JWT_Email_Validation } from '@JWT/Decoder'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Login_Email_Password_Account = (dto: {
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

     axios.put(`${USERS_SERVER_ADDRESS}/Email/Login`, {
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

         if (!state.Network_Error_State_Reducer.id && response && response.data) {

             let response_data = JSON.parse(JSON.parse(Decrypt(response.data)).mpc_data)

             const isValid = await dispatch(JWT_Email_Validation({ token: response.data.token, comparable_data: response_data }))

            if (isValid) {

                dispatch({ type: UPDATE_APPLICATION_SETTINGS_LOCAL_TIME })
                dispatch({ type: UPDATE_APPLICATION_SETTINGS_DATE })
                dispatch({ type: UPDATE_APPLICATION_SETTINGS_GLOBAL_TIME })
                dispatch({ type: UPDATE_APPLICATION_SETTINGS_LOCATION })

                let current_language = response_data.current_language

                dispatch({
                    type: UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE, payload: {
                        current_language: current_language
                    }
                })

                let name_public_id = response_data.name.split(`#`)

                dispatch({
                    type: UPDATE_END_USER_ACCOUNT_STATE, payload: {
                        account_type: response_data.account_type,
                        created_on: response_data.created_on,
                        email_address: response_data.email_address,
                        id: response_data.id,
                        login_on: response_data.login_on,
                        name: name_public_id[0],
                        public_id: name_public_id[1],
                        roles: response_data.roles,
                        client_address: CLIENT_ADDRESS,
                        groups: response_data.groups,
                        logout_on: response_data.logout_on,
                        avatar_url_path: response_data.avatar_url_path,
                        avatar_title: response_data.avatar_title,
                        custom_lbl: response_data.custom_lbl,
                        online_status: response_data.online_status,
                        login_type: `EMAIL`
                    }
                })

                axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
                    token: response_data.token,
                    id: await Encrypt(`${response_data.id}`),
                    online_status: await Encrypt(`${response_data.online_status}`),
                    custom_lbl: await Encrypt(`${response_data.custom_lbl}`),
                    name: await Encrypt(`${response_data.name}`),
                    created_on: await Encrypt(`${response_data.created_on}`),
                    avatar_url_path: await Encrypt(`${response_data.avatar_url_path}`),
                    avatar_title: await Encrypt(`${response_data.avatar_title}`),
                    language_code: await Encrypt(`${current_language.split(`-`)[0]}`),
                    region_code: await Encrypt(`${current_language.split(`-`)[1]}`),
                    login_on: await Encrypt(`${response_data.login_on}`),
                    logout_on: await Encrypt(`${response_data.logout_on}`),
                    login_type: await Encrypt(`EMAIL`),
                    account_type: await Encrypt(`${response_data.account_type}`),
                    email_address: await Encrypt(`${response_data.email_address}`)
                })

                let birth_month = parseInt(response_data.birth_month)
                let birth_day = parseInt(response_data.birth_day)
                let birth_year = parseInt(response_data.birth_year)
        
                dispatch({
                    type: UPDATE_END_USER_PROFILE_ACCOUNT_STATE, payload: {
                        first_name: response_data.first_name,
                        last_name: response_data.last_name,
                        middle_name: response_data.middle_name,
                        maiden_name: response_data.maiden_name,
                        gender: response_data.gender,
                        birth_month: birth_month,
                        birth_day: birth_day,
                        birth_year: birth_year,
                        ethnicity: response_data.ethnicity
                    }
                })

                await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                    token: response_data.token,
                    id: await Encrypt(`${response_data.id}`),
                    birth_date: await Encrypt(`${birth_month}/${birth_day}/${birth_year}`),
                    ethnicity: await Encrypt(`${response_data.ethnicity}`),
                    first_name: await Encrypt(`${response_data.first_name}`),
                    last_name: await Encrypt(`${response_data.last_name}`),
                    middle_name: await Encrypt(`${response_data.middle_name}`),
                    maiden_name: await Encrypt(`${response_data.maiden_name}`),
                    gender: await Encrypt(`${response_data.gender}`)
                })

                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS, payload: {
                        grid_type: parseInt(response_data.grid_type)
                    }
                })
 
                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_FLAG, payload: {
                        flag: Get_Nation_Flag_Value(response_data.current_language)
                    }
                })

                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_THEME, payload: {
                        theme: parseInt(response_data.theme)
                    }
                })

                dispatch({
                    type: UPDATE_APPLICATION_SETTINGS_NAV_LOCK, payload: {
                        nav_lock: response_data.nav_lock === 'True' ? true : false
                    }
                })

                let dto = Map_Database_Values_For_ReactBootstrap({
                    alignment: parseInt(response_data.alignment),
                    text_alignment: parseInt(response_data.text_alignment)
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
                        card_border_color: response_data.card_border_color,
                        card_header_font: response_data.card_header_font,
                        card_header_background_color: response_data.card_header_background_color,
                        card_header_font_color: response_data.card_header_font_color,
                        card_body_font: response_data.card_body_font,
                        card_body_background_color: response_data.card_body_background_color,
                        card_body_font_color: response_data.card_body_font_color,
                        card_footer_font: response_data.card_footer_font,
                        card_footer_background_color: response_data.card_footer_background_color,
                        card_footer_font_color: response_data.card_footer_font_color,
                        navigation_menu_background_color: response_data.navigation_menu_background_color,
                        navigation_menu_font_color: response_data.navigation_menu_font_color,
                        navigation_menu_font: response_data.navigation_menu_font,
                        button_background_color: response_data.button_background_color,
                        button_font_color: response_data.button_font_color,
                        button_font: response_data.button_font,
                    }
                })
            }
        }
    })
}