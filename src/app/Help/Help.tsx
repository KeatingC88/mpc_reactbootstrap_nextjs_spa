"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

import { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Application_Props } from '@Interfaces/Application_Props'
import { End_User_Props } from '@Interfaces/End_User_Props'
import { Error_Props } from '@Interfaces/Error_Props'
import { Third_Party_Api_Props } from '@Interfaces/Third_Party_Api_Props'


import { Alert, Row, Col, Card, Form, Button, Accordion, InputGroup, Container } from 'react-bootstrap'

import {
    Send_Interal_Broken_Link_Inquiry, Send_Website_Bug_Inquiry,
    Send_Discord_Bot_Bug_Inquiry, Comment_Inquiry, Contact_Us_Inquiry
} from '@Redux_Thunk/Actions/Help'


interface Help_Menu_Props {
    application: Application_Props
    end_user: End_User_Props
    error: Error_Props
    api: Third_Party_Api_Props
}

const Help_Menu = () => {

    const {
        application,
        end_user,
        error,
        api
    }: Help_Menu_Props = useSelector((state: Current_Redux_State) => ({
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

    const [submit_button_color, setSubmitBtnColor] = useState<string>(`primary`)
    const [lock_submit_button_value, set_lock_submit_button_value] = useState<boolean>(false)
    const [submit_button_text, set_submit_button_text] = useState<string>(lbl.Send)
    const [serverResponse, setServerResponse] = useState<boolean>(false)
    const [serverResponseText, setServerResponseText] = useState<string>(``)
    const [end_user_contact_subject_line, setUserContactSubjectLine] = useState<string>(``)
    const [end_user_contact_summary, setUserContactSummary] = useState<string>(``)
    const [end_user_suggestion, setUserSuggestion] = useState<string>(``)
    const [userBugLocation, setUserDiscordBugLocation] = useState<string>(``)
    const [userDiscordBugDetail, setUserDiscordBugDetail] = useState<string>(``)
    const [end_user_comment_value, set_end_user_comment_value] = useState<string>(``)
    const [userWebBugDetail, setUserWebBugDetail] = useState<string>(``)
    const [end_user_reported_url, setUserReportedURL] = useState<string>(``)

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const [currentInputName, setCurrentInputName] = useState<string>(``)


    const update_inputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const input = e.target

        switch (input.name) {
            case 'suggestion-box':
                setUserSuggestion(input.value)
                break
            case 'contactus-subjectline-textbox':
                setUserContactSubjectLine(input.value)
                break
            case 'contactus-end_user_summary-textbox':
                setUserContactSummary(input.value)
                break
            case 'commentbox-comment':
                set_end_user_comment_value(input.value)
                break
            case 'report-discordbotbug-textinput':
                setUserDiscordBugLocation(input.value)
                break
            case 'report-discordbotbug-textarea':
                setUserDiscordBugDetail(input.value)
                break
            case 'report-websitebug-textinput':
                setUserReportedURL(input.value)
                break
            case 'report-websitebug-textarea':
                setUserWebBugDetail(input.value)
                break
            case 'report-internalbrokenlink-textinput':
                setUserReportedURL(input.value)
                break
            default:
        }
    }


    const create_error_alert = (error: string) => {
        setSubmitBtnColor(`danger`)
        set_alert_text(`${error}`)
        set_alert_color(`danger`)
        set_submit_button_text(`Error`)
        set_lock_submit_button_value(true)
    }

    const create_success_alert = (message: string) => {
        set_alert_color(`success`)
        set_alert_text(`${message}`)
        setTimeout(() => {
            set_alert_text(``)
            set_alert_color(``)
        }, 3000)
    }

    const end_user_subject_line = () => {
        switch (true) {
            case !end_user_contact_subject_line:
            case end_user_contact_subject_line.length === 0:
                create_error_alert(`${lbl.MissingContactSubjectLine}`)
                return false
            case end_user_contact_subject_line.length <= 2:
                create_error_alert(`${lbl.MissingContactSubjectLineLength}`)
                return false
            default:
                set_alert_text(``)
                return true
        }
    }

    const end_user_summary = () => {
        switch (true) {
            case !end_user_contact_summary:
            case end_user_contact_summary.length === 0:
                create_error_alert(`${lbl.MissingContactSummary}`)
                return false
            default:
                set_alert_text(``)
                return true
        }
    }

    const validating_contact_us_form = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set_alert_text(``)
        set_lock_submit_button_value(true)
        setSubmitBtnColor(`info`)
        setServerResponse(false)
        setServerResponseText(``)
        set_submit_button_text(`${lbl.Validating}`)
        if (end_user_subject_line() && end_user_summary()) {
            set_lock_submit_button_value(true)
            setSubmitBtnColor(`info`)
            set_submit_button_text(`${lbl.Sending}`)
            create_success_alert(`${lbl.Success}`)
            Dispatch(Contact_Us_Inquiry({
                subject_line: end_user_contact_subject_line,
                summary: end_user_contact_summary,
            }))

            set_submit_button_text(`${lbl.Sent}`)
        }

        setTimeout(() => {
            set_lock_submit_button_value(false)
            set_submit_button_text(`${lbl.Send}`)
        }, 3000)
    }

    const end_user_comment = () => {
        switch (true) {
            case !end_user_comment_value:
            case end_user_comment_value.length === 0:
                create_error_alert(`l${lbl.MissingComment}`)
                return false
            default:
                set_alert_text(``)
                return true
        }
    }

    const validating_comment_form = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set_lock_submit_button_value(true)
        setSubmitBtnColor(`info`)
        setServerResponse(false)
        setServerResponseText(``)
        set_submit_button_text(`${lbl.Validating}`)

        if (end_user_comment()) {
            set_lock_submit_button_value(true)
            setSubmitBtnColor(`info`)
            set_submit_button_text(`${lbl.Sending}`)

            Dispatch(Comment_Inquiry(end_user_comment_value))

            setTimeout(() => {
                set_submit_button_text(`Send`)
                create_success_alert(`${lbl.Success}`)
                set_lock_submit_button_value(false)
            }, 3000)
        }
    }

    const end_user_bug_location = () => {
        switch (true) {
            case !userBugLocation:
            case userBugLocation.length === 0:
                create_error_alert(`l${lbl.MissingBugLocation}`)
                return false
            default:
                set_alert_text(``)
                return true
        }
    }

    const end_user_discord_bug_detail = () => {
        switch (true) {
            case !userDiscordBugDetail:
            case userDiscordBugDetail.length === 0:
                create_error_alert(`${lbl.MissingBugDetail}`)
                return false
            default:
                set_alert_text(``)
                return true
        }
    }

    const validating_discord_bot_bug_form = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set_lock_submit_button_value(true)
        setSubmitBtnColor(`info`)
        setServerResponse(false)
        setServerResponseText(``)
        set_submit_button_text(`${lbl.Validating}`)

        if (end_user_bug_location() && end_user_discord_bug_detail()) {
            set_lock_submit_button_value(true)
            setSubmitBtnColor(`info`)
            set_submit_button_text(`${lbl.Sending}`)
            Dispatch(Send_Discord_Bot_Bug_Inquiry({
                bug_location: userBugLocation,
                detail: userDiscordBugDetail
            }))
            set_submit_button_text(`${lbl.Sent}`)
            create_success_alert(`${lbl.Success}`)
        }

        setTimeout(() => {
            set_lock_submit_button_value(false)
            set_submit_button_text(`${lbl.Send}`)
            setSubmitBtnColor(`info`)
        }, 3000)
    }

    const end_user_URL = () => {
        switch (true) {
            case !end_user_reported_url:
            case end_user_reported_url.length === 0:
                create_error_alert(`l${lbl.MissingURL}`)
                return false
            default:
                set_alert_text(``)
                return true
        }
    }

    const end_user_web_bug_report_details = () => {
        switch (true) {
            case !userWebBugDetail:
            case userWebBugDetail.length === 0:
                create_error_alert(`${lbl.MissingBugDetail}`)
                return false
            default:
                set_alert_text(``)
                return true
        }
    }

    const validate_report_website_bug_form = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set_lock_submit_button_value(true)
        setSubmitBtnColor(`info`)
        setServerResponse(false)
        setServerResponseText(``)
        set_submit_button_text(`${lbl.Validating}`)

        if (end_user_URL() && end_user_web_bug_report_details()) {
            set_lock_submit_button_value(true)
            setSubmitBtnColor(`info`)
            set_submit_button_text(`${lbl.Sending}`)
            Dispatch(Send_Website_Bug_Inquiry({
                url: end_user_reported_url,
                detail: userWebBugDetail
            }))
            create_success_alert(`${lbl.Success}`)
            set_submit_button_text(`${lbl.Sent}`)
        }

        setTimeout(() => {
            set_lock_submit_button_value(false)
            set_submit_button_text(`${lbl.Send}`)
        }, 3000)
    }

    const validating_report_internal_broken_link_form = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set_lock_submit_button_value(true)
        setSubmitBtnColor(`info`)
        setServerResponse(false)
        setServerResponseText(``)
        set_submit_button_text(`${lbl.Validating}`)

        if (end_user_URL()) {
            set_lock_submit_button_value(true)
            setSubmitBtnColor(`info`)
            set_submit_button_text(`${lbl.Sending}`)
            Dispatch(Send_Interal_Broken_Link_Inquiry({
                url: end_user_reported_url
            }))
            create_success_alert(`${lbl.Success}`)
            set_submit_button_text(`${lbl.Sent}`)
        }

        setTimeout(() => {
            set_lock_submit_button_value(false)
            set_submit_button_text(`${lbl.Send}`)
        }, 3000)
    }

    useEffect(() => {
        if (Path === `/`) {
            set_card_width(``)
        }
    },[])

    return (
        <Container fluid>
            <Row className={`${application.settings.alignment}`}>
                <Col className={`${application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ""}`}>
                    <Card className={`moveable ${application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${end_user.custom_design.card_border_color}`,
                            minWidth: `${card_width}`
                        }}
                    >
                        <Card.Header
                            className={`${application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${end_user.custom_design.card_header_background_color}`,
                                color: `${end_user.custom_design.card_header_font_color}`,
                                fontFamily: `${end_user.custom_design.card_header_font}`
                            }}
                        >
                            {(document.getElementsByTagName('body')[0].getAttribute("data-theme") === "Light-Theme") ? (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Help`) }} xmlns="http://www.w3.org/2000/svg" width="364" height="64" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                    </svg>
                                    <br />
                                    {lbl.Help}
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Help`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                    <br />
                                    {lbl.Help}
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
                            <Row className="justify-content-center text-center">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>{lbl.ContactUs}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form noValidate onSubmit={validating_contact_us_form}>
                                                    <Form.Label htmlFor="contactus-subjectline-textbox">{lbl.SubjectLine}</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                            name="contactus-subjectline-textbox"
                                                            id="contactus-subjectline-textbox"
                                                            aria-describedby="contactus-addon"
                                                            onChange={(e) => update_inputs(e)} />
                                                    </InputGroup>
                                                    <Form.Label htmlFor="contactus-end_user_summary-textbox">{lbl.Summary}</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            name="contactus-end_user_summary-textbox"
                                                            id="contactus-end_user_summary-textbox"
                                                            as="textarea"
                                                            aria-label="Contact Us Summary TextArea"
                                                            onChange={(e) => update_inputs(e)} />
                                                    </InputGroup>
                                                    <InputGroup className="mt-2">
                                                        <Button variant={submit_button_color} type="submit" className="mx-auto" disabled={lock_submit_button_value}>
                                                            {submit_button_text}
                                                        </Button>
                                                    </InputGroup>
                                                    {alert_text ? <Row><Col><Alert variant={alert_color} className='mt-2'>
                                                        {alert_color === "success" &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill mx-auto" viewBox="0 0 16 16">
                                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                            </svg>
                                                        }
                                                        &nbsp;{alert_text}
                                                    </Alert></Col></Row> : null}
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>{lbl.LeaveUsAComment}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form noValidate onSubmit={validating_comment_form}>
                                                    <Form.Label htmlFor="commentbox-comment">{lbl.CommentBox}</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            name="commentbox-comment"
                                                            id="commentbox-comment"
                                                            as="textarea"
                                                            aria-label="Commentbox TextArea"
                                                            onChange={(e) => update_inputs(e)} />
                                                    </InputGroup>
                                                    <InputGroup className="mt-2">
                                                        <Button variant={submit_button_color} type="submit" className="mx-auto" disabled={lock_submit_button_value}>
                                                            {submit_button_text}
                                                        </Button>
                                                    </InputGroup>
                                                    {alert_text ? <Row><Col><Alert variant={alert_color} className='mt-2'>
                                                        {alert_color === "success" &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill mx-auto" viewBox="0 0 16 16">
                                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                            </svg>
                                                        }
                                                        &nbsp;{alert_text}
                                                    </Alert></Col></Row> : null}
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>{lbl.LeaveUsASuggestion}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form noValidate onSubmit={validating_comment_form}>
                                                    <Form.Label htmlFor="suggestion-box">{lbl.Suggestion}</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            name="suggestion-box"
                                                            id="suggestion-box"
                                                            as="textarea"
                                                            aria-label="Suggestion box Text Area"
                                                            onChange={(e) => update_inputs(e)} />
                                                    </InputGroup>
                                                    <InputGroup className="mt-2">
                                                        <Button variant={submit_button_color} type="submit" className="mx-auto" disabled={lock_submit_button_value}>
                                                            {submit_button_text}
                                                        </Button>
                                                    </InputGroup>
                                                    {alert_text ? <Row><Col><Alert variant={alert_color} className='mt-2'>
                                                        {alert_color === "success" &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill mx-auto" viewBox="0 0 16 16">
                                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                            </svg>
                                                        }
                                                        &nbsp;{alert_text}
                                                    </Alert></Col></Row> : null}
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>{lbl.ReportDiscordBotBug}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form noValidate onSubmit={validating_discord_bot_bug_form}>
                                                    <Form.Label htmlFor="report-discordbotbug-textinput">{lbl.WhereIsTheBugLocated}</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                            name="report-discordbotbug-textinput"
                                                            aria-describedby="report discord bot bug textarea"
                                                            onChange={(e) => update_inputs(e)}
                                                            id="report-discordbotbug-textinput"
                                                        />
                                                    </InputGroup>
                                                    <Form.Label htmlFor="report-discordbotbug-textarea">{lbl.BugDetails}</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            name="report-discordbotbug-textarea"
                                                            as="textarea"
                                                            aria-label="discord bug detail's textarea"
                                                            onChange={(e) => update_inputs(e)}
                                                            id="report-discordbotbug-textarea"
                                                        />
                                                    </InputGroup>
                                                    <InputGroup className="mt-2">
                                                        <Button variant={submit_button_color} type="submit" className="mx-auto" disabled={lock_submit_button_value}>
                                                            {submit_button_text}
                                                        </Button>
                                                    </InputGroup>
                                                    {alert_text ? <Row><Col><Alert variant={alert_color} className='mt-2'>
                                                        {alert_color === "success" &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill mx-auto" viewBox="0 0 16 16">
                                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                            </svg>
                                                        }
                                                        &nbsp;{alert_text}
                                                    </Alert></Col></Row> : null}
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header>{lbl.ReportWebsiteBug}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form noValidate onSubmit={validate_report_website_bug_form}>
                                                    <Form.Label htmlFor="report-websitebug-textinput">{lbl.URL}</Form.Label>

                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                            id="report-websitebug-textinput"
                                                            name="report-websitebug-textinput"
                                                            aria-describedby="report website bug url text input"
                                                            onChange={(e) => update_inputs(e)} />
                                                    </InputGroup>
                                                    <Form.Label htmlFor="report-websitebug-textinput">{lbl.BugDetails}</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            id="report-websitebug-textarea"
                                                            name="report-websitebug-textarea"
                                                            as="textarea"
                                                            aria-label="Report website bug details textarea"
                                                            onChange={(e) => update_inputs(e)} />
                                                    </InputGroup>
                                                    <InputGroup className="mt-2">
                                                        <Button variant={submit_button_color} type="submit" className="mx-auto" disabled={lock_submit_button_value}>
                                                            {submit_button_text}
                                                        </Button>
                                                    </InputGroup>
                                                    {alert_text ? <Row><Col><Alert variant={alert_color} className='mt-2'>
                                                        {alert_color === "success" &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill mx-auto" viewBox="0 0 16 16">
                                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                            </svg>
                                                        }
                                                        &nbsp;{alert_text}
                                                    </Alert></Col></Row> : null}
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>{lbl.ReportInternalBrokenLink}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form noValidate onSubmit={validating_report_internal_broken_link_form}>
                                                    <Form.Label htmlFor="report-internalbrokenlink-textinput">{lbl.URL}</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                            id="report-internalbrokenlink-textinput"
                                                            name="report-internalbrokenlink-textinput"
                                                            aria-describedby="report internal broken link text input"
                                                            onChange={(e) => update_inputs(e)} />
                                                    </InputGroup>
                                                    <InputGroup className="mt-2">
                                                        <Button variant={submit_button_color} type="submit" className="mx-auto" disabled={lock_submit_button_value}>
                                                            {submit_button_text}
                                                        </Button>
                                                    </InputGroup>
                                                    {alert_text ? <Row><Col><Alert variant={alert_color} className='mt-2'>
                                                        {alert_color === "success" &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill mx-auto" viewBox="0 0 16 16">
                                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                            </svg>
                                                        }
                                                        &nbsp;{alert_text}
                                                    </Alert></Col></Row> : null}
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Help_Menu