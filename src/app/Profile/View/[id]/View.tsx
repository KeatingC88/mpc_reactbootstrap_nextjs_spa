"use client"

import React, { useState, useEffect, SetStateAction } from 'react'

import {
    Alert,
    Row,
    Col,
    Card,
    Form,
    ListGroup,
    Button,
    Image,
    Table,
    Modal,
    InputGroup,
    Container,
    Spinner,
    FloatingLabel
} from 'react-bootstrap'

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

import { Delay_Execution } from '@Redux_Thunk/Actions/Misc'

import {
    Request_Friend,
    Reject_Friend,
    Block_Friend,
    Approve_Friend,
    Load_End_User_Friend_Permissions,
    Unblock_Friend,
    Unfriend
} from '@Redux_Thunk/Actions/User/Friends'

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

    const [reported_reason_from_end_user_input, set_reported_reason_from_end_user_input] = useState<string>('')

    const [submit_button_color, set_submit_button_color] = useState<string>(`primary`)
    const [lock_submit_button_value, set_lock_submit_button_value] = useState<boolean>(false)
    const [friend_notification_complete, set_friend_notification_complete] = useState<boolean>(false)
    const [submit_button_text, set_submit_button_text] = useState<string>(lbl.ReportUser)

    const [disable_profile_modal_chat_button, set_disable_profile_modal_chat_button] = useState<boolean>(true)
    const [disable_friend_button, set_disable_friend_button] = useState<boolean>(true)
    const [disable_approve_button, set_disable_approve_button] = useState<boolean>(true)
    const [disable_reject_button, set_disable_reject_button] = useState<boolean>(true)
    const [disable_block_button, set_disable_block_button] = useState<boolean>(true)
    const [disable_report_button, set_disable_report_button] = useState<boolean>(true)
    const [friend_permissions_are_complete, set_friend_friend_permissions_are_complete] = useState<boolean>(false)

    const [end_user_message_input_value, set_end_user_message_input_value] = useState<string>(``)

    const [profile_id, set_profile_id] = useState<BigInt>(() => {
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
        }, 30000)
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

    const [report_modal_display_value, set_report_modal_display_value] = useState<boolean>(false)

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
            set_report_modal_display_value(false)
            Navigate.push('/community')
        }

    }

    const report_abusive_content_for_end_user = () => {

        const participant_id_from_url = Path.split("/").pop()

        if (participant_id_from_url) {
            const participant_id = BigInt(participant_id_from_url)
            Dispatch(Report_Abusive_Content({ participant_id: participant_id, reason: undefined }))
            close_end_user_chat_modal()
            set_report_modal_display_value(false)
            Navigate.push('/community')
        }

    }

    const report_spam_content_for_end_user = () => {

        const participant_id_from_url = Path.split("/").pop()

        if (participant_id_from_url) {
            const participant_id = BigInt(participant_id_from_url)
            Dispatch(Report_Spam_Content({ participant_id: participant_id, reason: undefined }))
            close_end_user_chat_modal()
            set_report_modal_display_value(false)
            Navigate.push('/community')
        }

    }

    const update_inputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const input = e.target
        switch (input.name) {
            case 'websocket-input-textbox':
                set_end_user_message_input_value(input.value)
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

    const report_profile = () => {
        set_lock_submit_button_value(true)
        set_submit_button_color(`info`)
        set_submit_button_text(`${lbl.ValidatingPleaseWait}`)
        switch (html_selected_report_type) {
            case "ABUSIVE":
                set_alert_text(``)
                Dispatch(Report_Abusive_Content({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "SPAM":
                set_alert_text(``)
                Dispatch(Report_Spam_Content({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "DISRUPTIVE":
                set_alert_text(``)
                Dispatch(Report_Disruptive_Behavior({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "SELF_HARM":
                set_alert_text(``)
                Dispatch(Report_Self_Harm_Content({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "ILLEGAL":
                set_alert_text(``)
                Dispatch(Report_Illegal_Content({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "HARASSMENT":
                set_alert_text(``)
                Dispatch(Report_Harrass_Chat({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "MISLEADING":
                set_alert_text(``)
                Dispatch(Report_Misleading_Chat({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "THREAT":
                set_alert_text(``)
                Dispatch(Report_Threat_Chat({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "NUDITY":
                set_alert_text(``)
                Dispatch(Report_Nudity_Content({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "FAKE_ACCOUNT":
                set_alert_text(``)
                Dispatch(Report_Fake_Account({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break

            case "HATE_SPEECH":
                set_alert_text(``)
                Dispatch(Report_Hate_Content({
                    participant_id: profile_id,
                    reason: reported_reason_from_end_user_input
                })).then(() => {
                    set_submit_button_color(`success`)
                    set_submit_button_text(`${lbl.Success}`)
                    set_report_modal_display_value(false)
                    set_disable_profile_modal_chat_button(true)
                    set_disable_friend_button(true)
                    set_disable_block_button(true)
                    set_disable_report_button(true)
                    Navigate.push('/')
                })
                break
        }
    }

    const send_friend_request = () => {
        set_disable_friend_button(true)
        set_disable_block_button(true)
        set_disable_report_button(true)
        set_disable_profile_modal_chat_button(true)
        set_disable_profile_modal_chat_button(true)
        create_information_alert(`${lbl.FriendInviteSent}`)
        Dispatch(Request_Friend(profile_id)).then(() => {
            set_disable_block_button(false)
            set_disable_report_button(false)
            set_disable_profile_modal_chat_button(false)
        })
    }

    const reject_friend_request = () => {
        set_disable_friend_button(true)
        set_disable_block_button(true)
        set_disable_report_button(true)
        set_disable_profile_modal_chat_button(true)
        set_disable_approve_button(true)
        set_disable_reject_button(true)
        create_success_alert(`${lbl.FriendRejectionSent}`)
        Dispatch(Reject_Friend(profile_id)).then(() => {
            set_disable_friend_button(false)
            set_disable_block_button(false)
            set_disable_report_button(false)
            set_disable_profile_modal_chat_button(false)
            set_disable_approve_button(false)
            set_disable_reject_button(false)
        })
    }

    const unfriend = () => {
        set_disable_friend_button(true)
        set_disable_block_button(true)
        set_disable_report_button(true)
        set_disable_profile_modal_chat_button(true)
        set_disable_approve_button(true)
        set_disable_reject_button(true)
        create_information_alert(`${lbl.Unfriending}`)
        Dispatch(Unfriend(profile_id)).then(() => {
            set_disable_friend_button(false)
            set_disable_block_button(false)
            set_disable_report_button(false)
            set_disable_profile_modal_chat_button(false)
            set_disable_approve_button(false)
            set_disable_reject_button(false)
            create_success_alert(`${lbl.Unfriended}`)
        })
    }

    const block_friend_requests = () => {
        set_disable_friend_button(true)
        set_disable_block_button(true)
        set_disable_report_button(true)
        set_disable_profile_modal_chat_button(true)
        set_disable_approve_button(true)
        set_disable_reject_button(true)
        create_information_alert(`${lbl.Blocking}`)
        Dispatch(Block_Friend(profile_id)).then(() => {
            set_disable_friend_button(false)
            set_disable_block_button(true)
            set_disable_report_button(false)
            create_success_alert(`${lbl.BlockedProfile}`)
        })
    }

    const unblock_friend = () => {
        set_disable_friend_button(true)
        set_disable_block_button(true)
        set_disable_report_button(true)
        set_disable_profile_modal_chat_button(true)
        set_disable_approve_button(true)
        set_disable_reject_button(true)
        create_information_alert(`${lbl.Unblocking}`)
        Dispatch(Unblock_Friend(profile_id)).then(() => {
            set_disable_profile_modal_chat_button(false)
            set_disable_friend_button(false)
            set_disable_block_button(false)
            set_disable_report_button(false)
            create_success_alert(`${lbl.UnblockedThisAccount}`)
        })
    }

    const approve_friend_requests = () => {
        set_disable_friend_button(true)
        set_disable_block_button(true)
        set_disable_report_button(true)
        set_disable_profile_modal_chat_button(true)
        set_disable_reject_button(true) 
        set_disable_approve_button(true) 
        create_information_alert(`${lbl.AcceptingFriendInvite}`)
        Dispatch(Approve_Friend(profile_id)).then(() => {
            set_disable_block_button(false)
            set_disable_report_button(false)
            set_disable_profile_modal_chat_button(false)
            create_success_alert(`${lbl.SuccessfullyApproved}`)
        })
    }

    const [html_selected_report_type, set_html_selected_report_type] = useState<string>("")

    const change_selected_report_type = (value: SetStateAction<string>) => {
        set_html_selected_report_type(value)
    }

    ( async () => {

        const receivedRequests: any = props.end_user.people?.friends?.received_requests
        const requestData = receivedRequests?.[profile_id.toString()]

        if (!friend_notification_complete && receivedRequests?.hasOwnProperty(profile_id.toString())) {
            create_information_alert(lbl.ThisProfileRequestedToBeFriendsWithYou)
            set_friend_notification_complete(true)
        }

    })()

    useEffect(() => {

        Dispatch(Load_Profile_Viewer_Data(profile_id)).then(() => {
            if (props.application.community.profile_viewer?.created_on)
                set_created_on_value(new Date(props.application.community.profile_viewer.created_on * 1000).toString())
        })

        Dispatch(Load_End_User_Friend_Permissions()).then(() => {
            set_disable_profile_modal_chat_button(false)
            set_disable_friend_button(false)
            set_disable_block_button(false)
            set_disable_report_button(false)
            set_disable_approve_button(false)
            set_disable_reject_button(false)
            set_friend_friend_permissions_are_complete(true)
        })
        
        if (profile_id === props.end_user.account.id) {
            set_disable_profile_modal_chat_button(true)
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
                            {props.end_user.people?.friends?.blocked?.by_other_user_ids &&
                             props.end_user.people?.friends?.blocked?.by_other_user_ids?.indexOf(profile_id) === -1 && (
                                <h1>{lbl.Profile}</h1>
                            )}
                            {props.end_user.people?.friends?.blocked?.by_other_user_ids &&
                             props.end_user.people?.friends?.blocked?.by_other_user_ids?.indexOf(profile_id) > -1 && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" fill="currentColor" className="bi bi-person-fill-slash" viewBox="0 0 16 16">
                                    <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                </svg>
                            )}
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${props.end_user.custom_design.card_body_background_color}`,
                                color: `${props.end_user.custom_design.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_body_font}`
                            }}
                        >
                            {props.end_user.people?.friends?.blocked.by_other_user_ids &&
                             props.end_user.people?.friends?.blocked?.by_other_user_ids?.indexOf(profile_id) > -1 && (
                                <Row>
                                    <Col>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        &nbsp;{lbl.Blocked}&nbsp;{lbl.By}:&nbsp;{props.application.community.profile_viewer.name}
                                        <br />
                                        <Button
                                            className="mt-5"
                                            onClick={() => { set_report_modal_display_value(true) }}
                                            disabled={disable_report_button}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill-exclamation" viewBox="0 0 16 16">
                                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                                            </svg>
                                            <br />
                                            {lbl.Report}
                                        </Button>
                                    </Col>
                                </Row>
                            )}

                            {props.end_user.people?.friends?.blocked.user_ids &&
                             props.end_user.people?.friends?.blocked?.user_ids?.indexOf(profile_id) > -1 && (
                                <Row>
                                    <Col>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        &nbsp;{lbl.Blocking}&nbsp;{lbl.AccountName}:&nbsp;{props.application.community.profile_viewer.name}
                                        <br />
                                        <Button
                                            className="mt-5"
                                            onClick={() => { unblock_friend() }}
                                            disabled={disable_report_button}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill-gear" viewBox="0 0 16 16">
                                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                            </svg>

                                            <br />
                                            {lbl.Unblock}
                                        </Button>
                                    </Col>
                                </Row>
                            )}

                            {!props.application.community.profile_viewer.id && !friend_permissions_are_complete &&
                                <Row>
                                    <Col>
                                        {lbl.Loading}
                                        <br />
                                        <br />
                                        <Spinner animation="border"
                                            style={{ maxHeight: 500, maxWidth: 500 }}
                                        />
                                    </Col>
                                </Row>
                            }

                            {props.application.community.profile_viewer.id &&
                             friend_permissions_are_complete &&
                             props.end_user.people?.friends?.blocked.user_ids &&
                             props.end_user.people?.friends?.blocked?.user_ids?.indexOf(profile_id) === -1 &&
                             props.end_user.people?.friends?.blocked.by_other_user_ids &&
                             props.end_user.people?.friends?.blocked?.by_other_user_ids?.indexOf(profile_id) === -1 &&
                                <>
                                    <Row>
                                        <Col lg={2} md={4} sm={12} xs={12}>
                                            {props.application.community.profile_viewer.avatar_url_path &&
                                                <center>
                                                    <Image src={`${props.application.community.profile_viewer.avatar_url_path}`} roundedCircle height="124" width="124" className="mb-3" />
                                                </center>
                                            }

                                            {!props.application.community.profile_viewer.avatar_url_path &&
                                                <center>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" fill="currentColor" className="bi-person-circle d-inline-block align-top mt-2 rounded-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                    </svg>
                                                </center>
                                            }

                                        </Col>
                                        <Col lg={10} md={8} sm={12} xs={12}>
                                            <Row className="text-start p-3">
                                                <Col>
                                                    <strong>{lbl.Name}</strong>: {props.application.community.profile_viewer.name} <br />
                                                    <hr />
                                                    <strong>{lbl.ID}</strong>: {props.application.community.profile_viewer.id?.toString()} <br />
                                                    <hr />
                                                    {props.application.community.profile_viewer?.twitch_user_name &&
                                                        <>
                                                            <strong>{lbl.Twitch}</strong>: <a target="_blank" href={'https://twitch.tv/' + props.application.community.profile_viewer.twitch_user_name?.toString()}>{'https://twitch.tv/' + props.application.community.profile_viewer.twitch_user_name?.toString()}</a> < br />
                                                            <hr />
                                                        </>
                                                    }
                                                </Col>
                                                <Col>
                                                    <strong>{lbl.CreatedOn}</strong>: <br /> {created_on_value} <br />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-5">
                                        <Col>
                                            {alert_text ? <Row><Col><Alert className="text-center" variant={alert_color}>{alert_text}</Alert></Col></Row> : null}
                                            <Table striped bordered hover variant="dark">
                                                <tbody>
                                                    <tr>
                                                        <td>

                                                            <Button variant="success"
                                                                onClick={() => { show_the_end_user_the_profile_chat_modal() }}
                                                                disabled={disable_profile_modal_chat_button}
                                                            >
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

                                                            {props.end_user.people?.friends?.received_requests?.includes(profile_id) && (
                                                                    <>
                                                                        <Button variant="success" disabled={disable_approve_button} onClick={()=> approve_friend_requests()}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                                                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                                                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                                            </svg>
                                                                            <br />
                                                                            {lbl.ApproveFriendInvite}
                                                                        </Button>
                                                                        <Button variant="success" disabled={disable_reject_button} onClick={() => { reject_friend_request() }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill-x" viewBox="0 0 16 16">
                                                                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                                                                            </svg>
                                                                            <br />
                                                                            {lbl.RejectFriendInvite}
                                                                        </Button>
                                                                    </>
                                                            )}

                                                            {props.end_user.people?.friends?.sent_requests?.includes(profile_id) && (
                                                                <Button variant="success" disabled={true} >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                                    </svg>
                                                                    <br />
                                                                    {lbl.FriendInviteSent}
                                                                </Button>
                                                            )}

                                                            {props.end_user.people?.friends?.sent_requests?.length === 0 &&
                                                                props.end_user.people?.friends?.received_requests?.length === 0 &&
                                                                props.end_user.people?.friends?.approved?.length === 0  && (
                                                                    <Button
                                                                        variant="success"
                                                                        onClick={() => { send_friend_request() }}
                                                                        disabled={disable_friend_button}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                                                            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                                                        </svg>
                                                                        <br />
                                                                        {lbl.Friend}
                                                                    </Button>
                                                            )}

                                                            {friend_permissions_are_complete &&
                                                             props.end_user.people?.friends?.approved &&
                                                            props.end_user.people?.friends?.approved?.indexOf(profile_id) > -1 && (
                                                                <>
                                                                    <Button
                                                                        variant="success"
                                                                        onClick={() => { send_friend_request() }}
                                                                        disabled={true}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                                                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                                        </svg>
                                                                        <br />
                                                                        {lbl.Friends}
                                                                    </Button>
                                                                    <Button
                                                                        variant="success"
                                                                        onClick={() => { unfriend() }}
                                                                        disabled={false}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-dash" viewBox="0 0 16 16">
                                                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                                                            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                                                        </svg>
                                                                        <br />
                                                                        {lbl.UnFriend}
                                                                    </Button>
                                                                </>
                                                            )}

                                                            <Button onClick={() => { block_friend_requests() }} disabled={disable_block_button}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill-slash" viewBox="0 0 16 16">
                                                                    <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Block}
                                                            </Button>
                                                            
                                                            <Button
                                                                onClick={() => { set_report_modal_display_value(true) }}
                                                                disabled={disable_report_button}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill-exclamation" viewBox="0 0 16 16">
                                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                                                                </svg>
                                                                <br />
                                                                {lbl.Report}
                                                            </Button>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </>
                            }
                        </Card.Body>
                    </Card>
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
                                    <Button onClick={() => { report_profile() }}>
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