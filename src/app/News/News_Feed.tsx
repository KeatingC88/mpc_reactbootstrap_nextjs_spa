"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Row, Col, Card, Alert, Container, ListGroup, ButtonGroup, Button } from 'react-bootstrap'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Load_News_Feed } from '@Redux_Thunk/Actions/News'

import { usePathname } from 'next/navigation'

const News_Feed = () => {

    const props = useSelector(Redux_Thunk_Core)
    console.log(props)
    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

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

    useEffect(() => {
        Dispatch(Load_News_Feed())
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
                        }}>
                        <Card.Header className={`${props.application.settings.text_alignment}`}>
                            <svg onClick={() => { Navigate.push(`/News`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-newspaper" viewBox="0 0 16 16">
                                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
                                <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
                            </svg>
                            <br />
                            {`${lbl.News}`}
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center text-center">
                                <Col lg={10} md={8} sm={9} xs={10}>
                                    <ListGroup>
                                        {props.application?.community?.news &&
                                            props.application?.community?.news.map((document: any, index: number) => (
                                                <ListGroup.Item key={index} action variant="info">
                                                    <Card style={{minWidth: '100%'}}>
                                                        <Card.Body>
                                                            <Row>
                                                                <Col>
                                                                    <Card.Title>{document.Headline}</Card.Title>
                                                                    <Card.Subtitle className="mb-2 text-muted">{document.subheadline}</Card.Subtitle>
                                                                    <Card.Text>
                                                                        {document.body.join("").replace(`.`, `. `)}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <hr />
                                                            <Row>
                                                                <Col>
                                                                    <h6>{lbl.Tags}</h6>
                                                                    {document.tags.length > 0 &&
                                                                        document.tags.map((tag: string, index: number) => (
                                                                            <span key={index}>[{tag}]</span>
                                                                        ))
                                                                    }
                                                                    <br />
                                                                    <span>[{document.language}-{document.region}]</span>
                                                                </Col>
                                                                <Col>
                                                                    <h6>{lbl.URL}</h6>
                                                                    {document.source_urls.length > 0 &&
                                                                        document.source_urls.map((url: string, index: number) => (
                                                                            <div key={index}>
                                                                                <Card.Link href={url} key={index}>
                                                                                    {url}
                                                                                </Card.Link> <br />
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <Row className="text-end">
                                                                <Col>
                                                                    {lbl.By} {document.byline}
                                                                    <br />
                                                                    {
                                                                        (() => {
                                                                            const cleaned = document.published_on.replace(/\.\d{6}Z$/, "Z");
                                                                            const date = new Date(cleaned);
                                                                            return date.toLocaleString(); // return result directly
                                                                        })()
                                                                    }
                                                                    <br />
                                                                    {lbl.DocumentID}: {document._id}
                                                                </Col>
                                                            </Row>
                                                        </Card.Footer>
                                                    </Card>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                </Col>
                            </Row>
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

export default News_Feed