"use client"

import React, { useState, useEffect } from 'react'

import { Alert, Row, Col, Card, Form, ListGroup, Button, Image, Table, Modal, InputGroup, Container } from 'react-bootstrap'

import { Load_Profile_Viewer_Data } from '@Redux_Thunk/Actions/Community/Load'

import { useRouter, usePathname } from 'next/navigation'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '@Redux_Thunk/Provider'
import { Redux_Thunk_Core } from '@Redux_Thunk/Core'

import {
    Send_WebSocket_Chat_Message,
    Authenticate_End_Users_Permissions,
    Get_End_User_Chat_History_With_Other_User_ID,
    WebSocket_Direct_Chat_Connection,
    Block_Chat_For_End_User,
    Report_Abusive_Content,
    Report_Spam_Content
} from '@Redux_Thunk/Actions/WebSocket/Direct_Chat'

import { Delay_Execution } from '@Redux_Thunk/Actions/Misc'

const Profile_View = () => {

    const props = useSelector(Redux_Thunk_Core)
    
    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [card_width, set_card_width] = useState<string>(`100%`)
    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const [reported_reason_from_end_user_input, set_reported_reason_from_end_user_input] = useState<string | null>(null)

    const [submit_button_color, set_submit_button_color] = useState<string>(`primary`)
    const [lock_submit_button_value, set_lock_submit_button_value] = useState<boolean>(false)
    const [submit_button_text, set_submit_button_text] = useState<string>(lbl.ReportUser)

    const [disable_end_user_profile_button, set_disable_end_user_profile_button] = useState<boolean>(false)
    const [end_user_message_input_value, set_end_user_message_input_value] = useState<string>(``)

    const [profile_id, set_profile_id] = useState<bigint>(() => {
        const last = Path.split("/").pop();
        return last !== undefined ? BigInt(last) : BigInt("0n");
    })

    const [created_on_value, set_created_on_value] = useState<string>(``)

    const create_success_alert = (message: string) => {
        set_alert_color(`success`)
        set_alert_text(`${message}`)
        setTimeout(() => {
            set_alert_text(``)
            set_alert_color(``)
        }, 3000)
    }

    const create_information_alert = (message: string) => {
        set_alert_color(`info`)
        set_alert_text(`${message}`)
        setTimeout(() => {
            set_alert_text(``)
            set_alert_color(``)
        }, 3000)
    }

    const create_error_alert = (error: string) => {
        set_submit_button_color(`danger`)
        set_alert_text(`${error}`)
        set_alert_color(`danger`)
        set_submit_button_text(`Error`)
        set_lock_submit_button_value(true)
        setTimeout(() => {
            set_submit_button_text(`${submit_button_text}`)
            set_lock_submit_button_value(false)
        }, 3000)
    }

    const [report_chat_modal_value, set_report_chat_modal_value] = useState<boolean>(false)

    const [chat_modal_visibility_value, set_chat_modal_visibility_value] = useState<boolean>(false)

    const close_end_user_chat_modal = () => {

        set_chat_modal_visibility_value(false)

        Send_WebSocket_Chat_Message({
            user: profile_id,
            message: `has left the profile-viewer chat.`
        })

    }

    const show_the_end_user_the_profile_chat_modal = async () => {

        let path_is_defined = Path.split("/").pop()

        if (path_is_defined) {

            await Dispatch(Authenticate_End_Users_Permissions({
                id: BigInt(path_is_defined),
                message: `${lbl.HasJoinedTheChat}`
            })).then((obj: any) => {

                Delay_Execution(new Date().getTime() + 2000, (async () => {

                    switch (true) {
                        case obj.blocked === 1:
                            create_information_alert(`${lbl.AwaitingForUserToUnblockChat}`)
                            break
                        case obj.requested === 1:
                            create_information_alert(`${lbl.AwaitingForUserToAcceptTheChatRequest}`)
                            break
                        case obj.approved === 1:
                            delete obj.approved
                            delete obj.blocked
                            delete obj.requested
                            obj.message = null

                            const participant_id_from_url = Path.split("/").pop()

                            if (participant_id_from_url) {
                                const participant_id = BigInt(participant_id_from_url)
                                Dispatch(Get_End_User_Chat_History_With_Other_User_ID(participant_id))
                                obj.id = obj.id.toString()
                                WebSocket_Direct_Chat_Connection(JSON.stringify(obj))
                                set_chat_modal_visibility_value(true)
                            }

                        default:
                            break
                    }

                }))

            })
        }

    }

    const DecreaseChatFont = () => {
        //DecreaseChatFont()
    }

    const IncreaseChatFont = () => {
        //IncreaseChatFont()
    }

    const block_chat_for_end_user = () => {

        const participant_id_from_url = Path.split("/").pop()

        if (participant_id_from_url) {
            const participant_id = BigInt(participant_id_from_url)
            Dispatch(Block_Chat_For_End_User(participant_id))
            close_end_user_chat_modal()
            set_report_chat_modal_value(false)
            Navigate.push('/community')
        }

    }

    const report_abusive_content_for_end_user = () => {

        const participant_id_from_url = Path.split("/").pop()

        if (participant_id_from_url) {
            const participant_id = BigInt(participant_id_from_url)
            Dispatch(Report_Abusive_Content(participant_id))
            close_end_user_chat_modal()
            set_report_chat_modal_value(false)
            Navigate.push('/community')
        }

    }

    const report_spam_content_for_end_user = () => {

        const participant_id_from_url = Path.split("/").pop()

        if (participant_id_from_url) {
            const participant_id = BigInt(participant_id_from_url)
            Dispatch(Report_Spam_Content(participant_id))
            close_end_user_chat_modal()
            set_report_chat_modal_value(false)
            Navigate.push('/community')
        }

    }

    const update_inputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const input = e.target

        switch (input.name) {
            case 'websocket-input-textbox':
                set_end_user_message_input_value(input.value)
                break
            case 'report-reason-input-textbox':
                set_reported_reason_from_end_user_input(input.value)
                break
            default:
        }
    }

    const prepare_end_user_message_to_be_sent = (e: React.MouseEvent<HTMLButtonElement | MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (end_user_message_input_value !== ``) {

            Send_WebSocket_Chat_Message({
                user: profile_id,
                message: end_user_message_input_value
            })

            set_end_user_message_input_value(``)
        }
    }

    const report_abuse_from_profile_viewer_page = () => {
        set_lock_submit_button_value(true)
        set_submit_button_color(`info`)
        set_submit_button_text(`${lbl.ValidatingPleaseWait}`)
        switch (true) {
/*            case reported_reason_from_end_user_input.length <= 20:
                create_error_alert(`${lbl.SummaryRequiresAtleastAParagraph}`)
                break*/
            default:
                set_alert_text(``)
                Dispatch(Report_Abusive_Content(profile_id))
                set_submit_button_color(`success`)
                set_submit_button_text(`${lbl.Success}`)
                setTimeout(() => {
                    set_report_chat_modal_value(false)
                }, 2000)
        }
    }

    useEffect(() => {
        Dispatch(Load_Profile_Viewer_Data(profile_id)).then(() => {
            if (props.application.community.profile_viewer?.created_on)
                set_created_on_value(new Date(props.application.community.profile_viewer?.created_on * 1000).toString())
        })

        if (profile_id === props.end_user.account.id) {
            set_disable_end_user_profile_button(true)
        }

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
                            <h1>{props.application.community.profile_viewer.name}</h1>
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${props.end_user.custom_design.card_body_background_color}`,
                                color: `${props.end_user.custom_design.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_body_font}`
                            }}
                        >
                            <Row>
                                <Col style={{ margin: `auto` }}>
                                    {props.end_user.account.avatar_url_path &&
                                        <center>
                                            <Image src={`${props.end_user.account.avatar_url_path}`} thumbnail height="124" width="124" />
                                        </center>
                                    }
                                    {!props.end_user.account.avatar_url_path &&
                                        <center>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" fill="currentColor" className="bi-person-circle d-inline-block align-top mt-2 rounded-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                            </svg>
                                        </center>
                                    }
                                </Col>
                                <Col>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>{lbl.ID}#</th>
                                                <th>{lbl.DisplayName}</th>
                                                <th>{lbl.CreatedOn}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{props.application.community.profile_viewer.id?.toString()}</td>
                                                <td>{props.application.community.profile_viewer.name}</td>
                                                <td>{created_on_value}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {alert_text ? <Row><Col><Alert className="text-center" variant={alert_color}>{alert_text}.</Alert></Col></Row> : null}
                                    <Table striped bordered hover variant="dark">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Button variant="success" onClick={() => { show_the_end_user_the_profile_chat_modal() }} disabled={disable_end_user_profile_button}>
                                                        {props.application.settings.theme === 0 ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                                                                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Chat}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                                                                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Chat}
                                                            </>
                                                        )}
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col className="text-center">
                                    <Button onClick={() => { set_report_chat_modal_value(true) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
                                            <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                                        </svg><h6>{lbl.ReportUser}</h6>
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Modal size="lg" show={report_chat_modal_value} onHide={() => { set_report_chat_modal_value(false) }}>
                <Modal.Header closeButton>
                    <h3>{lbl.ReportUser}?</h3>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="report-user-reason-input">
                                    {lbl.Summary}:
                                </InputGroup.Text>
                                <Form.Control as="textarea" rows={3} name="report-reason-input-textbox" aria-describedby="report internal broken link text input" onChange={(e) => update_inputs(e)} />
                            </InputGroup>
                            <h5>{lbl.PleaseIncludeDescriptiveDetailSummaryWithImagesAndShortAudioOrVideoAndDateAndTimeIfPossible}.</h5>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col>
                                <center>
                                    <Button onClick={() => { report_abuse_from_profile_viewer_page() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
                                            <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                                        </svg><h6>{lbl.Report}</h6>
                                    </Button>
                                </center>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
            <Modal show={chat_modal_visibility_value} onHide={() => { close_end_user_chat_modal() }}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.ChatWithUser} ({props.application.community.profile_viewer.name})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={10} md={8} sm={9} xs={10}>
                            <ListGroup id="wsprofileviewer-modal-chatbox" style={{ maxHeight: 200, minWidth: 475, overflow: `auto` }}></ListGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col className="text-center">
                            <Form noValidate onSubmit={(e) => { prepare_end_user_message_to_be_sent(e) }}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="websocket-input-textbox"
                                        value={end_user_message_input_value}
                                        className="mx-auto"
                                        onChange={(e) => update_inputs(e)} />
                                </InputGroup>
                                <Button variant="info" name="submit-button" className="mx-auto" onClick={(e) => { prepare_end_user_message_to_be_sent(e) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                                    </svg> {lbl.Send}
                                </Button>
                                <Button variant="info" name="submit-button" className="mx-auto" onClick={() => { IncreaseChatFont() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>
                                </Button>
                                <Button variant="info" name="submit-button" className="mx-auto" onClick={() => { DecreaseChatFont() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                    </svg>
                                </Button>
                                <Button variant="danger" onClick={() => { block_chat_for_end_user() }}>
                                    {lbl.Block}
                                </Button>
                                <Button variant="danger" onClick={() => { report_spam_content_for_end_user() }}>
                                    {lbl.Spam}
                                </Button>
                                <Button variant="danger" onClick={() => { report_abusive_content_for_end_user() }}>
                                    {lbl.Abuse}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Profile_View