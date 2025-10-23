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