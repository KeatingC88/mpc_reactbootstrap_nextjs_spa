import { Timestamp } from 'next/dist/server/lib/cache-handlers/types'

export interface Application_Props {
    mobile_mode: boolean

    community: {
        users: {
            [x: string]: any
            account_types: {
                [id: number]: number
            },
            avatars: {
                Avatar_url_path: string,
                Avatar_title: string
            }[] | never,
            display_names: {
                ID: BigInt,
                Name: string
            }[] | never,
            languages: {
                Language_code: string,
                Region_code: string
            }[]
        } | null
        news: {
            articles: [],
            count: number
        } | null
        profile_viewer: {
            id: BigInt | number | null
            birth_date: string | null
            ethnicity: string | null
            first_name: string | null
            last_name: string | null
            gender: number | null
            maiden_name: string | null
            middle_name: string | null
            account_type: string | null
            avatar_title: string | null
            avatar_url_path: string | null
            created_on: number | null
            custom_lbl: string | null
            language_code: string | null
            region_code: string | null
            online_status: number | null
            name: string | null
            logout_on: number | null
            login_type: string | null
            login_on: number | null
        }
    }

    progress_bar_value: number

    language_dictionaries: Language_Dictionaries
    
    settings: {
        current_language: string
        current_language_value: string
        current_region_value: string
        theme: number
        alignment: string
        text_alignment: string
        flag: string
        nav_lock: boolean
        gmt_time: Timestamp
        local_time: Timestamp
        date: string
        location: string
        grid_type: number
        navbar_css_display_value: string
    }

    websocket: {
        chat_conversations: Record<string, any>
        conversation_received_approvals: {
            name: string
            User_ID: BigInt
        }[]
        conversation_sent_requests: {
            name: string
            User_ID: BigInt
        }[]
        conversation_received_requests: {
            User_ID: BigInt
            name: string
        }[]
        conversation_sent_approvals: {
            Participant_ID: BigInt
            name: string
        }[]
        conversation_sent_blocks: {
            Participant_ID: BigInt
            name: string
        }[]
        conversation_received_blocks: {
            User_ID: BigInt
            name: string
        }[]
        
    }
}

interface Language_Code {
    [key: string]: string
}

interface Region_Code {
    [region: string]: Language_Code
}

interface Language_Dictionaries {
    [language: string]: Region_Code
}
