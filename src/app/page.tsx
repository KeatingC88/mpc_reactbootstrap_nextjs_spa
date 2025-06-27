"use client"

import {
    Container, Row, Col
} from 'react-bootstrap'

import { useSelector } from 'react-redux'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'

import Email_Register from './Register/Email/Email_Register'
import Profile_Mirror from './Profile/Mirror'
import Login_Email_Address_Password from './Login/User/Email/Login_Email_Address_Password'
import Community from "./Community/Community"
import Identity from './Identity/Identity'
import Settings from './Settings/Settings'
import FAQ from './Faq/FAQ'
import Help from './Help/Help'

const Main = () => {

    const props = useSelector(Redux_Thunk_Core)

    if (!props.end_user.account.token && props.end_user.account.account_type === 0) {
        
        switch (props.application.settings.grid_type) {
            case 1:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Email_Register />
                                <Login_Email_Address_Password />
                            </Col>
                        </Row>
                    </Container>
                )
            case 2:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Email_Register />
                            </Col>
                            <Col>
                                <Login_Email_Address_Password />
                            </Col>
                        </Row>
                    </Container>
                )
            case 3:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Email_Register />
                            </Col>
                            <Col>
                                <Login_Email_Address_Password />
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>
                    </Container>
                )
            case 4:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Email_Register />
                            </Col>
                            <Col>
                                <Login_Email_Address_Password />
                            </Col>
                            <Col>
                                
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>
                    </Container>
                )
        }

    }

    if (props.end_user.account.token && props.end_user.account.account_type === 1) {

        switch (props.application.settings.grid_type) {
            case 1:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Community />
                                <Identity />
                                <Settings />
                                <FAQ />
                                <Help />
                                <Profile_Mirror />
                            </Col>
                        </Row>
                    </Container>
                )
            case 2:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Community />
                                <Settings />
                                <Profile_Mirror />
                            </Col>
                            <Col>
                                <Identity />
                                <FAQ />
                                <Help />
                            </Col>
                        </Row>
                    </Container>
                )
            case 3:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Community />
                                <Help />
                            </Col>
                            <Col>
                                <Settings />
                                <FAQ />
                            </Col>
                            <Col>
                                <Identity />
                                <Profile_Mirror />
                            </Col>
                        </Row>
                    </Container>
                )
            case 4:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Community />
                            </Col>
                            <Col>
                                <Settings />
                            </Col>
                            <Col>
                                <Identity />
                                <Profile_Mirror />
                            </Col>
                            <Col>
                                <FAQ />
                                <Help />
                            </Col>
                        </Row>
                    </Container>
                )
        }

    }
}

export default Main