"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'

import { Row, Col, Card, Container, Table, Form } from 'react-bootstrap'

import { Load_All_Community_Users } from '@Redux_Thunk/Actions/Load'

const Community = () => {

    const props = useSelector(Redux_Thunk_Core)
    
    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [display_id_index, set_display_id_index] = useState<number>(0)
    const [display_name_index, set_display_name_index] = useState<number>(0)
    const [display_language_index, set_display_language_index] = useState<number>(0)
    const [display_region_index, set_display_region_index] = useState<number>(0)

    const [card_width, set_card_width] = useState<string>(`100%`)

    const go_to_end_user_selected_profile = (id: BigInt) => {

        if (id !== props.end_user.account.id) {
            Navigate.push(`/profile/view/${id}`)
        } else {
            Navigate.push(`/profile/mirror`)
        }

    }

    const sortedUsers = useMemo(() => {
        if (!props.application.community.users) return [];

        const usersArray = Object.values(props.application.community.users);

        switch (display_name_index) {
            case 1:
                return usersArray.sort((a, b) => a.name.localeCompare(b.name)); // Ascending
            case 2:
                return usersArray.sort((a, b) => b.name.localeCompare(a.name)); // Descending
            default:
                return usersArray;
        }

    }, [props.application.community.users, display_name_index]);

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

    const build_table_record_rows = () => {
        return sortedUsers.map((user: any) => (
            <tr key={user.id} onClick={() => go_to_end_user_selected_profile(user.id)}>
                <td>
                    {user.avatar_url_path ? (
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
                </td>
                <td>{user.name}</td>
                <td>{user.language_code}</td>
                <td>{user.region_code}</td>
            </tr>
        ))
    }

    useEffect(() => {
        if (Path === `/`) {
            set_card_width(``)
        }

        Dispatch(Load_All_Community_Users())
    }, [])

    return (
        <Container fluid>
            <Row className={`${props.application.settings.alignment}`}>
                <Col className={`${props.application.settings.grid_type === 1 ? "col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0" : ""}`}>
                    <Card className={`moveable ${props.application.settings.alignment === 'justify-content-center' ? 'mx-auto' : ''}`}
                        style={{
                            float: props.application.settings.alignment === `justify-content-end` ? `right` : `none`,
                            borderColor: `${props.end_user.custom_design?.card_border_color}`,
                            minWidth: `${card_width}`
                        }}
                    >
                        <Card.Header className={`${props.application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${props.end_user.custom_design?.card_header_background_color}`,
                                color: `${props.end_user.custom_design?.card_header_font_color}`,
                                fontFamily: `${props.end_user.custom_design?.card_header_font}`
                            }}
                        >
                            {props.application.settings.theme === 0 ? (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Community`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-people-fill d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                    </svg>
                                    <br />
                                    {lbl.Community}
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Community`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-people d-inline-block align-top mt-2" viewBox="0 0 16 16">
                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                    </svg>
                                    <br />
                                    {lbl.Community}
                                </>
                            )}
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
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ fontSize: '8pt' }} onClick={() => {
                                            toggle_display_id_sort()
                                        }}>

                                            {
                                                (() => {

                                                    if (display_id_index === 0) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                                                            </svg>
                                                        )
                                                    }

                                                    if (display_id_index === 1) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up" viewBox="0 0 16 16">
                                                                <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                                                            </svg>
                                                        )
                                                    }

                                                    if (display_id_index === 2) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                                                <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                                            </svg>
                                                        )
                                                    }

                                                    return null
                                                })()
                                            }
                                            {lbl.Count}:&nbsp;{props.application.community.users ? Object.keys(props.application.community.users).length : `Missingno`}

                                        </th>
                                        <th style={{ fontSize: '8pt' }} onClick={() => {
                                            toggle_display_name_sort()
                                        }}>
                                            {(() => {

                                                if (display_name_index === 0) {
                                                    return props.application.settings.theme === 0 ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                            <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                                                        </svg>
                                                    )
                                                }

                                                if (display_name_index === 1) {
                                                    return props.application.settings.theme === 0 ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up" viewBox="0 0 16 16">
                                                            <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                                                        </svg>
                                                    )
                                                }

                                                if (display_name_index === 2) {
                                                    return props.application.settings.theme === 0 ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                                        </svg>
                                                    )
                                                }

                                                return null
                                            })()}
                                            {lbl.Name}
                                        </th>
                                        <th style={{ fontSize: '8pt' }} onClick={() => {
                                            toggle_display_language_sort()
                                        }}>
                                            {
                                                (() => {

                                                    if (display_language_index === 0) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                                                            </svg>
                                                        )
                                                    }

                                                    if (display_language_index === 1) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up" viewBox="0 0 16 16">
                                                                <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                                                            </svg>
                                                        )
                                                    }

                                                    if (display_language_index === 2) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                                                <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                                            </svg>
                                                        )
                                                    }

                                                    return null
                                                })()
                                            }
                                            {lbl.Language}
                                        </th>
                                        <th style={{ fontSize: '8pt' }} onClick={() => {
                                            toggle_display_region_sort()
                                        }}>
                                            {
                                                (() => {

                                                    if (display_region_index === 0) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                                                            </svg>
                                                        )
                                                    }

                                                    if (display_region_index === 1) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up" viewBox="0 0 16 16">
                                                                <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                                                            </svg>
                                                        )
                                                    }

                                                    if (display_region_index === 2) {
                                                        return props.application.settings.theme === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                                                <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                                            </svg>
                                                        )
                                                    }

                                                    return null
                                                })()
                                            }
                                            {lbl.Region}
                                        </th>
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