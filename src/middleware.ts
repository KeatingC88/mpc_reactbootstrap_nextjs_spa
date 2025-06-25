import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    const capitalizedPath = pathname
        .split('/')
        .map(segment =>
            segment ? segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase() : ''
        )
        .join('/')

    if (pathname !== capitalizedPath) {
        const url = request.nextUrl.clone()
        url.pathname = capitalizedPath
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}