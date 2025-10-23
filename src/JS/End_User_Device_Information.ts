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