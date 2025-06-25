import {
    UPDATE_APPLICATION_WEBSOCKET_STATE,
    NULL_APPLICATION_WEBSOCKET_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_USAGE_PERMISSIONS_STATE,
    NULL_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE,
    NULL_APPLICATION_WEBSOCKET_USAGE_PERMISSIONS_STATE,
    NULL_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE,
    NULL_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE,
    NULL_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE,
    NULL_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE,
    NULL_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE,
    NULL_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE,
} from '@Constants'

interface Application_WebSocket_State {
    usage_permissions: any
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
        Participant_ID: BigInt
        name: string
        Approved: number
        Requested: number
        Updated_by: BigInt | null
    }[]
    conversation_sent_approvals: {
        Participant_ID: BigInt
        name: string
        User_ID: BigInt
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

interface Application_WebSocket_Action {
    type: string;
    payload?: Partial<Application_WebSocket_State>;
}

const initial_state: Application_WebSocket_State = {
    conversation_received_requests: [],
    conversation_received_blocks: [],
    conversation_received_approvals: [],
    conversation_sent_requests: [],
    conversation_sent_blocks: [],
    conversation_sent_approvals: [],
    usage_permissions: [],
    chat_conversations: {}
}

const Application_WebSocket_State_Reducer = (
    state: Application_WebSocket_State = initial_state,
    action: Application_WebSocket_Action
): Application_WebSocket_State => {
    if (action.type.includes('APPLICATION_WEBSOCKET')) {
        switch (action.type) {
            case UPDATE_APPLICATION_WEBSOCKET_STATE:
                return {
                    ...state,
                    chat_conversations: action.payload?.chat_conversations ?? initial_state.chat_conversations,
                    conversation_received_requests: action.payload?.conversation_received_requests ?? initial_state.conversation_received_requests,
                    conversation_received_blocks: action.payload?.conversation_received_blocks ?? initial_state.conversation_received_blocks,
                    conversation_received_approvals: action.payload?.conversation_received_approvals ?? initial_state.conversation_received_approvals,
                    conversation_sent_requests: action.payload?.conversation_sent_requests ?? initial_state.conversation_sent_requests,
                    conversation_sent_blocks: action.payload?.conversation_sent_blocks ?? initial_state.conversation_sent_blocks,
                    conversation_sent_approvals: action.payload?.conversation_sent_approvals ?? initial_state.conversation_sent_approvals,
                    usage_permissions: action.payload?.usage_permissions ?? initial_state.usage_permissions
                }

            case UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE:
                return {
                    ...state,
                    chat_conversations: action.payload?.chat_conversations ?? initial_state.chat_conversations
                }

            case UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE:
                return {
                    ...state,
                    conversation_received_requests: action.payload?.conversation_received_requests ?? initial_state.conversation_received_requests
                }

            case UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE:
                return {
                    ...state,
                    conversation_received_blocks: action.payload?.conversation_received_blocks ?? initial_state.conversation_received_blocks
                }

            case UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE:
                return {
                    ...state,
                    conversation_received_approvals: action.payload?.conversation_received_approvals ?? initial_state.conversation_received_approvals
                }

            case UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE:
                return {
                    ...state,
                    conversation_sent_requests: action.payload?.conversation_sent_requests ?? initial_state.conversation_sent_requests
                }

            case UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE:
                return {
                    ...state,
                    conversation_sent_blocks: action.payload?.conversation_sent_blocks ?? initial_state.conversation_sent_blocks
                }

            case UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE:
                return {
                    ...state,
                    conversation_sent_approvals: action.payload?.conversation_sent_approvals ?? initial_state.conversation_sent_approvals
                }

            case UPDATE_APPLICATION_WEBSOCKET_USAGE_PERMISSIONS_STATE:
                return {
                    ...state,
                    usage_permissions: action.payload?.usage_permissions ?? initial_state.usage_permissions
                }

            case NULL_APPLICATION_WEBSOCKET_STATE:
                return { ...initial_state }

            case NULL_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE:
                return {
                    ...state,
                    chat_conversations: initial_state.chat_conversations
                }

            case NULL_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE:
                return {
                    ...state,
                    conversation_received_requests: initial_state.conversation_received_requests
                }

            case NULL_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE:
                return {
                    ...state,
                    conversation_received_blocks: initial_state.conversation_received_blocks
                }

            case NULL_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE:
                return {
                    ...state,
                    conversation_received_approvals: initial_state.conversation_received_approvals
                }

            case NULL_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE:
                return {
                    ...state,
                    conversation_sent_requests: initial_state.conversation_sent_requests
                }

            case NULL_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE:
                return {
                    ...state,
                    conversation_sent_blocks: initial_state.conversation_sent_blocks
                }

            case NULL_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE:
                return {
                    ...state,
                    conversation_sent_approvals: initial_state.conversation_sent_approvals
                }

            case NULL_APPLICATION_WEBSOCKET_USAGE_PERMISSIONS_STATE:
                return {
                    ...state,
                    usage_permissions: initial_state.usage_permissions
                }

            default:
                break
        }
    }

    return {
        ...state,
        chat_conversations: state.chat_conversations ?? initial_state.chat_conversations,
        conversation_received_requests: state.conversation_received_requests ?? initial_state.conversation_received_requests,
        conversation_received_blocks: state.conversation_received_blocks ?? initial_state.conversation_received_blocks,
        conversation_received_approvals: state.conversation_received_approvals ?? initial_state.conversation_received_approvals,
        conversation_sent_requests: state.conversation_sent_requests ?? initial_state.conversation_sent_requests,
        conversation_sent_blocks: state.conversation_sent_blocks ?? initial_state.conversation_sent_blocks,
        conversation_sent_approvals: state.conversation_sent_approvals ?? initial_state.conversation_sent_approvals,
        usage_permissions: state.usage_permissions ?? initial_state.usage_permissions
    }
}

export default Application_WebSocket_State_Reducer
