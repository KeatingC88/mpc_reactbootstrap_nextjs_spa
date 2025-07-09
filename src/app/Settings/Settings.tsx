"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import {
    Row, Col, Card, ToggleButton, Table, Form, Image,
    InputGroup, Accordion, Alert, Button, Offcanvas, Modal, Container
} from 'react-bootstrap'

import {
    Alternate_Application_Theme_Value,
    Lock_Navigation_Bar_Toggler,
    Alternate_Application_Display_Alignment_Value,
    Alternate_Application_Display_Text_Alignment_Value,
    Update_Display_Name,
    Update_End_User_Avatar,
    Update_End_User_Avatar_Title,
    Change_Password,
    Delete_User,
    Update_End_User_Selected_Status,
    Update_End_User_Selected_Custom_Label,
    Change_Application_Card_Border_Color,
    Change_Application_Card_Header_Font,
    Change_Application_Card_Header_Background_Color,
    Change_Application_Card_Header_Font_Color,
    Change_Application_Card_Body_Font,
    Change_Application_Card_Body_Background_Color,
    Change_Application_Card_Body_Font_Color,
    Change_Application_Card_Footer_Font,
    Change_Application_Card_Footer_Background_Color,
    Change_Application_Card_Footer_Font_Color,
    Change_Application_Navigation_Menu_Background_Color,
    Change_Application_Navigation_Menu_Font_Color,
    Change_Application_Navigation_Menu_Font,
    Change_Application_Button_Background_Color,
    Change_Application_Button_Font_Color,
    Change_Application_Button_Font,
    Change_Application_Theme_Default_Settings,

} from '@Redux_Thunk/Actions/Selected'

import { useSelector } from 'react-redux'
import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

const Settings = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    //Error Handling Properties
    const [submit_button_color, set_submit_button_color] = useState<string>(`primary`)
    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const create_settings_error_notification = (error: string) => {

        set_alert_text(`${error}`)
        set_alert_color(`danger`)

    }

    //Radio Properties
    const [status_radio_value, set_status_radio_value] = useState<number | string | null>(props.end_user.account.online_status)
    const [custom_label, set_custom_label] = useState<string | null>(props.end_user.account.custom_lbl)
    const [navigation_lock_radio_value, set_navigation_lock_radio_value] = useState<boolean>(props.application.settings.nav_lock)
    const [align_radio_value, set_alignment_radio_value] = useState<string>(props.application.settings.alignment)
    const [theme_radio_value, set_application_theme_radio_value] = useState<number>(props.application.settings.theme)

    const [custom_theme_default_value, set_custom_theme_default_value] = useState<string>("#b6ffb6")

    const [list_of_fonts, set_list_of_fonts] = useState<string[]>([
        `Arial`,
        `Verdana`,
        `Tahoma`,
        `Trebuchet MS`,
        `Times New Roman`,
        `Georgia`,
        `Garamond`,
        `Courier New`,
        `Brush Script MT`,
    ])

    const [card_header_font_color_value, set_card_header_font_color_value] = useState<string>(props.end_user.custom_design.card_header_font_color)
    const [card_body_font_color_value, set_card_body_font_color_value] = useState<string>(props.end_user.custom_design.card_body_font_color)
    const [card_footer_font_color_value, set_card_footer_font_color_value] = useState<string>(props.end_user.custom_design.card_footer_font_color)

    const [card_header_background_color_value, set_card_header_background_color_value] = useState<string>(props.end_user.custom_design.card_header_background_color)
    const [card_body_background_color_value, set_card_body_background_color_value] = useState<string>(props.end_user.custom_design.card_body_background_color)
    const [card_footer_background_color_value, set_card_footer_background_color_value] = useState<string>(props.end_user.custom_design.card_footer_background_color)

    const [card_header_font_value, set_card_header_font_value] = useState<string>(props.end_user.custom_design.card_header_font)
    const [card_body_font_value, set_card_body_font_value] = useState<string>(props.end_user.custom_design.card_body_font)
    const [card_footer_font_value, set_card_footer_font_value] = useState<string>(props.end_user.custom_design.card_footer_font)

    const [button_font_color_value, set_button_font_color_value] = useState<string>(props.end_user.custom_design.button_font_color)
    const [button_font_value, set_button_font_value] = useState<string>(props.end_user.custom_design.button_font)
    const [button_background_color_value, set_button_background_color_value] = useState<string>(props.end_user.custom_design.button_background_color)

    const [navigation_menu_font_color_value, set_navigation_menu_font_color_value] = useState<string>(props.end_user.custom_design.navigation_menu_font_color)
    const [navigation_menu_font_value, set_navigation_menu_font_value] = useState<string>(props.end_user.custom_design.navigation_menu_font)
    const [navigation_menu_background_color_value, set_navigation_menu_background_color_value] = useState<string>(props.end_user.custom_design.navigation_menu_background_color)

    const [card_border_color_value, set_card_border_color_value] = useState<string>(props.end_user.custom_design.card_border_color)

    const [html_card_header_font_list, set_html_card_header_font_list] = useState<React.JSX.Element[]>([])
    const [html_card_body_font_list, set_html_card_body_font_list] = useState<React.JSX.Element[]>([])
    const [html_card_footer_font_list, set_html_card_footer_font_list] = useState<React.JSX.Element[]>([])
    const [html_navigation_menu_font_list, set_html_navigation_menu_font_list] = useState<React.JSX.Element[]>([])
    const [html_button_font_list, set_html_button_font_list] = useState<React.JSX.Element[]>([])

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [display_name, set_display_name] = useState<string | null>(props.end_user.account.name)
    const [avatar_path, set_avatar_path] = useState<string | null | undefined>(props.end_user.account.avatar_url_path)
    const [avatar_title, set_avatar_title] = useState<string | null>(props.end_user.account.avatar_title)
    const [avatar_file_name, set_avatar_file_name] = useState<string>(``)
    const [avatar_collapse_value, set_avatar_collapse_value] = useState<boolean>(false)
    const [password_collapse_value, set_password_collapse_value] = useState<boolean>(false)
    const [new_password, set_new_password] = useState<string>(``)
    const [old_password, set_old_password] = useState<string>(``)
    const [confirm_password, set_confirm_password] = useState<string>(``)
    const [final_password, set_final_password] = useState<string>(``)

    //Modals     
    const [showDeactivateModel, setDeactivateModalShow] = useState<boolean>(false)
    const [disableDeactivateModalBtns, set_disable_to_deactivate_modal_buttons] = useState<boolean>(false)
    const handleDeactivateModalClose = () => setDeactivateModalShow(false)
    const handleDeactivateModalShow = () => setDeactivateModalShow(true)

    const [showPasswordModel, setPasswordModalShow] = useState<boolean>(false)
    const [disablePasswordModalBtns, setDisableToPasswordModalBtns] = useState<boolean>(false)
    const handlePasswordModalClose = () => setPasswordModalShow(false)
    const handlePasswordModalShow = () => setPasswordModalShow(true)

    const [showAvatarModel, set_avatarModalShow] = useState<boolean>(false)
    const [disableAvatarModalBtns, setDisableToAvatarModalBtns] = useState<boolean>(false)
    const hide_avatar_modal = () => set_avatarModalShow(false)
    const handleAvatarModalShow = () => set_avatarModalShow(true)

    const [show_theme_color_picker_modal, set_theme_color_picker_modal_show] = useState<boolean>(false)
    const [disableThemeColorPickerModalBtns, setDisableToThemeColorPickerModalBtns] = useState<boolean>(false)

    const close_theme_color_picker_modal = () => {
        set_theme_color_picker_modal_show(false)
        set_html_button_font_list([])
        set_html_card_header_font_list([])
        set_html_card_body_font_list([])
        set_html_card_footer_font_list([])
        set_html_navigation_menu_font_list([])
        set_card_header_font_color_value(``)
        set_card_body_font_color_value(``)
        set_card_footer_font_color_value(``)
        set_card_header_background_color_value(``)
        set_card_body_background_color_value(``)
        set_card_footer_background_color_value(``)
        set_card_header_font_value(``)
        set_card_body_font_value(``)
        set_card_footer_font_value(``)
        set_button_font_color_value(``)
        set_button_font_value(``)
        set_button_background_color_value(``)
        set_navigation_menu_font_color_value(``)
        set_navigation_menu_font_value(``)
        set_navigation_menu_background_color_value(``)
        set_card_border_color_value(``)
    }

    const application_status_radios = [
        { name: `${lbl.Online}`, value: 2 },
        { name: `${lbl.Hidden}`, value: 1 },
        { name: `${lbl.Away}`, value: 3 },
        { name: `${lbl.DND}`, value: 4 },
        { name: `${lbl.Custom}`, value: 5 },
    ]

    const application_theme_radios = [
        { name: `${lbl.Light}`, value: 0 },
        { name: `${lbl.Night}`, value: 1 },
        { name: `${lbl.Custom}`, value: 2 },
    ]

    const application_navigation_lock_radios = [
        { name: `${lbl.Unlock}`, value: false },
        { name: `${lbl.Lock}`, value: true },
    ]

    const application_navigation_alignment_radios = [
        { name: `${lbl.Left}`, value: `justify-content-start` },
        { name: `${lbl.Center}`, value: `justify-content-center` },
        { name: `${lbl.Right}`, value: `justify-content-end` },
    ]

    const change_end_user_application_theme = (theme: number) => {

        switch (theme) {
            case 0:

                set_application_theme_radio_value(theme)
                Dispatch(Alternate_Application_Theme_Value(0))
                setTimeout(() => {
                    if (props.error.network.id) {
                        create_settings_error_notification(`${lbl.SaveFailed}`)
                        setTimeout(() => {
                            set_alert_color(``)
                            set_alert_text(``)
                        }, 2000)
                    }
                }, 3000)

                break
            case 1:

                set_application_theme_radio_value(theme)
                Dispatch(Alternate_Application_Theme_Value(1))
                setTimeout(() => {
                    if (props.error.network.id) {
                        create_settings_error_notification(`${lbl.SaveFailed}`)
                        setTimeout(() => {
                            set_alert_color(``)
                            set_alert_text(``)
                        }, 2000)
                    }
                }, 3000)

                break
            case 2:
                
                for (let i of list_of_fonts) {
                    if (i != card_header_font_value)
                        html_card_header_font_list.push(<option key={`${i}-header`} value={i} style={{ fontFamily: i }}>{i}</option>)
                    if (i != card_body_font_value)
                        html_card_body_font_list.push(<option key={`${i}-body`} value={i} style={{ fontFamily: i }}>{i}</option>)
                    if (i != card_footer_font_value)
                        html_card_footer_font_list.push(<option key={`${i}-footer`} value={i} style={{ fontFamily: i }}>{i}</option>)
                    if (i != navigation_menu_font_value)
                        html_navigation_menu_font_list.push(<option key={`${i}-navigation`} value={i} style={{ fontFamily: i }}>{i}</option>)
                    if (i != button_font_value)
                        html_button_font_list.push(<option key={`${i}-button`} value={i} style={{ fontFamily: i }}>{i}</option>)
                }

                set_html_button_font_list(html_button_font_list)
                set_html_card_header_font_list(html_card_header_font_list)
                set_html_card_body_font_list(html_card_body_font_list)
                set_html_card_footer_font_list(html_card_footer_font_list)
                set_html_navigation_menu_font_list(html_navigation_menu_font_list)

                set_theme_color_picker_modal_show(true)
                break
        }
    }

    const default_theme_variables = () => {
        set_theme_color_picker_modal_show(false)
        set_card_header_font_color_value(``)
        set_card_body_font_color_value(``)
        set_card_footer_font_color_value(``)
        set_card_header_background_color_value(``)
        set_card_body_background_color_value(``)
        set_card_footer_background_color_value(``)
        set_card_header_font_value(``)
        set_card_body_font_value(``)
        set_card_footer_font_value(``)
        set_button_font_color_value(``)
        set_button_font_value(``)
        set_button_background_color_value(``)
        set_navigation_menu_font_color_value(``)
        set_navigation_menu_font_value(``)
        set_navigation_menu_background_color_value(``)
        set_card_border_color_value(``)
        Change_Application_Theme_Default_Settings()
    }

    const submit_theme_variables_that_were_changed = () => {

        console.log(card_header_font_color_value)
        console.log(card_header_background_color_value)
        console.log(card_header_font_value)
        console.log(card_body_font_color_value)
        console.log(card_body_background_color_value)

        if (card_header_font_color_value != null) {
            Dispatch(Change_Application_Card_Header_Font_Color(card_header_font_color_value))
        }
        if (card_header_background_color_value != null) {
            Dispatch(Change_Application_Card_Header_Background_Color(card_header_background_color_value))
        }
        if (card_header_font_value != null) {
            Dispatch(Change_Application_Card_Header_Font(card_header_font_value))
        }
        if (card_body_font_color_value != null) {
            Dispatch(Change_Application_Card_Body_Font_Color(card_body_font_color_value))
        }
        if (card_body_background_color_value != null) {
            Dispatch(Change_Application_Card_Body_Background_Color(card_body_background_color_value))
        }
        if (card_body_font_value != null) {
            Dispatch(Change_Application_Card_Body_Font(card_body_font_value))
        }
        if (card_footer_font_color_value != null) {
            Dispatch(Change_Application_Card_Footer_Font_Color(card_footer_font_color_value))
        }
        if (card_footer_background_color_value != null) {
            Dispatch(Change_Application_Card_Footer_Background_Color(card_footer_background_color_value))
        }
        if (card_footer_font_value != null) {
            Dispatch(Change_Application_Card_Footer_Font(card_footer_font_value))
        }
        if (card_border_color_value != null) {
            Dispatch(Change_Application_Card_Border_Color(card_border_color_value))
        }
        if (navigation_menu_background_color_value != null) {
            Dispatch(Change_Application_Navigation_Menu_Background_Color(navigation_menu_background_color_value))
        }
        if (navigation_menu_font_color_value != null) {
            Dispatch(Change_Application_Navigation_Menu_Font_Color(navigation_menu_font_color_value))
        }
        if (navigation_menu_font_value != null) {
            Dispatch(Change_Application_Navigation_Menu_Font(navigation_menu_font_value))
        }
        if (button_background_color_value != null) {
            Dispatch(Change_Application_Button_Background_Color(button_background_color_value))
        }
        if (button_font_color_value != null) {
            Dispatch(Change_Application_Button_Font_Color(button_font_color_value))
        }
        if (button_font_value != null) {
            Dispatch(Change_Application_Button_Font(button_font_value))
        }
        set_theme_color_picker_modal_show(false)
    }

    const change_end_user_application_status = (value: number) => {
        set_status_radio_value(value)
        switch (value) {
            case 1:
                Dispatch(Update_End_User_Selected_Status(1))
                break
            case 2:
                Dispatch(Update_End_User_Selected_Status(2))
                break
            case 3:
                Dispatch(Update_End_User_Selected_Status(3))
                break
            case 4:
                Dispatch(Update_End_User_Selected_Status(4))
                break
            case 5:
                Dispatch(Update_End_User_Selected_Status(5))
                Dispatch(Update_End_User_Selected_Custom_Label(custom_label))
                break
            default:
        }
    }

    const toggle_end_user_navigation_lock = (value: boolean) => {

        set_navigation_lock_radio_value(value)
        Dispatch(Lock_Navigation_Bar_Toggler(value))

    }

    const change_end_user_application_alignment = (value: string) => {

        switch (value) {
            case "justify-content-start":
                Dispatch(Alternate_Application_Display_Alignment_Value(0))
                set_alignment_radio_value("justify-content-start")
                break;
            case "justify-content-center":
                Dispatch(Alternate_Application_Display_Alignment_Value(1))
                set_alignment_radio_value("justify-content-center")
                break;
            case "justify-content-end":
                Dispatch(Alternate_Application_Display_Alignment_Value(2))
                set_alignment_radio_value("justify-content-end")
                break;
            default:
        }

    }

    const change_end_user_name = (display_name: string) => {

        set_display_name(display_name)
        Dispatch(Update_Display_Name(display_name))

    }

    const change_end_user_avatar = (avatar_path: string) => {
        set_avatar_path(avatar_path)
    }

    const change_avatar_title = (avatar_title: string) => {
        set_avatar_title(avatar_title)
    }

    const change_password = () => {
        if (new_password === confirm_password) {
            Dispatch(Change_Password({
                id: props.end_user.account.id,
                language: props.application.settings.current_language.split(`-`)[0],
                region: props.application.settings.current_language.split(`-`)[1],
                token: props.end_user.account.token,
                password: old_password,
                new_password: new_password
            }))
        }
    }

    const deactivate_current_user = () => {

        Dispatch(Delete_User({
            target_user: props.end_user.account.id,
            password: final_password
        }))

    }

    useEffect(() => {

        if (Path === `/`) {
            set_card_width(``)
        }

        set_avatar_path(props.end_user.account?.avatar_url_path)
        
        set_avatar_title(props.end_user.account?.avatar_title)
        
    },[])

    return (
        <Container fluid>
            <Row className={`${props.application.settings.alignment}`}>
                <Col className={`${props.application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    <Card className={`moveable ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${props.end_user.custom_design?.card_border_color}`,
                            minWidth: `${card_width}`
                        }}
                    >
                        <Card.Header className={`${props.application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${props.end_user.custom_design?.card_header_background_color}`,
                                color: `${props.end_user.custom_design?.card_header_font_color}`,
                                fontFamily: `${props.end_user.custom_design?.card_header_font}`
                            }}
                        >
                            {props.application.settings.theme === 0 ? (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Settings`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-gear-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                    <br />
                                    {lbl.Settings}
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Settings`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-gear d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                    </svg>
                                    <br />
                                    {lbl.Settings}
                                </>
                            )}
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${props.end_user.custom_design?.card_body_background_color}`,
                                color: `${props.end_user.custom_design?.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design?.card_body_font}`
                            }}
                        >
                            <Table striped bordered hover variant="dark" style={{
                                backgroundColor: `${props.end_user.custom_design?.card_body_background_color}`,
                                color: `${props.end_user.custom_design?.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design?.card_body_font}`
                            }}>
                                <tbody>
                                    <tr>
                                        <td>{lbl._1}</td>
                                        <td>
                                            {lbl.Theme}
                                            {props.error.host.id === `Selected-Theme-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                        </td>
                                        <td>
                                            {application_theme_radios.map((radio, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`Application_Theme_Radio-${idx}`}
                                                    type="radio"
                                                    variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                                    name="Application_Theme_Radio"
                                                    value={radio.value}
                                                    checked={theme_radio_value === radio.value}
                                                    onChange={(e) => change_end_user_application_theme(parseInt(e.currentTarget.value))}
                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{lbl._2}</td>
                                        <td>
                                            {lbl.Status}
                                            {props.error.host.id === `Selected-Status-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                        </td>
                                        <td>
                                            <>
                                                {application_status_radios.map((radio, idx) => (
                                                    <ToggleButton
                                                        key={idx}
                                                        id={`AppStatusRadio-${idx}`}
                                                        type="radio"
                                                        variant={idx % 2 ? 'outline-info' : 'outline-info'}
                                                        name="AppStatusRadio"
                                                        value={radio.value}
                                                        checked={status_radio_value === radio.value}
                                                        onChange={(e) => change_end_user_application_status(parseInt(e.currentTarget.value))}
                                                    >
                                                        {radio.name}
                                                    </ToggleButton>
                                                ))

                                                }
                                                <InputGroup className="mb-3 mt-2 mx-auto" style={{ maxWidth: 200, zIndex: 0 }}>
                                                    <Form.Control id="settings-status-txtbx" aria-describedby="custom status textbox" onChange={(e) => set_custom_label(e.target.value)} />
                                                </InputGroup>
                                            </>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{lbl._3}</td>
                                        <td>
                                            {lbl.LockNavigationMenu}
                                            {props.error.host.id === `Selected-NavLock-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                        </td>
                                        <td>{application_navigation_lock_radios.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`Application_Navigation_Menu_Lock_Radio-${idx}`}
                                                type="radio"
                                                variant={idx % 2 ? 'outline-info' : 'outline-info'}
                                                name="Application_Navigation_Menu_Lock_Radio"
                                                value={radio.value === true ? 'true' : 'false'}
                                                checked={navigation_lock_radio_value === radio.value}
                                                onChange={(e) => toggle_end_user_navigation_lock((e.currentTarget.value === 'true' ? true : false))}
                                            >
                                                {radio.name}
                                            </ToggleButton>
                                        ))}</td>
                                    </tr>
                                    <tr>
                                        <td>{lbl._4}</td>
                                        <td>
                                            {lbl.Alignment}
                                            {props.error.host.id === `Selected-Alignment-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                        </td>
                                        <td>
                                            {application_navigation_alignment_radios.map((radio, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`AppAlignmentRadio-${idx}`}
                                                    type="radio"
                                                    variant={idx % 2 ? 'outline-info' : 'outline-info'}
                                                    name="AppAlignmentRadio"
                                                    value={radio.value}
                                                    checked={align_radio_value === radio.value}
                                                    onChange={(e) => change_end_user_application_alignment(e.currentTarget.value)}
                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{lbl._5}</td>
                                        <td>
                                            {lbl.DisplayName}:<br />{display_name}
                                            {props.error.host.id === `Selected-DisplayName-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                        </td>
                                        <td>
                                            <InputGroup className="mb-3 mx-auto" style={{ maxWidth: 200, zIndex: 0 }}>
                                                <Form.Control id="settings-displayname-inputtxt" aria-describedby="displayname textbox" onChange={(e) => change_end_user_name(e.currentTarget.value)} onKeyUp={(e) => change_end_user_name(e.currentTarget.value)} />
                                            </InputGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{lbl._6}</td>
                                        <td>{lbl.AvatarPreview}:
                                            {avatar_path &&
                                                <>
                                                    <br /><span><Image src={avatar_path} height="112" width="112" roundedCircle /></span>
                                                </>
                                            }
                                            {avatar_title &&
                                                <>
                                                    <br /><span>{lbl.Title}:&nbsp;{avatar_title}</span>
                                                </>
                                            }
                                            {props.error.host.id === `Selected-Avatar-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                        </td>
                                        <td>
                                            <Button onClick={() => handleAvatarModalShow()} aria-controls="display name edit" aria-expanded={avatar_collapse_value} className="mb-3">{lbl.Edit}</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{lbl._7}</td>
                                        <td>
                                            {lbl.PasswordChange}
                                            {props.error.host.id === `Selected-Password-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                        </td>
                                        <td>
                                            <Button onClick={(e) => handlePasswordModalShow()} aria-controls="display name edit" aria-expanded={password_collapse_value} className="mb-3">{lbl.Change}</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{lbl._8}</td>
                                        <td>
                                            {lbl.DisableAccount}
                                            {props.error.host.id === `Delete-User-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                        </td>
                                        <td>
                                            <Button variant="outline-danger" id="button-addon2" onClick={handleDeactivateModalShow}>
                                                {lbl.Deactivate}
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showDeactivateModel} onHide={handleDeactivateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.AreYouSureYouWantToDeactivateYourAccount}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="text-center">
                            <br />
                            <p>{lbl.EnterYourCurrentPassword}</p>
                            <InputGroup className="mb-3 mt-2" style={{ zIndex: 0 }}>
                                <Form.Control
                                    aria-label=""
                                    aria-describedby=""
                                    style={{ maxWidth: 200, margin: `auto` }}
                                    onChange={(e) => { set_final_password(e.target.value) }}
                                    type="password"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <Button variant="primary" onClick={() => deactivate_current_user()} disabled={disableDeactivateModalBtns}>
                                    {lbl.Delete}
                                </Button>
                                <Button variant="success" onClick={handleDeactivateModalClose} disabled={disableDeactivateModalBtns}>
                                    {lbl.Exit}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
            <Modal show={showPasswordModel} onHide={handlePasswordModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.PasswordChangeMenu}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="text-center">
                            <Form>
                                <Row>
                                    <InputGroup className="mb-3 mt-2" style={{ zIndex: 0 }}>
                                        <InputGroup.Text id="inputGroup-sizing-lg">{lbl.OldPassword}</InputGroup.Text>
                                        <Form.Control
                                            aria-label=""
                                            aria-describedby=""
                                            style={{ maxWidth: 300 }}
                                            onChange={(e) => { set_old_password(e.target.value) }}
                                            type="password"
                                            autoComplete="current-password"
                                        />
                                    </InputGroup>
                                    <Col>
                                        <InputGroup className="mb-3 mt-2" style={{ zIndex: 0 }}>
                                            <InputGroup.Text id="inputGroup-sizing-lg">{lbl.NewPassword}</InputGroup.Text>
                                            <Form.Control
                                                aria-label=""
                                                aria-describedby=""
                                                style={{ maxWidth: 300 }}
                                                onChange={(e) => { set_new_password(e.target.value) }}
                                                type="password"
                                                autoComplete="current-password"
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3 mt-2" style={{ zIndex: 0 }}>
                                            <InputGroup.Text id="inputGroup-sizing-lg">{lbl.PasswordCheck}</InputGroup.Text>
                                            <Form.Control
                                                aria-label=""
                                                aria-describedby=""
                                                style={{ maxWidth: 300 }}
                                                onChange={(e) => { set_confirm_password(e.target.value) }}
                                                type="password"
                                                autoComplete="current-password"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col>
                                <Button variant="danger" onClick={() => change_password()} disabled={disablePasswordModalBtns}>
                                    {lbl.Change}
                                </Button>
                                <Button variant="success" onClick={handlePasswordModalClose} disabled={disablePasswordModalBtns}>
                                    {lbl.Exit}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
            <Modal show={showAvatarModel} onHide={hide_avatar_modal}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.AvatarChangeMenu}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Card body style={{ maxWidth: '500px' }}>
                                <Accordion style={{ maxWidth: 600 }}>
                                    <Accordion.Item eventKey="0" onClick={(e) => {
                                        set_avatar_path(``)
                                        set_avatar_title(``)
                                        set_avatar_file_name(``)
                                    }}>
                                        <Accordion.Header>{lbl.PasteURL}</Accordion.Header>
                                        <Accordion.Body>
                                            <InputGroup className="mb-3" style={{ zIndex: 0 }}>
                                                <InputGroup.Text id="inputGroup-sizing-lg">{lbl.URL}</InputGroup.Text>
                                                <Form.Control
                                                    id="avatar-path"
                                                    aria-label="avatar url"
                                                    aria-describedby="avatar url"
                                                    value={avatar_path ? avatar_path : ``}
                                                    onChange={(e) => { change_end_user_avatar(e.currentTarget.value) }}
                                                />
                                            </InputGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" onClick={() => {
                                        set_avatar_path(``)
                                        set_avatar_title(``)
                                        set_avatar_file_name(``)
                                    }}>
                                        <Accordion.Header>{lbl.UploadPhoto}</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group controlId="formFileLg" className="mb-3">
                                                <InputGroup className="mb-3 justify-content-end" style={{ zIndex: 0 }}>
                                                    <input
                                                        type="file"
                                                        id={avatar_file_name}
                                                        onChange={(e) => { change_end_user_avatar(e.currentTarget.value) }}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Row>
                                    <Col>
                                        <InputGroup className="mb-3 mt-2" style={{ zIndex: 0 }}>
                                            <InputGroup.Text id="inputGroup-sizing-lg">{lbl.Title}</InputGroup.Text>
                                            <Form.Control
                                                id="avatar-title"
                                                aria-label="avatar url"
                                                aria-describedby="avatar url"
                                                style={{ maxWidth: 300 }}
                                                onChange={(e) => { change_avatar_title(e.currentTarget.value) }}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <Button variant="success" onClick={hide_avatar_modal} disabled={disableAvatarModalBtns}>
                                    {lbl.Save}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>

            <Offcanvas show={show_theme_color_picker_modal} onHide={close_theme_color_picker_modal} placement="top" className={`offcanvas-menu ${props.application.settings.theme === 1 ? `Night-Canvas` : ''}`}>
                <Offcanvas.Header className="text-center" closeButton>
                    <Offcanvas.Title
                        style={{
                            backgroundColor: `${navigation_menu_background_color_value}`,
                            color: `${navigation_menu_font_color_value ? navigation_menu_font_color_value : "rgba(182, 255, 182, .9)" }`,
                            fontFamily: `${navigation_menu_font_value}`
                        }}
                    >{lbl.ThemeColorPickerChangeMenu}</Offcanvas.Title>

                    <Form.Select aria-label="Navigation Font Selection Menu" id="Settings-Theme-Navigation-Font-Picker"
                        onChange={(event) => { set_navigation_menu_font_value(event.target.value) }}
                        value={navigation_menu_font_value}
                        className="mx-auto w-25"
                        title={lbl.ChooseYourNavigationMenuFontStyle}>
                        {
                            html_navigation_menu_font_list.map((html_select_font_options) => (
                                html_select_font_options
                            ))
                        }
                    </Form.Select>
                    <Form.Control
                        className="mx-auto"
                        type="color"
                        id="Settings-Theme-Footer-Background-Color-Picker"
                        defaultValue={custom_theme_default_value}
                        title={lbl.ChooseYourNavigationMenuBackgroundColor}
                        onChange={(e) => set_navigation_menu_background_color_value(e.target.value)}
                    />
                    <Form.Control
                        className="mx-auto"
                        type="color"
                        id="Settings-Theme-Footer-Font-Color-Picker"
                        defaultValue={custom_theme_default_value}
                        title={lbl.ChooseYourNavigationMenuFontColor}
                        onChange={(e) => set_navigation_menu_font_color_value(e.target.value)}
                    />
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid>

                        <Row>
                            <Col>
                                <Card className="text-center mx-auto" 
                                    style={{
                                        minWidth: `100%`,
                                        borderWidth: 20,
                                        borderColor: `${card_border_color_value}`
                                    }}
                                >
                                    <Card.Header style={{
                                        backgroundColor: `${card_header_background_color_value}`,
                                        color: `${card_header_font_color_value}`,
                                        fontFamily: `${card_header_font_value}`
                                    }}>
                                        <Row>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Header-Background-Color-Picker">{lbl.ChooseYourCardHeaderBackgroundColor}</Form.Label>
                                                <Form.Control
                                                    id="Settings-Theme-Header-Background-Color-Picker"
                                                    className="mx-auto"
                                                    type="color"
                                                    defaultValue={custom_theme_default_value}
                                                    title={lbl.ChooseYourCardHeaderBackgroundColor}
                                                    onChange={(e) => set_card_header_background_color_value(e.target.value)}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Header-Font-Color-Picker">{lbl.ChooseYourCardHeaderFontColor}</Form.Label>
                                                <Form.Control
                                                    id="Settings-Theme-Header-Font-Color-Picker"
                                                    className="mx-auto"
                                                    type="color"
                                                    defaultValue={custom_theme_default_value}
                                                    title={lbl.ChooseYourCardHeaderFontColor}
                                                    onChange={(e) => set_card_header_font_color_value(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Border-Color-Picker">{lbl.ChooseYourBorderColor}</Form.Label>
                                                <Form.Control
                                                    className="mx-auto"
                                                    type="color"
                                                    id="Settings-Theme-Border-Color-Picker"
                                                    defaultValue={custom_theme_default_value}
                                                    title={lbl.ChooseYourBorderColor}
                                                    onChange={(e) => (set_card_border_color_value(e.target.value))}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Card-Header-Font-Picker">{lbl.ChooseYourCardHeaderFontStyle}</Form.Label>
                                                <Form.Select aria-label="Card Header Font Selection Menu" id="Settings-Theme-Card-Header-Font-Picker"
                                                    onChange={(event) => { set_card_header_font_value(event.target.value) }}
                                                    defaultValue={card_header_font_value}
                                                    className="mx-auto w-50"
                                                    title={lbl.ChooseYourCardHeaderFontStyle}>
                                                    {
                                                        html_card_header_font_list.map((html_select_font_options) => (
                                                            html_select_font_options
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body style={{
                                            backgroundColor: `${card_body_background_color_value}`,
                                            color: `${card_body_font_color_value}`,
                                            fontFamily: `${card_body_font_value}`
                                    }}>
                                        <Row>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Body-Background-Color-Picker">{lbl.ChooseYourBodyBackgroundColor}</Form.Label>
                                                <Form.Control
                                                    id="Settings-Theme-Body-Background-Color-Picker"
                                                    className="mx-auto"
                                                    type="color"
                                                    defaultValue={custom_theme_default_value}
                                                    title={lbl.ChooseYourBodyBackgroundColor}
                                                    onChange={(e) => set_card_body_background_color_value(e.target.value)}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Body-Font-Color-Picker">{lbl.ChooseYourBodyFontColor}</Form.Label>
                                                <Form.Control
                                                    className="mx-auto"
                                                    type="color"
                                                    id="Settings-Theme-Body-Font-Color-Picker"
                                                    defaultValue={custom_theme_default_value}
                                                    title={lbl.ChooseYourBodyFontColor}
                                                    onChange={(e) => set_card_body_font_color_value(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Card-Body-Font-Picker">{lbl.ChooseYourCardBodyFontStyle}</Form.Label>
                                                <Form.Select aria-label="Card Body Font Selection Menu" id="Settings-Theme-Card-Body-Font-Picker"
                                                    onChange={(event) => { set_card_body_font_value(event.target.value) }}
                                                    defaultValue={card_body_font_value}
                                                    className="mx-auto w-50"
                                                    title={lbl.ChooseYourCardBodyFontStyle}>
                                                    {
                                                        html_card_body_font_list.map((html_select_font_options) => (
                                                            html_select_font_options
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Col>
                                            <Col>

                                                <Button className="btn" style={{
                                                    backgroundColor: `${button_background_color_value}`,
                                                    color: `${button_font_color_value}`,
                                                    fontFamily: `${button_font_value}`
                                                }}>
                                                    Button-Text
                                                </Button>
                                                <br />
                                                <Form.Label htmlFor="Settings-Theme-Button-Font-Picker">{lbl.ChooseYourButtonFontStyle}</Form.Label>
                                                <Form.Select aria-label="Button Font Selection Menu" id="Settings-Theme-Button-Font-Picker"
                                                    onChange={(event) => { set_button_font_value(event.target.value) }}
                                                    value={button_font_value}
                                                    className="mx-auto w-50"
                                                    title={lbl.ChooseYourButtonFontStyle}>
                                                    {
                                                        html_button_font_list.map((html_select_font_options) => (
                                                            html_select_font_options
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Footer-Background-Color-Picker">{lbl.ChooseYourFooterBackgroundColor}</Form.Label>
                                                <Form.Control
                                                    className="mx-auto"
                                                    type="color"
                                                    id="Settings-Theme-Footer-Background-Color-Picker"
                                                    defaultValue={custom_theme_default_value}
                                                    title={lbl.ChooseYourFooterBackgroundColor}
                                                    onChange={(e) => set_card_footer_background_color_value(e.target.value)}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Footer-Font-Color-Picker">{lbl.ChooseYourFooterFontColor}</Form.Label>
                                                <Form.Control
                                                    className="mx-auto"
                                                    type="color"
                                                    id="Settings-Theme-Footer-Font-Color-Picker"
                                                    defaultValue={custom_theme_default_value}
                                                    title={lbl.ChooseYourFooterFontColor}
                                                    onChange={(e) => set_card_footer_font_color_value(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer style={{
                                        backgroundColor: `${card_footer_background_color_value}`,
                                        color: `${card_footer_font_color_value}`,
                                        fontFamily: `${card_footer_font_value}`
                                    }}>
                                        <Row>
                                            <Col>
                                                <Form.Label htmlFor="Settings-Theme-Card-Footer-Font-Picker">{lbl.ChooseYourFooterFontStyle}</Form.Label>
                                                <Form.Select aria-label="Card Footer Font Selection Menu" id="Settings-Theme-Card-Footer-Font-Picker"
                                                    onChange={(event) => { set_card_footer_font_value(event.target.value) }}
                                                    value={card_footer_font_value}
                                                    className="mx-auto w-50"
                                                    title={lbl.ChooseYourFooterFontStyle}>
                                                    {
                                                        html_card_footer_font_list.map((html_select_font_options) => (
                                                            html_select_font_options
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col>
                                <Button variant="danger" onClick={() => submit_theme_variables_that_were_changed()} disabled={disableThemeColorPickerModalBtns}>
                                    {lbl.Save}
                                </Button>
                                <Button variant="danger" onClick={() => default_theme_variables()} disabled={disableThemeColorPickerModalBtns}>
                                    {lbl.DefaultSetting}
                                </Button>
                                <Button variant="success" onClick={close_theme_color_picker_modal} disabled={disableThemeColorPickerModalBtns}>
                                    {lbl.Exit}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

        </Container>
    )
}

export default Settings