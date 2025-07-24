import {
    CHAT_SERVER_ADDRESS_WSPROTOCOL,
    CHAT_SERVER_ADDRESS,
    USERS_SERVER_ADDRESS,
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE,
    CLIENT_ADDRESS,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CHAT_SERVER_UNIVERSE_NAME,
    DEFAULT_HOST_ERROR_STATE,
    USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'

import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import axios from 'axios'

let User_Selected_FontSize: number = 1

let End_User_Conversations: any = {}

const set_avatar_image_source_url = (avatar_url_path: string): string => {
    if (!avatar_url_path || avatar_url_path === "null") {
        return `<img class="d-inline-block align-top m-2 p-0 default-user-chat-icon" />`
    } else {
        return `<img class="d-inline-block align-top m-2 p-0" src="${avatar_url_path}" />`
    }
}

type ChatMessageData = {
    html_list_group_item_value: string
    avatar_url_path: string
    name: string
    online_status: string | number
    message: string
}

type ChatMessage = {
    data: ChatMessageData
    time_stamp: string | number
}

const create_chat_message_element = (obj: ChatMessage): HTMLDivElement => {
    const container = document.createElement("div");
    container.classList.add("list-group-item", `list-group-item-${obj.data.html_list_group_item_value}`);

    const row = document.createElement("div");
    row.classList.add("row");

    const avatar_column = document.createElement("div");
    avatar_column.classList.add("col-xs-5", "col-sm-12", "col-md-4", "col-lg-3", "col");

    const avatar_image_element = document.createElement("div");
    avatar_image_element.innerHTML = set_avatar_image_source_url(obj.data.avatar_url_path);

    const user_name_display_element = document.createElement(`h${User_Selected_FontSize}`);
    user_name_display_element.textContent = obj.data.name.split("#")[0];

    const online_status_element = document.createElement("span");
    online_status_element.style.color = Chat_Status_Color_Display(parseInt(obj.data.online_status.toString()));

    avatar_column.appendChild(avatar_image_element);
    avatar_column.appendChild(user_name_display_element);
    avatar_column.appendChild(online_status_element);

    const message_column = document.createElement("div");
    message_column.classList.add("col-xs-7", "col-sm-12", "col-md-8", "col-lg-9", "col");

    const message_row = document.createElement("div");
    message_row.classList.add("row");

    const message_column_container = document.createElement("div");
    message_column_container.classList.add("col", "text-start");

    const message_heading_element = document.createElement(`h${User_Selected_FontSize}`);
    message_heading_element.textContent = obj.data.message;

    const time_stamp_element = document.createElement("p");
    time_stamp_element.classList.add("text-end");
    time_stamp_element.textContent = new Date(parseInt(obj.time_stamp.toString())).toLocaleString();

    message_column_container.appendChild(message_heading_element);
    message_column_container.appendChild(time_stamp_element);
    message_row.appendChild(message_column_container);
    message_column.appendChild(message_row);

    row.appendChild(avatar_column);
    row.appendChild(message_column);
    container.appendChild(row);

    return container;
};

const create_chat_message_elements = (): DocumentFragment => {

    const fragment = document.createDocumentFragment()

    for (let participant in End_User_Conversations) {

        for (let message_time_stamp in End_User_Conversations[participant]) {

            const message_as_html_element = create_chat_message_element({
                time_stamp: message_time_stamp,
                data: End_User_Conversations[participant][message_time_stamp]
            })
            fragment.appendChild(message_as_html_element)
        }

    }

    return fragment
}

const fetch_participant_data_from_cache_server = ({
    response_data,
    token,
}: {
    response_data: any[];
    token: string | null;
}): any[] => {
     
    const collected_data: any[] = [];
    
    for (let data of response_data) {

        let combine_permission_data_with_participant_profile_data = {...data}

        axios.post(`${USERS_CACHE_SERVER_ADDRESS}/get/user`, {
            token: token,
            id: Encrypt(`${data.Participant_ID}`)
        }).then(async (response: any) => {

            let participant_data: any = {}

            Object.keys(response.data).forEach((index: any) => {
                const set_decrypted_string = Decrypt(`${response.data[index]}`)
                const set_decrypted_number = parseInt(set_decrypted_string)

                participant_data[index] = Number.isNaN(set_decrypted_number) ? set_decrypted_string : set_decrypted_number

            })

            Object.assign(combine_permission_data_with_participant_profile_data, participant_data)

            collected_data.push(combine_permission_data_with_participant_profile_data)
        })

    }

    return collected_data
}

const fetch_end_user_data_from_cache_server = ({
    response_data,
    token,
}: {
    response_data: any[];
    token: string | null;
}): any[] => {

    let collected_data: any[] = []

    for (let data of response_data) {

        let combine_permission_data_with_participant_profile_data = {...data}

        axios.post(`${USERS_CACHE_SERVER_ADDRESS}/get/user`, {
            token: token,
            id: Encrypt(`${data.User_ID}`)
        }).then(async (response: any) => {

            let participant_data: any = {}

            Object.keys(response.data).forEach((index: any) => {
                const set_decrypted_string = Decrypt(`${response.data[index]}`)
                const set_decrypted_number = parseInt(set_decrypted_string)

                participant_data[index] = Number.isNaN(set_decrypted_number) ? set_decrypted_string : set_decrypted_number

            })

            Object.assign(combine_permission_data_with_participant_profile_data, participant_data)

            collected_data.push(combine_permission_data_with_participant_profile_data)
        })

    }

    return collected_data
}

export const Read_Both_Conversation_Participants_WebSocket_Conversation_Permissions_And_Profile_Data_For_Chat_Menu = () => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Chat_Requests/End_User`, {
            token: await end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            error.id = `WebSocket-Chat-Request-Data-Request-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)

        }).then( async (response: any) => {

            if (response.data === "") {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE, payload: { conversation_sent_requests: [] } })

            } else {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE, payload: { conversation_sent_requests: fetch_participant_data_from_cache_server({ response_data: response.data, token: end_user_account.token })}})

            }
        })
        
        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Chat_Blocks/End_User`, {
            token: await end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            error.id = `WebSocket-Block-Data-Request-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)

        }).then( async (response: any) => {
            if (response.data === "") {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE, payload: { conversation_sent_blocks: [] } })

            } else {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE, payload: { conversation_sent_blocks: fetch_participant_data_from_cache_server({ response_data: response.data, token: end_user_account.token })}})

            }
        })

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Chat_Approvals/End_User`, {
            token: await end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            error.id = `WebSocket-Approval-Data-Request-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)

        }).then( async (response: any) => {

            if (response.data === "") {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE, payload: { conversation_sent_approvals: [] } })

            } else {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE, payload: { conversation_sent_approvals: fetch_participant_data_from_cache_server({ response_data: response.data, token: end_user_account.token })}})

            }
        })

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Chat_Requests/Participant`, {
            token: await end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {
            error.id = `WebSocket-Request-Participant-Data-Request-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
        }).then(async (response: any) => {

            if (response.data === "") {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE, payload: { conversation_received_requests: [] } })

            } else {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE, payload: { conversation_received_requests: fetch_end_user_data_from_cache_server({ response_data: response.data, token: end_user_account.token })}})

            }
        })

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Chat_Blocks/Participant`, {
            token: await end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {
            error.id = `WebSocket-Blocks-Participant-Data-Request-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
        }).then(async (response: any) => {

            if (response.data === "") {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE, payload: { conversation_received_blocks: [] } })

            } else {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE, payload: { conversation_received_blocks: fetch_end_user_data_from_cache_server({ response_data: response.data, token: end_user_account.token })}})

            }
        })

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Chat_Approvals/Participant`, {
            token: await end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {
            error.id = `WebSocket-Approval-Data-Request-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
        }).then(async (response: any) => {

            if (response.data === "") {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE, payload: { conversation_received_approvals: [] } })

            } else {

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE, payload: { conversation_received_approvals: fetch_end_user_data_from_cache_server({ response_data: response.data, token: end_user_account.token })}})

            }
        })
    }
}

export const Send_WebSocket_Chat_Message = (obj:{
    message: string
    user: BigInt 
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    const timestamp = Date.now().toString()

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let end_user_id = end_user_account.id.toString()
        let user = obj.user.toString()

        let current_language_state = state.Application_Language_State_Reducer

        WebSocket_Direct_Chat_Connection(JSON.stringify({
            id: end_user_id,
            send_to: user,
            message: await Encrypt(`${obj.message}`),
            timestamp: await Encrypt(`${timestamp}`),
            name: await Encrypt(`${end_user_account.name}#${end_user_account.public_id}`),
            online_status: await Encrypt(`${end_user_account.online_status}`),
            avatar_url_path: await Encrypt(`${end_user_account.avatar_url_path}`),
            avatar_title: await Encrypt(`${end_user_account.avatar_title}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`)
        }))
        
        if (!End_User_Conversations[user]) {
            End_User_Conversations[user] = {}
        }

        End_User_Conversations[user][timestamp] = {
            id: end_user_account.id,
            send_to: user,
            message: obj.message,
            timestamp: timestamp,
            name: `${end_user_account.name}#${end_user_account.public_id}`,
            online_status: end_user_account.online_status,
            avatar_url_path: end_user_account.avatar_url_path,
            avatar_title: end_user_account.avatar_title,
            language: current_language_state.language,
            region: current_language_state.region,
            html_list_group_item_value: `primary`
        }
        
        if (state.Application_WebSocket_State_Reducer.chat_conversations[user] === undefined)
            state.Application_WebSocket_State_Reducer.chat_conversations[user] = []

        state.Application_WebSocket_State_Reducer.chat_conversations[user].push([
            end_user_id,
            user,
            obj.message,
            timestamp,
            `${end_user_account.name}#${end_user_account.public_id}`,
            end_user_account.online_status,
            end_user_account.avatar_url_path,
            end_user_account.avatar_title,
            current_language_state.language,
            current_language_state.region,
            `primary`
        ])
        
        dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE, payload: { chat_conversations: getState().Application_WebSocket_State_Reducer.chat_conversations } })

        const chat_list_view_box = document.querySelector(
            `.ws-viewer-chatbox-${obj.user}`
        ) as HTMLElement | null;

        if (chat_list_view_box) {
            chat_list_view_box.innerHTML = "";
            chat_list_view_box.appendChild(create_chat_message_elements());
            chat_list_view_box.scrollTop =
                chat_list_view_box.scrollHeight - chat_list_view_box.clientHeight;
        }

    }
}

export const Authenticate_End_Users_Permissions = (dto: {
    id: BigInt,
    message: string | undefined
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Authorize_Users`, {
            token: await end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            user: await Encrypt(`${dto.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Authorized-Request-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        }).then((response: any) => {

            Object.assign(dto, {
                approved: response.data.approved,
                blocked: response.data.blocked,
                requested: response.data.requested
            })
            
        })

        return new Promise((resolve) => {
            resolve(dto)
        })
    }
}

type ConversationEntry = [
    string,
    any,   
    string,
    string, 
    string,
    string,
    string,
    string,
    string,
    string,
    string | undefined 
]

export const Get_End_User_Chat_History_With_Other_User_ID = (participant_id: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    await axios.get(`${CHAT_SERVER_ADDRESS}/${end_user_account.id}/${participant_id}`).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-End-Users-Chat-History-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then((response: any) => {

        if (response) {

            const conversation = {
                ...response.data.from,
                ...response.data.sent_to
            }

            const conversation_array: ConversationEntry[] = Object.values(conversation)

            conversation_array.sort((a, b) => parseInt(Decrypt(a[3])) - parseInt(Decrypt(b[3])))
  
            for (let index in conversation_array) {
                conversation_array[index][2] = Decrypt(conversation_array[index][2])
                conversation_array[index][3] = Decrypt(conversation_array[index][3])
                conversation_array[index][4] = Decrypt(conversation_array[index][4])
                conversation_array[index][5] = Decrypt(conversation_array[index][5])
                conversation_array[index][6] = Decrypt(conversation_array[index][6])
                conversation_array[index][7] = Decrypt(conversation_array[index][7])
                conversation_array[index][8] = Decrypt(conversation_array[index][8])
                conversation_array[index][9] = Decrypt(conversation_array[index][9])
                end_user_account.id == BigInt(conversation_array[index][0]) ? conversation_array[index][10] = `primary` : conversation_array[index][10] = `secondary`
            } 

            let current_conversations = state.Application_WebSocket_State_Reducer.chat_conversations
            current_conversations[participant_id.toString()] = conversation_array

            dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE, payload: { chat_conversations: current_conversations } })

            if (Object.keys(response.data.from).length !== 0) {
                    
                if (!End_User_Conversations[participant_id.toString()]) {
                    End_User_Conversations[participant_id.toString()] = {}
                }

                for (let index in Object.keys(response.data.from)) {
                    End_User_Conversations[participant_id.toString()][parseInt(response.data.from[Object.keys(response.data.from)[index]][3])] = {
                        id: response.data.from[Object.keys(response.data.from)[index]][0],
                        send_to: response.data.from[Object.keys(response.data.from)[index]][1],
                        message: response.data.from[Object.keys(response.data.from)[index]][2],
                        timestamp: response.data.from[Object.keys(response.data.from)[index]][3],
                        name: response.data.from[Object.keys(response.data.from)[index]][4],
                        online_status: response.data.from[Object.keys(response.data.from)[index]][5],
                        avatar_url_path: response.data.from[Object.keys(response.data.from)[index]][6],
                        avatar_title: response.data.from[Object.keys(response.data.from)[index]][7],
                        html_list_group_item_value: `primary`
                    }
                }
            }

            if (Object.keys(response.data.sent_to).length !== 0) {
                    
                if (!End_User_Conversations[participant_id.toString()]) {
                    End_User_Conversations[participant_id.toString()] = {}
                }

                for (let index in Object.keys(response.data.sent_to)) {
                    End_User_Conversations[participant_id.toString()][parseInt(response.data.sent_to[Object.keys(response.data.sent_to)[index]][3])] = {
                        id: response.data.sent_to[Object.keys(response.data.sent_to)[index]][0],
                        send_to: response.data.sent_to[Object.keys(response.data.sent_to)[index]][1],
                        message: response.data.sent_to[Object.keys(response.data.sent_to)[index]][2],
                        timestamp: response.data.sent_to[Object.keys(response.data.sent_to)[index]][3],
                        name: response.data.sent_to[Object.keys(response.data.sent_to)[index]][4],
                        online_status: response.data.sent_to[Object.keys(response.data.sent_to)[index]][5],
                        avatar_url_path: response.data.sent_to[Object.keys(response.data.sent_to)[index]][6],
                        avatar_title: response.data.sent_to[Object.keys(response.data.sent_to)[index]][7],
                        html_list_group_item_value: `secondary`
                    }
                }
            }

            const ordered:any = {}

            for (const userId in End_User_Conversations) {

                const messages = End_User_Conversations[userId]

                // Convert to array and sort by timestamp (as number)
                const sortedEntries = Object.entries(messages).sort((a:any, b:any) => {
                    const tsA = Number(a[1].timestamp)
                    const tsB = Number(b[1].timestamp)
                    return tsA - tsB
                })

                // Reconstruct sorted object
                ordered[userId] = Object.fromEntries(sortedEntries)

            }

            End_User_Conversations = { ...ordered }

            setTimeout(() => {
                const chatListViewBox = document.querySelector(
                    `.ws-viewer-chatbox-${participant_id}`
                ) as HTMLElement | null

                if (chatListViewBox) {
                    chatListViewBox.innerHTML = ""
                    chatListViewBox.appendChild(create_chat_message_elements())
                    chatListViewBox.scrollTop =
                        chatListViewBox.scrollHeight - chatListViewBox.clientHeight
                }
            }, 1)

            return new Promise((resolve) => {
                resolve(true)
            })
        }
    })
}

const Chat_Status_Color_Display = (status_code: number): string => {
    switch (status_code) {
        case 0:
            return 'grey'
        case 1:
            return 'grey'
        case 2:
            return 'green'
        case 3:
            return 'yellow'
        case 4:
            return 'red'
        case 5:
            return 'cyan'
        default:
            return "undefined"
    }
}

export const Approve_Chat_For_End_User = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = getState().End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Approve_Invite`, {
            token: end_user_account.token,
            user: await Encrypt(`${value}`),
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Approve-Chat-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then(() => {

            if (!state.Network_Error_State_Reducer.id) {
                
                let record = state.Application_WebSocket_State_Reducer.conversation_received_requests.filter((x: any) => x.User_ID === value)

                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE, payload: { conversation_received_requests: state.Application_WebSocket_State_Reducer.conversation_received_requests.filter((x: any) => x.User_ID != value) } })

                record[0].Approved = 1
                record[0].Requested = 0
                record[0].Updated_by = end_user_account.id
                
                let updated_records = state.Application_WebSocket_State_Reducer.conversation_sent_approvals
                updated_records.push(record[0])
                
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE, payload: { conversation_sent_approvals: updated_records } })
            }

        })
    }
}

export const Reject_Chat_For_End_User = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Reject_Invite`, {
            token: end_user_account.token,
            user: await Encrypt(`${value}`),
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Approve-Chat-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })
    }
}

export const Block_Chat_For_End_User = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = getState().End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = getState().Application_Language_State_Reducer
        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`BLOCK`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Block-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Spam_Content = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = getState().End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`SPAM`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Spam-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Abusive_Content = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`ABUSE`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Abuse-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Disruptive_Behavior = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer
        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`DISRUPTIVE`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Disruptive-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Self_Harm_Content = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer
        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`SELF_HARM`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Self-Harm-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Illegal_Content = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {
        let current_language_state = state.Application_Language_State_Reducer
        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`ILLEGAL`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Illegal-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Harrass_Chat = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer


    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`HARASS`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Harrass-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Misleading_Chat = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`MISLEADING`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Self-Harm-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Threat_Chat = (value: BigInt) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`THREAT`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Threat-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Nudity_Content = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`NUDITY`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Nudity-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Fake_Account = (value: BigInt) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`FAKE_ACCOUNT`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {

            return new Promise((reject) => {
                error.id = `WebSocket-Report-Fake-Account-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })

        })
    }
}

export const Report_Hate_Content = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer


    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Report_User`, {
            report_type: await Encrypt(`HATE`),
            user: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch((error) => {
            return new Promise((reject) => {
                error.id = `WebSocket-Report-Hate-Speech-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })
        })
    }
}

export let send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void = () => { }

let previous_time_stamp = 0

export const WebSocket_Direct_Chat_Connection = (obj: any) => {

    const ws = new window.WebSocket(`${CHAT_SERVER_ADDRESS_WSPROTOCOL}/${CHAT_SERVER_UNIVERSE_NAME}`,) || { }

    ws.onopen = () => {
        if (JSON.parse(obj).message && Decrypt(`${JSON.parse(obj).message}`) !== "") {
            ws.send(obj)
        }
        send = ws.send.bind(ws)
    }

    ws.onclose = (e) => {
        console.error('close ws connection: ', e.code, e.reason)
    }

    ws.onmessage = (e) => {

        let data = JSON.parse(e.data)
        let time_stamp = parseInt(Decrypt(`${data.timestamp}`))

        let websocket_protocol_sender_id = parseInt(data.id)
        let websocket_protocol_recipient_id = parseInt(JSON.parse(obj).send_to)

        if (previous_time_stamp !== time_stamp && parseInt(data.id) === websocket_protocol_recipient_id) {

            if (!End_User_Conversations[websocket_protocol_recipient_id]) {
                End_User_Conversations[websocket_protocol_recipient_id] = {}
            }
            
            End_User_Conversations[websocket_protocol_recipient_id][time_stamp] = {
                id: websocket_protocol_sender_id,
                name: Decrypt(`${data.name}`),
                online_status: Decrypt(`${data.online_status}`),
                avatar_url_path: Decrypt(`${data.avatar_url_path}`),
                avatar_title: Decrypt(`${data.avatar_title}`),
                timestamp: parseInt(Decrypt(`${data.timestamp}`)),
                send_to: websocket_protocol_recipient_id,
                message: Decrypt(`${data.message}`),
                html_list_group_item_value: `secondary`
            }

            const chatListViewBox = document.querySelector(
                `.ws-viewer-chatbox-${websocket_protocol_recipient_id}`
            ) as HTMLElement
            
            if (chatListViewBox) {
                chatListViewBox.innerHTML = ""
                chatListViewBox.appendChild(create_chat_message_elements())
                chatListViewBox.scrollTop =
                    chatListViewBox.scrollHeight - chatListViewBox.clientHeight
            }

            previous_time_stamp = data.timestamp
        }
    }

    send = ws.send.bind(ws)

}