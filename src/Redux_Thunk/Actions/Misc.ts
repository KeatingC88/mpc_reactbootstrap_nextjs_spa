import {
    UPDATE_APPLICATION_SETTINGS_NAV_SHOW,
    UPDATE_APPLICATION_PROGRESS_BAR_STATUS_VALUE,
    UPDATE_APPLICATION_MOBILE_STATE
} from '@Constants'

import type { AppDispatch } from '@Redux_Thunk/Provider'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'

export const Update_Mobile_Mode = (value: boolean) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    dispatch({ type: UPDATE_APPLICATION_MOBILE_STATE, payload: {mobile_mode: value} })
}

export const Map_Database_Values_For_TypeScript = (obj: any): any => {
    const finished_obj: any = {}

    for (const key in obj) {

        let object = obj[key]

        for (const property_name in object) {

            let value = object[property_name]

            switch (true) {
                case property_name === "gender":
                    finished_obj[property_name] = parseInt(value)
                    break
                case (!isNaN(value) || !isNaN(parseFloat(value))) && /^\d+$/.test(value):
                    finished_obj[property_name] = BigInt(value)
                    break
                case value === "" || value === "null" || value === null:
                    finished_obj[property_name] = null
                    break
                case value === "" || value === "undefined" || value === undefined:
                    finished_obj[property_name] = undefined
                    break
                default:
                    finished_obj[property_name] = value
            }
        }
    }
    return finished_obj
}

export const Map_Database_Values_For_ReactBootstrap = (dto: {
    alignment: number | string
    text_alignment: number | string | null
}) => {

    switch (true) {
        case dto.alignment === 0:
            dto.alignment = `justify-content-start`
            break
        case dto.alignment === 1:
            dto.alignment = `justify-content-center`
            break
        case dto.alignment === 2:
            dto.alignment = `justify-content-end`
            break
        default:
    }

    switch (true) {
        case dto.text_alignment === 0:
            dto.text_alignment = `text-start`
            break
        case dto.text_alignment === 1:
            dto.text_alignment = `text-center`
            break
        case dto.text_alignment === 2:
            dto.text_alignment = `text-end`
            break
        default:
    }

    return {
        alignment: dto.alignment as string,
        text_alignment: dto.text_alignment as string,
    }
}

export const Set_Navigation_Menu_Display = (value: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {
    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_NAV_SHOW, payload: { navbar_css_display_value: value } })
    })
}

export const Map_GUI_Values_For_Database_Storage = (dto: {
    alignment: string | number
    text_alignment: string | number
}) => {
    switch (true) {
        case dto.alignment === 'justify-content-start':
            dto.alignment = 0
            break
        case dto.alignment === `justify-content-center`:
            dto.alignment = 1
            break
        case dto.alignment === `justify-content-end`:
            dto.alignment = 2
            break
        default:
    }
    switch (true) {
        case dto.text_alignment === 'text-start':
            dto.text_alignment = 0
            break
        case dto.text_alignment === `text-center`:
            dto.text_alignment = 1
            break
        case dto.text_alignment === `text-end`:
            dto.text_alignment = 2
            break
        default:
    }
    return {
        alignment: dto.alignment as number,
        text_alignment: dto.text_alignment as number,
    }
}

export const Update_Progress_Bar_Value = (value: number) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_APPLICATION_PROGRESS_BAR_STATUS_VALUE, payload: { percentage_value: value } })
    })
}