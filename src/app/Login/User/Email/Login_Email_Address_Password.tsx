"use client"

import React, { useState, useEffect} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

import { Row, Col, Card, Form, Button, Alert, Container} from 'react-bootstrap'

import { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Application_Props } from '@Interfaces/Application_Props'
import { End_User_Props } from '@Interfaces/End_User_Props'
import { Error_Props } from '@Interfaces/Error_Props'
import { Third_Party_Api_Props } from '@Interfaces/Third_Party_Api_Props'

import { Login_Email_Password } from '@Redux_Thunk/Actions/Login'

interface Login_Email_Address_Password_Props {
    application: Application_Props
    end_user: End_User_Props
    error: Error_Props
    api: Third_Party_Api_Props
}

const Login_Email_Address_Password = () => {

    const {
        application,
        end_user,
        error,
        api
    }: Login_Email_Address_Password_Props = useSelector((state: Current_Redux_State) => ({
        application: {
            community: {
                users: state.Application_Community_State_Reducer.users,
            },
            language_dictionaries: state.Application_Language_State_Reducer.language_dictionaries,
            profile_viewer: {
                id: state.Application_Profile_Viewer_State_Reducer.id,
                name: state.Application_Profile_Viewer_State_Reducer.name,
                created_on: state.Application_Profile_Viewer_State_Reducer.created_on,
                logout_on: state.Application_Profile_Viewer_State_Reducer.logout_on,
            },
            settings: {
                current_language: state.Application_Language_State_Reducer.current_language,
                theme: state.Application_Settings_State_Reducer.theme,
                alignment: state.Application_Settings_State_Reducer.alignment,
                text_alignment: state.Application_Settings_State_Reducer.text_alignment,
                flag: state.Application_Settings_State_Reducer.flag,
                nav_lock: state.Application_Settings_State_Reducer.nav_lock,
                gmt_time: state.Application_Settings_State_Reducer.gmt_time,
                local_time: state.Application_Settings_State_Reducer.local_time,
                date: state.Application_Settings_State_Reducer.date,
                location: state.Application_Settings_State_Reducer.location,
                grid_type: state.Application_Settings_State_Reducer.grid_type,
                navbar_css_display_value: state.Application_Settings_State_Reducer.navbar_css_display_value,
            },
            websocket: {
                chat_conversations: state.Application_WebSocket_State_Reducer.chat_conversations,
                conversation_sent_requests: state.Application_WebSocket_State_Reducer.conversation_sent_requests,
                conversation_received_approvals: state.Application_WebSocket_State_Reducer.conversation_received_approvals,
                conversation_received_requests: state.Application_WebSocket_State_Reducer.conversation_received_requests,
                conversation_sent_approvals: state.Application_WebSocket_State_Reducer.conversation_sent_approvals,
                conversation_sent_blocks: state.Application_WebSocket_State_Reducer.conversation_sent_blocks,
                conversation_received_blocks: state.Application_WebSocket_State_Reducer.conversation_received_blocks,
            }
        },
        end_user: {
            account: {
                id: state.End_User_Account_State_Reducer.id,
                public_id: state.End_User_Account_State_Reducer.public_id,
                token: state.End_User_Account_State_Reducer.token,
                token_expire: state.End_User_Account_State_Reducer.token_expire,
                account_type: state.End_User_Account_State_Reducer.account_type,
                roles: state.End_User_Account_State_Reducer.roles,
                email_address: state.End_User_Account_State_Reducer.email_address,
                name: state.End_User_Account_State_Reducer.name,
                online_status: state.End_User_Account_State_Reducer.online_status,
                custom_lbl: state.End_User_Account_State_Reducer.custom_lbl,
                avatar_url_path: state.End_User_Account_State_Reducer.avatar_url_path,
                avatar_title: state.End_User_Account_State_Reducer.avatar_title,
                login_on: state.End_User_Account_State_Reducer.login_on,
                logout_on: state.End_User_Account_State_Reducer.logout_on,
                created_on: state.End_User_Account_State_Reducer.created_on,
                phone_country_code: state.End_User_Account_State_Reducer.phone_country_code,
                phone_carrier: state.End_User_Account_State_Reducer.phone_carrier,
                telephone: state.End_User_Account_State_Reducer.telephone,
            },
            notification: {
                alert_color: ``,
                alert_text: ``,
            },
            discord: {
                id: state.End_User_Discord_Account_State_Reducer.id,
            },
            twitch: {
                id: state.End_User_Twitch_Account_State_Reducer.id,
            },
            profile: {
                first_name: state.End_User_Profile_State_Reducer.first_name,
                last_name: state.End_User_Profile_State_Reducer.last_name,
                middle_name: state.End_User_Profile_State_Reducer.middle_name,
                maiden_name: state.End_User_Profile_State_Reducer.maiden_name,
                gender: state.End_User_Profile_State_Reducer.gender,
                birth_month: state.End_User_Profile_State_Reducer.birth_month,
                birth_day: state.End_User_Profile_State_Reducer.birth_day,
                birth_year: state.End_User_Profile_State_Reducer.birth_year,
                ethnicity: state.End_User_Profile_State_Reducer.ethnicity,
                avatar_url_path: state.End_User_Account_State_Reducer.avatar_url_path,
                avatar_title: state.End_User_Account_State_Reducer.avatar_title,
            },
            custom_design: state.End_User_Custom_CSSDesign_State_Reducer.custom_design_obj,
        },
        error: {
            host: {
                id: state.Host_Error_State_Reducer.id,
            },
            network: {
                id: state.Network_Error_State_Reducer.id,
            },
        },
        api: {
            discord: {
                online_status: true,
            },
            twitch: {
                online_status: true,
            },
        },
    }))

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = application.settings.current_language.split(`-`)
    const lbl = application.language_dictionaries[language][region]

    const [submit_button_font_color, set_submit_button_font_color] = useState<string>(`primary`)
    const [lock_form_submit_button, set_lock_form_submit_button] = useState<boolean>(false)
    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)
    const [submit_button_text, set_submit_button_text] = useState<string>(``)

    const [user_email_address, set_user_email_address] = useState<string>(``)
    const [user_password, set_user_password] = useState<string>(``)

    const [card_width, set_card_width] = useState<string>(`100%`)

    const create_error_alert = (error: string) => {
        set_submit_button_font_color(`danger`)
        set_alert_text(`${error}`)
        set_alert_color(`danger`)
        set_submit_button_text(`Error`)
        set_lock_form_submit_button(true)
        setTimeout(() => {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.Login}`)
            set_alert_text(``)
        }, 8000)
    }

    const anEmail = () => {
        let localEmail = user_email_address.substring(0, user_email_address.indexOf(`@`))
        let domainEmail = user_email_address.substring(user_email_address.indexOf(`@`), user_email_address.length)
        switch (true) {
            case !user_email_address || user_email_address.length === 0:
                create_error_alert(`${lbl.MissingEmailAddress}`)
                return false
            case user_email_address.length <= 5:
                create_error_alert(`${lbl.MissingEmailLengthGreaterThanFive}`)
                return false
            case !user_email_address.match(/@/):
                create_error_alert(`${lbl.MissingEmailAtSymbol}`)
                return false
            case /\./.test(domainEmail):
                create_error_alert(`${lbl.MissingEmailTLDDot}`)
                return false
            case localEmail.length < 2:
                create_error_alert(`${lbl.MissingMinEmailLocalAddress}`)
                return false
            case domainEmail.length < 7:
                create_error_alert(`${lbl.MissingMin7CharsAfterAtSymbol}`)
                return false
            case !user_email_address.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/):
                create_error_alert(`${lbl.MissingEmailFormat}`)
                return false
            default:
                return true
        }
    }

    const aPassword = () => {
        switch (true) {
            case !user_password || user_password.length === 0:
                create_error_alert(`${lbl.MissingPassword}`)
                return false
            case !/(?=.*\d)/.test(user_password):
                create_error_alert(`${lbl.PasswordRequires1Number}`)
                return false
            case !/(?=.*[a-z])/.test(user_password):
                create_error_alert(`${lbl.PasswordRequires1LowCaseLetter}`)
                return false
            case !/(?=.*[A-Z])/.test(user_password):
                create_error_alert(`${lbl.PasswordRequires1UpCaseLetter}`)
                return false
            case !/(?=.*\W)/.test(user_password):
                create_error_alert(`${lbl.PasswordRequires1SpecChar}`)
                return false
            case !(user_password.length > 7):
                create_error_alert(`${lbl.PasswordRequires8MinCharLength}`)
                return false
            default:
                return true
        }
    }

    const validating_login_form = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set_lock_form_submit_button(true)
        set_submit_button_font_color(`info`)
        set_submit_button_text(`${lbl.ValidatingPleaseWait}`)
        set_alert_text(``)

        if (anEmail() && aPassword()) {
            set_lock_form_submit_button(true)
            set_submit_button_font_color(`info`)

            Dispatch(Login_Email_Password({
                email_address: user_email_address,
                password: user_password
            }))

            setTimeout(() => {
                set_lock_form_submit_button(false)
                set_alert_color(``)
                set_alert_text(``)
                Navigate.push(`/`)
            }, 1000)
        }
    }

    (() => {
        if (error.network.id === "Email-Login-Failed") {
            setTimeout(() => {
                if(error.network.id)
                    create_error_alert(error.network.id)
            }, 1000)
        }
    })()

    useEffect(() => {
        if (Path === `/`) {
            set_card_width(``)
        }
    }, [])

    return (
        <Container fluid>
            <Row className={`${application.settings.alignment}`}>
                <Col className={`${application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    <Card className={`moveable ${application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${end_user.custom_design.card_border_color}`,
                            minWidth: `${card_width}`
                        }}
                    >
                        <Card.Header className={`${application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${end_user.custom_design.card_header_background_color}`,
                                color: `${end_user.custom_design.card_header_font_color}`,
                                fontFamily: `${end_user.custom_design.card_header_font}`
                            }}
                        >
                            <h1> {lbl.LoginWithAnEmailAccount} </h1>
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${end_user.custom_design.card_body_background_color}`,
                                color: `${end_user.custom_design.card_body_font_color}`,
                                fontFamily: `${end_user.custom_design.card_body_font}`
                            }}
                        >
                            <Container>
                                <Row className="justify-content-center text-center">
                                    <Col lg={10} md={8} sm={9} xs={10}>
                                        <Form noValidate onSubmit={validating_login_form}>
                                            <Form.Group className="mb-3" controlId="email_login">
                                                <Form.Label>{lbl.EmailAddress}</Form.Label>
                                                <Form.Control type="email" name="email_login"
                                                    value={user_email_address}
                                                    onChange={(e) => { set_user_email_address(e.currentTarget.value) }}
                                                    placeholder=""
                                                    className="text-center"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="email_login_password">
                                                <Form.Label>{lbl.Password}</Form.Label>
                                                <Form.Control type="password" name="email_login_password"
                                                    value={user_password}
                                                    onChange={(e) => { set_user_password(e.currentTarget.value) }}
                                                    placeholder=""
                                                    autoComplete="email_login_password"
                                                    className="text-center"
                                                />
                                            </Form.Group>
                                            <Button variant={submit_button_font_color} type="submit"
                                                className="mx-auto mb-3"
                                                disabled={lock_form_submit_button}
                                                style={{
                                                    backgroundColor: `${end_user.custom_design.button_background_color}`,
                                                    color: `${end_user.custom_design.button_font_color}`,
                                                    font: `${end_user.custom_design.button_font}`
                                                }}
                                            >
                                                {submit_button_text === `` ? lbl.Login : submit_button_text}
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        {alert_text ?
                            <Card.Footer
                                style={{
                                    backgroundColor: `${end_user.custom_design.card_footer_background_color}`,
                                    color: `${end_user.custom_design.card_footer_font_color}`,
                                    font: `${end_user.custom_design.card_footer_font}`
                                }}
                            >
                                <Container>
                                    <Row>
                                        <Col className="text-center">
                                            <Alert variant={alert_color}>{alert_text}</Alert>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Footer>
                            : null}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login_Email_Address_Password