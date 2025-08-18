'use client'
import React, { useState, useEffect } from 'react'
import Redux_Provider from '@Redux_Thunk/Provider'
import Navigation_Menu from '@Shared_Components/Navigation_Menu'
import { Moveable_Card_2D } from '@Redux_Thunk/Actions/Misc'

const App = ({ children }: { children: React.ReactNode }) => {

    const [hasMounted, setHasMounted] = useState<boolean>(false)

    useEffect(() => {

        setHasMounted(true)

        setTimeout(() => {
            new Moveable_Card_2D()
        }, 500)

    }, [])

    if(!hasMounted) return null

    return (
        <Redux_Provider>

            <header>
                <Navigation_Menu />
            </header>
            <main className="text-center" id="main">
                {children}
            </main>
            <footer>

            </footer>

        </Redux_Provider>
    )
}

export default App