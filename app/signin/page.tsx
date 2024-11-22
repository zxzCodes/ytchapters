'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import {GitHubLogoIcon } from "@radix-ui/react-icons"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function SignInPage() {

  const { data: session } = useSession();
  const router = useRouter()
  if(session) {
    router.push("/dashboard")
  }

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10" />
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-20 h-20 mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 text-white"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
          <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
          variant={'default'}
          onClick={() => signIn("github", { callbackUrl: "/dashboard"})}
           className="w-full " size="lg">
            <GitHubLogoIcon className="mr-2 h-5 w-5" />
            Sign in with Github
          </Button>
          <p className="px-4 text-center text-sm text-muted-foreground">
            By signing in, you agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}