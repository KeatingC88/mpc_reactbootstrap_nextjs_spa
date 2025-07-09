'use client'

import { useState, useEffect, SetStateAction } from 'react'

import {
    Navbar, Container, Nav,
    Modal, Button, Row,
    Col, Form, Offcanvas,
    Card, Alert
} from 'react-bootstrap'

import { useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'
import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'


import {
    Alternate_Application_Theme_Value,
    Change_Application_Language,
    Change_Application_Flag,
    Alternate_Application_Grid_Value,
    Alternate_Application_Display_Alignment_Value,
    Lock_Navigation_Bar_Toggler
} from '@Redux_Thunk/Actions/Selected'

import {
    Logout_User_Database,
} from '@Redux_Thunk/Actions/Logout'

import {
    Load_New_Token
} from '@Redux_Thunk/Actions/Load'

import {
    Get_Nation_Flag_Value, Delay_Execution
} from '@Redux_Thunk/Actions/Misc'

let end_user_token_prompt_response = false

const Navigation_Menu = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()

    const html_cards = typeof document !== 'undefined' ? document.getElementsByClassName('moveable') as HTMLCollectionOf<HTMLElement> : null

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)
    const [nav_lock_disable_button_value, set_nav_lock_disable_button_value] = useState<boolean>(false)
    const [overlay_display_value, set_offcanvas_display_value] = useState<boolean>(false)
    const [logout_modal_show_value, set_logout_modal_show_value] = useState<boolean>(false)
    
    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [html_selected_language, set_html_selected_language] = useState(props.application.settings.current_language)
    const [language_modal_show_value, set_language_modal_show_value] = useState<boolean>(false)
    const [disabled_language_modal_button_value, set_disabled_language_modal_button_value] = useState<boolean>(false)

    const change_selected_language = (value: SetStateAction<string>) => {
        set_disabled_language_modal_button_value(false)
        set_html_selected_language(value)
    }

    const create_navbar_error_notification = (message: String) => {
        set_alert_color(`danger`)  
        set_alert_text(`${message}`)
        setTimeout(() => {
            set_alert_text(``)
            set_alert_color(``)
        }, 4000)
    }

    const create_navbar_success_notification = (message: String) => {
        set_alert_color(`success`)
        set_alert_text(`${message}`)
        Delay_Execution(new Date().getTime() + 2000, (async () => {
            set_alert_text(``)
            set_alert_color(``)
        }))
    }

    const hide_language_modal_from_end_user = () => {
        set_language_modal_show_value(false)
        set_html_selected_language(props.application.settings.current_language)
    }

    const offcanvas_button = (value: String) => {
        if (value === `language`) {
            show_language_modal_to_end_user()
            set_language_modal_show_value(true)
        } else {
            Navigate.push(`/${value}`)
        }
        set_offcanvas_display_value(false)
    }

    const lock_navigation_menu_to_top_of_screen = async () => {

        set_nav_lock_disable_button_value(true)

        switch (true) {
            case props.application.settings.nav_lock === false:
                
                await Dispatch(Lock_Navigation_Bar_Toggler(true))

                if (html_cards) {
                    for (let i = 0; i < html_cards.length; i++) {

                        html_cards[i].classList.add(`lock_nav_position`)

                    }
                }
                
                create_navbar_success_notification(`${lbl.Change} ${lbl.Navigation} ${lbl.Menu} ${lbl.Lock} `)
                break
            case props.application.settings.nav_lock === true:

                await Dispatch(Lock_Navigation_Bar_Toggler(false))

                if (html_cards) {
                    for (let i = 0; i < html_cards.length; i++) {

                        for (let i = 0; i < html_cards.length; i++) {

                            html_cards[i].classList.remove(`lock_nav_position`)

                        }

                    }
                }

                create_navbar_success_notification(`${lbl.Change} ${lbl.Navigation} ${lbl.Menu} ${lbl.Unlock}`)
                break
        }

        setTimeout(() => {
            set_nav_lock_disable_button_value(false)
        }, 500)

    }

    const process_language_change = async () => {
        hide_language_modal_from_end_user()
        set_disabled_language_modal_button_value(false)
        await save_application_language_setting()
        await save_application_flag_setting()
    }

    const toggle_night_mode = async () => {
        switch (typeof document !== 'undefined' ? document.getElementsByTagName('body')[0].getAttribute("data-theme") : false) {
            case "Light-Theme":
                create_navbar_success_notification(`${lbl.SwitchedToNightMode}`)
                Dispatch(Alternate_Application_Theme_Value(1))
                break
            case "Night-Theme":
                create_navbar_success_notification(`${lbl.SwitchedToLightMode}`)
                Dispatch(Alternate_Application_Theme_Value(0))
                break
            case "Custom-Light-Theme":
                create_navbar_success_notification(`${lbl.SwitchedToLightMode}`)
                break
            case "Custom-Night-Theme":
                create_navbar_success_notification(`${lbl.SwitchedToNightMode}`)
                break
        }
    }

    const toggle_application_grid_column_sizes = () => {
        if (html_cards)
            for (let i = 0; i < html_cards.length; i++) {
                html_cards[i].style.transform = ''
            }

        switch (props.application.settings.grid_type) {
            case 1:
                Dispatch(Alternate_Application_Grid_Value(2))
                create_navbar_success_notification(`${lbl.Change} ${lbl.Grid} ${lbl.Layout} to 2`)
                break
            case 2:
                Dispatch(Alternate_Application_Grid_Value(3))
                create_navbar_success_notification(`${lbl.Change} ${lbl.Grid} ${lbl.Layout} to 3`)
                break
            case 3:
                Dispatch(Alternate_Application_Grid_Value(4))
                create_navbar_success_notification(`${lbl.Change} ${lbl.Grid} ${lbl.Layout} to 4`)
                break
            case 4:
                Dispatch(Alternate_Application_Grid_Value(1))
                create_navbar_success_notification(`${lbl.Change} ${lbl.Grid} ${lbl.Layout} to 1`)
                break
        }
    }

    const toggle_application_alignment = async () => {
        if (html_cards) {
            await Dispatch(Lock_Navigation_Bar_Toggler(false))

            for (let i = 0; i < html_cards.length; i++) {
                html_cards[i].style.transform = ''
            }
        }

        switch (props.application.settings.alignment) {
            case "justify-content-end":
                Dispatch(Alternate_Application_Display_Alignment_Value(0))
                create_navbar_success_notification(`${lbl.Change} ${lbl.Alignment} ${lbl.Left}`)
                break
            case "justify-content-start":
                Dispatch(Alternate_Application_Display_Alignment_Value(1))
                create_navbar_success_notification(`${lbl.Change} ${lbl.Alignment} ${lbl.Center}`)
                break
            case "justify-content-center":
                Dispatch(Alternate_Application_Display_Alignment_Value(2))
                create_navbar_success_notification(`${lbl.Change} ${lbl.Alignment} ${lbl.Right}`)
                break
            default:
        }
    }

    const toggle_bootstrap_background_theme = () => {
        
        switch (props.application.settings.theme) {
            case 1:
                return `dark`
            case 0:
                return `light`
        }
    }

    const save_application_language_setting = async () => {
        try {
            const result = Dispatch(Change_Application_Language(html_selected_language))
            create_navbar_success_notification(`${lbl.SuccessfullyChangedLanguageTo} ${result}`)
        } catch (error) {
            create_navbar_error_notification(`${error}`);
        }
    }

    const save_application_flag_setting = async () => {
        Dispatch(Change_Application_Flag(html_selected_language))
    }

    const show_language_modal_to_end_user = () => {

        set_html_selected_language(props.application.settings.current_language)
        set_language_modal_show_value(true)
        set_disabled_language_modal_button_value(true)
        let html = ``

        html +=
            `<option value="${props.application.settings.current_language.split(`-`)[0]}-${props.application.settings.current_language.split(`-`)[1]}">
                ${props.application.language_dictionaries[props.application.settings.current_language.split(`-`)[0]][props.application.settings.current_language.split(`-`)[1]][props.application.settings.current_language.split(`-`)[0].charAt(0).toUpperCase() + props.application.settings.current_language.split(`-`)[0].charAt(1) + props.application.settings.current_language.split(`-`)[1]]}
            </option>`
        for (let i in Object.keys(props.application.language_dictionaries)) {
            for (let j in Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])) {
                if (`${Object.keys(props.application.language_dictionaries)[i]}-${Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])[j]}` !== props.application.settings.current_language)
                    html +=
                        `<option value="${Object.keys(props.application.language_dictionaries)[i]}-${Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])[j]}">
                            ${props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]][Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])[j]][`${Object.keys(props.application.language_dictionaries)[i].charAt(0).toUpperCase() + Object.keys(props.application.language_dictionaries)[i].slice(1).toLowerCase()}${Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])[j]}`]}
                        </option>`
            }
        }

        setTimeout(() => {
            let language_selection_form = (typeof document !== 'undefined' ? document.getElementById(`language-selection-form`) : null) as HTMLInputElement | null
            if (language_selection_form) {
                language_selection_form.innerHTML = html
            }
        }, 100)

    }

    const show_logout_button_modal = () => {

        set_offcanvas_display_value(false)
        set_logout_modal_show_value(true)

    }
    
    const logout = () => {
        setTimeout(() => {
            Navigate.push(`/`)
        }, 3000)
        set_logout_modal_show_value(false)
        Dispatch(Logout_User_Database())
    }

    const [are_you_there_modal_value, set_are_you_there_modal_value] = useState<boolean>(false)
    const [timeout_objects, set_timeout_objects] = useState<ReturnType<typeof setTimeout>[]>([])
    const [interval_objects, set_interval_objects] = useState<ReturnType<typeof setInterval>[]>([])
    const [display_auto_logout_timer, set_display_auto_logout_timer] = useState<string>("")

    const set_token_expiration_event_listeners = (): void => {
        const update_timeout_array_while_user_interacts_with_gui = (): void => {
            if (timeout_objects.length === 0) {
                const timeoutId = setTimeout(() => {
                    if (!end_user_token_prompt_response) {
                        end_user_token_prompt_response = true
                        set_are_you_there_modal_value(true)

                        let count_down_minute = 300 // 5 minutes

                        const intervalId = setInterval(() => {
                            const minutes = Math.floor(count_down_minute / 60)
                            const seconds = count_down_minute % 60
                            set_display_auto_logout_timer(
                                `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
                            )

                            count_down_minute--

                            if (count_down_minute < 0) {
                                timeout_objects.forEach(clearTimeout)
                                set_timeout_objects([])

                                interval_objects.forEach(clearInterval)
                                set_interval_objects([])

                                Dispatch(Logout_User_Database())
                                set_are_you_there_modal_value(false)
                                if(typeof window !== "undefined")
                                    window.location.reload()
                            }
                        }, 1000)

                        interval_objects.push(intervalId)
                    }
                }, 600000) // 10 minutes

                timeout_objects.push(timeoutId)
            }
        }

        if (typeof document !== "undefined") {
            const html = document.getElementsByTagName("html")[0]

            html.addEventListener("mousemove", update_timeout_array_while_user_interacts_with_gui, false)
            html.addEventListener("touchstart", update_timeout_array_while_user_interacts_with_gui, false)
            html.addEventListener("touchmove", update_timeout_array_while_user_interacts_with_gui, false)
        }
    }

    (() => {
        if (props.end_user.account.token) {
            end_user_token_prompt_response = false
            set_token_expiration_event_listeners()
        } else {
            end_user_token_prompt_response = true
        }
    })()

    const load_new_web_token = async () => {
        set_are_you_there_modal_value(false)
        timeout_objects.forEach((id) => {
            clearTimeout(id)
        })
        set_timeout_objects([])

        interval_objects.forEach((id) => {
            clearInterval(id)
        })
        set_interval_objects([])
        Dispatch(Load_New_Token())
        set_token_expiration_event_listeners()
    }

    const cancel_load_new_web_token = async () => {
        set_are_you_there_modal_value(false)
        Dispatch(Logout_User_Database())
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if ((window.location.href.indexOf('login') > -1) && (window.location.href.indexOf('message') > -1)) {
                set_alert_text(`${lbl.SignIn} ${lbl.With} ${lbl.NewPassword}`)
                set_alert_color(`success`)
                setTimeout(() => {
                    set_alert_text(``)
                    set_alert_color(``)
                }, 10000)
            }
        }
    }, []) 

    return (
        <>
            <Navbar className="flex-column" bg={toggle_bootstrap_background_theme()} style={{ zIndex: `8`, display: props.application.settings.navbar_css_display_value }} expand="lg" fixed={props.application.settings.nav_lock === true ? `top` : undefined }>
                    <Row>
                        <Col>
                            <p>{lbl.Language}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img
                                onClick={show_language_modal_to_end_user}
                                src={`${props.application.settings.flag}`}
                                alt="Language Select"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2 className={`Nav-Title`} onClick={() => { Navigate.push(`/`) }}>{lbl.Home}</h2>
                        </Col>
                    </Row>
                <Row>
                    <Col className="text-center">
                        <Navbar.Toggle aria-controls="collapse-area" disabled={nav_lock_disable_button_value || props.application.settings.nav_lock} />
                        <Navbar.Collapse>
                            <Nav className="me-auto">
                                <Container>
                                    <Row>
                                        <Col className="text-center">
                                            <Nav.Link onClick={() => set_offcanvas_display_value(true)}>
                                                {props.application.settings.theme === 0 ? (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-map-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z" />
                                                        </svg>
                                                        <br />
                                                        {lbl.Map}
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-map d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z" />
                                                        </svg>
                                                        <br />
                                                        {lbl.Map}
                                                    </>
                                                )}
                                            </Nav.Link>
                                        </Col>
                                        <Col className="text-center">
                                            <Nav.Link onClick={() => toggle_night_mode()}>
                                                {props.application.settings.theme === 0 ? (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-sun-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                        </svg>
                                                        <br />
                                                        {lbl.Night}
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-sun d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                                            </svg>
                                                            <br />
                                                        {lbl.Light}
                                                    </>
                                                )}
                                            </Nav.Link>
                                        </Col>
                                        <Col className="text-center">
                                            <Nav.Link onClick={() => lock_navigation_menu_to_top_of_screen()} disabled={nav_lock_disable_button_value}>
                                                {(!props.application.settings.nav_lock) &&
                                                    <>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-lock-fill d-inline-block align-top mt-2 d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Lock}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-lock d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Lock}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                                {(props.application.settings.nav_lock) &&
                                                    <>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-unlock-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Unlock}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-unlock d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Unlock}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                            </Nav.Link>
                                        </Col>
                                        <Col className="text-center">
                                            <Nav.Link onClick={() => toggle_application_alignment()}>
                                                {(props.application.settings.alignment === "justify-content-start" || props.application.settings.alignment === "justify-content-center") &&
                                                    <>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-circle-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Align}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-circle d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Align}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                                {(props.application.settings.alignment === "justify-content-end") &&
                                                    <>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Align}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Align}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                            </Nav.Link>
                                        </Col>
                                        <Col className="text-center">
                                            <Nav.Link onClick={() => toggle_application_grid_column_sizes()}>
                                                {(props.application.settings.grid_type === 1) &&
                                                    <>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-1-circle-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Column}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-1-circle d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Column}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                                {(props.application.settings.grid_type === 2) &&
                                                    <>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-2-circle-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Column}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-2-circle d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Column}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                                {(props.application.settings.grid_type === 3) &&
                                                    <>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-3-circle-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Column}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-3-circle d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318" />
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Column}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                                {(props.application.settings.grid_type === 4) &&
                                                    <>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-4-circle-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M7.519 5.057c-.886 1.418-1.772 2.838-2.542 4.265v1.12H8.85V12h1.26v-1.559h1.007V9.334H10.11V4.002H8.176zM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Column}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-4-circle d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M7.519 5.057q.33-.527.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265ZM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218" />
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Column}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                            </Nav.Link>
                                        </Col>
                                        {props.end_user.account.token &&
                                            <>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/profile/mirror`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Profile}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Profile}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/chat`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Chat}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Chat}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/community`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-people-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Community}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-people d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Community}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/integration`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-grid-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Integration}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-grid d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Integration}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/settings`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Settings}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Settings}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/help`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-info-circle-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Help}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-info-circle d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Help}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/faq`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-question-circle-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.FAQ}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-question-circle d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                                                                </svg>
                                                                <br />
                                                                {lbl.FAQ}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/identity`) }}>
                                                        {!props.end_user.account.avatar_url_path &&
                                                            <>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="32"
                                                                    height="32"
                                                                    fill="currentColor"
                                                                    className={`bi-person-circle d-inline-block align-top mt-2`}
                                                                    viewBox="0 0 16 16">
                                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                                    <path fill="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                                </svg>
                                                                <br />
                                                                {props.end_user.account.name &&
                                                                    <>
                                                                        {props.end_user.account.name.split(`#`)[0]}
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                        {props.end_user.account.avatar_url_path &&
                                                            <>
                                                                <img
                                                                    src={props.end_user.account.avatar_url_path}
                                                                    width="32"
                                                                    height="32"
                                                                    className={`d-inline-block align-top mt-2`}
                                                                    alt={props.end_user.account.avatar_title ? props.end_user.account.avatar_title : ``}
                                                                />
                                                                {props.end_user.account.name ? props.end_user.account.name.split(`#`)[0] : `error-name-display`}
                                                            </>
                                                        }
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => show_logout_button_modal()}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-power d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M7.5 1v7h1V1h-1z" />
                                                                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Logout}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-power Night-Font d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M7.5 1v7h1V1h-1z" />
                                                                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Logout}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                            </>
                                        }
                                        {!props.end_user.account.token &&
                                            <>
                                                <Col className="text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/login`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-door-open-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Login}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-door-open d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                                                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Login}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                                <Col className="d-flex justify-content-center align-items-center text-center">
                                                    <Nav.Link onClick={() => { Navigate.push(`/register`) }}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pen-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                                            </svg>
                                                            <br />
                                                                {lbl.Register}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pen d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Register}
                                                            </>
                                                        )}
                                                    </Nav.Link>
                                                </Col>
                                            </>
                                        }
                                    </Row>
                                </Container>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {alert_text && (props.application.settings.nav_lock) &&
                            <Row className="mx-auto">
                                <Col>
                                    <Alert className="text-center" variant={alert_color}>
                                        {alert_text}
                                    </Alert>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>

            </Navbar>

            {alert_text ?
                <Row>
                    <Col>
                        <Alert className="text-center mx-auto" variant={alert_color}>
                            {alert_text}
                        </Alert>
                    </Col>
                </Row> : null
            }

            <Modal show={language_modal_show_value} onHide={hide_language_modal_from_end_user}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {lbl.ChangeAppLanguage}
                        {props.application.settings.current_language != html_selected_language &&
                            <>
                                <br /> {lbl.From} <img src={`${props.application.settings.flag}`} width="32px" height="32px" />
                                <br /> {lbl.To} <img src={`${Get_Nation_Flag_Value(html_selected_language)}`} width="32px" height="32px" />
                            </>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Select aria-label="Language Selection Menu"
                                    onChange={(event) => { change_selected_language(event.target.value) }}
                                    value={html_selected_language}
                                    id="language-selection-form">
                                </Form.Select>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col>
                                <center>
                                    <Button variant="primary" onClick={() => {process_language_change()}} disabled={disabled_language_modal_button_value}>
                                        {lbl.Save}
                                    </Button>
                                </center>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>

            <Modal show={logout_modal_show_value} onHide={() => set_logout_modal_show_value(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.AreYouTryingToLogout}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={logout}>
                        {lbl.Logout}
                    </Button>
                    <Button variant="secondary" onClick={() => set_logout_modal_show_value(false)}>
                        {lbl.Cancel}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={are_you_there_modal_value} onHide={cancel_load_new_web_token}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {lbl.AreYouStillThere}
                        <br />
                        {lbl.LoggingOutIn}&nbsp;{display_auto_logout_timer}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={load_new_web_token}>
                        {lbl.Yes}
                    </Button>
                    <Button variant="secondary" onClick={cancel_load_new_web_token}>
                        {lbl.Logout}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Offcanvas show={overlay_display_value} onHide={() => set_offcanvas_display_value(false)} placement="top" className={`offcanvas-menu ${props.application.settings.theme === 1 ? `Night-Canvas` : ''}` }>
                <Offcanvas.Header className="text-center" closeButton>
                    <Offcanvas.Title style={{ fontSize: 54, color: "rgba(182, 255, 182, .9)"}}>{lbl.SiteMap}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body id="selected-canvas-body">
                    <Container fluid>
                        {!props.end_user.account.token &&
                            <>
                                <Row className="justify-content-center pt-2 text-center" onClick={() => { offcanvas_button(`language`) }}>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Language}</Card.Header>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.CreateEmailAccount}</Card.Header>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Login}</Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        }
                        {props.end_user.account.token &&
                            <>
                                <Row className="justify-content-center text-center" onClick={() => { offcanvas_button(`community`) }}>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Community}</Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center text-center" onClick={() => { offcanvas_button(`profile`) }}>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Profile}</Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center text-center" onClick={() => { offcanvas_button(`chat`) }}>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Chat}</Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center text-center" onClick={() => { offcanvas_button(`integration`) }}>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Integration}</Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center text-center" onClick={() => { offcanvas_button(`settings`) }}>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Settings}</Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center text-center" onClick={() => { offcanvas_button(`discord`) }}>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Discord}</Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center text-center" onClick={() => { show_logout_button_modal() }}>
                                    <Col>
                                        <Card>
                                            <Card.Header>{lbl.Logout}</Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        }
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Navigation_Menu