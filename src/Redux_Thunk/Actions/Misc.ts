import USAFlag from '@Image/NavigationMenu/NationFlags/usa.png'
import IndiaFlag from '@Image/NavigationMenu/NationFlags/india.png'
import FrenchFlag from '@Image/NavigationMenu/NationFlags/french.png'
import GermanFlag from '@Image/NavigationMenu/NationFlags/german.png'
import NLFlag from '@Image/NavigationMenu/NationFlags/nl.png'
import MexFlag from '@Image/NavigationMenu/NationFlags/mex.png'
import SPFlag from '@Image/NavigationMenu/NationFlags/sp.png'
import ChinaFlag from '@Image/NavigationMenu/NationFlags/china.png'
import RuFlag from '@Image/NavigationMenu/NationFlags/ru.png'
import ROCFlag from '@Image/NavigationMenu/NationFlags/roc.png'
import HKFlag from '@Image/NavigationMenu/NationFlags/hongkong.png'

import {
    UPDATE_APPLICATION_SETTINGS_NAV_SHOW,
    UPDATE_APPLICATION_PROGRESS_BAR_STATUS_VALUE,
    UPDATE_APPLICATION_MOBILE_STATE
} from '@Constants'

import type { AppDispatch } from '@Redux_Thunk/Provider'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { finished } from 'stream'

interface Network_Information extends EventTarget {
    downlink: number;
    effectiveType: string;
    rtt: number;
    saveData: boolean;
    onchange?: () => void;
}
export interface Navigator {
    userAgent: string;
    connection?: Network_Information;
    deviceMemory?: number;
}

export const Update_Progress_Bar_Value = (value: number) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_APPLICATION_PROGRESS_BAR_STATUS_VALUE, payload: { percentage_value: value } })
    })
}

export const Get_Device_Information = () => {

    const nav_exists = typeof navigator !== 'undefined'
    const window_exists = typeof window !== 'undefined'

    const nav = nav_exists ? (navigator as Navigator & {
            deviceMemory?: number
            connection?: {
                saveData?: boolean
                effectiveType?: string
                downlink?: number
                rtt?: number
            }
     }) : undefined

    const screenOrientation = window_exists && 'orientation' in window.screen ? (window.screen.orientation as ScreenOrientation) : undefined

    return {
        userAgent: nav?.userAgent ?? null,
        deviceMemory: nav?.deviceMemory ?? null,
        saveData: nav?.connection?.saveData ?? null,
        effectiveType: nav?.connection?.effectiveType ?? null,
        downlink: nav?.connection?.downlink ?? null,
        rtt: nav?.connection?.rtt ?? null,
        screen_width: window_exists ? window.screen.width : null,
        screen_height: window_exists ? window.screen.height : null,
        color_depth: window_exists ? window.screen.colorDepth : null,
        pixel_depth: window_exists ? window.screen.pixelDepth : null,
        window_width: window_exists ? window.innerWidth : null,
        window_height: window_exists ? window.innerHeight : null,
        orientation_type: screenOrientation?.type ?? null,
    }
}

export const Update_Mobile_Mode = (value: boolean) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    dispatch({ type: UPDATE_APPLICATION_MOBILE_STATE, payload: {mobile_mode: value} })
}

export const Map_Database_Values_For_TypeScript = (obj: any): any => {
    const finished_obj: any = {}

    for (const key in obj) {

        let object = obj[key]

        for (const property_name in object) {

            let value = object[property_name]

            switch (true) {
                case property_name === "gender":
                    finished_obj[property_name] = parseInt(value)
                    break
                case (!isNaN(value) || !isNaN(parseFloat(value))) && /^\d+$/.test(value):
                    finished_obj[property_name] = BigInt(value)
                    break
                case value === "" || value === "null" || value === null:
                    finished_obj[property_name] = null
                    break
                case value === "" || value === "undefined" || value === undefined:
                    finished_obj[property_name] = undefined
                    break
                default:
                    finished_obj[property_name] = value
            }
        }
    }
    console.log(finished_obj)
    return finished_obj
}

export const Get_Nation_Flag_Value = (value: string) => {
    switch (value) {
        case "en-US":
        case "en-USA":
        case "eng-US":
        case "eng-USA":
            return USAFlag.src
        case "es-US":
        case "es-MX":
            return MexFlag.src
        case "es-ES":
            return SPFlag.src
        case "de-DE":
            return GermanFlag.src
        case "fr-FR":
        case "fr-GF":
            return FrenchFlag.src
        case "hi-IN":
            return IndiaFlag.src
        case "nl-NL":
        case "nl-BE":
            return NLFlag.src
        case "ru-RU":
            return RuFlag.src
        case "zh-TW":
            return ROCFlag
        case "zh-HK":
            return HKFlag.src
        case "zh-CDO":
        case "zh-CJY":
        case "zh-CMN":
        case "zh-CNP":
        case "zh-CPX":
        case "zh-CSH":
        case "zh-CSP":
        case "zh-MIN":
        case "zh-GAN":
        case "zh-HAK":
        case "zh-HSN":
        case "zh-LZH":
        case "zh-MNP":
        case "zh-MC":
        case "zh-NAN":
        case "zh-WUU":
        case "zh-YUE":
            return ChinaFlag.src
            
        default:
    }
}
export interface Map_Database_Values_For_ReactBootstrap {
    alignment: number | string
    text_alignment: number | string | null
}

export const Map_Database_Values_For_ReactBootstrap = (dto: Map_Database_Values_For_ReactBootstrap) => {

    switch (true) {
        case dto.alignment === 0:
            dto.alignment = `justify-content-start`
            break
        case dto.alignment === 1:
            dto.alignment = `justify-content-center`
            break
        case dto.alignment === 2:
            dto.alignment = `justify-content-end`
            break
        default:
    }

    switch (true) {
        case dto.text_alignment === 0:
            dto.text_alignment = `text-start`
            break
        case dto.text_alignment === 1:
            dto.text_alignment = `text-center`
            break
        case dto.text_alignment === 2:
            dto.text_alignment = `text-end`
            break
        default:
    }

    return {
        alignment: dto.alignment as string,
        text_alignment: dto.text_alignment as string,
    }
}

export const Set_Navigation_Menu_Display = (value: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {
    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_NAV_SHOW, payload: { navbar_css_display_value: value } })
    })
}

export const Map_GUI_Values_For_Database_Storage = (dto: {
    alignment: string | number
    text_alignment: string | number
}) => {
    switch (true) {
        case dto.alignment === 'justify-content-start':
            dto.alignment = 0
            break
        case dto.alignment === `justify-content-center`:
            dto.alignment = 1
            break
        case dto.alignment === `justify-content-end`:
            dto.alignment = 2
            break
        default:
    }
    switch (true) {
        case dto.text_alignment === 'text-start':
            dto.text_alignment = 0
            break
        case dto.text_alignment === `text-center`:
            dto.text_alignment = 1
            break
        case dto.text_alignment === `text-end`:
            dto.text_alignment = 2
            break
        default:
    }
    return {
        alignment: dto.alignment as number,
        text_alignment: dto.text_alignment as number,
    }
}

let timedInterval: NodeJS.Timeout | null = null
export const Delay_Execution = (time: number, Action: () => void): void => {
    if (timedInterval) {
        clearInterval(timedInterval)
    }

    timedInterval = setInterval(() => {
        const now = Date.now()
        const distance = time - now
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (seconds === 0) {
            Action()
        }

        if (distance < 0) {
            clearInterval(timedInterval!)
            timedInterval = null
        }
    }, 1000)
}

export class Moveable_Card_2D {

    private observer: MutationObserver | null = null
    private html_body: HTMLElement
    private container: HTMLElement | null
    private html_element: HTMLElement | null = null
    private active = false
    private currentX = 0
    private currentY = 0
    private initialX = 0
    private initialY = 0
    private xOffset = 0
    private yOffset = 0

    constructor() {

        this.html_body = document.body
        this.container = document.querySelector("#main")

        try {
            const isMobileOrSmallScreen = (): boolean => {
                const widthThreshold = 600
                const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                const isSmallScreen = window.innerWidth <= widthThreshold
                return isMobile || isSmallScreen
            }

            const handleResize = (): void => {
                if (!isMobileOrSmallScreen() && this.container) {
                    const events: [string, EventListenerOrEventListenerObject][] = [
                        ["mousedown", (e: Event) => this.drag_start(e as MouseEvent)],
                        ["mouseup", (e: Event) => this.drag_end(e)],
                        ["mousemove", (e: Event) => this.dragging(e as MouseEvent)],
                        ["touchstart", (e: Event) => this.drag_start(e as TouchEvent)],
                        ["touchend", (e: Event) => this.drag_end(e)],
                        ["touchmove", (e: Event) => this.dragging(e as TouchEvent)],
                    ]
                    for (const [evt, handler] of events) {
                        this.container.addEventListener(evt, handler, false)
                    }

                    this.observer = new MutationObserver((mutationsList) => {
                        for (const mutation of mutationsList) {
                            if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                                const theme = this.html_body.getAttribute("data-theme")
                                const cards = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>
                                if (theme === "Night-Theme") {
                                    for (const card of Array.from(cards)) {
                                        card.style.background = "linear-gradient(45deg, rgb(0, 0, 4) 10%, rgba(39, 37, 36, 0.5) 62%, rgb(0 0 4))"
                                    }
                                } else if (theme === "Light-Theme") {
                                    for (const card of Array.from(cards)) {
                                        card.style.background = "linear-gradient(45deg, rgb(255, 255, 255) 10%, rgba(255, 255, 255, 0.5) 62%, rgb(255, 255, 255))"
                                    }
                                }
                            }
                        }
                    })

                    this.observer.observe(this.html_body, {
                        attributes: true,
                        attributeFilter: ["data-theme"]
                    })
                }
            }

            handleResize()
            window.addEventListener("resize", handleResize)

        } catch (error) {
            console.error("Initialization error in Moveable_Card_2D:", error)
        }
    }

    private dragging = (e: MouseEvent | TouchEvent): void => {
        e.preventDefault()
        try {
            const target = e.target as HTMLElement
            this.html_element = target.closest(".moveable") as HTMLElement

            if (this.html_element && !this.html_element.style.transform) {
                this.setTranslate(0, 0, this.html_element)
            }

            if (this.active && this.html_element) {
                if (e instanceof TouchEvent) {
                    this.currentX = e.touches[0].clientX - this.initialX
                    this.currentY = e.touches[0].clientY - this.initialY
                } else {
                    this.currentX = e.clientX - this.initialX
                    this.currentY = e.clientY - this.initialY
                }

                this.xOffset = this.currentX
                this.yOffset = this.currentY

                this.setTranslate(this.currentX, this.currentY, this.html_element)
            }
        } catch (error) {
            console.error("Dragging error:", error)
        }
    }

    private drag_start = (e: MouseEvent | TouchEvent): void => {
        try {
            const target = e.target as HTMLElement
            if (target.tagName === "DIV") e.preventDefault()

            this.html_element = target.closest(".moveable") as HTMLElement

            if (!this.html_element || !this.html_element.style) return

            if (!this.html_element.style.transform) {
                this.setTranslate(0, 0, this.html_element)
            }

            this.html_element.style.zIndex = "5"

            if (this.html_body.getAttribute("data-theme")) {
                this.html_element.style.background = "transparent"
            }

            this.html_element.style.borderColor = "blue"

            const transform = this.html_element.style.transform
            const [x, y] = transform
                .split("(")[1]
                .split(")")[0]
                .split(",")
                .map(val => parseInt(val.trim()))

            if (e instanceof TouchEvent) {
                this.initialX = e.touches[0].clientX - x
                this.initialY = e.touches[0].clientY - y
            } else {
                this.initialX = e.clientX - x
                this.initialY = e.clientY - y
            }

            this.active = true
        } catch (error) {
            console.error("Drag start error:", error)
        }
    }

    private drag_end = (e: Event): void => {
        e.preventDefault()

        if (this.html_element) {
            const theme = this.html_body.getAttribute("data-theme")
            if (theme === "Night-Theme") {
                this.html_element.style.background = "linear-gradient(45deg, rgb(0, 0, 4) 10%, rgba(39, 37, 36, 0.5) 62%, rgb(0 0 4))"
            } else if (theme === "Light-Theme") {
                this.html_element.style.background = "linear-gradient(45deg, rgb(255, 255, 255) 10%, rgba(255, 255, 255, 0.5) 62%, rgb(255, 255, 255))"
            }

            this.html_element.style.borderColor = "initial"
            this.html_element.style.zIndex = "2"
            this.initialX = this.currentX
            this.initialY = this.currentY
            this.active = false
        }
    }

    private setTranslate = (xPos: number, yPos: number, el: HTMLElement): void => {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`
    }
} 