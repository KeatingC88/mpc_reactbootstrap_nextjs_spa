"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'

import {
    Row, Col, Card,
    Container, Table, Form,
    Spinner, OverlayTrigger, Image,
    Tooltip, ButtonToolbar, ButtonGroup, Button, Pagination
} from 'react-bootstrap'

import { Load_Community_Users } from '@Redux_Thunk/Actions/Community/Load'
import { Get_Nation_Flag_Value } from '@Redux_Thunk/Actions/Misc'

const Community = () => {

    const props: any = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [display_id_index, set_display_id_index] = useState<number>(0)
    const [display_name_index, set_display_name_index] = useState<number>(0)
    const [display_language_index, set_display_language_index] = useState<number>(0)
    const [display_region_index, set_display_region_index] = useState<number>(0)
    const [active_pagination_number, set_pagination_active_number] = useState(1)

    const [open, setOpen] = useState(false);

    const [card_width, set_card_width] = useState<string>(`100%`)

    const go_to_end_user_selected_profile = (id: BigInt) => {

        if (id !== props.end_user.account.id) {
            Navigate.push(`/profile/view/${id}`)
        } else {
            Navigate.push(`/profile/mirror`)
        }

    }

    const sorted_mpc_community_users = useMemo(() => {

        if (!props.application.community.users) return []

        const mpc_community_users = Object.values(props.application.community.users.users_data)

        switch (display_name_index) {
            case 0:
                return mpc_community_users.sort((a, b) => a.name.localeCompare(b.name))
            case 1:
                return mpc_community_users.sort((a, b) => b.name.localeCompare(a.name))
            default:
                return mpc_community_users
        }

    }, [props.application.community.users, display_name_index])

    const toggle_display_id_sort = () => {
        set_display_name_index(0)
        set_display_language_index(0)
        set_display_region_index(0)
        set_display_id_index((prev) => (prev + 1) % 3)
    }

    const toggle_display_name_sort = () => {
        set_display_id_index(0)
        set_display_language_index(0)
        set_display_region_index(0)
        set_display_name_index((prev) => (prev + 1) % 3)
    }

    const toggle_display_language_sort = () => {
        set_display_id_index(0)
        set_display_name_index(0)
        set_display_region_index(0)
        set_display_language_index((prev) => (prev + 1) % 3)
    }

    const toggle_display_region_sort = () => {
        set_display_id_index(0)
        set_display_name_index(0)
        set_display_language_index(0)
        set_display_region_index((prev) => (prev + 1) % 3)
    }

    const get_status_label = (code: any) => {
        switch (parseInt(code)) {
            case 0:
                return "Offline"
            case 1:
                return "Offline"
            case 2:
                return "Online"
            case 3: 
                return "Away"
            case 4:
                return "Dnd"
            case 5:
                return props.end_user.account.custom_lbl
            default:
                return "error"
        }
    }

    const build_community_user_tool_tip = (id: any) => {

        let user_data = props.application.community.users.users_data[id]
        let twitch_data = props.application.community.users.users_twitch_data[id]

        const dateFromTimestamp = new Date(user_data.created_on * 1000)
        const formattedDate = `${(dateFromTimestamp.getMonth() + 1).toString().padStart(2, '0')}/${dateFromTimestamp.getDate().toString().padStart(2, '0')}/${dateFromTimestamp.getFullYear()}`

        return (
            <Tooltip>
                <Row className="text-start">
                    <Col>
                        <strong>Name</strong>: {user_data.name} <br />
                        <strong>Language</strong>: {user_data.language_code} <br />
                        <strong>Region</strong>: {user_data.region_code} <br />
                        <strong>Status</strong>: {get_status_label(user_data.online_status)} <br />
                        <strong>Created on</strong>: {formattedDate} <br />

                        {twitch_data?.twitch_user_name &&
                            <>  
                                <strong>Twitch</strong>: twitch.tv/{twitch_data?.twitch_user_name}
                                <br />
                            </>
                        }
                    </Col>
                </Row>
            </Tooltip>
        )
    }

    const build_user_buttons = (user_id: BigInt) => {
        let twitch_data = props.application.community.users.users_twitch_data[`${user_id}`]
        let user_data = props.application.community.users.users_data[`${user_id}`]
        let user_selected_flag_src = Get_Nation_Flag_Value(`${user_data.language_code}-${user_data.region_code}`)

        return (
            <div className="mt-1 mx-auto inline">
                {user_data.language_code.toUpperCase()}&nbsp;
                <Image src={`${user_selected_flag_src}`} height="24" width="24" />&nbsp;
                {twitch_data?.twitch_id &&
                    <a target="_blank" href={`https://www.twitch.tv/${twitch_data.twitch_user_name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6441A5" className="bi bi-twitch" viewBox="0 0 16 16">
                            <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
                            <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
                        </svg>
                    </a>
                }
            </div>
        )
    }

    const build_table_record_rows = () => {
        return sorted_mpc_community_users.map((user: any) => (
            <tr key={user.id} className="text-center">
                <OverlayTrigger placement="top" overlay={build_community_user_tool_tip(user.id)}>
                    <td>
                        <Row>
                            <Col>
                                {user.avatar_url_path && user.avatar_url_path !== "null" && user.avatar_url_path !== "undefined" ? (
                                    <img
                                        src={user.avatar_url_path}
                                        width="84"
                                        height="84"
                                        className="d-inline-block align-top mt-1 rounded-circle"
                                        alt={user.avatar_title}
                                    />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" fill="currentColor" className="bi bi-person-circle d-inline-block align-top mt-2 rounded-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fill="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                )}
                            </Col>
                            <Col>
                                <span className="mt-1" onClick={() => go_to_end_user_selected_profile(user.id)}>{user.name}</span> <br />
                                {get_status_label(user.online_status)}
                                {build_user_buttons(user.id)}
                            </Col>
                        </Row>
                    </td>
                </OverlayTrigger>
            </tr>
        ))
    }

    const build_pagination_tiles = () => {

        const pagination_html = []
        const count = props.application.community?.users?.users_ids?.length

        if (count) {
            for (let number = 1; number <= Math.ceil(count / 10); number++) {
                pagination_html.push(
                    <Pagination.Item
                        onClick={() => {
                            set_pagination_active_number(number)
                            Dispatch(Load_Community_Users((number - 1) * 10))
                        }}
                        key={number}
                        active={number === active_pagination_number}
                    >
                        {number}
                    </Pagination.Item>
                )
            }
            return <Pagination size="lg" className="float-end">{pagination_html}</Pagination>
        }
    }

    useEffect(() => {
        if (Path === `/`) {
            set_card_width(``)
        }

        Dispatch(Load_Community_Users())
    }, [])

    return (
        <Container fluid>
            <Row className={`${props.application.settings.alignment}`}>
                <Col className={`${props.application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0" : ""}`}>
                    <Card className={`moveable ${props.application.settings.alignment === 'justify-content-start' ? '' : ''} ${props.application.settings.alignment === 'justify-content-end' ? '' : ''} ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${props.end_user.custom_design?.card_border_color}`,
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
                                backgroundColor: `${props.end_user.custom_design?.card_header_background_color}`,
                                color: `${props.end_user.custom_design?.card_header_font_color}`,
                                fontFamily: `${props.end_user.custom_design?.card_header_font}`
                            }}
                        >
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-globe d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                                </svg>
                                <br />
                                {lbl.Community}
                            </>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2 w-50 text-center mx-auto"
                            />
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${props.end_user.custom_design?.card_body_background_color}`,
                                color: `${props.end_user.custom_design?.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design?.card_body_font}`
                            }}
                        >
                            {!props.application.community.users &&
                                <Row>
                                    <Col>
                                        {lbl.Loading}
                                        <br />
                                        <Spinner animation="border"
                                            style={{ maxHeight: 400, maxWidth: 400 }}
                                        />
                                    </Col>
                                </Row>
                            }
                            {props.application.community.users &&
                                <Table striped bordered hover variant={`dark`}>
                                    <thead>
                                        <tr>
                                            <th style={{ fontSize: '8pt' }}>
                                                {lbl.Count}:&nbsp;{props.application.community.users ? Object.keys(props.application.community.users.users_data).length : `Missingno`}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {build_table_record_rows()}
                                    </tbody>
                                </Table>
                            }
                        </Card.Body>
                        <Card.Footer>
                            {build_pagination_tiles()}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Community