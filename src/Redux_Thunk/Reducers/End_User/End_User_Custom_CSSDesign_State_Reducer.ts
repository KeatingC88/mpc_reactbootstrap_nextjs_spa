import {
    DEFAULT_CSS_CUSTOM_DESIGN_STATE,
    UPDATE_CSS_CUSTOM_DESIGN_STATE,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_BORDER_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_BUTTON_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_BUTTON_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_BUTTON_FONT
} from '@Constants'

interface End_User_Custom_CSS_Preference_State {
    card_border_color: string
    card_header_font: string
    card_header_background_color: string
    card_header_font_color: string
    card_body_font: string
    card_body_background_color: string
    card_body_font_color: string
    card_footer_font: string
    card_footer_background_color: string
    card_footer_font_color: string
    navigation_menu_background_color: string
    navigation_menu_font_color: string
    navigation_menu_font: string
    button_background_color: string
    button_font_color: string
    button_font: string
    custom_design_obj: {
        card_header_font_color: string,
        card_body_font_color: string,
        card_footer_font_color: string,
        card_header_background_color: string,
        card_body_background_color: string,
        card_footer_background_color: string,
        card_header_font: string,
        card_body_font: string,
        card_footer_font: string,
        button_font_color: string,
        button_font: string,
        button_background_color: string,
        navigation_menu_font_color: string,
        navigation_menu_font: string,
        navigation_menu_background_color: string,
        card_border_color: string,
    }
}

type End_User_Custom_CSS_Preference_Action = {
    type: string
    payload?: Partial<End_User_Custom_CSS_Preference_State>
}

const initial_state: End_User_Custom_CSS_Preference_State = {
    card_border_color: ``,
    card_header_font: ``,
    card_header_background_color: ``,
    card_header_font_color: ``,
    card_body_font: ``,
    card_body_background_color: ``,
    card_body_font_color: ``,
    card_footer_font: ``,
    card_footer_background_color: ``,
    card_footer_font_color: ``,
    navigation_menu_background_color: ``,
    navigation_menu_font_color: ``,
    navigation_menu_font: ``,
    button_background_color: ``,
    button_font_color: ``,
    button_font: ``,
    custom_design_obj: {
        card_border_color: ``,
        card_header_font: ``,
        card_header_background_color: ``,
        card_header_font_color: ``,
        card_body_font: ``,
        card_body_background_color: ``,
        card_body_font_color: ``,
        card_footer_font: ``,
        card_footer_background_color: ``,
        card_footer_font_color: ``,
        navigation_menu_background_color: ``,
        navigation_menu_font_color: ``,
        navigation_menu_font: ``,
        button_background_color: ``,
        button_font_color: ``,
        button_font: ``,
    }
}

const End_User_Custom_CSSDesign_State_Reducer = (
    state: End_User_Custom_CSS_Preference_State = initial_state,
    action: End_User_Custom_CSS_Preference_Action
): End_User_Custom_CSS_Preference_State => {
    if (action.type.includes('CSS_CUSTOM_DESIGN')) {
        switch (action.type) {
            case UPDATE_CSS_CUSTOM_DESIGN_STATE:
                return {
                    ...state,
                    card_border_color: action.payload?.card_border_color ?? initial_state.card_border_color,
                    card_header_font: action.payload?.card_header_font ?? initial_state.card_header_font,
                    card_header_background_color: action.payload?.card_header_background_color ?? initial_state.card_header_background_color,
                    card_header_font_color: action.payload?.card_header_font_color ?? initial_state.card_header_font_color,
                    card_body_font: action.payload?.card_body_font ?? initial_state.card_body_font,
                    card_body_background_color: action.payload?.card_body_background_color ?? initial_state.card_body_background_color,
                    card_body_font_color: action.payload?.card_body_font_color ?? initial_state.card_body_font_color,
                    card_footer_font: action.payload?.card_footer_font ?? initial_state.card_footer_font,
                    card_footer_background_color: action.payload?.card_footer_background_color ?? initial_state.card_footer_background_color,
                    card_footer_font_color: action.payload?.card_footer_font_color ?? initial_state.card_footer_font_color,
                    navigation_menu_background_color: action.payload?.navigation_menu_background_color ?? initial_state.navigation_menu_background_color,
                    navigation_menu_font_color: action.payload?.navigation_menu_font_color ?? initial_state.navigation_menu_font_color,
                    navigation_menu_font: action.payload?.navigation_menu_font ?? initial_state.navigation_menu_font,
                    button_background_color: action.payload?.button_background_color ?? initial_state.button_background_color,
                    button_font_color: action.payload?.button_font_color ?? initial_state.button_font_color,
                    button_font: action.payload?.button_font ?? initial_state.button_font,
                    custom_design_obj: action.payload?.custom_design_obj ?? initial_state.custom_design_obj
                }
            case UPDATE_CSS_CUSTOM_DESIGN_CARD_BORDER_COLOR:
                return {
                    ...state,
                    card_border_color: action.payload?.card_border_color ?? initial_state.card_border_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_FONT:
                return {
                    ...state,
                    card_header_font: action.payload?.card_header_font ?? initial_state.card_header_font
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_BACKGROUND_COLOR:
                return {
                    ...state,
                    card_header_background_color: action.payload?.card_header_background_color ?? initial_state.card_header_background_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_FONT_COLOR:
                return {
                    ...state,
                    card_header_font_color: action.payload?.card_header_font_color ?? initial_state.card_header_font_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_FONT:
                return {
                    ...state,
                    card_body_font: action.payload?.card_body_font ?? initial_state.card_body_font
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_BACKGROUND_COLOR:
                return {
                    ...state,
                    card_body_background_color: action.payload?.card_body_background_color ?? initial_state.card_body_background_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_FONT_COLOR:
                return {
                    ...state,
                    card_body_font_color: action.payload?.card_body_font_color ?? initial_state.card_body_font_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_FONT:
                return {
                    ...state,
                    card_footer_font: action.payload?.card_footer_font ?? initial_state.card_footer_font
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_BACKGROUND_COLOR:
                return {
                    ...state,
                    card_footer_background_color: action.payload?.card_footer_background_color ?? initial_state.card_footer_background_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_FONT_COLOR:
                return {
                    ...state,
                    card_footer_font_color: action.payload?.card_footer_font_color ?? initial_state.card_footer_font_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_BACKGROUND_COLOR:
                return {
                    ...state,
                    navigation_menu_background_color: action.payload?.navigation_menu_background_color ?? initial_state.navigation_menu_background_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_FONT_COLOR:
                return {
                    ...state,
                    navigation_menu_font_color: action.payload?.navigation_menu_font_color ?? initial_state.navigation_menu_font_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_FONT:
                return {
                    ...state,
                    navigation_menu_font: action.payload?.navigation_menu_font ?? initial_state.navigation_menu_font
                }

            case UPDATE_CSS_CUSTOM_DESIGN_BUTTON_BACKGROUND_COLOR:
                return {
                    ...state,
                    button_background_color: action.payload?.button_background_color ?? initial_state.button_background_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_BUTTON_FONT_COLOR:
                return {
                    ...state,
                    button_font_color: action.payload?.button_font_color ?? initial_state.button_font_color
                }

            case UPDATE_CSS_CUSTOM_DESIGN_BUTTON_FONT:
                return {
                    ...state,
                    button_font: action.payload?.button_font ?? initial_state.button_font
                }

            case DEFAULT_CSS_CUSTOM_DESIGN_STATE:
                return { ...initial_state }

            default:
                return state
        }
    }

    return {
        ...state,
        card_border_color: state.card_border_color ?? initial_state.card_border_color,
        card_header_font: state.card_header_font ?? initial_state.card_header_font,
        card_header_background_color: state.card_header_background_color ?? initial_state.card_header_background_color,
        card_header_font_color: state.card_header_font_color ?? initial_state.card_header_font_color,
        card_body_font: state.card_body_font ?? initial_state.card_body_font,
        card_body_background_color: state.card_body_background_color ?? initial_state.card_body_background_color,
        card_body_font_color: state.card_body_font_color ?? initial_state.card_body_font_color,
        card_footer_font: state.card_footer_font ?? initial_state.card_footer_font,
        card_footer_background_color: state.card_footer_background_color ?? initial_state.card_footer_background_color,
        card_footer_font_color: state.card_footer_font_color ?? initial_state.card_footer_font_color,
        navigation_menu_background_color: state.navigation_menu_background_color ?? initial_state.navigation_menu_background_color,
        navigation_menu_font_color: state.navigation_menu_font_color ?? initial_state.navigation_menu_font_color,
        navigation_menu_font: state.navigation_menu_font ?? initial_state.navigation_menu_font,
        button_background_color: state.button_background_color ?? initial_state.button_background_color,
        button_font_color: state.button_font_color ?? initial_state.button_font_color,
        button_font: state.button_font ?? initial_state.button_font,
        custom_design_obj: state.custom_design_obj ?? initial_state.custom_design_obj
    }
}

export default End_User_Custom_CSSDesign_State_Reducer