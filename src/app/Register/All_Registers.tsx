"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button, Alert, Container } from 'react-bootstrap'

import {

} from '@Redux_Thunk/Actions/Register/Twitch_Account'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { usePathname } from 'next/navigation'

const All_Registers = () => {

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

    (async () => {

        if (props.error.network.id === "Validate-With-Twitch-Authenticator-Failed") {

            setTimeout(async () => {

                if (props.error.network.id) {
                    create_error_alert(props.error.network.id)
                }
                    
            }, 1000)

        }

        if (props.error.network.id === "Email-Account-Already-Registered") {

            create_error_alert(props.error.network.id)

        }

        if (props.error.network.id === null) {

            create_success_alert(`${lbl.EmailSentSuccessfully}`)

        }

    })()

    useEffect(() => {
        if (Path === `/`) {
            set_card_width(``)
        }
    }, [])

    return (
        <Container fluid>
            <Row className={`${props.application.settings.alignment}`}>
                <Col className={`${props.application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    <Card className={`moveable ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${props.end_user.custom_design.card_border_color}`,
                            minWidth: `${card_width}`
                        }}>
                        <Card.Header className={`${props.application.settings.text_alignment}`}>
                            <svg onClick={() => { Navigate.push(`/Register/Twtich`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-twitch" viewBox="0 0 16 16">
                                <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
                                <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
                            </svg>
                            <br />
                            {`${lbl.CreateTwitchAccount}`}
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center text-center">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    
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

export default All_Registers