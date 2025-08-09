import FAQ from "./FAQ"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    keywords: [
        'FAQ',
        'Frequently Asked Questions'
    ],
}

const Frequently_Asked_Questions_Page = (): React.ReactElement => {
    return (
        <FAQ />
    )
}

export default Frequently_Asked_Questions_Page