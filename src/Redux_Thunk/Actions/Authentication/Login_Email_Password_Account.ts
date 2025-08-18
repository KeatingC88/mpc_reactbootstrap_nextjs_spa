import {
    Get_Nation_Flag_Value,
    Map_GUI_Values_For_Database_Storage,
    Map_Database_Values_For_ReactBootstrap
} from '@Redux_Thunk/Actions/Misc'

import axios from 'axios'

import {
    UPDATE_NETWORK_ERROR_STATE,
    UPDATE_END_USER_ACCOUNT_STATE, UPDATE_APPLICATION_SETTINGS_LOCAL_TIME,
    UPDATE_APPLICATION_SETTINGS_GLOBAL_TIME, UPDATE_APPLICATION_SETTINGS_DATE,
    UPDATE_APPLICATION_SETTINGS_LOCATION, UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE,
    UPDATE_END_USER_PROFILE_ACCOUNT_STATE, UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS,
    CLIENT_ADDRESS, JWT_ISSUER_KEY, JWT_CLIENT_KEY,
    UPDATE_APPLICATION_SETTINGS_FLAG, UPDATE_APPLICATION_SETTINGS_ALIGNMENT,
    UPDATE_APPLICATION_SETTINGS_NAV_LOCK, UPDATE_APPLICATION_SETTINGS_THEME,
    UPDATE_APPLICATION_SETTINGS_TEXT_ALIGNMENT, DEFAULT_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    UPDATE_CSS_CUSTOM_DESIGN_STATE,
} from '@Constants'

import { Encrypt } from '@AES/Encryptor'

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

    await axios.put(`/api/authentciation/login/email_password_account`, {
        email_address: `${dto.email_address}`,
        password: `${dto.password}`,
        theme: `${current_setting.theme}`,
        alignment: `${converted_alignment_numerically.alignment}`,
        text_alignment: `${converted_alignment_numerically.text_alignment}`,
        grid_type: `${current_setting.grid_type}`,
        locked: `${current_setting.nav_lock}`,
        language: `${current_language_state.current_language.split(`-`)[0]}`,
        region: `${current_language_state.current_language.split(`-`)[1]}`,
        client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
        location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        jwt_issuer_key: `${JWT_ISSUER_KEY}`,
        jwt_client_key: `${JWT_CLIENT_KEY}`,
        jwt_client_address: `${CLIENT_ADDRESS}`,
        user_agent: `${Get_Device_Information().userAgent}`,
        orientation: `${Get_Device_Information().orientation_type}`,
        screen_width: `${Get_Device_Information().screen_width}`,
        screen_height: `${Get_Device_Information().screen_height}`,
        color_depth: `${Get_Device_Information().color_depth}`,
        pixel_depth: `${Get_Device_Information().pixel_depth}`,
        window_width: `${Get_Device_Information().window_width}`,
        window_height: `${Get_Device_Information().window_height}`,
        connection_type: `${Get_Device_Information().effectiveType}`,
        down_link: `${Get_Device_Information().downlink}`,
        rtt: `${Get_Device_Information().rtt}`,
        data_saver: `${Get_Device_Information().saveData}`,
        device_ram_gb: `${Get_Device_Information().deviceMemory}`,
    }).catch(async (error) => {
        return await new Promise((reject) => {
            error.id = `Email-Login-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
        })
    }).then( async (response: any) => {

        let response_data = response.mpc_data

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
    })
}