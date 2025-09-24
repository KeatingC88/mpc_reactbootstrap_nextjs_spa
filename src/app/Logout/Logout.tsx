"use client"
import React, { useState, useEffect} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

import { Row, Col, Card, Form, Button, Alert, Container} from 'react-bootstrap'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Logout_User_Database } from '@Redux_Thunk/Actions/Authentication/Logout'

const Logout = (): React.ReactElement => {

    const props = useSelector(Redux_Thunk_Core)
    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)
    
    const [card_width, set_card_width] = useState<string>(`100%`)

    const create_error_alert = (error: string) => {
        set_alert_text(`${error}`)
        set_alert_color(`danger`)
        setTimeout(() => {
            set_alert_text(``)
        }, 8000)
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
        Dispatch(Logout_User_Database())
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

                        {!props.application.mobile_mode &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrows-move" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8" />
                            </svg>
                        }

                        <Card.Header className={`${props.application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${props.end_user.custom_design.card_header_background_color}`,
                                color: `${props.end_user.custom_design.card_header_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_header_font}`
                            }}
                        >

                            {props.application.settings.theme === 0 ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-door-closed-fill" viewBox="0 0 16 16">
                                        <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                    </svg>
                                    <br />
                                    {lbl.LoggedOut}
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                                        <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z" />
                                        <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                                    </svg>
                                    <br />
                                    {lbl.LoggedOut}
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
                                        <p>{lbl.LoggedOut}</p>
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

export default Logout