import {
    USERS_SERVER_ADDRESS,
    UPDATE_NETWORK_ERROR_STATE, 
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_DAY,
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_MONTH,
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_YEAR,
    UPDATE_END_USER_PROFILE_ACCOUNT_ETHNICITY,
    UPDATE_END_USER_PROFILE_ACCOUNT_FIRST_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_LAST_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_MIDDLE_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_MAIDEN_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_GENDER,
    JWT_CLIENT_KEY, JWT_ISSUER_KEY, CLIENT_ADDRESS,
    DEFAULT_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    USERS_PROFILE_CACHE_SERVER_ADDRESS
} from '@Constants'

import axios from 'axios'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'
import { Encrypt } from '@AES/Encryptor'

export const Default_End_User_Birthdate = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Identity/Default_Birth_Date`, {
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
            region: await Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-BirthDate-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(async () => {

            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: end_user_account.token,
                id: await Encrypt(`${end_user_account.id}`),
                birth_date: await Encrypt(``),
                ethnicity: await Encrypt(`${end_user_profile.ethnicity}`),
                first_name: await Encrypt(`${end_user_profile.first_name}`),
                last_name: await Encrypt(`${end_user_profile.last_name}`),
                middle_name: await Encrypt(`${end_user_profile.middle_name}`),
                maiden_name: await Encrypt(`${end_user_profile.maiden_name}`),
                gender: await Encrypt(`${end_user_profile.gender}`)
            })

        })

        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_DAY, payload: { birth_day: null } })
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_MONTH, payload: { birth_month: null } })
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_YEAR, payload: { birth_year: null } })
            resolve({ day: null, month: null, year: null })
        })
    }
}

export const Change_End_User_BirthDate = (dto: {
    Month: number
    Day: number
    Year: number
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        if (dto.Year > 0 && dto.Month > 0 && dto.Day > 0) {
            await axios.post(`${USERS_SERVER_ADDRESS}/Identity/Birth_Date`, {
                day: await Encrypt(`${dto.Day}`),
                month: await Encrypt(`${dto.Month}`),
                year: await Encrypt(`${dto.Year}`),
                token: end_user_account.token,
                id: await Encrypt(`${end_user_account.id}`),
                account_type: await Encrypt(`${end_user_account.account_type}`),
                login_type: await Encrypt(`${end_user_account.login_type}`),
                language: await Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
                region: await Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
                client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
                location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
                jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
                jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
                jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
                user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
                orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
                screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
                screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
                color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
                pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
                window_width: await Encrypt(`${Get_Device_Information().window_width}`),
                window_height: await Encrypt(`${Get_Device_Information().window_height}`),
                connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
                down_link: await Encrypt(`${Get_Device_Information().downlink}`),
                rtt: await Encrypt(`${Get_Device_Information().rtt}`),
                data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
                device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
            }).catch(async (error) => {

                return await new Promise((reject) => {
                    error.id = `Identity-BirthDate-Failed`
                    dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                    setTimeout(() => {
                        dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                        dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                    }, 1000)
                    reject(error)
                })

            }).then(async () => {

                await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                    token: end_user_account.token,
                    id: await Encrypt(`${end_user_account.id}`),
                    birth_date: await Encrypt(`${dto.Month}/${dto.Day}/${dto.Year}`),
                    ethnicity: await Encrypt(`${end_user_profile.ethnicity}`),
                    first_name: await Encrypt(`${end_user_profile.first_name}`),
                    last_name: await Encrypt(`${end_user_profile.last_name}`),
                    middle_name: await Encrypt(`${end_user_profile.middle_name}`),
                    maiden_name: await Encrypt(`${end_user_profile.maiden_name}`),
                    gender: await Encrypt(`${end_user_profile.gender}`)
                })

            })
        }

        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_DAY, payload: { birth_day: dto.Day } })
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_MONTH, payload: { birth_month: dto.Month } })
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_YEAR, payload: { birth_year: dto.Year } })
            resolve({ day: dto.Day, month: dto.Month, year: dto.Year })
        })
    }
}

export const Change_End_User_Ethnicity = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Identity/Ethnicity`, {
            ethnicity: await Encrypt(value),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
            region: await Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-Ethnicity-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(async () => {

            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: end_user_account.token,
                id: await Encrypt(`${end_user_account.id}`),
                birth_date: await Encrypt(`${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`),
                ethnicity: await Encrypt(`${value}`),
                first_name: await Encrypt(`${end_user_profile.first_name}`),
                last_name: await Encrypt(`${end_user_profile.last_name}`),
                middle_name: await Encrypt(`${end_user_profile.middle_name}`),
                maiden_name: await Encrypt(`${end_user_profile.maiden_name}`),
                gender: await Encrypt(`${end_user_profile.gender}`)
            })

        })

        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_ETHNICITY, payload: { ethnicity: value } })
            resolve(value)
        })
    }
}

export const Change_End_User_First_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Identity/FirstName`, {
            first_name: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
            region: await Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-FirstName-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(async () => {

            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: end_user_account.token,
                id: await Encrypt(`${end_user_account.id}`),
                birth_date: await Encrypt(`${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`),
                ethnicity: await Encrypt(`${end_user_profile.ethnicity}`),
                first_name: await Encrypt(`${value}`),
                last_name: await Encrypt(`${end_user_profile.last_name}`),
                middle_name: await Encrypt(`${end_user_profile.middle_name}`),
                maiden_name: await Encrypt(`${end_user_profile.maiden_name}`),
                gender: await Encrypt(`${end_user_profile.gender}`)
            })

        })

        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_FIRST_NAME, payload: { first_name: value } })
            resolve(value)
        })
    }
}

export const Change_End_User_Gender = (value: number) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Identity/Gender`, {
            gender: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
            region: await Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-Gender-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(async () => {

            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: end_user_account.token,
                id: await Encrypt(`${end_user_account.id}`),
                birth_date: await Encrypt(`${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`),
                ethnicity: await Encrypt(`${end_user_profile.ethnicity}`),
                first_name: await Encrypt(`${end_user_profile.first_name}`),
                last_name: await Encrypt(`${end_user_profile.last_name}`),
                middle_name: await Encrypt(`${end_user_profile.middle_name}`),
                maiden_name: await Encrypt(`${end_user_profile.maiden_name}`),
                gender: await Encrypt(`${value}`)
            })

        })

        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_GENDER, payload: { gender: value } })
            resolve(value)
        })
    }
}

export const Change_End_User_Last_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Identity/LastName`, {
            last_name: await Encrypt(value),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
            region: await Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-LastName-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(async () => {

            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: end_user_account.token,
                id: await Encrypt(`${end_user_account.id}`),
                birth_date: await Encrypt(`${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`),
                ethnicity: await Encrypt(`${end_user_profile.ethnicity}`),
                first_name: await Encrypt(`${end_user_profile.first_name}`),
                last_name: await Encrypt(`${value}`),
                middle_name: await Encrypt(`${end_user_profile.middle_name}`),
                maiden_name: await Encrypt(`${end_user_profile.maiden_name}`),
                gender: await Encrypt(`${end_user_profile.gender}`)
            })

        })

        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_LAST_NAME, payload: { last_name: value } })
            resolve(value)
        })
    }
}

export const Change_End_User_Middle_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer
    

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Identity/MiddleName`, {
            middle_name: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
            region: await Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-MiddleName-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(async () => {
            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: end_user_account.token,
                id: await Encrypt(`${end_user_account.id}`),
                birth_date: await Encrypt(`${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`),
                ethnicity: await Encrypt(`${end_user_profile.ethnicity}`),
                first_name: await Encrypt(`${end_user_profile.first_name}`),
                last_name: await Encrypt(`${end_user_profile.last_name}`),
                middle_name: await Encrypt(`${value}`),
                maiden_name: await Encrypt(`${end_user_profile.maiden_name}`),
                gender: await Encrypt(`${end_user_profile.gender}`)
            })
        })
        
        return await new Promise((resolve) => {
           dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_MIDDLE_NAME, payload: { middle_name: value } })
           resolve(value)            
        })
    }
}

export const Change_End_User_Maiden_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Identity/MaidenName`, {
            maiden_name: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.current_language.split(`-`)[0]}`),
            region: await Encrypt(`${current_language_state.current_language.split(`-`)[1]}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-MaidenNamed-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(async () => {

            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: end_user_account.token,
                id: await Encrypt(`${end_user_account.id}`),
                birth_date: await Encrypt(`${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`),
                ethnicity: await Encrypt(`${end_user_profile.ethnicity}`),
                first_name: await Encrypt(`${end_user_profile.first_name}`),
                last_name: await Encrypt(`${end_user_profile.last_name}`),
                middle_name: await Encrypt(`${end_user_profile.middle_name}`),
                maiden_name: await Encrypt(`${value}`),
                gender: await Encrypt(`${end_user_profile.gender}`)
            })

        })

        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_MAIDEN_NAME, payload: { maiden_name: value } })
           resolve(value)
        })

    }
}