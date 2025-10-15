"use client"

import React, { useState, useEffect, useMemo, SetStateAction } from 'react'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import {
    Row,
    Col,
    Card,
    Alert,
    Container,
    Button,
    ListGroup
} from 'react-bootstrap'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'
import { usePathname } from 'next/navigation'

import { Load_End_User_Friend_Permissions } from '@Redux_Thunk/Actions/User/Friends'

const End_User_Friends = () => {

    const props = useSelector(Redux_Thunk_Core)

    console.log(props)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [add_friend_button_display_value, set_add_friend_button_display_value] = useState<boolean>(false)
    const [submit_button_font_color, set_submit_button_font_color] = useState<string>(`primary`)

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const create_success_alert = (value: string | null) => {
        set_alert_color(`success`)
        set_alert_text(`${value}`)
        setTimeout(() => {
            set_alert_text(``)
        }, 8000)
    }

    const create_error_alert = (error: string | null) => {
        set_alert_color(`danger`)
        set_alert_text(`${error}`)
        setTimeout(() => {
            set_alert_text(``)
        }, 8000)
    }

    const build_friends_list = () => {

        console.log(props.end_user.people?.friends)

        if (!props.end_user.people?.friends) return <> </>

        return (
            <ListGroup variant="flush text-start">
                {props.end_user.people.friends.approved?.map((x, index) => {
                    return (
                        <ListGroup.Item key={index}>{`${x}`}</ListGroup.Item>
                    )
                })}
            </ListGroup>
        )
    }

    const build_blocked_list = () => {

        console.log(props.end_user.people?.friends)

        if (!props.end_user.people?.friends) return <> </>

        return (
            <ListGroup variant="flush text-start">
                {props.end_user.people.friends.approved?.map((x, index) => {
                    return (
                        <ListGroup.Item key={index}>{`${x}`}</ListGroup.Item>
                    )
                })}
            </ListGroup>
        )
    }

    const build_reported_list = () => {

        console.log(props.end_user.people?.friends.reported)

        if (!props.end_user.people?.friends) return <> </>

        return (
            <ListGroup variant="flush text-start">
                {props.end_user.people.friends.approved?.map((x, index) => {
                    return (
                        <ListGroup.Item key={index}>{`${x}`}</ListGroup.Item>
                    )
                })}
            </ListGroup>
        )
    }

    useEffect(() => {
        Dispatch(Load_End_User_Friend_Permissions())

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

                            <svg onClick={() => { Navigate.push(`/Friends`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-newspaper" viewBox="0 0 16 16">
                                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
                                <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
                            </svg>
                            <br />
                            {`${lbl.Friends}`}
                            
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center text-center mb-5">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    {build_friends_list()}
                                </Col>
                            </Row>
                            <Row className="justify-content-center text-center mb-5">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    {build_blocked_list()}
                                </Col>
                            </Row>
                            <Row className="justify-content-center text-center mb-5">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    {build_reported_list()}
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

export default End_User_Friends
