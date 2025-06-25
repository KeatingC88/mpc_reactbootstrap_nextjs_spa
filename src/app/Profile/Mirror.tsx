"use client"

import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Card, Image, ListGroup, ListGroupItem, Modal, Accordion, InputGroup, Form, Button } from 'react-bootstrap'

import { useRouter, usePathname } from 'next/navigation'

import { useSelector } from 'react-redux'
import { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Application_Props } from '@Interfaces/Application_Props'
import { End_User_Props } from '@Interfaces/End_User_Props'
import { Error_Props } from '@Interfaces/Error_Props'
import { Third_Party_Api_Props } from '@Interfaces/Third_Party_Api_Props'

interface Profile_Mirror_Props {
    application: Application_Props
    end_user: End_User_Props
    error: Error_Props
    api: Third_Party_Api_Props
}

const Profile_Mirror = () => {

    const {
        application,
        end_user,
        error,
        api
    }: Profile_Mirror_Props = useSelector((state: Current_Redux_State) => ({
        application: {
            community: {
                users: state.Application_Community_State_Reducer.users,
            },
            language_dictionaries: state.Application_Language_State_Reducer.language_dictionaries,
            profile_viewer: {
                id: state.Application_Profile_Viewer_State_Reducer.id,
                name: state.Application_Profile_Viewer_State_Reducer.name,
                created_on: state.Application_Profile_Viewer_State_Reducer.created_on,
                logout_on: state.Application_Profile_Viewer_State_Reducer.logout_on,
            },
            settings: {
                current_language: state.Application_Language_State_Reducer.current_language,
                theme: state.Application_Settings_State_Reducer.theme,
                alignment: state.Application_Settings_State_Reducer.alignment,
                text_alignment: state.Application_Settings_State_Reducer.text_alignment,
                flag: state.Application_Settings_State_Reducer.flag,
                nav_lock: state.Application_Settings_State_Reducer.nav_lock,
                gmt_time: state.Application_Settings_State_Reducer.gmt_time,
                local_time: state.Application_Settings_State_Reducer.local_time,
                date: state.Application_Settings_State_Reducer.date,
                location: state.Application_Settings_State_Reducer.location,
                grid_type: state.Application_Settings_State_Reducer.grid_type,
                navbar_css_display_value: state.Application_Settings_State_Reducer.navbar_css_display_value,
            },
            websocket: {
                chat_conversations: state.Application_WebSocket_State_Reducer.chat_conversations,
                conversation_sent_requests: state.Application_WebSocket_State_Reducer.conversation_sent_requests,
                conversation_received_approvals: state.Application_WebSocket_State_Reducer.conversation_received_approvals,
                conversation_received_requests: state.Application_WebSocket_State_Reducer.conversation_received_requests,
                conversation_sent_approvals: state.Application_WebSocket_State_Reducer.conversation_sent_approvals,
                conversation_sent_blocks: state.Application_WebSocket_State_Reducer.conversation_sent_blocks,
                conversation_received_blocks: state.Application_WebSocket_State_Reducer.conversation_received_blocks,
            }
        },
        end_user: {
            account: {
                id: state.End_User_Account_State_Reducer.id,
                public_id: state.End_User_Account_State_Reducer.public_id,
                token: state.End_User_Account_State_Reducer.token,
                token_expire: state.End_User_Account_State_Reducer.token_expire,
                account_type: state.End_User_Account_State_Reducer.account_type,
                roles: state.End_User_Account_State_Reducer.roles,
                email_address: state.End_User_Account_State_Reducer.email_address,
                name: state.End_User_Account_State_Reducer.name,
                online_status: state.End_User_Account_State_Reducer.online_status,
                custom_lbl: state.End_User_Account_State_Reducer.custom_lbl,
                avatar_url_path: state.End_User_Account_State_Reducer.avatar_url_path,
                avatar_title: state.End_User_Account_State_Reducer.avatar_title,
                login_on: state.End_User_Account_State_Reducer.login_on,
                logout_on: state.End_User_Account_State_Reducer.logout_on,
                created_on: state.End_User_Account_State_Reducer.created_on,
                phone_country_code: state.End_User_Account_State_Reducer.phone_country_code,
                phone_carrier: state.End_User_Account_State_Reducer.phone_carrier,
                telephone: state.End_User_Account_State_Reducer.telephone,
            },
            notification: {
                alert_color: ``,
                alert_text: ``,
            },
            discord: {
                id: state.End_User_Discord_Account_State_Reducer.id,
            },
            twitch: {
                id: state.End_User_Twitch_Account_State_Reducer.id,
            },
            profile: {
                first_name: state.End_User_Profile_State_Reducer.first_name,
                last_name: state.End_User_Profile_State_Reducer.last_name,
                middle_name: state.End_User_Profile_State_Reducer.middle_name,
                maiden_name: state.End_User_Profile_State_Reducer.maiden_name,
                gender: state.End_User_Profile_State_Reducer.gender,
                birth_month: state.End_User_Profile_State_Reducer.birth_month,
                birth_day: state.End_User_Profile_State_Reducer.birth_day,
                birth_year: state.End_User_Profile_State_Reducer.birth_year,
                ethnicity: state.End_User_Profile_State_Reducer.ethnicity,
                avatar_url_path: state.End_User_Account_State_Reducer.avatar_url_path,
                avatar_title: state.End_User_Account_State_Reducer.avatar_title,
            },
            custom_design: state.End_User_Custom_CSSDesign_State_Reducer.custom_design_obj,
        },
        error: {
            host: {
                id: state.Host_Error_State_Reducer.id,
            },
            network: {
                id: state.Network_Error_State_Reducer.id,
            },
        },
        api: {
            discord: {
                online_status: true,
            },
            twitch: {
                online_status: true,
            },
        },
    }))

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = application.settings.current_language.split(`-`)
    const lbl = application.language_dictionaries[language][region]

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [avatar_path, set_avatar] = useState<string>(``)
    const [avatar_title, set_avatar_title] = useState<string>(``)

    const [showAvatarModel, set_avatarModalShow] = useState<boolean>(false)
    const [disableAvatarModalBtns, setDisableToAvatarModalBtns] = useState<boolean>(false)
    const hide_avatar_modal = () => set_avatarModalShow(false)
    const handleAvatarModalShow = () => set_avatarModalShow(true)

    const set_profile_status = () => {
        switch (true) {
            case end_user.account.online_status === 0:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case end_user.account.online_status === 1:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case end_user.account.online_status === 2:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case end_user.account.online_status === 3:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orange" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case end_user.account.online_status === 4:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case end_user.account.online_status === 5:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="teal" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            default:
                return `!Error`
        }
    }

    const change_end_user_avatar = (url: string) => {
        set_avatar(url)
    }

    const change_avatar_title = (avatar_title: string) => {
        set_avatar_title(avatar_title)
    }

    useEffect(() => {
        if (Path === `/`
        ) {
            set_card_width(``)
        }
    }, [])

    return (
        <Container id="Profile_View" fluid>
            <Row className={`${application.settings.alignment}`}>
                <Col className={`${application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    <Card className={`moveable ${application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${end_user.custom_design.card_border_color}`
                        }}
                    >
                        <Card.Header className={`${application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${end_user.custom_design.card_header_background_color}`,
                                color: `${end_user.custom_design.card_header_font_color}`,
                                fontFamily: `${end_user.custom_design.card_header_font}`
                            }}
                        >
                            {application.settings.theme ? (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Profile/View`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                    </svg>
                                    <br />
                                    {lbl.Profile}
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Profile/View`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                    <br />
                                    {lbl.Profile}
                                </>
                            )}
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${end_user.custom_design.card_body_background_color}`,
                                color: `${end_user.custom_design.card_body_font_color}`,
                                fontFamily: `${end_user.custom_design.card_body_font}`
                            }}
                        >
                            <Container>
                                <Row>
                                    <Col>
                                        {end_user.profile.avatar_url_path &&
                                            <center>
                                                <Image src={`${end_user.profile.avatar_url_path}`} thumbnail height="124" width="124" />
                                            </center>
                                        }
                                        {!end_user.profile.avatar_url_path &&
                                            <center>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="currentColor" className="bi-person-circle" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                </svg>
                                            </center>
                                        }
                                    </Col>
                                    <Col>
                                        <ListGroupItem>{end_user.account.name}</ListGroupItem>
                                        <ListGroupItem>#&nbsp;{end_user.account.public_id}</ListGroupItem>
                                        <ListGroupItem>{set_profile_status()}</ListGroupItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {end_user.profile.first_name && (
                                            <ListGroupItem>
                                                {lbl.FirstName}:<br />
                                                {end_user.profile.first_name}
                                            </ListGroupItem>
                                        )}
                                        {end_user.profile.ethnicity && (
                                            <ListGroupItem>
                                                {lbl.Ethnicity}:<br />
                                                {end_user.profile.ethnicity}
                                            </ListGroupItem>
                                        )}
                                    </Col>

                                    <Col>
                                        {end_user.profile.last_name && (
                                            <ListGroupItem>
                                                {lbl.LastName}:<br />
                                                {end_user.profile.last_name}
                                            </ListGroupItem>
                                        )}
                                        {end_user.profile.middle_name && (
                                            <ListGroupItem>
                                                {lbl.MiddleName}:<br />
                                                {end_user.profile.middle_name}
                                            </ListGroupItem>
                                        )}
                                        {end_user.profile.maiden_name && (
                                            <ListGroupItem>
                                                {lbl.MaidenName}:<br />
                                                {end_user.profile.maiden_name}
                                            </ListGroupItem>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {(end_user.profile.birth_month !== 0 && end_user.profile.birth_day !== 0 && end_user.profile.birth_year !== 0) && (
                                            <ListGroupItem>
                                                {lbl.Month}:<br />
                                                {end_user.profile.birth_month}
                                            </ListGroupItem>
                                        )}
                                    </Col>

                                    <Col>
                                        {(end_user.profile.birth_month !== 0 && end_user.profile.birth_day !== 0 && end_user.profile.birth_year !== 0) && (
                                            <ListGroupItem>
                                                {lbl.Day}:<br />
                                                {end_user.profile.birth_day}
                                            </ListGroupItem>
                                        )}
                                    </Col>

                                    <Col>
                                        {(end_user.profile.birth_month !== 0 && end_user.profile.birth_day !== 0 && end_user.profile.birth_year !== 0) && (
                                            <ListGroupItem>
                                                {lbl.Year}:<br />
                                                {end_user.profile.birth_year}
                                            </ListGroupItem>
                                        )}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        {end_user.account.login_on && (
                                            <ListGroupItem>
                                                {lbl.Login}:<br />
                                                {end_user.account.login_on}
                                            </ListGroupItem>
                                        )}
                                        {end_user.account.logout_on && (
                                            <ListGroupItem>
                                                {lbl.Logout}:<br />
                                                {end_user.account.logout_on}
                                            </ListGroupItem>
                                        )}
                                        {end_user.account.created_on && (
                                            <ListGroupItem>
                                                {lbl.AccountCreation}:<br />
                                                {end_user.account.created_on}
                                            </ListGroupItem>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showAvatarModel} onHide={hide_avatar_modal}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.AvatarChangeMenu}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Card body style={{ maxWidth: '500px' }}>
                                <Accordion style={{ maxWidth: 600 }}>
                                    <Accordion.Item eventKey="0" onClick={(e) => {
                                        set_avatar(``)
                                    }}>
                                        <Accordion.Header>{lbl.PasteURL}</Accordion.Header>
                                        <Accordion.Body>
                                            <InputGroup className="mb-3" style={{ zIndex: 0 }}>
                                                <InputGroup.Text id="inputGroup-sizing-lg">{lbl.URL}</InputGroup.Text>
                                                <Form.Control
                                                    id="avatar-path"
                                                    aria-label="avatar url"
                                                    aria-describedby="avatar url"
                                                    value={avatar_title}
                                                    onChange={(e) => { change_end_user_avatar(e.currentTarget.value) }}
                                                />
                                            </InputGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" onClick={() => {
                                        set_avatar(``)
                                    }}>
                                        <Accordion.Header>{lbl.UploadPhoto}</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group controlId="formFileLg" className="mb-3">
                                                <InputGroup className="mb-3 justify-content-end" style={{ zIndex: 0 }}>
                                                    <input
                                                        type="file"
                                                        id="filename"
                                                        name="filename"
                                                        value={avatar_path}
                                                        onChange={(e) => { change_end_user_avatar(e.currentTarget.value) }}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Row>
                                    <Col>
                                        <InputGroup className="mb-3 mt-2" style={{ zIndex: 0 }}>
                                            <InputGroup.Text id="inputGroup-sizing-lg">{lbl.Title}</InputGroup.Text>
                                            <Form.Control
                                                id="avatar-title"
                                                aria-label="avatar url"
                                                aria-describedby="avatar url"
                                                style={{ maxWidth: 300 }}
                                                onChange={(e) => { change_avatar_title(e.currentTarget.value) }}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <Button variant="success" onClick={hide_avatar_modal} disabled={disableAvatarModalBtns}>
                                    {lbl.Save}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Profile_Mirror