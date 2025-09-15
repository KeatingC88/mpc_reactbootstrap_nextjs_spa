"use client"
import React, { useState, useEffect} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'

import { Row, Col, Card, Form, Button, Alert, Container} from 'react-bootstrap'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'
import { Login_Email_Password_Account } from '@Redux_Thunk/Actions/Authentication/Login_Email_Password_Account'

const Login_Email_Address_Password = (): React.ReactElement => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [submit_button_color, set_submit_button_color] = useState<string>(`primary`)
    const [lock_form_submit_button, set_lock_form_submit_button] = useState<boolean>(false)
    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)
    const [submit_button_text, set_submit_button_text] = useState<string>(`${lbl.Login}`)

    const [user_email_address, set_user_email_address] = useState<string>(``)
    const [user_password, set_user_password] = useState<string>(``)

    const [card_width, set_card_width] = useState<string>(`100%`)

    const create_error_alert = (error: string) => {
        set_submit_button_color(`danger`)
        set_alert_text(`${error}`)
        set_alert_color(`danger`)
        set_submit_button_text(`Error`)
        set_lock_form_submit_button(true)
        setTimeout(() => {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.Login}`)
            set_alert_text(``)
            set_submit_button_color(`primary`)
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
        set_submit_button_color(`info`)
        set_submit_button_text(`${lbl.ValidatingPleaseWait}`)
        set_alert_text(``)

        if (anEmail() && aPassword()) {
            set_lock_form_submit_button(true)
            set_submit_button_color(`info`)

            Dispatch(Login_Email_Password_Account({
                email_address: user_email_address,
                password: user_password
            }))

            setTimeout(() => {
                set_alert_color(``)
                set_alert_text(``)
                Navigate.push(`/`)
            }, 1000)
        }
    }

    (() => {
        if (props.error.network.id === "Email-Login-Failed") {
            setTimeout(() => {
                if(props.error.network.id)
                    create_error_alert(props.error.network.id)
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
            <Row className={`${props.application.settings.alignment}`}>
                <Col className={`${props.application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    <Card className={`moveable ${props.application.settings.alignment === 'justify-content-start' ? '' : ''} ${props.application.settings.alignment === 'justify-content-end' ? '' : ''} ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${props.end_user.custom_design.card_border_color}`,
                            minWidth: `${card_width}`
                        }}
                    >
                        <Card.Header className={`${props.application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${props.end_user.custom_design.card_header_background_color}`,
                                color: `${props.end_user.custom_design.card_header_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_header_font}`
                            }}
                        >

                            {props.application.settings.theme === 0 ? (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Login/User/Email`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                    </svg>
                                    <br />
                                    {lbl.LoginWithAnEmailAccount}
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Login/User/Email`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                                        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                        <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                    </svg>
                                    <br />
                                    {lbl.LoginWithAnEmailAccount}
                                </>
                            )}
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${props.end_user.custom_design.card_body_background_color}`,
                                color: `${props.end_user.custom_design.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_body_font}`
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
                                            <Button variant={submit_button_color} type="submit"
                                                className="mx-auto mb-3"
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
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        {alert_text ?
                            <Card.Footer
                                style={{
                                    backgroundColor: `${props.end_user.custom_design.card_footer_background_color}`,
                                    color: `${props.end_user.custom_design.card_footer_font_color}`,
                                    font: `${props.end_user.custom_design.card_footer_font}`
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