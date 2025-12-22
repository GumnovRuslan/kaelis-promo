import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.kaelisai.com/api';

export async function POST(req: Request) {
  try {
    const userAgent = req.headers.get('user-agent') || ''
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || ''
    
    const acceptLanguage = req.headers.get('accept-language') || 'en'
    const language = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    const mappedLanguage = language === 'ua' ? 'uk' : (language === 'ru' ? 'ru' : 'en')

    const deviceInfo: Record<string, string> = {
      ip: ip || '::1',
      browser: userAgent,
      device: userAgent,
    }

    const requestBody = JSON.stringify(deviceInfo)

    const response = await fetch(`${API_BASE_URL}/user/anonymous`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': mappedLanguage,
      },
      body: requestBody,
    })


    if (!response.ok) {
      const errorData = await response.text()
      console.error('Error response body:', errorData)
      return NextResponse.json(
        { error: 'Failed to authenticate guest', details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Success response:', JSON.stringify(data).substring(0, 200))
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Guest authentication error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

