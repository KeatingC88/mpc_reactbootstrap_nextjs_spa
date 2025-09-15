"use client"

import React, { useState, useEffect, useMemo, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import {
    Row, Col, Card,
    Alert, Container, Pagination,
    Accordion, Button, Modal,
    Form, FloatingLabel, ButtonGroup, Spinner
} from 'react-bootstrap'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import { Load_News_Feed, Submit_Article, Delete_Article_By_ID, Update_Article_By_ID } from '@Redux_Thunk/Actions/Community/News'

import { Get_Nation_Flag_Value } from '@Redux_Thunk/Actions/Misc'

import { usePathname } from 'next/navigation'

const News_Feed = () => {

    const props = useSelector(Redux_Thunk_Core)
    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [html_selected_language, set_html_selected_language] = useState<string>(props.application.settings.current_language_value)
    const [html_selected_region, set_html_selected_region] = useState<string>(props.application.settings.current_region_value)
    const [disabled_add_submit_button_value, set_disabled_add_submit_button_value] = useState<boolean>(false)
    const [disabled_edit_submit_button_value, set_disabled_edit_submit_button_value] = useState<boolean>(false)

    const [card_width, set_card_width] = useState<string>(`100%`)

    const [alphabet_index, set_alphabet_index] = useState<number>(0)
    const [date_index, set_date_index] = useState<number>(0)
    const [delete_document_id, set_delete_document_id] = useState<string>(``)
    const [delete_document_name, set_delete_document_name] = useState<string>(``)
    const [delete_confirmation_text, set_delete_confirmation_text] = useState("");
    const required_deletion_confirmation_style = `${delete_document_id}`;
    const delete_confirmation = delete_confirmation_text === required_deletion_confirmation_style;

    const [add_news_display_value, set_add_news_display_value] = useState<boolean>(false)
    const [edit_news_display_value, set_edit_news_display_value] = useState<boolean>(false)
    const [delete_news_display_value, set_delete_news_display_value] = useState<boolean>(false)

    const [add_form_validation_value, set_add_form_validation_value] = useState<boolean>(false)
    const [add_language_value, set_add_language_value] = useState<string>(props.application.settings.current_language_value)
    const [add_region_value, set_add_region_value] = useState<string>(props.application.settings.current_region_value)
    const [add_headline_value, set_add_headline_value] = useState<string>(``)
    const [add_subheadline_value, set_add_subheadline_value] = useState<string>(``)
    const [add_byline_value, set_add_byline_value] = useState<string>(``)
    const [add_image_urls, set_add_image_urls_array] = useState<string[]>([``])
    const [add_body_value, set_add_body_value] = useState<string[]>([``])
    const [add_tags_value, set_add_tags_value] = useState<string[]>([``])
    const [add_source_urls_value, set_add_source_urls_value] = useState<string[]>([``])

    const [edit_form_validation_value, set_edit_form_validation_value] = useState<boolean>(false)
    const [edit_language_value, set_edit_language_value] = useState<string>(props.application.settings.current_language_value)
    const [edit_region_value, set_edit_region_value] = useState<string>(props.application.settings.current_region_value)
    const [edit_headline_value, set_edit_headline_value] = useState<string>(``)
    const [edit_subheadline_value, set_edit_subheadline_value] = useState<string>(``)
    const [edit_byline_value, set_edit_byline_value] = useState<string>(``)
    const [edit_image_urls, set_edit_image_urls_array] = useState<string[]>([``])
    const [edit_body_value, set_edit_body_value] = useState<string[]>([``])
    const [edit_tag_value, set_edit_tag_value] = useState<string[]>([``])
    const [edit_source_urls_value, set_edit_source_urls_value] = useState<string[]>([``])
    const [edit_document_id, set_edit_document_id] = useState<string>(``)

    const [submit_button_font_color, set_submit_button_font_color] = useState<string>(`primary`)
    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)
    const [submit_button_text, set_submit_button_text] = useState<string>(``)

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

    const toggle_alphabetically = () => {
        set_alphabet_index((prev) => (prev + 1) % 3)
        set_date_index(0)
    }

    const toggle_date = () => {
        set_date_index((prev) => (prev + 1) % 3)
        set_alphabet_index(0)
    }

    const sorted_headlines = useMemo(() => {

        if (!props.application.community.news?.articles) return []

        const headlines = Object.values(props.application.community.news?.articles)

        if (alphabet_index !== 0) {
            return [...headlines].sort((a: any, b: any) => {
                const nameA = a.headline.toLowerCase()
                const nameB = b.headline.toLowerCase()
                return alphabet_index === 1
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA)
            })
        }

        if (date_index !== 0) {
            return [...headlines].sort((a: any, b: any) => {
                const dateA = new Date(a.published_on).getTime()
                const dateB = new Date(b.published_on).getTime()
                return date_index === 1 ? dateB - dateA : dateA - dateB
            })
        }
        return headlines
    }, [props.application.community.news?.articles, alphabet_index, date_index])

    const build_accordion_headline_record_rows = () => {
        
        if (sorted_headlines) {
            return sorted_headlines.map((document: any, index: number) => (
                <Accordion.Item eventKey={`${index}`} key={`${index}`}>
                    <Accordion.Header>
                        {document.headline}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Card style={{ minWidth: '100%' }}>
                            <Card.Header>
                                <h4>{document.headline}</h4>
                                <h6 className="text-muted">{document.subheadline}</h6>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
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
                                                return date.toLocaleString();
                                            })()
                                        }
                                        <br />
                                        {lbl.DocumentID}: {document._id}
                                    </Col>
                                </Row>
                                <Row>
                                    <ButtonGroup aria-label="Button Group for Headline Control" size="sm">
                                        <Button variant="warning" onClick={() => {
                                            set_edit_news_display_value(true)
                                            set_edit_document_id(document._id)
                                        }}>{lbl.Edit}</Button>
                                        <Button variant="danger" onClick={ async () => {
                                            set_delete_news_display_value(true)
                                            set_delete_document_id(document._id)
                                            set_delete_document_name(document.headline)
                                        }}>{lbl.Delete}</Button>
                                    </ButtonGroup>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            ))
        }
    }

    const change_selected_language = (value: SetStateAction<string>) => {
        //set_disabled_submit_button_value(false)
        set_html_selected_language(value)
        set_edit_language_value(value)
    }

    const has_headline: () => boolean = () => {
        switch (true) {
            case add_headline_value.length === 0:
                return false
            case add_headline_value.length > 25:
                return false
            case /[^\w\s!?]/.test(add_headline_value):
                return false
            default:
                return true
        }
    }

    const has_language_region: () => boolean = () => {
        const add_language_key = `${add_language_value}`
        const add_region_key = `${add_region_value}`

        switch (true) {
            case add_language_key.length !== 2:
                return false
            case !props.application.language_dictionaries.hasOwnProperty(add_language_key):
                return false
            case props.application.language_dictionaries[add_language_key] === undefined:
                return false
            case !props.application.language_dictionaries[add_language_key].hasOwnProperty(add_region_key):
                return false
            default:
                return true
        }
    }

    const has_sub_headline: () => boolean = () => {
        switch (true) {
            case add_headline_value.length === 0:
                return false
            case add_headline_value.length > 25:
                return false
            case /[^\w\s!?]/.test(add_headline_value):
                return false
            default:
                return true
        }
    }

    const has_by_line: () => boolean = () => {
        switch (true) {
            case add_byline_value.length === 0:
                return false
            case add_byline_value.length > 11:
                return false
            case /^[a-zA-Z]$/.test(add_byline_value):
                return false
            default:
                return true
        }
    }

    const has_body: ()=> boolean = () => {
        switch (true) {
            case add_body_value.length === 0:
                return false
            default:
                return true
        }
    }

    const has_tags: () => boolean = () => {
        switch (true) {
            case add_tags_value.length === 0:
                return false
            case add_tags_value.length > 25:
                return false
            case add_tags_value.every(tag => /^[a-zA-Z]$/.test(tag)):
                return false
            default:
                return true
        }
    }
     
    const validating_add_form_submission = () => {
        set_alert_text(``)
        set_disabled_add_submit_button_value(true)

        if (
            has_headline() &&
            has_language_region() &&
            has_sub_headline() &&
            has_by_line() &&
            has_body() &&
            has_tags()
        ) {
            set_submit_button_font_color(`info`)

            Dispatch(Submit_Article({
                language: html_selected_language,
                region: html_selected_region,
                headline: add_headline_value,
                sub_headline: add_subheadline_value,
                byline: add_byline_value,
                image_urls: add_image_urls,
                body: add_body_value,
                tags: add_tags_value,
                source_urls: add_source_urls_value,
            })).then( async () => {
                set_add_news_display_value(false)
                await Dispatch(Load_News_Feed())
                set_edit_language_value(props.application.settings.current_language_value)
                set_edit_region_value(props.application.settings.current_region_value)
                set_add_headline_value(``)
                set_add_subheadline_value(``)
                set_add_byline_value(``)
                set_add_image_urls_array([""])
                set_add_source_urls_value([""])
                set_add_language_value(props.application.settings.current_language_value)
                set_add_region_value(props.application.settings.current_region_value)
            })

            setTimeout(() => {
                set_disabled_add_submit_button_value(false)
                set_alert_color(``)
                set_alert_text(``)
            }, 1000)
        }
    }

    const has_edit_headline: () => boolean = () => {
        switch (true) {
            case edit_headline_value.length === 0:
                return false
            case edit_headline_value.length > 25:
                return false
            case /[^\w\s!?]/.test(edit_headline_value):
                return false
            default:
                return true
        }
    }

    const has_edit_language_region: () => boolean = () => {
        const edit_language_key = `${edit_language_value}`
        const edit_region_key = `${edit_region_value}`

        switch (true) {
            case edit_language_key.length !== 2:
                return false
            case !props.application.language_dictionaries.hasOwnProperty(edit_language_key):
                return false
            case props.application.language_dictionaries[edit_language_key] === undefined:
                return false
            case !props.application.language_dictionaries[edit_language_key].hasOwnProperty(edit_region_key):
                return false
            default:
                return true
        }
    }

    const has_edit_sub_headline: () => boolean = () => {
        switch (true) {
            case edit_headline_value.length === 0:
                return false
            case edit_headline_value.length > 25:
                return false
            case /[^\w\s!?]/.test(edit_headline_value):
                return false
            default:
                return true
        }
    }

    const has_edit_by_line: () => boolean = () => {
        switch (true) {
            case edit_byline_value.length === 0:
                return false
            case edit_byline_value.length > 11:
                return false
            case /^[a-zA-Z]$/.test(edit_byline_value):
                return false
            default:
                return true
        }
    }

    const has_edit_body: () => boolean = () => {
        switch (true) {
            case edit_body_value.length === 0:
                return false
            default:
                return true
        }
    }

    const has_edit_tags: () => boolean = () => {
        switch (true) {
            case edit_tag_value.length === 0:
                return false
            case edit_tag_value.length > 25:
                return false
            case edit_tag_value.every(tag => /^[a-zA-Z]$/.test(tag)):
                return false
            default:
                return true
        }
    }

    const validating_edit_form_submission = () => {
        set_alert_text(``)

        set_submit_button_font_color(`info`)

        if (
            has_edit_headline() ||
            has_edit_language_region() ||
            has_edit_sub_headline() ||
            has_edit_by_line() ||
            has_edit_body() ||
            has_edit_tags()
        ) {
            Dispatch(Update_Article_By_ID({
                document_id: edit_document_id,
                language: edit_language_value,
                region: edit_region_value,
                headline: edit_headline_value,
                sub_headline: edit_subheadline_value,
                byline: edit_byline_value,
                image_urls: edit_image_urls,
                body: edit_body_value,
                tags: edit_tag_value,
                source_urls: edit_source_urls_value,
            })).then(async () => {
                set_edit_news_display_value(false)
                await Dispatch(Load_News_Feed())
                set_edit_language_value(props.application.settings.current_language_value)
                set_edit_region_value(props.application.settings.current_region_value)
                set_edit_headline_value(``)
                set_edit_subheadline_value(``)
                set_edit_byline_value(``)
                set_edit_image_urls_array([""])
                set_edit_source_urls_value([""])
                set_edit_document_id(``)
                set_add_language_value(props.application.settings.current_language_value)
                set_add_region_value(props.application.settings.current_region_value)
            })

            setTimeout(() => {
                set_disabled_add_submit_button_value(false)
                set_alert_color(``)
                set_alert_text(``)
            }, 1000)

        }
    }

    const [language_select_show_value, set_language_select_show_value] = useState<boolean>(false)

    const show_languages_to_end_user = () => {
        set_html_selected_language(props.application.settings.current_language)
        set_language_select_show_value(true)
        set_disabled_edit_submit_button_value(true)
        set_disabled_add_submit_button_value(true)
        let html = ``

        html +=
        `<option value="${props.application.settings.current_language.split(`-`)[0]}-${props.application.settings.current_language.split(`-`)[1]}">
            ${props.application.language_dictionaries[props.application.settings.current_language.split(`-`)[0]][props.application.settings.current_language.split(`-`)[1]][props.application.settings.current_language.split(`-`)[0].charAt(0).toUpperCase() + props.application.settings.current_language.split(`-`)[0].charAt(1) + props.application.settings.current_language.split(`-`)[1]]}
        </option>`

        for (let i in Object.keys(props.application.language_dictionaries)) {
            for (let j in Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])) {
                if (`${Object.keys(props.application.language_dictionaries)[i]}-${Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])[j]}` !== props.application.settings.current_language)
                    html +=
                        `<option value="${Object.keys(props.application.language_dictionaries)[i]}-${Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])[j]}">
                            ${props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]][Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])[j]][`${Object.keys(props.application.language_dictionaries)[i].charAt(0).toUpperCase() + Object.keys(props.application.language_dictionaries)[i].slice(1).toLowerCase()}${Object.keys(props.application.language_dictionaries[Object.keys(props.application.language_dictionaries)[i]])[j]}`]}
                        </option>`
            }
        }

        setTimeout(() => {
            let language_selection_form = (typeof document !== 'undefined' ? document.getElementById(`language-selection-article-form`) : null) as HTMLInputElement | null
            if (language_selection_form) {
                language_selection_form.innerHTML = html
            }
        }, 10)

    }

    const [active_pagination_number, set_pagination_active_number] = useState(1); 

    const build_pagination_tiles = () => {

        const pagination_html = []
        const count = props.application.community.news?.count

        if (count) {
            for (let number = 1; number <= Math.ceil(count / 10); number++) {
                pagination_html.push(
                    <Pagination.Item
                        onClick={() => {
                            set_pagination_active_number(number)
                            Dispatch(Load_News_Feed((number - 1) * 10))
                        }}
                        key={number}
                        active={number === active_pagination_number}
                    >
                        {number}
                    </Pagination.Item>
                )
            }
            return <Pagination size="lg">{pagination_html}</Pagination>
        }
    }
    
    useEffect(() => {
        Dispatch(Load_News_Feed(0))
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
                        <Card.Header className={`${props.application.settings.text_alignment}`}>
                            <svg onClick={() => { Navigate.push(`/News`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-newspaper" viewBox="0 0 16 16">
                                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
                                <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
                            </svg>
                            <br />
                            {`${lbl.News}`}
                            <br />
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2 w-50 text-center mx-auto"
                            />
                            <Button variant="secondary" size="sm" onClick={() => { set_add_news_display_value(true) }}>{lbl.Add}</Button>
                            <Button variant="secondary" size="sm" onClick={() => { toggle_alphabetically() }}>
                                {
                                    (() => {

                                        if (alphabet_index === 0) {
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

                                        if (alphabet_index === 1) {
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

                                        if (alphabet_index === 2) {
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

                                        return null
                                    })()
                                }
                                {lbl.Alphabetically}
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => { toggle_date() }}>
                                {
                                    (() => {

                                        if (date_index === 0) {
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

                                        if (date_index === 1) {
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

                                        if (date_index === 2) {
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

                                        return null
                                    })()
                                }
                                {lbl.Date}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center text-center">
                                <Col lg={10} md={8} sm={9} xs={10}>

                                    {props.application.community.news?.articles !== null &&
                                        <>
                                            <Accordion className="mb-3">
                                                {build_accordion_headline_record_rows()}
                                            </Accordion>
                                            {build_pagination_tiles()}
                                        </>
                                    }

                                    {!props.application.community.news?.articles &&
                                        <>
                                            {lbl.Loading}
                                            <br />
                                            <Spinner animation="border"
                                                style={{ maxHeight: 400, maxWidth: 400 }}
                                            />
                                        </>
                                    }
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

            <Modal show={add_news_display_value} onHide={() => { set_add_news_display_value(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.AddToNewsFeed}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate onSubmit={validating_add_form_submission}>
                        <Row className="mb-3">
                            <Col>
                                <FloatingLabel controlId="floatingTextarea2" label={lbl.Headline}>
                                    <Form.Control
                                        as="textarea"
                                        value={add_headline_value}
                                        onChange={((event) => {
                                            set_add_headline_value(event.currentTarget.value)
                                        })}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea2" label={lbl.SubHeadLine}>
                                    <Form.Control
                                        as="textarea"
                                        value={add_subheadline_value}
                                        onChange={((event) => {
                                            set_add_subheadline_value(event.currentTarget.value)
                                        })}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea2" label={`${lbl.Tags} ${lbl.SeparatedByComma}`}>
                                    <Form.Control
                                        as="textarea"
                                        value={add_tags_value}
                                        onChange={(e) => { set_add_tags_value(e.currentTarget.value.split(`,`)) }}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea2" label={`${lbl.By}`}>
                                    <Form.Control
                                        as="textarea"
                                        value={add_byline_value}
                                        onChange={(e)=> set_add_byline_value(e.currentTarget.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <hr />
                                <Form.Control
                                    type="text"
                                    className="w-50 mx-auto text-center mb-2"
                                    placeholder={props.application.settings.current_language}
                                    value={`${html_selected_language}-${html_selected_region}`}
                                    onClick={() => { show_languages_to_end_user() }}
                                    readOnly
                                />
                                {language_select_show_value &&
                                    <>
                                        {lbl.From} <img src={`${props.application.settings.flag}`} width="32px" height="32px" /> {lbl.To} <img src={`${Get_Nation_Flag_Value(html_selected_language)}`} width="32px" height="32px" />
                                        <br />
                                        <Form.Select
                                            className="w-50 mx-auto"
                                            aria-label="Language Selection Menu"
                                            onChange={(event) => { change_selected_language(event.target.value) }}
                                            value={html_selected_language} id="language-selection-article-form">
                                        </Form.Select>
                                    </>
                                }
                                <hr />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FloatingLabel controlId="floatingTextarea2" label={`${lbl.Body}`}>
                                    <Form.Control
                                        as="textarea"
                                        style={{ height: '100px' }}
                                        value={add_body_value}
                                        onChange={(e) => { set_add_body_value(e.currentTarget.value.split(`\n`)) }}
                                    />
                                </FloatingLabel>

                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea3" label={`${lbl.Sources} ${lbl.SeparatedByComma}`}>
                                    <Form.Control
                                        as="textarea"
                                        value={add_source_urls_value}
                                        onChange={(e) => { set_add_source_urls_value(e.currentTarget.value.split(`,`)) }}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Form.Group controlId="formFileMultiple">
                                    <Form.Control type="file" multiple />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => { set_add_news_display_value(false) }}>
                        {lbl.Cancel}
                    </Button>
                    <Button
                        onClick={() => { validating_add_form_submission() }}
                        disabled={disabled_add_submit_button_value}
                        variant={submit_button_font_color}
                        type="submit"
                    >
                        {submit_button_text === `` ? lbl.Save : submit_button_text}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={edit_news_display_value} onHide={() => { set_edit_news_display_value(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.Edit} {edit_document_id}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate onSubmit={validating_edit_form_submission}>
                        <Row className="mb-3">
                            <Col>
                                <FloatingLabel controlId="editHeadline" label={lbl.Headline}>
                                    <Form.Control
                                        as="textarea"
                                        value={edit_headline_value}
                                        onChange={(e) => set_edit_headline_value(e.currentTarget.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FloatingLabel controlId="editSubHeadline" label={lbl.SubHeadLine}>
                                    <Form.Control
                                        as="textarea"
                                        value={edit_subheadline_value}
                                        onChange={(e) => set_edit_subheadline_value(e.currentTarget.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FloatingLabel controlId="editTags" label={`${lbl.Tags} ${lbl.SeparatedByComma}`}>
                                    <Form.Control
                                        as="textarea"
                                        value={edit_tag_value.join(",")}
                                        onChange={(e) => set_edit_tag_value(e.currentTarget.value.split(","))}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FloatingLabel controlId="editByline" label={lbl.By}>
                                    <Form.Control
                                        as="textarea"
                                        value={edit_byline_value}
                                        onChange={(e) => set_edit_byline_value(e.currentTarget.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="text-center">
                                <hr />
                                <Form.Control
                                    type="text"
                                    className="w-50 mx-auto text-center mb-2"
                                    placeholder={props.application.settings.current_language}
                                    value={`${edit_language_value}-${edit_region_value}`}
                                    onClick={() => { show_languages_to_end_user() }}
                                    readOnly
                                />
                                {language_select_show_value &&
                                    <>
                                        {lbl.From} <img src={`${props.application.settings.flag}`} width="32px" height="32px" /> {lbl.To} <img src={`${Get_Nation_Flag_Value(edit_language_value)}`} width="32px" height="32px" />
                                        <br />
                                        <Form.Select
                                            className="w-50 mx-auto"
                                            aria-label="Language Selection Menu"
                                            onChange={(event) => { change_selected_language(event.target.value) }}
                                            value={edit_language_value}
                                            id="language-selection-article-form"
                                        >
                                        </Form.Select>
                                    </>
                                }
                                <hr />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <FloatingLabel controlId="editBody" label={lbl.Body}>
                                    <Form.Control
                                        as="textarea"
                                        style={{ height: '100px' }}
                                        value={edit_body_value.join("\n")}
                                        onChange={(e) => set_edit_body_value(e.currentTarget.value.split("\n"))}
                                    />
                                </FloatingLabel>
                                <hr />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FloatingLabel controlId="editSources" label={`${lbl.Sources} ${lbl.SeparatedByComma}`}>
                                    <Form.Control
                                        as="textarea"
                                        value={edit_source_urls_value.join(",")}
                                        onChange={(e) => set_edit_source_urls_value(e.currentTarget.value.split(","))}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { set_edit_news_display_value(false) }}>
                        {lbl.Cancel}
                    </Button>
                    <Button
                        onClick={() => { validating_edit_form_submission() }}
                        disabled={disabled_edit_submit_button_value}
                        variant={submit_button_font_color}
                        type="submit"
                    >
                        {submit_button_text === `` ? lbl.Save : submit_button_text}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={delete_news_display_value} onHide={() => { set_delete_news_display_value(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>{lbl.AreYouSureYouWantToDelete} "{delete_document_name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            {lbl.ToConfirmDeletionType}
                            <br /> <strong>{required_deletion_confirmation_style}</strong>
                            <Form.Control
                                type="text"
                                value={delete_confirmation_text}
                                onChange={(e) => set_delete_confirmation_text(e.target.value)}
                                placeholder={lbl.TypeConfirmationHere}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { set_delete_news_display_value(false) }}>
                        {lbl.Cancel}
                    </Button>
                    <Button
                        disabled={!delete_confirmation}
                        variant="danger"
                        onClick={async () => { 
                            set_delete_news_display_value(false)
                            await Dispatch(Delete_Article_By_ID(delete_document_id)).then( async () => {
                                await Dispatch(Load_News_Feed())
                                set_delete_document_id(``)
                                set_delete_document_name(``)
                                set_delete_confirmation_text(``)
                            })
                    }}>
                        {lbl.Delete}
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default News_Feed