"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button, Alert, Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

import {
    Attempt_To_Register_The_End_User_An_Email_Account,
    Notify_Attempted_Registration_To_Same_Email_Account_By_Email_Message,
    Validate_Email_With_Users_Server
} from '@Redux_Thunk/Actions/Register/Email_Account'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { usePathname } from 'next/navigation'

const Email_Register = () => {

    const props = useSelector(Redux_Thunk_Core)
    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [submit_button_color, set_submit_button_color] = useState<string>(`primary`)
    const [lock_form_submit_button, set_lock_form_submit_button] = useState<boolean>(false)
    const [form_submit_complete, set_form_submit_complete] = useState<boolean>(false)
    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)
    const [submit_button_text, set_submit_button_text] = useState("Register")
    const [email_address, set_email_address] = useState<string>(props.end_user.account.email_address ? props.end_user.account.email_address : "")

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
        set_submit_button_color(`info`)
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
                    <Card className={`moveable ${props.application.settings.alignment === 'justify-content-start' ? '' : ''} ${props.application.settings.alignment === 'justify-content-end' ? '' : ''} ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${props.end_user.custom_design.card_border_color}`,
                            minWidth: `${card_width}`
                        }}>
                        <Card.Header className={`${props.application.settings.text_alignment}`}>
                            {props.application.settings.theme === 0 ? (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Register/Email`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                                    </svg>
                                    <br />
                                    {(props.end_user.account.id) &&
                                        <>
                                            {`${lbl.CreateLoginWithYourEmailAddress}`}
                                        </>
                                    }
                                    {(!props.end_user.account.id) &&
                                        <>
                                            {`${lbl.CreateEmailAccount}`}
                                        </>
                                    }
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Register/Email`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                                    </svg>
                                    <br />
                                    {(props.end_user.account.id) &&
                                        <>
                                            {`${lbl.LoginWithEmail}`}
                                        </>
                                    }
                                    {(!props.end_user.account.id) &&
                                        <>
                                            {`${lbl.CreateEmailAccount}`}
                                        </>
                                    }
                                </>
                            )}
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center text-center">
                                <Col sm={9} xs={10} md={8} lg={8} xlg={4}>
                                    <Form noValidate onSubmit={validating_create_email_account_form}>
                                        <Form.Group className="mb-3 mt-3 mx-auto" controlId="email_address">
                                            <Row className="d-flex justify-content-center">
                                                <Col xs={12} sm={10}>
                                                    <Form.Label>{lbl.EmailAddress}</Form.Label>
                                                    {props.end_user.account.email_address &&
                                                        <Form.Control
                                                            type="email_address"
                                                            name="email_address"
                                                            className="text-center mx-auto"
                                                            value={email_address}
                                                            readOnly
                                                        />
                                                    }
                                                    {!props.end_user.account.email_address &&
                                                        <Form.Control
                                                            type="email_address"
                                                            name="email_address"
                                                            className="text-center mx-auto"
                                                            value={email_address}
                                                            onChange={(e) => set_email_address(e.target.value)}
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant={submit_button_color}
                                                        type="submit"
                                                        className="mx-auto mb-3 mt-2"
                                                        disabled={lock_form_submit_button}
                                                        style={{
                                                            backgroundColor: `${props.end_user.custom_design.button_background_color}`,
                                                            color: `${props.end_user.custom_design.button_font_color}`,
                                                            font: `${props.end_user.custom_design.button_font}`
                                                        }}
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
                                        </Form.Group>
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