"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { useSelector } from 'react-redux'
import { Redux_Thunk_Core } from '@Redux_Thunk/Core'
import { useAppDispatch } from '@Redux_Thunk/Provider'

import {
    Row, Col, Container,
    Card, Table, Alert,
    ToggleButton, Form, InputGroup
} from 'react-bootstrap'

import {
    Change_End_User_Gender, Change_End_User_Maiden_Name,
    Change_End_User_BirthDate, Change_End_User_Ethnicity,
    Change_End_User_Last_Name, Change_End_User_First_Name,
    Change_End_User_Middle_Name, Default_End_User_Birthdate
} from '@Redux_Thunk/Actions/User/Identity'

import { Delay_Execution } from '@Redux_Thunk/Actions/Misc'

const Identity = () => {

    const props = useSelector(Redux_Thunk_Core)

    const Navigate = useRouter()
    const Dispatch = useAppDispatch()
    const Path = usePathname()

    const [language, region] = props.application.settings.current_language.split(`-`)
    const lbl = props.application.language_dictionaries[language][region]

    const [alert_text, set_alert_text] = useState<string>(``)
    const [alert_color, set_alert_color] = useState<string>(``)

    const [gender, set_gender] = useState(props.end_user.profile.gender)

    const [birth_day, set_birth_day_selection] = useState(props.end_user.profile.birth_day)
    const [birth_month, set_birth_month_selection] = useState(props.end_user.profile.birth_month)
    const [birth_year, set_birth_year_selection] = useState(props.end_user.profile.birth_year)

    const [firstName, set_first_name] = useState(props.end_user.profile.first_name ? props.end_user.profile.first_name : ``)
    const [lastName, set_last_name] = useState(props.end_user.profile.last_name ? props.end_user.profile.last_name : ``)
    const [middleName, set_middle_name] = useState(props.end_user.profile.middle_name ? props.end_user.profile.middle_name : ``)
    const [maidenName, set_maiden_name] = useState(props.end_user.profile.maiden_name ? props.end_user.profile.maiden_name : ``)
    const [ethnicity, set_ethnicity] = useState(props.end_user.profile.ethnicity ? props.end_user.profile.ethnicity : ``)

    const [end_user_focused_input_element_text, set_end_user_focused_input_element_text] = useState<string>(``)

    const [card_width, set_card_width] = useState<string>(`100%`)

    const set_month_options_per_year = () => {
        let html = []
        for (let i = 1; i < 13; i++) {
            html.push(<option value={i} key={`month-${i}`}>{i}</option>)
        }
        return html
    }

    const set_day_options_per_every_month = () => {
        let html = []

        switch (birth_month) {
            case 1:
                for (let i = 1; i < 32; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 2:
                if (!validating_leap_year_for_date_of_birth_display_options(birth_year)) {
                    for (let i = 1; i < 29; i++) {
                        html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                    }
                    return html
                } else {
                    for (let i = 1; i < 30; i++) {
                        html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                    }
                    return html
                }
            case 3:
                for (let i = 1; i < 32; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 4:
                for (let i = 1; i < 31; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 5:
                for (let i = 1; i < 32; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 6:
                for (let i = 1; i < 31; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 7:
                for (let i = 1; i < 32; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 8:
                for (let i = 1; i < 32; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 9:
                for (let i = 1; i < 31; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 10:
                for (let i = 1; i < 32; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 11:
                for (let i = 1; i < 31; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            case 12:
                for (let i = 1; i < 32; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
            default:
                for (let i = 1; i < 32; i++) {
                    html.push(<option value={i} key={`day-${i}`}>{i}</option>)
                }
                return html
        }
    }

    const set_year_options_between_now_and_1925 = () => {
        let html = []

        for (let i = 1925; i < new Date().getFullYear(); i++) {
            html.push(<option value={i} key={`year-${i}`}>{i}</option>)
        }
        return html
    }

    const validating_leap_year_for_date_of_birth_display_options = (year: number): boolean => {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    const create_error_message_to_display_to_user = (message: string) => {
        set_alert_color(`danger`)
        set_alert_text(`${message}`)
        Delay_Execution(new Date().getTime() + 3000, (async () => {
            set_alert_text(``)
            set_alert_color(``)
        }))
    }

    const create_success_message_to_display_to_user = (message: string) => {
        set_alert_color(`success`)
        set_alert_text(`${message}`)
        Delay_Execution(new Date().getTime() + 3000, (async () => {
            set_alert_text(``)
            set_alert_color(``)
        }))
    }

    const create_information_message_to_display_to_user = (message: string) => {
        set_alert_color(`info`)
        set_alert_text(`${message}`)
        Delay_Execution(new Date().getTime() + 3000, (async () => {
            set_alert_text(``)
            set_alert_color(``)
        }))
    }

    const gender_radios = [
        { name: `${lbl.Female}`, value: 0 },
        { name: `${lbl.Male}`, value: 1 },
        { name: `${lbl.Select}`, value: 2 },
    ]

    const change_end_user_ethnicity = (ethnicity: string) => {

        set_end_user_focused_input_element_text(ethnicity)

        switch (`${props.application.settings.current_language}`.toUpperCase()) {
            case `EN-US`:
                switch (true) {
                    case ethnicity.length === 0:

                        set_ethnicity(``)
                        create_information_message_to_display_to_user(``)
                        create_error_message_to_display_to_user(``)
                        create_success_message_to_display_to_user(``)

                        Dispatch(Change_End_User_Ethnicity(``))
                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}.`)

                        }))

                        break
                    case !/^[a-zA-Z]+$/.test(ethnicity):

                        create_error_message_to_display_to_user(`${lbl.EthnicityRequiresOnlyLetters}`)

                        break
                    case /^[a-zA-Z]+$/.test(ethnicity):

                        set_ethnicity(ethnicity)
                        create_information_message_to_display_to_user(`${lbl.Saving}...`)

                        Dispatch(Change_End_User_Ethnicity(ethnicity))
                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}.`)

                        }))

                        break
                    default:
                }
                break
            default:
                set_ethnicity(ethnicity)

                Dispatch(Change_End_User_Ethnicity(ethnicity))
                Delay_Execution(new Date().getTime() + 3000, (async () => {

                    create_success_message_to_display_to_user(`${lbl.Saved}.`)

                }))

        }
    }

    const change_end_user_first_name = (first_name: string) => {

        set_end_user_focused_input_element_text(first_name)

        switch (`${props.application.settings.current_language}`.toUpperCase()) {
            case `EN-US`:
                switch (true) {
                    case first_name.length === 0:

                        set_first_name(``)
                        create_information_message_to_display_to_user(``)
                        create_error_message_to_display_to_user(``)
                        create_success_message_to_display_to_user(``)

                        Dispatch(Change_End_User_First_Name(``))
                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}.`)

                        }))

                        break
                    case !/^[a-zA-Z]+$/.test(first_name):

                        create_error_message_to_display_to_user(`${lbl.FirstNameRequiresOnlyLetters}`)

                        break
                    case /^[a-zA-Z]+$/.test(first_name):

                        set_first_name(first_name)
                        create_information_message_to_display_to_user(`${lbl.Saving}...`)

                        Dispatch(Change_End_User_First_Name(first_name))
                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}.`)

                        }))

                        break
                    default:
                }
                break
            default:
                Dispatch(Change_End_User_First_Name(first_name))
                Delay_Execution(new Date().getTime() + 3000, (async () => {

                    create_success_message_to_display_to_user(`${lbl.Saved}.`)

                }))
        }
    }

    const change_end_user_last_name = (last_name: string) => {

        set_end_user_focused_input_element_text(last_name)

        switch (`${props.application.settings.current_language}`.toUpperCase()) {
            case `EN-US`:
                switch (true) {
                    case last_name.length === 0:

                        set_last_name(``)
                        create_error_message_to_display_to_user(``)
                        create_information_message_to_display_to_user(``)
                        create_success_message_to_display_to_user(``)

                        Dispatch(Change_End_User_Last_Name(``))
                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}.`)

                        }))
                        break
                    case !/^[a-zA-Z]+$/.test(last_name):

                        create_error_message_to_display_to_user(`${lbl.LastNameRequiresOnlyLetters}`)

                        break
                    case /^[a-zA-Z]+$/.test(last_name):

                        set_last_name(last_name)
                        create_information_message_to_display_to_user(`${lbl.Saving}...`)

                        Dispatch(Change_End_User_Last_Name(last_name))
                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}.`)

                        }))

                        break
                    default:
                }
                break
            default:
                Dispatch(Change_End_User_Last_Name(last_name))
                Delay_Execution(new Date().getTime() + 3000, (async () => {

                    create_success_message_to_display_to_user(`${lbl.Saved}.`)

                }))
        }
    }

    const change_end_user_maiden_name = (maiden_name: string) => {

        set_end_user_focused_input_element_text(maiden_name)

        switch (`${props.application.settings.current_language}`.toUpperCase()) {
            case `EN-US`:
                switch (true) {
                    case maiden_name.length === 0:

                        create_error_message_to_display_to_user(``)
                        create_information_message_to_display_to_user(``)
                        create_success_message_to_display_to_user(``)
                        set_maiden_name(``)

                        Dispatch(Change_End_User_Maiden_Name(``))

                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}.`)

                        }))

                        break
                    case !/^[a-zA-Z]+$/.test(maiden_name):

                        create_error_message_to_display_to_user(`${lbl.MaidenNameRequiresOnlyLetters}`)

                        break
                    case /^[a-zA-Z]+$/.test(maiden_name):

                        set_maiden_name(maiden_name)
                        create_information_message_to_display_to_user(`${lbl.Saving}`)

                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}`)

                        }))
                        break
                    default:
                }
                break
            default:
                Dispatch(Change_End_User_Maiden_Name(maiden_name))
                Delay_Execution(new Date().getTime() + 3000, (async () => {

                    create_success_message_to_display_to_user(`${lbl.Saved}`)

                }))
        }
    }

    const change_end_user_middle_name = (middle_name: string) => {

        set_end_user_focused_input_element_text(middle_name)

        switch (`${props.application.settings.current_language}`.toUpperCase()) {
            case `EN-US`:
                switch (true) {
                    case middle_name.length === 0:

                        create_error_message_to_display_to_user(``)
                        create_success_message_to_display_to_user(``)
                        create_information_message_to_display_to_user(``)
                        set_middle_name(``)

                        Dispatch(Change_End_User_Middle_Name(``))
                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}`)

                        }))

                        break
                    case !/^[a-zA-Z]+$/.test(middle_name):

                        create_error_message_to_display_to_user(`${lbl.MiddleNameRequiresOnlyLetters}`)

                        break
                    case /^[a-zA-Z]+$/.test(middle_name):

                        set_middle_name(middle_name)
                        create_information_message_to_display_to_user(`${lbl.Saving}`)

                        Dispatch(Change_End_User_Middle_Name(middle_name))

                        Delay_Execution(new Date().getTime() + 3000, (async () => {

                            create_success_message_to_display_to_user(`${lbl.Saved}`)

                        }))

                        break
                    default:
                }
                break
            default:

                Dispatch(Change_End_User_Middle_Name(middle_name))

                Delay_Execution(new Date().getTime() + 3000, (async () => {

                    create_success_message_to_display_to_user(`${lbl.Saved}`)

                }))

        }
    }

    const change_end_user_gender = (gender_type: number) => {

        set_gender(gender_type)
        Dispatch(Change_End_User_Gender(gender_type))

    }

    const change_end_user_birth_month = (month: number) => {

        set_birth_month_selection(month)

        if (birth_day !== 0 && birth_year !== 0) {
            Dispatch(Change_End_User_BirthDate({
                Month: month,
                Day: birth_day,
                Year: birth_year
            }))
        }

    }

    const change_end_user_birth_day = (day: number) => {

        set_birth_day_selection(day)

        if (birth_year !== 0 && birth_month !== 0) {
            Dispatch(Change_End_User_BirthDate({
                Month: birth_month,
                Day: day,
                Year: birth_year
            }))
        }

    }

    const change_end_user_birth_year = (year: number) => {

        set_birth_year_selection(year)

        if (birth_day !== 0 && birth_month !== 0) {
            Dispatch(Change_End_User_BirthDate({
                Month: birth_month,
                Day: birth_day,
                Year: year,
            }))
        }

    }

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
                                    <svg onClick={() => { Navigate.push(`/Identity`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className={`bi-person-circle d-inline-block align-top mt-2 rounded-circle`} viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fill="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                    <br />
                                    {lbl.Identity}
                                </>
                            ) : (
                                <>
                                    <svg onClick={() => { Navigate.push(`/Identity`) }} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className={`bi-person-circle d-inline-block align-top mt-2 rounded-circle`} viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fill="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                    <br />
                                    {lbl.Identity}
                                </>
                            )}
                        </Card.Header>
                        <Card.Body
                            style={{
                                backgroundColor: `${props.end_user.custom_design?.card_body_background_color}`,
                                color: `${props.end_user.custom_design?.card_body_font_color}`,
                                fontFamily: `${props.end_user.custom_design?.card_body_font}`
                            }}
                        >
                            <Form>
                                <Table striped bordered hover variant={`dark`}>
                                    <tbody>
                                        <tr>
                                            <td>{lbl._1}</td>
                                            <td>
                                                {lbl.Gender}
                                                {props.error.host.id === `Identity-Gender-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null} <br />
                                                {gender === 0 &&
                                                    `${lbl.Female}`
                                                }
                                                {gender === 1 &&
                                                    `${lbl.Male}`
                                                }
                                                {gender === 2 &&
                                                    `${lbl.NoneSelected}`
                                                }
                                            </td>
                                            <td>
                                                {gender_radios.map((radio, idx) => (
                                                    <ToggleButton
                                                        key={idx}
                                                        id={`GenderRadio-${idx}`}
                                                        type="radio"
                                                        variant={idx % 2 ? 'outline-success' : 'outline-success'}
                                                        name="gender-input"
                                                        value={radio.value}
                                                        checked={gender === radio.value}
                                                        onChange={(e) => change_end_user_gender(parseInt(e.currentTarget.value))}
                                                    >
                                                        {radio.name.toUpperCase() === `MALE` &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gender-male d-inline-block align-top text-center" viewBox="0 0 16 16">
                                                                <path d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8" />
                                                            </svg>
                                                        }
                                                        {radio.name.toUpperCase() === `FEMALE` &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gender-female d-inline-block align-top text-center" viewBox="0 0 16 16">
                                                                <path d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5" />
                                                            </svg>
                                                        }
                                                        {radio.name.toUpperCase() === `SELECT` &&
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-ban d-inline-block align-top text-center" viewBox="0 0 16 16">
                                                                <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                                                            </svg>
                                                        }
                                                        &nbsp;{radio.name}
                                                    </ToggleButton>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{lbl._2}</td>
                                            <td>
                                                {lbl.BirthDate}
                                                {props.error.host.id === `Identity-BirthDate-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                                <br />
                                                {(birth_month !== 0 && birth_day !== 0 && birth_year !== 0) &&
                                                    `${birth_month} / ${birth_day} / ${birth_year}`
                                                }
                                                {(birth_month && birth_day && birth_year) === 0 &&
                                                    `${lbl.NoneSelected}`
                                                }
                                            </td>
                                            <td>
                                                <Row className="mx-auto">
                                                    <Col>
                                                        <Form.Select aria-label={lbl.SelectBirthMonth}
                                                            value={birth_month}
                                                            style={{ minWidth: 100 }}
                                                            className="m-1"
                                                            onChange={(e) => { change_end_user_birth_month(parseInt(e.currentTarget.value))} }
                                                            name='month-input'>
                                                            <option value='0'>{lbl.Month}</option>
                                                            {set_month_options_per_year()}
                                                        </Form.Select>
                                                    </Col>
                                                    <Col>
                                                        <Form.Select aria-label={lbl.SelectBirthDay}
                                                            value={birth_day}
                                                            style={{ minWidth: 100 }}
                                                            className="m-1"
                                                            onChange={(e) => { change_end_user_birth_day(parseInt(e.currentTarget.value))} }
                                                            name='day-input'>
                                                            <option value='0'>{lbl.Day}</option>
                                                            {set_day_options_per_every_month()}
                                                        </Form.Select>
                                                    </Col>
                                                    <Col>
                                                        <Form.Select aria-label={lbl.SelectBirthYear}
                                                            value={birth_year}
                                                            style={{ minWidth: 100 }}
                                                            className="m-1"
                                                            onChange={(e) => { change_end_user_birth_year(parseInt(e.currentTarget.value))} }
                                                            name='year-input'>
                                                            <option value='0'>{lbl.Year}</option>
                                                            {set_year_options_between_now_and_1925()}
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{lbl._3}</td>
                                            <td>
                                                {lbl.FirstName}
                                                <br />
                                                {firstName &&
                                                    `${firstName}`
                                                }
                                                {props.error.host.id === `Identity-FirstName-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                                <br />
                                                {alert_text && end_user_focused_input_element_text === `firstname-input` ?
                                                    <Row>
                                                        <Col>
                                                            <Alert className="text-center" variant={alert_color}>
                                                                {alert_text}
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                : null}
                                            </td>
                                            <td>
                                                <Row className="mx-auto">
                                                    <Col>
                                                        <InputGroup className="mb-3 mt-2 d-flex justify-content-center" style={{ zIndex: 0 }}>
                                                            <Form.Control
                                                                name="firstname-input"
                                                                value={firstName}
                                                                style={{ minWidth: 250, maxWidth: 350 }}
                                                                onChange={(e) => { change_end_user_first_name(e.currentTarget.value) }}
                                                            />
                                                        </InputGroup>
                                                        {alert_text && end_user_focused_input_element_text === `firstname-input` ?
                                                            <Row>
                                                                <Col>
                                                                    <Alert className="text-center" variant={alert_color}>
                                                                        {alert_text}
                                                                    </Alert>
                                                                </Col>
                                                            </Row>
                                                        : null}
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{lbl._4}</td>
                                            <td>
                                                {lbl.LastName}
                                                {props.error.host.id === `Identity-LastName-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null} <br />
                                                {lastName &&
                                                    `${lastName}`
                                                }

                                                {alert_text && end_user_focused_input_element_text === `lastname-input` ? <Row><Col><Alert className="text-center" variant={alert_color}>
                                                    {alert_text}
                                                </Alert></Col></Row> : null}
                                            </td>
                                            <td>
                                                <Row className="mx-auto">
                                                    <Col>
                                                        <InputGroup className="mb-3 mt-2 d-flex justify-content-center" style={{ zIndex: 0 }}>
                                                            <Form.Control
                                                                value={lastName}
                                                                name="lastname-input"
                                                                aria-label="change last name"
                                                                aria-describedby="last name input box"
                                                                style={{ minWidth: 250, maxWidth: 350 }}
                                                                onChange={(e) => { change_end_user_last_name(e.currentTarget.value) }}
                                                            />
                                                        </InputGroup>
                                                        {alert_text && end_user_focused_input_element_text === `lastname-input` ? <Row><Col><Alert className="text-center" variant={alert_color}>
                                                            {alert_text}
                                                        </Alert></Col></Row> : null}
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{lbl._5}</td>
                                            <td>
                                                {lbl.MiddleName}
                                                <br />
                                                {middleName &&
                                                    `${middleName}`
                                                }
                                                {props.error.host.id === `Identity-MiddleName-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                                <br />
                                                {alert_text && end_user_focused_input_element_text === `middlename-input` ?
                                                    <Row>
                                                        <Col>
                                                            <Alert className="text-center" variant={alert_color}>
                                                                {alert_text}
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                : null}
                                            </td>
                                            <td>
                                                <Row className="mx-auto">
                                                    <Col>
                                                        <InputGroup className="mb-3 mt-2 d-flex justify-content-center" style={{ zIndex: 0 }}>
                                                            <Form.Control
                                                                value={middleName}
                                                                name="middlename-input"
                                                                aria-label="change middle name"
                                                                aria-describedby="middle name input box"
                                                                style={{ minWidth: 250, maxWidth: 350 }}
                                                                onChange={(e) => { change_end_user_middle_name(e.currentTarget.value) }}
                                                            />
                                                        </InputGroup>
                                                        {alert_text && end_user_focused_input_element_text === `middlename-input` ?
                                                            <Row>
                                                                <Col>
                                                                    <Alert className="text-center" variant={alert_color}>
                                                                        {alert_text}
                                                                    </Alert>
                                                                </Col>
                                                            </Row>
                                                        : null}
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{lbl._6}</td>
                                            <td>
                                                {lbl.MaidenName}
                                                {props.error.host.id === `Identity-MaidenName-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                                <br />
                                                {maidenName &&
                                                    `${maidenName}`
                                                }
                                                {alert_text && end_user_focused_input_element_text === `maidenname-input` ?
                                                    <Row>
                                                        <Col>
                                                            <Alert className="text-center" variant={alert_color}>
                                                                {alert_text}
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                : null}
                                            </td>
                                            <td>
                                                <Row className="mx-auto">
                                                    <Col>
                                                        <InputGroup className="mb-3 mt-2 d-flex justify-content-center" style={{ zIndex: 0 }}>
                                                            <Form.Control
                                                                value={maidenName}
                                                                name="maidenname-input"
                                                                aria-label="change maiden name"
                                                                aria-describedby="maiden name input box"
                                                                style={{ minWidth: 250, maxWidth: 350 }}
                                                                onChange={(e) => { change_end_user_maiden_name(e.currentTarget.value) }}
                                                            />
                                                        </InputGroup>
                                                        {alert_text && end_user_focused_input_element_text === `maidenname-input` ?
                                                            <Row>
                                                                <Col>
                                                                    <Alert className="text-center" variant={alert_color}>
                                                                        {alert_text}
                                                                    </Alert>
                                                                </Col>
                                                            </Row>
                                                        : null}
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{lbl._7}</td>
                                            <td>
                                                {lbl.Ethnicity}
                                                {props.error.host.id === `Identity-Ethnicity-Failed` ? <Alert variant="danger">{lbl.SaveToServerFailed}.</Alert> : null}
                                                <br />
                                                {ethnicity &&
                                                    `${ethnicity}`
                                                }
                                                {alert_text && end_user_focused_input_element_text === `ethnicity-input` ?
                                                    <Row>
                                                        <Col>
                                                            <Alert className="text-center" variant={alert_color}>
                                                                {alert_text}
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                : null}
                                            </td>
                                            <td>
                                                <Row className="mx-auto">
                                                    <InputGroup className="mb-3 mt-2 d-flex justify-content-center" style={{ zIndex: 0 }}>
                                                        <Form.Control
                                                            value={ethnicity}
                                                            name="ethnicity-input"
                                                            aria-label="change ethnicity"
                                                            aria-describedby="ethnicity name input box"
                                                            style={{ minWidth: 250, maxWidth: 350 }}
                                                            onChange={(e) => { change_end_user_ethnicity(e.currentTarget.value) }}
                                                        />
                                                        {alert_text && end_user_focused_input_element_text === `ethnicity-input` ?
                                                            <Row>
                                                                <Col>
                                                                    <Alert className="text-center" variant={alert_color}>
                                                                        {alert_text}
                                                                    </Alert>
                                                                </Col>
                                                            </Row>
                                                        : null}
                                                    </InputGroup>
                                                </Row>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Identity