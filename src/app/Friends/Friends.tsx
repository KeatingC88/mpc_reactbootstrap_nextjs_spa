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

import {
    Load_End_User_Friends,
    Unblock_Friend
} from '@Redux_Thunk/Actions/User/Friends'

const End_User_Friends = () => {

    const props = useSelector(Redux_Thunk_Core)

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

    const [unblock_button_value, set_unblock_button_value] = useState<boolean>(false)

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

        if (!props.end_user.people?.friends?.approved?.users_data || props.end_user.people?.friends?.approved?.users_data?.length === 0) {
            return (
                <></>
            )
        }

        return (
            <ListGroup variant="flush text-start">
                {Object.values(props.end_user.people?.friends?.approved?.users_data).map((user: any, index: number) => (
                    <ListGroup.Item key={user.user_id ?? index}>
                        {user.account?.name ?? "Unknown User"}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    } 

    const unblock_friend = (user_friend_id: BigInt) => {
        Dispatch(Unblock_Friend(user_friend_id)).then(() => {
            set_unblock_button_value(true)
            create_success_alert(`${lbl.UnblockedThisAccount}`)
        })
    }

    const build_blocking_list = () => {

        if (!props.end_user.people?.friends?.blocked?.users_data || props.end_user.people?.friends?.blocked?.users_data?.length === 0) {
            return (
                <></>
            )
        }

        return (
            <ListGroup variant="flush text-start">
                {Object.values(props.end_user.people?.friends?.blocked?.users_data).map((user: any, index: number) => (
                    console.log(user),
                    <ListGroup.Item key={user.user_id ?? index}>
                        <Row>
                            <Col>
                                <br/>
                                {user.account?.name ?? "Unknown User"}
                            </Col>
                            <Col className="d-flex justify-content-end">
                                    <Button variant="success"
                                        onClick={() => { unblock_friend(user.account?.user_id) }}
                                        disabled={unblock_button_value}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-gear justify-content-end" viewBox="0 0 16 16">
                                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                    </svg>
                                    <br />
                                    {lbl.Unblock}
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    } 

    useEffect(() => {
        Dispatch(Load_End_User_Friends())

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
                                    <ListGroup variant="flush text-start">
                                        {build_friends_list()}
                                    </ListGroup>
                                </Col>
                            </Row>
                            {props.end_user.people?.friends?.blocked?.user_ids?.length !== 0 &&
                                <Row className="justify-content-center text-center mb-5">
                                    <Col lg={10} md={8} sm={9} xs={10}>
                                        <h3>{lbl.Blocking}</h3>
                                        <ListGroup variant="flush text-start">
                                            {build_blocking_list()}
                                        </ListGroup>
                                    </Col>
                                </Row>
                            }
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
