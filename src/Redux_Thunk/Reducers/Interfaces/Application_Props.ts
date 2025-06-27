import { Timestamp } from 'next/dist/server/lib/cache-handlers/types'

export interface Application_Props {
    community: {
        users: {
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
    }
    language_dictionaries: Language_Dictionaries
    profile_viewer: {
        id: BigInt | null
        name: string | null
        created_on: BigInt | null
        logout_on: BigInt | null
    }
    settings: {
        current_language: string
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
