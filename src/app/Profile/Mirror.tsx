"use client"

import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Card, Image, ListGroup, ListGroupItem, Modal, Accordion, InputGroup, Form, Button } from 'react-bootstrap'

import { useRouter, usePathname } from 'next/navigation'

import { useSelector } from 'react-redux'
import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

const Profile_Mirror = () => {

    const props = useSelector(Redux_Thunk_Core)
    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()
    console.log(props)
    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [avatar_path, set_avatar] = useState<string>(``)
    const [avatar_title, set_avatar_title] = useState<string>(``)

    const [created_on_value, set_created_on_value] = useState<string>(``)
    const [login_on_value, set_login_on_value] = useState<string>(``)
    const [logout_on_value, set_logout_on_value] = useState<string>(``)

    const [showAvatarModel, set_avatarModalShow] = useState<boolean>(false)
    const [disableAvatarModalBtns, setDisableToAvatarModalBtns] = useState<boolean>(false)
    const hide_avatar_modal = () => set_avatarModalShow(false)
    const handleAvatarModalShow = () => set_avatarModalShow(true)

    const set_profile_status = () => {
        switch (true) {
            case props.end_user.account.online_status === 0:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case props.end_user.account.online_status === 1:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case props.end_user.account.online_status === 2:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case props.end_user.account.online_status === 3:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orange" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case props.end_user.account.online_status === 4:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                </svg>
            case props.end_user.account.online_status === 5:
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
        const { account } = props.end_user || {}

        if (account?.created_on) {
            const date = new Date(Number(account.created_on) * 1000)
            set_created_on_value(date.toString())
        }

        if (account?.login_on) {
            const date = new Date(Number(account.login_on) * 1000)
            set_login_on_value(date.toString())
        }

        if (account?.logout_on) {
            const date = new Date(Number(account.logout_on) * 1000)
            set_logout_on_value(date.toString())
        }

        if (Path === `/`) {
            set_card_width(``)
        }

    }, [props.end_user])

    return (
        <Container id="Profile_View" fluid>
            <Row className={`${props.application.settings.alignment}`}>
                <Col className={`${props.application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    <Card className={`moveable ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
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
                            {props.application.settings.theme ? (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Profile/View`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-eye-fill d-inline-block align-top mt-2 rounded-circle" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                    </svg>
                                    <br />
                                    {lbl.Profile}
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Profile/View`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-eye d-inline-block align-top mt-2 rounded-circle" viewBox="0 0 16 16">
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
                                backgroundColor: `${props.end_user.custom_design.card_body_background_color}`,
                                color: `${props.end_user.custom_design.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_body_font}`
                            }}
                        >
                            <Container>
                                <Row>
                                    <Col>
                                        {props.end_user.profile.avatar_url_path &&
                                            <center>
                                                <Image src={`${props.end_user.profile.avatar_url_path}`} thumbnail height="124" width="124" />
                                            </center>
                                        }
                                        {!props.end_user.profile.avatar_url_path &&
                                            <center>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="currentColor" className="bi-person-circle" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                </svg>
                                            </center>
                                        }
                                    </Col>
                                    <Col>
                                        <ListGroupItem>{props.end_user.account.name}</ListGroupItem>
                                        <ListGroupItem>{set_profile_status()}</ListGroupItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {props.end_user.profile.first_name && (
                                            <ListGroupItem>
                                                {lbl.FirstName}:<br />
                                                {props.end_user.profile.first_name}
                                            </ListGroupItem>
                                        )}
                                        {props.end_user.profile.ethnicity && (
                                            <ListGroupItem>
                                                {lbl.Ethnicity}:<br />
                                                {props.end_user.profile.ethnicity}
                                            </ListGroupItem>
                                        )}
                                    </Col>

                                    <Col>
                                        {props.end_user.profile.last_name && (
                                            <ListGroupItem>
                                                {lbl.LastName}:<br />
                                                {props.end_user.profile.last_name}
                                            </ListGroupItem>
                                        )}
                                        {props.end_user.profile.middle_name && (
                                            <ListGroupItem>
                                                {lbl.MiddleName}:<br />
                                                {props.end_user.profile.middle_name}
                                            </ListGroupItem>
                                        )}
                                        {props.end_user.profile.maiden_name && (
                                            <ListGroupItem>
                                                {lbl.MaidenName}:<br />
                                                {props.end_user.profile.maiden_name}
                                            </ListGroupItem>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {(props.end_user.profile.birth_month !== 0 && props.end_user.profile.birth_day !== 0 && props.end_user.profile.birth_year !== 0) && (
                                            <ListGroupItem>
                                                {lbl.Month}:<br />
                                                {props.end_user.profile.birth_month}
                                            </ListGroupItem>
                                        )}
                                    </Col>

                                    <Col>
                                        {(props.end_user.profile.birth_month !== 0 && props.end_user.profile.birth_day !== 0 && props.end_user.profile.birth_year !== 0) && (
                                            <ListGroupItem>
                                                {lbl.Day}:<br />
                                                {props.end_user.profile.birth_day}
                                            </ListGroupItem>
                                        )}
                                    </Col>

                                    <Col>
                                        {(props.end_user.profile.birth_month !== 0 && props.end_user.profile.birth_day !== 0 && props.end_user.profile.birth_year !== 0) && (
                                            <ListGroupItem>
                                                {lbl.Year}:<br />
                                                {props.end_user.profile.birth_year}
                                            </ListGroupItem>
                                        )}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        {props.end_user.account.login_on && (
                                            <ListGroupItem>
                                                {lbl.Login}:<br />
                                                {login_on_value}
                                            </ListGroupItem>
                                        )}
                                        {props.end_user.account.logout_on && (
                                            <ListGroupItem>
                                                {lbl.Logout}:<br />
                                                {logout_on_value}
                                            </ListGroupItem>
                                        )}
                                        {props.end_user.account.created_on && (
                                            <ListGroupItem>
                                                {lbl.AccountCreation}:<br />
                                                {created_on_value}
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