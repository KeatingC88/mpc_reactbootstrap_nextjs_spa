import {
    UPDATE_APPLICATION_NEWS_FEED_STATE,
    NULL_APPLICATION_NEWS_FEED_STATE,
} from '@Constants'

interface Application_News_Feed_State {
    news: [] | null
    count: number | null
}

interface Application_News_Feed_Action {
    type: string
    payload?: {
        articles: [],
        count: number
    }
}

const initial_state: Application_News_Feed_State = {
    news: null,
    count: null
}

const Application_News_Feed_State_Reducer = (
    state: Application_News_Feed_State = initial_state,
    action: Application_News_Feed_Action
): Application_News_Feed_State => {
    if (action.type.indexOf(`APPLICATION_NEWS_FEED`) > -1) {
        
        switch (action.type) {
            case UPDATE_APPLICATION_NEWS_FEED_STATE:
                return {
                    ...state,
                    news: action.payload?.articles ?? initial_state.news,
                    count: action.payload?.count ?? initial_state.count
                }
            case NULL_APPLICATION_NEWS_FEED_STATE:
                return {
                    ...state,
                    news: null
                }
            default:
                break
        }
    }

    return {
        ...state,
        news: state.news ?? initial_state.news,
        count: state.count ?? initial_state.count
    }
}

export default Application_News_Feed_State_Reducer