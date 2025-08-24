"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Row, Col, Card, Alert, Container } from 'react-bootstrap'

import {
    Login_End_User_Twitch_Account
} from '@Redux_Thunk/Actions/Authentication/Login_Twitch_Account'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { usePathname } from 'next/navigation'

const Discord_Confirmation = () => {

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
        }, 8000)
    }

    useEffect(() => {
        if (Path === `/`) {
            set_card_width(``)
        }

        Dispatch(Login_End_User_Twitch_Account())
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
                        <Card.Header className={`${props.application.settings.text_alignment}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                            </svg>
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center text-center">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    <Row>
                                        <Col>{lbl.ID}</Col>
                                        <Col>{`${props.end_user.twitch.id}`}</Col>
                                    </Row>
                                    <Row>
                                        <Col>{lbl.Email}</Col>
                                        <Col>{props.end_user.twitch.email_address}</Col>
                                    </Row>
                                    <Row>
                                        <Col>{lbl.DisplayName}</Col>
                                        <Col>{props.end_user.twitch.display_name}</Col>
                                    </Row>
                                    <Row>
                                        <Col>{lbl.AvatarPreview}</Col>
                                        <Col>
                                            {!props.end_user.twitch.profile_image_url &&
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
                                            }
                                            {props.end_user.twitch.profile_image_url &&
                                                <img
                                                    src={`${props.end_user.twitch.profile_image_url}`}
                                                    height="32" width="32"
                                                    className="d-inline-block rounded-circle"
                                                />
                                            }
                                        </Col>
                                    </Row>
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

export default Discord_Confirmation