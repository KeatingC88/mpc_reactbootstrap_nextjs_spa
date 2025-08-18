"use client"

import {
    Container, Row, Col
} from 'react-bootstrap'

import { useSelector } from 'react-redux'

import { Redux_Thunk_Core } from '@Redux_Thunk/Core'

import Email_Register from './Register/Email/Email_Register'
import Twitch_Login from './Login/User/Twitch/Twitch_Login'

import Profile_Mirror from './Profile/Mirror'
import Login_Email_Address_Password from './Login/User/Email/Login_Email_Address_Password'
import Community from "./Community/Community"
import Identity from './Identity/Identity'
import Settings from './Settings/Settings'
import FAQ from './Faq/FAQ'
import Help from './Help/Help'
import News_Feed from './News/News_Feed'

const Main = () => {

    const props = useSelector(Redux_Thunk_Core)

    if (props.end_user.account.account_type === 0) {
        
        switch (props.application.settings.grid_type) {
            case 1:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                
                                <Login_Email_Address_Password />
                                <Email_Register />
                                <Twitch_Login />
                                
                            </Col>
                        </Row>
                    </Container>
                )
            case 2:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Login_Email_Address_Password />
                            </Col>
                            <Col>
                                <Email_Register />
                                <Twitch_Login />
                            </Col>
                        </Row>
                    </Container>
                )
            case 3:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Login_Email_Address_Password />
                            </Col>
                            <Col>
                                <Email_Register />
                            </Col>
                            <Col>
                                <Twitch_Login />
                            </Col>
                        </Row>
                    </Container>
                )
            case 4:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Login_Email_Address_Password />
                            </Col>
                            <Col>
                                <Email_Register />
                            </Col>
                            <Col>
                                <Twitch_Login />
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>
                    </Container>
                )
        }

    }

    if (props.end_user.account.account_type === 1) {

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
                                <News_Feed />
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
                                <News_Feed />
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
                                <News_Feed />
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
                                <News_Feed />
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