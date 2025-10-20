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
    ListGroup,
    Modal,
    Form,
    InputGroup,
    FloatingLabel
} from 'react-bootstrap'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'
import { usePathname } from 'next/navigation'

import {
    Request_Friend,
    Reject_Friend,
    Block_Friend,
    Approve_Friend,
    Load_End_User_Friends,
    Unblock_Friend,
    Unfriend
} from '@Redux_Thunk/Actions/User/Friends'

import {
    Send_WebSocket_Chat_Message,
    Authenticate_End_Users_Permissions,
    Get_End_User_Chat_History_With_Other_User_ID,
    WebSocket_Direct_Chat_Connection,
    Block_Chat_For_End_User
} from '@Redux_Thunk/Actions/WebSocket/Direct_Chat'

import {
    Report_Abusive_Content,
    Report_Spam_Content,
    Report_Disruptive_Behavior,
    Report_Self_Harm_Content,
    Report_Illegal_Content,
    Report_Harrass_Chat,
    Report_Misleading_Chat,
    Report_Threat_Chat,
    Report_Nudity_Content,
    Report_Fake_Account,
    Report_Hate_Content
} from '@Redux_Thunk/Actions/User/Reported'

const End_User_Friends = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [reported_reason_from_end_user_input, set_reported_reason_from_end_user_input] = useState<string>('')

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const [lock_buttons_value, set_lock_buttons_value] = useState<boolean>(false)

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

    const create_information_alert = (message: string) => {
        set_alert_color(`info`)
        set_alert_text(`${message}`)
        setTimeout(() => {
            set_alert_text(``)
            set_alert_color(``)
        }, 30000)
    }

    const [report_modal_display_value, set_report_modal_display_value] = useState<boolean>(false)

    const report_friend = (friend_user_id: BigInt) => {
        switch (html_selected_report_type) {
            case "ABUSIVE":
                set_alert_text(``)
                Dispatch(Report_Abusive_Content({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "SPAM":
                set_alert_text(``)
                Dispatch(Report_Spam_Content({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "DISRUPTIVE":
                set_alert_text(``)
                Dispatch(Report_Disruptive_Behavior({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "SELF_HARM":
                set_alert_text(``)
                Dispatch(Report_Self_Harm_Content({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "ILLEGAL":
                set_alert_text(``)
                Dispatch(Report_Illegal_Content({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "HARASSMENT":
                set_alert_text(``)
                Dispatch(Report_Harrass_Chat({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "MISLEADING":
                set_alert_text(``)
                Dispatch(Report_Misleading_Chat({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "THREAT":
                set_alert_text(``)
                Dispatch(Report_Threat_Chat({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "NUDITY":
                set_alert_text(``)
                Dispatch(Report_Nudity_Content({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "FAKE_ACCOUNT":
                set_alert_text(``)
                Dispatch(Report_Fake_Account({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break

            case "HATE_SPEECH":
                set_alert_text(``)
                Dispatch(Report_Hate_Content({
                    participant_id: friend_user_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_report_modal_display_value(false)
                    Navigate.push('/')
                })
                break
        }
    }

    const unfriend = (friend_user_id: BigInt) => {
        create_information_alert(`${lbl.Unfriending}`)
        Dispatch(Unfriend(friend_user_id)).then(() => {
            create_success_alert(`${lbl.Unfriended}`)
        })
    }

    const block_friend_requests = (friend_user_id: BigInt) => {
        create_information_alert(`${lbl.Blocking}`)
        Dispatch(Block_Friend(friend_user_id)).then(() => {
            create_success_alert(`${lbl.BlockedProfile}`)
        })
    }

    const unblock_friend = (friend_user_id: BigInt) => {
        create_information_alert(`${lbl.Unblocking}`)
        Dispatch(Unblock_Friend(friend_user_id)).then(() => {
            create_success_alert(`${lbl.UnblockedThisAccount}`)
        })
    }

    const [html_selected_report_type, set_html_selected_report_type] = useState<string>("")

    const change_selected_report_type = (value: SetStateAction<string>) => {
        set_html_selected_report_type(value)
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
                        <Row>
                            <Col>
                                <br />
                                {user.account?.name ?? "Unknown User"}
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button variant="success"
                                    onClick={() => {
                                        Navigate.push(`/Chat`)
                                    }}
                                    disabled={lock_buttons_value}
                                >
                                    {props.application.settings.theme === 0 ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                            </svg>
                                            <br />
                                            {lbl.Chat}
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                            </svg>
                                            <br />
                                            {lbl.Chat}
                                        </>
                                    )}
                                </Button>
                                <Button variant="success"
                                    onClick={() => {
                                        Navigate.push(`/Profile/View/${user.user_id.toString()}`)
                                    }}
                                    disabled={lock_buttons_value}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                    </svg>
                                    <br />
                                    {lbl.Profile}
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => { unfriend(user.user_id) }}
                                    disabled={lock_buttons_value}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-dash" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                    </svg>
                                    <br />
                                    {lbl.UnFriend}
                                </Button>
                                <Button variant="success"
                                    onClick={() => { unblock_friend(user.account?.user_id) }}
                                    disabled={lock_buttons_value}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-gear justify-content-end" viewBox="0 0 16 16">
                                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                    </svg>
                                    <br />
                                    {lbl.Block}
                                </Button>
                                <Button variant="success"
                                    onClick={() => { report_friend(user.account?.user_id) }}
                                    disabled={lock_buttons_value}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-gear justify-content-end" viewBox="0 0 16 16">
                                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                    </svg>
                                    <br />
                                    {lbl.Report}
                                </Button>
                            </Col>
                        </Row>
                        <Modal size="lg" show={report_modal_display_value} onHide={() => { set_report_modal_display_value(false) }}>
                            <Modal.Header closeButton>
                                <h3>{lbl.ReportUser}?</h3>
                            </Modal.Header>
                            <Modal.Body>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Select
                                            aria-label="Report Selection Menu"
                                            onChange={(event) => { change_selected_report_type(event.target.value) }}
                                            value={html_selected_report_type}
                                            className="report-selection-form mb-5"
                                        >
                                            <option value="">{lbl.Select}</option>
                                            <option value="SPAM">{lbl.Spam}</option>
                                            <option value="ABUSE">{lbl.Abuse}</option>
                                            <option value="HATE_SPEECH">{lbl.HateSpeech}</option>
                                            <option value="FAKE_ACCOUNT">{lbl.FakeAccount}</option>
                                            <option value="NUDITY">{lbl.Nudity}</option>
                                            <option value="THREAT">{lbl.Threat}</option>
                                            <option value="MISLEADING">{lbl.Misleading}</option>
                                            <option value="HARRASSING">{lbl.Harrassing}</option>
                                            <option value="ILLEGAL">{lbl.Illegal}</option>
                                            <option value="SELF_HARM">{lbl.SelfHarm}</option>
                                            <option value="DISRUPTIVE">{lbl.Disruptive}</option>
                                        </Form.Select>
                                        <InputGroup className="mb-3">
                                            <FloatingLabel controlId="Report-Text-Area" label={lbl.Summary}>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    onChange={(e) => set_reported_reason_from_end_user_input(e.target.value)}
                                                />
                                            </FloatingLabel>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Container>
                                    <Row>
                                        <Col>
                                            <center>
                                                <Button
                                                    disabled={lock_buttons_value}
                                                    onClick={() => { report_friend(user.account.user_id) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
                                                        <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                                                    </svg><h6>{lbl.Report}</h6>
                                                </Button>
                                            </center>
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Footer>
                        </Modal>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
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
                                        disabled={lock_buttons_value}
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