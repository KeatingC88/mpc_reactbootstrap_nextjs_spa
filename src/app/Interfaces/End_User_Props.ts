export interface End_User_Props {

    account: {
        id: BigInt | null,
        token: string | null
        token_expire: string | null
        account_type: number
        public_id: string | null
        roles: string[] | null
        email_address: string | null
        name: string | null
        online_status: number | string | null
        custom_lbl: string | null
        avatar_url_path: string | undefined | null
        avatar_title: string | null
        login_on: string | null
        logout_on: string | null
        created_on: string | null
        phone_country_code: number | null
        phone_carrier: string | null
        telephone: number | null
    }

    notification: {
        alert_color: string
        alert_text: string
    }

    discord: {
        id: string | null
    }

    twitch: {
        id: string | null
    }

    profile: {
        first_name: string | null
        last_name: string | null
        middle_name: string | null
        maiden_name: string | null
        gender: number
        birth_month: number
        birth_day: number
        birth_year: number
        ethnicity: string | null
        avatar_url_path: string | undefined | null
        avatar_title: string | null
    }

    custom_design: {
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