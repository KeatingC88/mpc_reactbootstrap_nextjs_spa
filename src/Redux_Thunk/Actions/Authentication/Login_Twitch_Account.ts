import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import {
    UPDATE_END_USER_TWITCH_ACCOUNT_STATE,
    USERS_SERVER_ADDRESS
} from '@Constants'

export const Login_Twitch_Account = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    console.log(code)

    // Send code to backend
    fetch(`${USERS_SERVER_ADDRESS}/Exchange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    }).then((response) => {
        console.log(response)
/*        if (response) {
            dispatch({ type: UPDATE_END_USER_TWITCH_ACCOUNT_STATE, payload: { id: response } })
        }*/

    })

}