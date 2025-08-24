"use client"

import React, { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Row, Col, Card, Container } from 'react-bootstrap'

const Comment = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [discord_width, set_discord_width] = useState<number>(600)
    const [discord_height, set_discord_height] = useState<number>(800)

    const [card_width, set_card_width] = useState<string>(`100%`)

    useEffect(() => {

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
                        <Card.Header
                            className={`${props.application.settings.text_alignment} p-4`}
                            style={{
                                backgroundColor: `${props.end_user.custom_design.card_header_background_color}`,
                                color: `${props.end_user.custom_design.card_header_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_header_font}`
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                            </svg>
                            <br />
                            {lbl.Comment}
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${props.end_user.custom_design.card_body_background_color}`,
                                color: `${props.end_user.custom_design.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design.card_body_font}`
                            }}
                        >
                            <Row className="justify-content-center text-center">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    <iframe src="https://discord.com/widget?id=836118510689976414&theme=dark" width={discord_width} height={discord_height} frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" title="discord-premade-widget"></iframe>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Comment