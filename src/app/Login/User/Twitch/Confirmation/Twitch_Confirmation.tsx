"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Row, Col, Card, Alert, Container, Button, Spinner } from 'react-bootstrap'

import {
    Login_End_User_Twitch_Account
} from '@Redux_Thunk/Actions/Authentication/Login_Twitch_Account'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { usePathname } from 'next/navigation'

import {
    Set_Navigation_Menu_Display
} from '@Redux_Thunk/Actions/Misc'


const Twitch_Confirmation = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const [lock_form_submit_button, set_lock_form_submit_button] = useState<boolean>(true)
    const [submit_button_text, set_submit_button_text] = useState(`${lbl.ValidatingPleaseWait}`)
    const [submit_button_color, set_submit_button_color] = useState<string>(`primary`)

    const create_success_alert = (value: string | null) => {
        set_lock_form_submit_button(true)
        set_submit_button_color(`success`)
        set_alert_color(`success`)
        set_submit_button_text(`${lbl.Successful}`)
        set_alert_text(`${value}`)
        setTimeout(() => {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.Login}`)
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
            set_submit_button_text(`${lbl.Login}`)
            set_alert_text(``)
        }, 8000)
    }

    useEffect(() => {
        Dispatch(Set_Navigation_Menu_Display(`none`))
        
        if (Path === `/`) {
            set_card_width(``)
        }

        if (props.end_user.twitch.id) {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.Login}`)
        }

        Dispatch(Login_End_User_Twitch_Account())
    }, [props.end_user?.twitch?.id])

    return (
        <Container fluid>
            <Row className={`${props.application.settings.alignment}`}>
                <Col className={`${props.application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    {(!props.end_user.twitch.login || !props.end_user.twitch.channel.login || props.end_user.twitch.channel.login !== props.end_user.twitch.login) &&
                        <Card className={`moveable ${props.application.settings.alignment === 'justify-content-start' ? '' : ''} ${props.application.settings.alignment === 'justify-content-end' ? '' : ''} ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                            style={{
                                float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                                borderColor: `${props.end_user.custom_design.card_border_color}`,
                                minWidth: `${card_width}`
                            }}>
                            <Card.Header className={`${props.application.settings.text_alignment}`}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="120"
                                    height="120"
                                    fill="currentColor"
                                    className="bi bi-twitch"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
                                    <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
                                </svg>
                                <br />
                                {lbl.Loading}
                            </Card.Header>
                            <Card.Body>
                                <Row className="justify-content-center text-center">
                                    <Col lg={10} md={8} sm={9} xs={10}>
                                        <Spinner animation="border"
                                            style={{ maxHeight: 400, maxWidth: 400 }}
                                        />
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
                    }
                    {(props.end_user.twitch.login && props.end_user.twitch.channel.login && props.end_user.twitch.channel.login === props.end_user.twitch.login) &&
                        <Card className={`moveable ${props.application.settings.alignment === 'justify-content-start' ? '' : ''} ${props.application.settings.alignment === 'justify-content-end' ? '' : ''} ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                            style={{
                                float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                                borderColor: `${props.end_user.custom_design.card_border_color}`,
                                minWidth: `${card_width}`
                            }}>
                            <Card.Header className={`${props.application.settings.text_alignment}`}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="120"
                                    height="120"
                                    fill="currentColor"
                                    className="bi bi-twitch"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
                                    <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
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
                                            <Col>{`${props.end_user.twitch.email_address}`}</Col>
                                        </Row>
                                        <Row>
                                            <Col>{lbl.DisplayName}</Col>
                                            <Col>{`${props.end_user.twitch.display_name}`}</Col>
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
                                        <Row>
                                            <Col>
                                                {lbl.CurrentFollowerTotal}
                                            </Col>
                                            <Col>
                                                {props.end_user.twitch.follower_count?.toString()}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {lbl.Description}
                                            </Col>
                                            <Col>
                                                {props.end_user.twitch.channel.description}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {lbl.CurrentViewerCount}
                                            </Col>
                                            <Col>
                                                {props.end_user.twitch.channel.current_view_count?.toString()}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {lbl.CreatedOn}
                                            </Col>
                                            <Col>
                                                {props.end_user.twitch.channel.created_at}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {lbl.BroadcasterType}
                                            </Col>
                                            <Col>
                                                {props.end_user.twitch.channel.broadcaster_type}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6}>
                                                <iframe
                                                    src={`https://player.twitch.tv/?channel=${props.end_user.twitch.login}&parent=localhost`}
                                                    height="400"
                                                    width="400"
                                                    allowFullScreen>
                                                </iframe>
                                            </Col>
                                            <Col lg={6}>
                                                <iframe
                                                    frameBorder="0"
                                                    scrolling="no"
                                                    src={`https://www.twitch.tv/embed/${props.end_user.twitch.login}/chat?parent=localhost`}
                                                    height="400"
                                                    width="250">
                                                </iframe>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    disabled={lock_form_submit_button}
                                                    onClick={() => {
                                                        Dispatch(Set_Navigation_Menu_Display(` `))
                                                        Navigate.push(`/`)
                                                    }}
                                                >
                                                    {submit_button_text}

                                                </Button>
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
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Twitch_Confirmation