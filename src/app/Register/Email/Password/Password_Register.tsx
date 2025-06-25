"use client"
import { useState, useEffect } from 'react'

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { Row, Col, Card, Form, Button, Alert, ListGroup, Container, InputGroup, Modal, Accordion } from 'react-bootstrap'

import { useSelector } from 'react-redux'

import {
    Create_End_User_Email_Account,
    Validate_Email_Confirmation_Code_With_Email_Server,
    Validate_Email_Confirmation_Code_With_User_Server
} from '@Redux_Thunk/Actions/Register'

import {
    Set_Navigation_Menu_Display
} from '@Redux_Thunk/Actions/Misc'

import { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'

import { Application_Props } from '@Interfaces/Application_Props'
import { End_User_Props } from '@Interfaces/End_User_Props'
import { Error_Props } from '@Interfaces/Error_Props'
import { Third_Party_Api_Props } from '@Interfaces/Third_Party_Api_Props'

import { useAppDispatch } from '@Redux_Thunk/Provider'

export interface Password_Register_Props {
    application: Application_Props
    end_user: End_User_Props
    error: Error_Props
    api: Third_Party_Api_Props
}
interface Email_Register_Confirmation_Payload {
    email_address: string
    name: string
    password: string
    code: string
}

const Password_Register = () => {
    const {
        application,
        end_user,
        error,
        api
    }: Password_Register_Props = useSelector((state: Current_Redux_State) => ({
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
    const searchParams = useSearchParams()
    const Dispatch = useAppDispatch()

    const [email] = useState(searchParams.get(`email`) || 'error')
    const [code] = useState(searchParams.get(`code`) || 'error')

    const [url_language] = useState(searchParams.get(`language`) || 'en-US')
    const lbl = application.language_dictionaries[url_language.split(`-`)[0]][url_language.split(`-`)[1]]

    const [password, set_password] = useState<string>("")
    const [name, set_name] = useState<string>("")

    const [submit_button_font_color, set_submit_button_font_color] = useState<string>(`primary`)
    const [lock_form_submit_button, set_lock_form_submit_button] = useState<boolean>(false)
    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)
    const [submit_button_text, set_submit_button_text] = useState<string>(lbl.PasswordSubmit)

    const [password_min_len_color, set_password_min_len_color] = useState<string>(``)
    const [password_numericcase_color, set_password_numericcase_color] = useState<string>(``)
    const [password_lowercase_color, set_password_lowercase_color] = useState<string>(``)
    const [password_uppercase_color, set_password_uppercase_color] = useState<string>(``)
    const [password_spec_char_color, set_password_spec_char_color] = useState<string>(``)

    const [avatar_path, set_avatar] = useState<string>(``)
    const [avatar_title, set_avatar_title] = useState<string>(``)

    const [showAvatarModel, set_avatarModalShow] = useState<boolean>(false)
    const [disableAvatarModalBtns, setDisableToAvatarModalBtns] = useState<boolean>(false)

    const hide_avatar_modal = () => set_avatarModalShow(false)
    const handleAvatarModalShow = () => set_avatarModalShow(true)

    const change_end_user_avatar = (url: string) => {
        set_avatar(url)
    }

    const change_avatar_title = (avatar_title: string) => {
        set_avatar_title(avatar_title)
    }

    const check_password = () => {
        switch (url_language.toUpperCase() === `EN-US`) {
            case password.length < 7:
                set_password_min_len_color(`list-group-item-danger`)
                break
            case password.length >= 8:
                set_password_min_len_color(`list-group-item-success`)
                break
            default:
        }
        switch (url_language.toUpperCase() === `EN-US`) {
            case !/(?=.*[a-z])/.test(password):
                set_password_lowercase_color(`list-group-item-danger`)
                break
            case /(?=.*[a-z])/.test(password):
                set_password_lowercase_color(`list-group-item-success`)
                break
            default:
        }
        switch (url_language.toUpperCase() === `EN-US`) {
            case !/(?=.*\d)/.test(password):
                set_password_numericcase_color(`list-group-item-danger`)
                break
            case /(?=.*\d)/.test(password):
                set_password_numericcase_color(`list-group-item-success`)
                break
            default:
        }
        switch (url_language.toUpperCase() === `EN-US`) {
            case !/(?=.*[A-Z])/.test(password):
                set_password_uppercase_color(`list-group-item-danger`)
                break
            case /(?=.*[A-Z])/.test(password):
                set_password_uppercase_color(`list-group-item-success`)
                break
            default:
        }
        switch (url_language.toUpperCase() === `EN-US`) {
            case !/(?=.*\W)/.test(password):
                set_password_spec_char_color(`list-group-item-danger`)
                break
            case /(?=.*\W)/.test(password):
                set_password_spec_char_color(`list-group-item-success`)
                break
            default:
        }
    }

    const create_form_error = (error: string) => {
        set_submit_button_font_color(`danger`)
        set_alert_text(`${error}`)
        set_alert_color(`danger`)
        set_submit_button_text(`Error`)
        set_lock_form_submit_button(true)
        setTimeout(() => {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.PasswordSubmit}`)
        }, 4000)
    }

    const create_network_error = (error: string) => {
        set_submit_button_font_color(`danger`)
        set_alert_text(`${error}`)
        set_alert_color(`danger`)
        set_submit_button_text(`Error`)
        set_lock_form_submit_button(true)
        setTimeout(() => {
            set_lock_form_submit_button(false)
            set_submit_button_text(`${lbl.PasswordSubmit}`)
        }, 4000)
    }

    const validate_password_input = () => {

        switch (url_language.toUpperCase() === `EN-US`) {
            case !password || password.length === 0 || password === ``:
                create_form_error(`${lbl.MissingPassword}`)
                return false
            case password.length < 7:
                create_form_error(`${lbl.PasswordRequires8MinCharLength}`)
                return false
            case !/(?=.*\d)/.test(password):
                create_form_error(`${lbl.PasswordRequires1Number}`)
                return false
            case !/(?=.*[a-z])/.test(password):
                create_form_error(`${lbl.PasswordRequires1LowCaseLetter}`)
                return false
            case !/(?=.*[A-Z])/.test(password):
                create_form_error(`${lbl.PasswordRequires1UpCaseLetter}`)
                return false
            case !/(?=.*\W)/.test(password):
                create_form_error(`${lbl.PasswordRequires1SpecChar}`)
                return false
            default:
                return true
        }

/*        switch (true) {
            case !password || password.length === 0 || password === ``:
                create_form_error(`l${lbl.MissingPassword}`)
                return false
            case !/(?=.*\W)/.test(password):
                create_form_error(`${lbl.PasswordRequires1SpecChar}`)
                return false
            case !(password.length > 7):
                create_form_error(`${lbl.PasswordRequires8MinCharLength}`)
                return false
            default:
                set_alert_text(null)
                return true

        }*/
    }

    const validate_password_form = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        set_lock_form_submit_button(true)

        set_submit_button_font_color(`info`)
        set_submit_button_text(`${lbl.ValidatingPleaseWait}`)

        if (validate_password_input()) {

            let obj: Email_Register_Confirmation_Payload = {
                email_address: email,
                name: name,
                password: password,
                code: code
            }

            await Validate_Email_Confirmation_Code_With_Email_Server(obj)

            await Validate_Email_Confirmation_Code_With_User_Server(obj)

            setTimeout( async () => {

                set_lock_form_submit_button(false)
                set_alert_color(`success`)
                set_alert_text(`${lbl.Success}`)
                Set_Navigation_Menu_Display(``)

                await Dispatch(Create_End_User_Email_Account(obj))

                setTimeout( async () => {
                    await Dispatch(Set_Navigation_Menu_Display(` `))
                    Navigate.push(`/`)
                }, 1000)

            }, 8000)
        }
    }

    useEffect(() => {

        Dispatch(Set_Navigation_Menu_Display(`none`))

    }, [])

    return (
        <Container>
            <Row className={`${application.settings.alignment}`}>
                <Col className={`p-0`}>
                    <Card className={`moveable ${application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${end_user.custom_design.card_border_color}`,
                            minWidth: `100%`
                        }}
                    >
                        <Card.Header className={`${application.settings.text_alignment}`}
                            style={{
                                backgroundColor: `${end_user.custom_design.card_header_background_color}`,
                                color: `${end_user.custom_design.card_header_font_color}`,
                                fontFamily: `${end_user.custom_design.card_header_font}`
                            }}
                        >
                            <h1> {lbl.EmailPasswordRequirement} </h1>
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
                                    <p>{`${email.toUpperCase()}`}</p>
                                    <Col lg={6}>
                                        <Container>
                                            <Row className="justify-content-center text-center mb-3">
                                                <Col>
                                                    <ListGroup>
                                                        <ListGroup.Item className={password_numericcase_color}>
                                                            <Container>
                                                                <Row>
                                                                    <Col md={2} className="password-register-check-password-icon col-1"></Col>
                                                                    <Col className="p-1">
                                                                        {lbl.PasswordRequires1Number}
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className={password_lowercase_color}>
                                                            <Container>
                                                                <Row>
                                                                    <Col md={2} className="password-register-check-password-icon col-1"></Col>
                                                                    <Col className="p-1">
                                                                        {lbl.PasswordRequires1LowCaseLetter}
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className={password_uppercase_color}>
                                                            <Container>
                                                                <Row>
                                                                    <Col md={2} className="password-register-check-password-icon col-1"></Col>
                                                                    <Col className="p-1">
                                                                        {lbl.PasswordRequires1UpCaseLetter}
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className={password_spec_char_color}>
                                                            <Container>
                                                                <Row>
                                                                    <Col md={2} className="password-register-check-password-icon col-1"></Col>
                                                                    <Col className="p-1">
                                                                        {lbl.PasswordRequires1SpecChar}
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className={password_min_len_color}>
                                                            <Container>
                                                                <Row>
                                                                    <Col md={2} className="password-register-check-password-icon col-1"></Col>
                                                                    <Col className="p-1">
                                                                        {lbl.PasswordRequires8MinCharLength}
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                    <Col lg={6}>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <Form noValidate onSubmit={validate_password_form}>
                                                        {/*<Button onClick={() => handleAvatarModalShow()} aria-controls="set an avatar" className="mb-3" > {lbl.UploadPhotoAvatar } </Button>*/}
                                                        <Form.Group className="mb-3" controlId="register_name">
                                                            <p>{lbl.AccountName}</p>
                                                            <Form.Control
                                                                type="text"
                                                                name="name"
                                                                value={name}
                                                                className="text-center"
                                                                onChange={(e) => set_name(e.target.value)}
                                                                placeholder=""
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="register_password">
                                                            <p>{lbl.AccountPassword}</p>
                                                            <Form.Control
                                                                type="password"
                                                                name="password"
                                                                value={password}
                                                                className="text-center"
                                                                onChange={(e) => set_password(e.target.value)}
                                                                onKeyUp={() => { check_password() }}
                                                                placeholder=""
                                                            />
                                                        </Form.Group>
                                                        <Button variant={submit_button_font_color} type="submit" className="mx-auto mb-3" disabled={lock_form_submit_button}>
                                                            {submit_button_text}
                                                        </Button>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        {alert_text ?
                            <Card.Footer className="text-center">
                                <Row>
                                    <Col>
                                        <Alert variant={alert_color}>{alert_text}</Alert>
                                    </Col>
                                </Row>
                            </Card.Footer>
                            : null}
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
                                        console.log(e)
                                    }}>
                                        <Accordion.Header>{lbl.PasteURL}</Accordion.Header>
                                        <Accordion.Body>
                                            <InputGroup className="mb-3" style={{ zIndex: 0 }}>
                                                <InputGroup.Text id="inputGroup-sizing-lg">{lbl.URL}</InputGroup.Text>
                                                <Form.Control
                                                    id="avatar-path"
                                                    aria-label="avatar url"
                                                    aria-describedby="avatar url"
                                                    onChange={(e) => { change_end_user_avatar(e.currentTarget.value) }}
                                                />
                                            </InputGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" onClick={() => {
                                        console.log(`todo`)
/*                                        set_avatar(``)
                                        document.getElementById(`filename`).value = ``
                                        document.getElementById(`avatar-path`).value = ``
                                        document.getElementById(`avatar-title`).value = ``*/

                                    }}>
                                        <Accordion.Header>{lbl.UploadPhoto}</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group controlId="formFileLg" className="mb-3">
                                                <InputGroup className="mb-3 justify-content-end" style={{ zIndex: 0 }}>
                                                    <input type="file" id="filename" name="filename" />
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

const mapStateToProps = (state: Current_Redux_State): Password_Register_Props => ({
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
})

export default Password_Register
