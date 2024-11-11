import { NextAuthOptions } from "next-auth"
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization:{
                params:{scope:'user:email'}
            }
        }),
        

    ],
    session: { strategy: "jwt" },
    

    secret: process.env.SECRET!,
    
}