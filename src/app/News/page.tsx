import News_Feed from "./News_Feed";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    keywords: [
        'News & Updates',
        'Release Notes',
        'Product Updates',
        'System Announcements',
        'Change log',
        "What's New",
        'Update Log',
        'Latest News',
        'Newsfeed',
        'The Latest',
        'App Highlights',
        'Dev Updates',
        'Release Tracker',
        'Build Notes',
        'Deployment Feed'
    ]
}

const News_Feed_Page = (): React.ReactElement => {
    return <News_Feed />
}

export default News_Feed_Page;
