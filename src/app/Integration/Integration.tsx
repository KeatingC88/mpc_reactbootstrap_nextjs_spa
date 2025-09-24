"use client"
import React, { useState, useEffect} from 'react'

import { Row, Col, Card, Table, ToggleButton, Container } from 'react-bootstrap'
import { useRouter, usePathname} from 'next/navigation'

import { useSelector } from 'react-redux'
import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import {
    APPLICATION_TWITCH_CLIENT_ID,
    APPLICATION_TWITCH_LOGIN_REDIRECT_URI
} from '@Constants'

const Integration = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const [lock_form_submit_button, set_lock_form_submit_button] = useState<boolean>(false)
    const [submit_button_text, set_submit_button_text] = useState("Register")
    const [submit_button_color, set_submit_button_color] = useState<string>(`primary`)

    const create_success_alert = (value: string | null) => {
        set_lock_form_submit_button(true)
        set_submit_button_color(`success`)
        set_alert_color(`success`)
        set_submit_button_text(`${lbl.Successful}`)
        set_alert_text(`${value}`)
        setTimeout(() => {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.RegisterEmail}`)
            set_alert_text(``)
            set_submit_button_color(`primary`)
        }, 8000)
    }

    const create_error_alert = (error: string | null) => {
        set_lock_form_submit_button(true)
        set_submit_button_color(`danger`)
        set_alert_color(`danger`)
        set_submit_button_text(`${lbl.Error}`)
        set_alert_text(`${error}`)
        setTimeout(() => {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.RegisterEmail}`)
            set_alert_text(``)
            set_submit_button_color(`primary`)
        }, 8000)
    }

    const send_end_user_to_twitch_authenticator = () => {
        set_submit_button_color(`info`)
        set_submit_button_text(`${lbl.ValidatingPleaseWait}`)

        if (!APPLICATION_TWITCH_CLIENT_ID ||
            !APPLICATION_TWITCH_LOGIN_REDIRECT_URI
        ) {
            create_error_alert(`Missing Twitch Client`)
        } else {
            create_success_alert(`${lbl.Success}`)
            Navigate.push(`https://id.twitch.tv/oauth2/authorize?client_id=${APPLICATION_TWITCH_CLIENT_ID}&redirect_uri=${APPLICATION_TWITCH_LOGIN_REDIRECT_URI}&response_type=code&scope=user:read:email`)
        }
    }

    useEffect(() => {
        if (Path === `/`
        ) {
            set_card_width(``)
        }
    }, [])

    return (
        <Container fluid>
            <Row className={`${props.application.settings.alignment}`}>
                <Col className={`${props.application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    <Card className={`moveable ${props.application.settings.alignment === 'justify-content-start' ? '' : ''} ${props.application.settings.alignment === 'justify-content-end' ? '' : ''} ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${props.end_user.custom_design?.card_border_color}`,
                            minWidth: `${card_width}`
                        }}
                    >

                        {!props.application.mobile_mode &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrows-move" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8" />
                            </svg>
                        }

                        <Card.Header className={`${props.application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${props.end_user.custom_design?.card_header_background_color}`,
                                color: `${props.end_user.custom_design?.card_header_font_color}`,
                                fontFamily: `${props.end_user.custom_design?.card_header_font}`
                            }}
                        >
                            {props.application.settings.theme === 0 ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16">
                                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z" />
                                    </svg>
                                    <br />
                                    {lbl.Integration}
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                                    </svg>
                                    <br />
                                    {lbl.Integration}
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
                            <Table striped bordered hover variant={`dark`}>
                                <tbody>
                                    <tr>
                                        <td>
                                            {!props.end_user.twitch.id &&
                                                <ToggleButton
                                                    id={`Twitch`}
                                                    type="radio"
                                                    variant={'outline-info'}
                                                    name="Application_Twitch_Integration_Button"
                                                    value="TWITCH"
                                                    onClick={() => send_end_user_to_twitch_authenticator()}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        className="bi bi-twitch"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
                                                        <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
                                                    </svg>
                                                    <br />
                                                    {lbl.Twitch}
                                                </ToggleButton>
                                            }
                                            {!props.end_user.discord.id &&
                                                <ToggleButton
                                                    id={`Discord`}
                                                    type="radio"
                                                    variant={'outline-info'}
                                                    name="Application_Discord_Integration_Button"
                                                    value="DISCORD"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        className="bi bi-discord"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                                                    </svg>
                                                    <br />
                                                    {lbl.Discord}
                                                </ToggleButton>
                                            }
                                            {!props.end_user.discord.id &&
                                                <ToggleButton
                                                    id={`YouTube`}
                                                    type="radio"
                                                    variant={'outline-info'}
                                                    name="Application_YouTube_Integration_Button"
                                                    value="YOUTUBE"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        className="bi bi-youtube"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                                    </svg>
                                                    <br />
                                                    {lbl.YouTube}
                                                </ToggleButton>
                                            }
                                            {props.end_user.account.login_type?.toUpperCase() !== "EMAIL" &&

                                                <ToggleButton
                                                    id={`Email`}
                                                    type="radio"
                                                    variant={'outline-info'}
                                                    name="Application_Email_Integration_Button"
                                                    value="EMAIL"
                                                    onClick={() => { Navigate.push(`/Register/Email`)}}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        className="bi bi-envelope-at-fill"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                                                    </svg>
                                                    <br />
                                                    {lbl.Email}
                                                </ToggleButton>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    )
}

export default Integration