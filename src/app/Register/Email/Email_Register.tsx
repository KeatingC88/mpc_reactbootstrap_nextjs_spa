"use client"

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button, Alert, Container } from 'react-bootstrap'
import {
    Attempt_To_Register_The_End_User_An_Email_Account,
    Notify_Attempted_Registration_To_Same_Email_Account_By_Email_Message,
    Validate_Email_With_Users_Server
} from '@Redux_Thunk/Actions/Register'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { usePathname } from 'next/navigation'

const Email_Register = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [submit_button_font_color, set_submit_button_font_color] = useState<string>(`primary`)
    const [lock_form_submit_button, set_lock_form_submit_button] = useState<boolean>(false)
    const [form_submit_complete, set_form_submit_complete] = useState<boolean>(false)
    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)
    const [submit_button_text, set_submit_button_text] = useState("Register")
    const [email_address, set_email_address] = useState<string>("")

    const create_success_alert = (value: string | null) => {
        set_lock_form_submit_button(true)
        set_submit_button_font_color(`success`)
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
        set_submit_button_font_color(`danger`)
        set_alert_color(`danger`)
        set_submit_button_text(`${lbl.Error}`)
        set_alert_text(`${error}`)
        setTimeout(() => {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.RegisterEmail}`)
            set_alert_text(``)
        }, 8000)
    }
    
    const validating_email_address_input = () => {

        let localEmail = email_address.substring(0, email_address.indexOf(`@`))
        let domainEmail = email_address.substring(email_address.indexOf(`@`), email_address.length)

        switch (true) {
            case !email_address:
                create_error_alert(`${lbl.MissingEmailAddress}`)
                return false
            case email_address.length === 0:
                create_error_alert(`${lbl.MissingEmailAddress}`)
                return false
            case email_address.length <= 5:
                create_error_alert(`${lbl.MissingEmailLengthGreaterThanFive}`)
                return false
            case !email_address.match(/@/):
                create_error_alert(`${lbl.MissingEmailAtSymbol}`)
                return false
            case !/./.test(email_address):
                create_error_alert(`${lbl.MissingEmailTLDDot}`)
                return false
            case localEmail.length < 2:
                create_error_alert(`${lbl.MissingMinEmailLocalAddress}`)
                return false
            case domainEmail.length < 7:
                create_error_alert(`${lbl.MissingMin7CharsAfterAtSymbol}`)
                return false
            case !email_address.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/):
                create_error_alert(`${lbl.MissingEmailFormat}`)
                return false
            default:
                return true
        }
    }
    
    const validating_create_email_account_form = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        set_lock_form_submit_button(true)
        set_submit_button_font_color(`info`)
        set_submit_button_text(`${lbl.ValidatingPleaseWait}`)
        set_alert_text("")

        if (validating_email_address_input()) {
            try {
                (async () => {

                    await Dispatch(Validate_Email_With_Users_Server(email_address))

                    await Dispatch(Attempt_To_Register_The_End_User_An_Email_Account(email_address)).then(() => {
                        set_form_submit_complete(true)
                    })

                })()
            } catch (error) {
                console.error(error)
            }
        }

    }

    (async () => {

        if (props.error.network.id === "Validate-With-Email-Server-Failed") {

            setTimeout(async () => {

                if (props.error.network.id) {
                    create_error_alert(props.error.network.id)
                }
                    
            }, 1000)

        }

        if (props.error.network.id === "Email-Account-Already-Registered") {

            create_error_alert(props.error.network.id)
            await Dispatch(Notify_Attempted_Registration_To_Same_Email_Account_By_Email_Message(email_address))

        }

        if (props.error.network.id === null && form_submit_complete) {

            create_success_alert(`${lbl.EmailSentSuccessfully}`)
            set_form_submit_complete(false)

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
                            <h1>{`${lbl.CreateEmailAccount}`}</h1>
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center text-center">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    <Form noValidate onSubmit={validating_create_email_account_form}>
                                        <Form.Group className="mb-3 mt-3 mx-auto" controlId="email_address">
                                            <Form.Label>{lbl.EmailAddress}</Form.Label>
                                            <Form.Control
                                                type="email_address"
                                                name="email_address"
                                                className="text-center bg-red-400"
                                                value={email_address}
                                                onChange={(e) => set_email_address(e.target.value)}
                                                disabled={lock_form_submit_button}
                                                placeholder=""
                                            />
                                        </Form.Group>
                                        <Button variant={submit_button_font_color} type="submit" className="mx-auto mb-3" disabled={lock_form_submit_button}>
                                            {submit_button_text}
                                        </Button>
                                    </Form>
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

export default Email_Register