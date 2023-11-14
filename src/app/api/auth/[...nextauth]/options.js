import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "your email"
        },
        password: {
          label: "Password:",
          type: "password"
        }
      },
      async authorize(credentials) {
        const prisma = new PrismaClient()
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) { return null }

        try {
          const match = await bcrypt.compare(credentials.password, user.passwordDigest)

          if (!match) { return null }
        } catch (error) {
          console.error(error)

          return null
        }

        return user;
      }
    })
  ],

  pages: {
    signIn: '/sign-in',
  }
}