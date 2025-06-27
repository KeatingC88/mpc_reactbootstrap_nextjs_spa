"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@Redux_Thunk/Provider'
import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import {
    Alert, Container, Row, Col, Card, Form, Button, Image,
    ListGroup, InputGroup, Tabs, Tab, Modal, ListGroupItem, DropdownButton, Dropdown, Accordion
} from 'react-bootstrap'

import {
    Send_WebSocket_Chat_Message,
    Approve_Chat_For_End_User,
    Block_Chat_For_End_User,
    Read_All_End_User_WebSocket_Conversation_Permissions_And_Profile_Data_For_WebSocket_Chat_View,
    Get_End_User_Chat_History_With_Other_User_ID,
    Authenticate_End_Users_Permissions,
    Report_Spam_Content,
    Report_Abusive_Content,
    Report_Disruptive_Behavior,
    Report_Self_Harm_Content,
    Report_Illegal_Content,
    Report_Harrass_Chat,
    Report_Misleading_Chat,
    Report_Threat_Chat,
    Report_Nudity_Content,
    Report_Fake_Account,
    Report_Hate_Content,
    Reject_Chat_For_End_User
} from '@Redux_Thunk/Actions/WebSocket/Direct_Chat'

import {
    Delay_Execution
} from '@Redux_Thunk/Actions/Misc'

const WebSocket_Chat = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [chat_tab_key, set_chat_tab_key] = useState<string | null>('')
    const [accordion_key, set_accordion_key] = useState<string | null | string[]>(null)

    const [end_user_text_message_input, set_end_user_message_input] = useState<string>(``)

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [launcher_display, set_launcher_display] = useState<boolean>(false)

    const update_inputs = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.KeyboardEvent<HTMLElement>
    ) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement

        if ('name' in target && 'value' in target) {
            switch (target.name) {
                case 'websocketchat-inputtext':
                    set_end_user_message_input(target.value)
                    break
                default:
                    break
            }
        }
    }

    const [end_user_action_modal, set_end_user_action_modal] = useState<boolean>(false)

    const create_error_alert = (message: string | null) => {
        set_alert_color(`danger`)
        set_alert_text(`${message}`)
        Delay_Execution(new Date().getTime() + 3000, (async () => {
            set_alert_text(``)
            set_alert_color(``)
        }))
    }

    const create_success_alert = (message: string) => {
        set_alert_color(`success`)
        set_alert_text(`${message}`)
        Delay_Execution(new Date().getTime() + 3000, (async () => {
            set_alert_text(``)
            set_alert_color(``)
        }))
    }

    const create_information_alert = (message: string) => {
        set_alert_color(`info`)
        set_alert_text(`${message}`)
        Delay_Execution(new Date().getTime() + 8000, (async () => {
            set_alert_text(``)
            set_alert_color(``)
        }))
    }

    const chat_accordion_close = async (id: BigInt | null) => {
        if (id) {

            await Dispatch(Send_WebSocket_Chat_Message({
                user: id,
                message: `${lbl.HasLeftTheChat}`
            }))

        }
    }

    const handle_accordion = (key: string | null | string[]) => {
        if (key === null && accordion_key && typeof accordion_key === "string") {

            set_accordion_key(null)
            chat_accordion_close(BigInt(accordion_key.split(`-`)[2]))

        } else {

            if (typeof key === "string") {
                set_accordion_key(key)
                chat_accordion_show(BigInt(key.split(`-`)[2]))
            }

        }
    }

    const chat_accordion_show = async (id: BigInt) => {
        set_end_user_message_input(``)

        await Dispatch(Authenticate_End_Users_Permissions({
            id: id,
            message: undefined
        })).then((obj: any) => {

            setTimeout(async() => {
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
                        await Dispatch(Get_End_User_Chat_History_With_Other_User_ID(id))
                        await Dispatch(Send_WebSocket_Chat_Message({
                            user: id,
                            message: `${lbl.HasJoinedTheChat}`
                        }))
                    default:
                        break
                }

            }, 1000)

        })
    }

    const DecreaseChatFont = () => {
        //DecreaseChatFont()
    }

    const IncreaseChatFont = () => {
        //IncreaseChatFont()
    }

    const prepare_message_to_be_sent = async ({ id }: {
        id: BigInt
    }) => {

        await Dispatch(Send_WebSocket_Chat_Message({
            user: id,
            message: end_user_text_message_input
        }))

        set_end_user_message_input(``)
    }

    const handle_chat_launcher_display = async () => {
        await Dispatch(Read_All_End_User_WebSocket_Conversation_Permissions_And_Profile_Data_For_WebSocket_Chat_View()).then(() => {
            set_launcher_display(true)
        })
    }

    const approve_chat_for_end_user = async (id: BigInt) => {
        await Dispatch(Approve_Chat_For_End_User(id))
        set_end_user_action_modal(false)
        create_success_alert(`${lbl.SuccessfullyApproved}`)
    }

    const reject_chat_for_end_user = async (id: BigInt) => {
        await Dispatch(Reject_Chat_For_End_User(id))
        set_end_user_action_modal(false)
        create_information_alert(`${lbl.ChatInvitationWasRejected}`)
    }

    const report_spam_content = async (id: BigInt) => {
        await Dispatch(Report_Spam_Content(id))
        set_end_user_action_modal(false)
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_abusive_content = async (id: BigInt) => {
        await Dispatch(Report_Abusive_Content(id))
        set_end_user_action_modal(false)
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_disruptive_behavior = async (id: BigInt) => {
        await Dispatch(Report_Disruptive_Behavior(id))
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const block_chat_for_end_user = async (id: BigInt) => {
        await Dispatch(Block_Chat_For_End_User(id))
        set_end_user_action_modal(false)
        create_success_alert(`${lbl.SuccessfullyBlocked} ${id}.`)
    }

    const report_self_harm_content = async (id: BigInt) => {
        await Dispatch(Report_Self_Harm_Content(id))
        set_end_user_action_modal(false)
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_illegal_content = async (id: BigInt) => {
        await Dispatch(Report_Illegal_Content(id))
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_harass_chat = async (id: BigInt) => {
        await Dispatch(Report_Harrass_Chat(id))
        set_end_user_action_modal(false)
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_misleading_chat = async (id: BigInt) => {
        await Dispatch(Report_Misleading_Chat(id))
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_threat_chat = async (id: BigInt) => {
        await Dispatch(Report_Threat_Chat(id))
        set_end_user_action_modal(false)
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_nudity_content = async (id: BigInt) => {
        await Dispatch(Report_Nudity_Content(id))
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_fake_account = async (id: BigInt) => {
        await Dispatch(Report_Fake_Account(id))
        set_end_user_action_modal(false)
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    const report_hate_content = async (id: BigInt) => {
        await Dispatch(Report_Hate_Content(id))
        create_success_alert(`${lbl.SuccessfullyReported} ${id}.`)
    }

    (() => {

        if (props.error.network.id === "Validate-With-Email-Server-Failed") {
            setTimeout(() => {
                create_error_alert(props.error.network.id)
            }, 1)
        }

        if (Path === `/`) {
            set_card_width(``)
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
                            <h1> {lbl.Messenger}</h1>
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${props.end_user.custom_design.card_body_background_color}`,
                                color: `${props.end_user.custom_design.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_body_font}`
                            }}
                        >
                            <Row className="justify-content-center text-center">
                                <Col>
                                    {!launcher_display ? (
                                        <Button onClick={() => { handle_chat_launcher_display() }}>{lbl.Open}</Button>
                                    ) : (
                                        <Tabs
                                            id="websocket-one-to-one-chat-menu"
                                            activeKey={chat_tab_key ? chat_tab_key : ''}
                                            onSelect={(k) => { set_chat_tab_key(k) }}
                                            className="mb-3"
                                            justify
                                        >

                                            {props.application.websocket.conversation_sent_requests &&
                                                <Tab eventKey="chat_sent_requests" title={`${lbl.Invitation} ${props.application.websocket.conversation_sent_requests.length}`}>
                                                    <ListGroup key="chat_sent_requests">
                                                        {props.application.websocket.conversation_sent_requests.map((x) => (
                                                            <ListGroupItem key={`outbound-chat-listgroup-${x.User_ID}`}>
                                                                {lbl.ChatInvitationSentTo} {x.name.split(`#`)[0]}
                                                                <br />
                                                            </ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                </Tab>
                                            }

                                            {props.application.websocket.conversation_received_requests &&
                                                <Tab eventKey="chat_received_requests" title={`${lbl.Requests} ${props.application.websocket.conversation_received_requests.length}`}>
                                                    <ListGroup key="chat_received_requests">
                                                        {props.application.websocket.conversation_received_requests.map((x) => (                                                       
                                                            <ListGroupItem key={`inbound-chat-listgroup-${x.User_ID}`}>
                                                                <h4>{lbl.ChatInvitationFrom} {x.name.split(`#`)[0]}</h4>
                                                                <br />
                                                                <Button className="btn" type="button" onClick={() => { approve_chat_for_end_user(x.User_ID) }}>{lbl.AcceptInvite}</Button>
                                                                <Button className="btn" type="button" onClick={() => { reject_chat_for_end_user(x.User_ID) }}>{lbl.RejectInvite}</Button>
                                                                <br />
                                                                <Button className="btn" type="button" onClick={() => { block_chat_for_end_user(x.User_ID) }}>{lbl.BlockInvite}</Button>
                                                                <br />
                                                                <DropdownButton title={`${lbl.ReportUser}`} drop="up">
                                                                    <Dropdown.Item onClick={() => { report_spam_content(x.User_ID) }}>{lbl.Spam}</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { report_abusive_content(x.User_ID) }}>{lbl.Abuse}</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { report_hate_content(x.User_ID) }}>{lbl.HateSpeech}</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { report_fake_account(x.User_ID) }}>{lbl.FakeAccount}</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { report_nudity_content(x.User_ID) }}>{lbl.Nudity}</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { report_threat_chat(x.User_ID) }}>{lbl.Threat}</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { report_misleading_chat(x.User_ID) }}>{lbl.Misleading}</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { report_harass_chat(x.User_ID) }}>{lbl.Harrassing}</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { report_disruptive_behavior(x.User_ID) }}>{lbl.Disruptive}</Dropdown.Item>
                                                                </DropdownButton>
                                                            </ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                    {alert_text ?
                                                        <Row>
                                                            <Col className="text-center">
                                                                <Alert variant={alert_color}>{alert_text}</Alert>
                                                            </Col>
                                                        </Row>
                                                        : null}
                                                </Tab>
                                            }

                                            {props.application.websocket.conversation_sent_approvals &&
                                                    <Tab eventKey={`chat_sent_approvals`} title={`${lbl.Chat} ${(props.application.websocket.conversation_sent_approvals.length + props.application.websocket.conversation_received_approvals.length)}`}>
                                                        <Accordion activeKey={accordion_key} onSelect={(selected_key) => {
                                                            if (selected_key) {
                                                                handle_accordion(selected_key)
                                                            } else {
                                                                handle_accordion(null)
                                                            }
                                                        }}>

                                                        {props.application.websocket.conversation_sent_approvals.map((x) => (
                                                            <Accordion.Item eventKey={`wschat-eventkey-${x.Participant_ID}`} key={`wschat-key-${x.Participant_ID}`}>
                                                                <Accordion.Header>
                                                                    {`${x.name.split(`#`)[0].toUpperCase()} ID: ${x.Participant_ID}`}
                                                                </Accordion.Header>
                                                                <Accordion.Body>
                                                                    <Row className="mb-3">
                                                                        <Col xs={2}>
                                                                            <DropdownButton title={`${lbl.ReportUser}`}>
                                                                                <Dropdown.Item onClick={() => { block_chat_for_end_user(x.Participant_ID) }}>{lbl.Block}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_spam_content(x.Participant_ID) }}>{lbl.Spam}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_abusive_content(x.Participant_ID) }}>{lbl.Abuse}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_hate_content(x.Participant_ID) }}>{lbl.HateSpeech}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_fake_account(x.Participant_ID) }}>{lbl.FakeAccount}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_nudity_content(x.Participant_ID) }}>{lbl.Nudity}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_threat_chat(x.Participant_ID) }}>{lbl.Threat}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_misleading_chat(x.Participant_ID) }}>{lbl.Misleading}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_harass_chat(x.Participant_ID) }}>{lbl.Harrassing}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_illegal_content(x.Participant_ID) }}>{lbl.Illegal}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_self_harm_content(x.Participant_ID) }}>{lbl.SelfHarm}</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => { report_disruptive_behavior(x.Participant_ID) }}>{lbl.Disruptive}</Dropdown.Item>
                                                                            </DropdownButton>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col lg={12} md={12} sm={12} xs={12}>
                                                                           
                                                                            {props.application.websocket.chat_conversations[parseInt(x.Participant_ID.toString())] &&
                                                                                <ListGroup className={`pb-5 pt-1 pl-1 pr-1 ws-viewer-chatbox-${x.Participant_ID}`} style={{ maxHeight: 300, overflow: `auto` }}>
                                                                                    <ListGroupItem>{lbl.Loading}</ListGroupItem>
                                                                                </ListGroup>
                                                                            }

                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col>
                                                                            <Form noValidate
                                                                                    onKeyDown={(e) => {
                                                                                        if(e.code === "Enter" && e.shiftKey === false)
                                                                                            prepare_message_to_be_sent({ id: x.Participant_ID })
                                                                                    }
                                                                                }
                                                                            >
                                                                                <InputGroup className="mb-3">
                                                                                    <Form.Control as="textarea" rows={1}
                                                                                        name="websocketchat-inputtext"
                                                                                        placeholder=""
                                                                                        value={end_user_text_message_input}
                                                                                        className="mx-auto"
                                                                                        onKeyDown={(e) => update_inputs(e)}
                                                                                        onChange={(e) => update_inputs(e)}
                                                                                    />
                                                                                </InputGroup>
                                                                                <Button variant="info" name="submit-button" className="mx-auto"
                                                                                    onClick={() => {
                                                                                        prepare_message_to_be_sent({ id: x.Participant_ID })
                                                                                    }}
                                                                                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                                                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                                                                                    </svg> {lbl.Send}
                                                                                </Button>
                                                                            </Form>
                                                                        </Col>
                                                                    </Row>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                            ))}

                                                            {props.application.websocket.conversation_received_approvals.map((x) => (
                                                                <Accordion.Item eventKey={`wschat-eventkey-${x.User_ID}`} key={`wschat-key-${x.User_ID}`}>
                                                                    <Accordion.Header>
                                                                        {x.name.split(`#`)[0].toUpperCase()}
                                                                    </Accordion.Header>
                                                                    <Accordion.Body>
                                                                        <Row className="mb-3">
                                                                            <Col xs={2}>
                                                                                <DropdownButton title={`${lbl.ReportUser}`}>
                                                                                    <Dropdown.Item onClick={() => { block_chat_for_end_user(x.User_ID) }}>{lbl.Block}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_spam_content(x.User_ID) }}>{lbl.Spam}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_abusive_content(x.User_ID) }}>{lbl.Abuse}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_hate_content(x.User_ID) }}>{lbl.HateSpeech}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_fake_account(x.User_ID) }}>{lbl.FakeAccount}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_nudity_content(x.User_ID) }}>{lbl.Nudity}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_threat_chat(x.User_ID) }}>{lbl.Threat}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_misleading_chat(x.User_ID) }}>{lbl.Misleading}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_harass_chat(x.User_ID) }}>{lbl.Harrassing}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_illegal_content(x.User_ID) }}>{lbl.Illegal}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_self_harm_content(x.User_ID) }}>{lbl.SelfHarm}</Dropdown.Item>
                                                                                    <Dropdown.Item onClick={() => { report_disruptive_behavior(x.User_ID) }}>{lbl.Disruptive}</Dropdown.Item>
                                                                                </DropdownButton>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col lg={12} md={12} sm={12} xs={12}>

                                                                                {props.application.websocket.chat_conversations[parseInt(x.User_ID.toString())] &&
                                                                                    <ListGroup className={`pb-5 pt-1 pl-1 pr-1 ws-viewer-chatbox-${x.User_ID}`} style={{ maxHeight: 300, overflow: `auto` }}>
                                                                                        <ListGroupItem>{lbl.Loading}</ListGroupItem>
                                                                                    </ListGroup>
                                                                                }

                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col>
                                                                                <Form noValidate
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.code === "Enter" && e.shiftKey === false)
                                                                                            prepare_message_to_be_sent({
                                                                                                id: x.User_ID
                                                                                            })
                                                                                    }}
                                                                                >
                                                                                    <InputGroup className="mb-3">
                                                                                        <Form.Control as="textarea" rows={1}
                                                                                            name="websocketchat-inputtext"
                                                                                            placeholder=""
                                                                                            value={end_user_text_message_input}
                                                                                            className="mx-auto"
                                                                                            onKeyDown={(e) => update_inputs(e)}
                                                                                            onChange={(e) => update_inputs(e)}
                                                                                        />
                                                                                    </InputGroup>

                                                                                    <Button variant="info" name="submit-button" className="mx-auto"
                                                                                        onClick={() => {
                                                                                            prepare_message_to_be_sent({
                                                                                                id: x.User_ID
                                                                                            })

                                                                                        }}
                                                                                    >
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                                                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                                                                                        </svg>
                                                                                        {lbl.Send}
                                                                                    </Button>
                                                                                </Form>
                                                                            </Col>
                                                                        </Row>
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            ))}

                                                    </Accordion>
                                                </Tab>
                                            }

                                            {props.application.websocket.conversation_sent_blocks &&
                                                <Tab eventKey="chat_sent_blocked" title={`${lbl.BlockedBy} ${props.application.websocket.conversation_sent_blocks.length}`}>
                                                    <ListGroup key="chat_sent_blocked">
                                                        {props.application.websocket.conversation_sent_blocks.map((x) => (
                                                            <ListGroupItem key={`blocked-chat-listgroup-${x.Participant_ID}`}>
                                                                {x.name}
                                                            </ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                </Tab>
                                            }

                                            {props.application.websocket.conversation_received_blocks &&
                                                <Tab eventKey="chat_received_blocked" title={`${lbl.Blocking} ${props.application.websocket.conversation_received_blocks.length}`}>
                                                    <ListGroup key="chat_received_blocked">
                                                        {props.application.websocket.conversation_received_blocks.map((x) => (
                                                            <ListGroupItem key={`blocked-chat-listgroup-${x.User_ID}`}>
                                                                {x.name}
                                                            </ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                </Tab>
                                            }

                                        </Tabs>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default WebSocket_Chat