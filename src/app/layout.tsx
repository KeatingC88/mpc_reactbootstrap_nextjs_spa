//Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
//App Structural CSS
import '@CSS/Layout/Bootstrap/Button.css'
import '@CSS/Layout/App/Html.css'
import '@CSS/Layout/App/LockNav.css'
import '@CSS/Layout/Bootstrap/Card.css'
import '@CSS/Layout/Bootstrap/Row.css'
import '@CSS/Layout/Bootstrap/Navbar/Button.css'
import '@CSS/Layout/Bootstrap/OffCanvas.css'
import '@CSS/Layout/Bootstrap/Icons/Check_Circle.css'
import '@CSS/Layout/Bootstrap/Icons/X_Octagon.css'
//App Design CSS
import '@CSS/Design/App/Theme/Night.css'
import '@CSS/Design/App/Theme/Light.css'
import '@CSS/Design/Bootstrap/Icons/Check_Circle.css'
import '@CSS/Design/Bootstrap/Icons/X_Octagon.css'
import '@CSS/Design/App/WebSocket/Default_Chat_Icon.css'
import '@CSS/Design/Bootstrap/Accordion.css'
import '@CSS/Design/App/Theme/Background.css'

import App from './App'

import {
    META_TAG_CREATOR,
    META_TAG_AUTHOR,
    CLIENT_ADDRESS
} from '@Constants'

const RootLayout = ({ children }: { children: React.ReactNode }) => {

    return (

        <html lang="en">

            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <base href={CLIENT_ADDRESS} />

            </head>

            <body data-theme="Light-Theme">
                <App>
                    {children}
                </App>
            </body>

        </html>

    )
}

export default RootLayout