"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Row, Col, Card, Button, Alert, Container, Spinner } from 'react-bootstrap'

import {
    APPLICATION_TWITCH_CLIENT_ID,
    APPLICATION_TWITCH_LOGIN_REDIRECT_URI,
} from '@Constants'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'

const Twitch_Login = (): React.ReactElement => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
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
        if (Path === `/`) {
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
                            borderColor: `${props.end_user.custom_design.card_border_color}`,
                            minWidth: `${card_width}`
                        }}>

                        {!props.application.mobile_mode &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrows-move" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8" />
                            </svg>
                        }

                        <Card.Header className={`${props.application.settings.text_alignment}`}>
                            <svg
                                onClick={() => { Navigate.push(`/Login/User/Twitch`) }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="64"
                                fill="currentColor"
                                className="bi bi-twitch"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
                                <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
                            </svg>
                            <br />
                            {(!props.end_user.twitch.id && props.end_user.account.id) &&
                                <>
                                    {`${lbl.EnableTwitchSSO}`} 
                                </>
                            }
                            {(!props.end_user.twitch.id && !props.end_user.account.id) &&
                                <>
                                    {`${lbl.LoginWithTwitchEmail}`}
                                </>
                            }
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center text-center">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={() => { send_end_user_to_twitch_authenticator() }}
                                        style={{
                                            backgroundColor: `${props.end_user.custom_design.button_background_color}`,
                                            color: `${props.end_user.custom_design.button_font_color}`,
                                            font: `${props.end_user.custom_design.button_font}`
                                        }}
                                        disabled={lock_form_submit_button}
                                    >
                                        {submit_button_color !== "primary" &&
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <br />
                                            </>
                                        }

                                        {submit_button_text}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                        {alert_text ? 
                            <Card.Footer>
                                <Row>
                                    <Col className="text-center">
                                        <Alert variant={alert_color}>{alert_text}</Alert>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        : null}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Twitch_Login