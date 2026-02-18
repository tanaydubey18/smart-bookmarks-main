
import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') 
      const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      // Construct safer absolute URL for production mobile browsers
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`${forwardedProto}://${forwardedHost}${next}`)
      } else {
        // Fallback to origin but ensure it's secure
        const secureOrigin = origin.replace('http://', 'https://')
        return NextResponse.redirect(`${secureOrigin}${next}`)
      }
    } else {
      console.error('Auth error during code exchange:', error.message)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
