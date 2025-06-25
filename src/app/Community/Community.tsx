"use client"

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { Application_Props } from '@Interfaces/Application_Props'
import { End_User_Props } from '@Interfaces/End_User_Props'
import { Error_Props } from '@Interfaces/Error_Props'
import { Third_Party_Api_Props } from '@Interfaces/Third_Party_Api_Props'

import { Row, Col, Card, Container, Table } from 'react-bootstrap'

import { Load_Profile_Viewer_Data, Load_All_Community_Users } from '@Redux_Thunk/Actions/Load'

interface Community_Props {
    application: Application_Props
    end_user: End_User_Props
    error: Error_Props
    api: Third_Party_Api_Props
}

const Community = () => {

    const {
        application,
        end_user,
        error,
        api
    }: Community_Props = useSelector((state: Current_Redux_State) => ({
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

    const go_to_end_user_selected_profile = (id: BigInt) => {

        if (id !== end_user.account.id) {
            Dispatch(Load_Profile_Viewer_Data(id))
            setTimeout(() => {
                Navigate.push(`/profile/view/${id}`)
            }, 500)
        } else {
            Navigate.push(`/profile/mirror`)
        }

    }

    const build_table_record_rows: () => React.JSX.Element[] | undefined = () => {
        return (
            application.community.users?.display_names.map((x, i) => (
                <tr key={i} onClick={() => { go_to_end_user_selected_profile(x.ID) }}>
                    <td>
                        {lbl.ID}#{x.ID.toString()}
                        <br />
                        {(application.community.users?.avatars.length != 0 && application.community.users?.avatars[i].Avatar_url_path.length !== 0) &&
                            <img
                                src={application.community.users?.avatars[i].Avatar_url_path}
                                width="84"
                                height="84"
                                className={`d-inline-block align-top mt-1 rounded-circle`}
                                alt={application.community.users?.avatars[i].Avatar_title}
                            />
                        }
                        {(application.community.users?.avatars.length != 0 && application.community.users?.avatars[i].Avatar_url_path.length === 0) &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" fill="currentColor" className={`bi bi-person-circle  d-inline-block align-top mt-2 rounded-circle`} viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                        }
                    </td>
                    <td>{x.Name}</td>
                    <td>{application.community.users?.languages[i].Language_code}</td>
                    <td>{application.community.users?.languages[i].Region_code}</td>
                </tr>
            ))
        )
    }

    useEffect(() => {
        if (Path === `/`) {
            set_card_width(``)
        }

        Dispatch(Load_All_Community_Users())
    }, [])

    return (
        <Container fluid>
            <Row className={`${application.settings.alignment}`}>
                <Col className={`${application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0" : ""}`}>
                    <Card className={`moveable ${application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${end_user.custom_design?.card_border_color}`,
                            minWidth: `${card_width}`
                        }}
                    >
                        <Card.Header className={`${application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${end_user.custom_design?.card_header_background_color}`,
                                color: `${end_user.custom_design?.card_header_font_color}`,
                                fontFamily: `${end_user.custom_design?.card_header_font}`
                            }}
                        >
                            {application.settings.theme === 0 ? (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Community`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                    </svg>
                                    <br />
                                    {lbl.Community}
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Community`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                    </svg>
                                    <br />
                                    {lbl.Community}
                                </>
                            )}
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${end_user.custom_design?.card_body_background_color}`,
                                color: `${end_user.custom_design?.card_body_font_color}`,
                                fontFamily: `${end_user.custom_design?.card_body_font}`
                            }}
                        >
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>{lbl.Count}:&nbsp;{application.community.users ? Object.keys(application.community.users.account_types).length : `Missingno`}</th>
                                        <th>{lbl.DisplayName}</th>
                                        <th>{lbl.Language}</th>
                                        <th>{lbl.Location}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {build_table_record_rows()}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Community