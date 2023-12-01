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
          },
          include: {
            teamUsers: true
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

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        // For now just use the first team. Once people can invite others and be part
        // of multiple teams we'll need to change this and allow people to select.
        token.teamId = user.teamUsers[0].teamId
      }

      return token
    },
    session: async ({ session, token }) => {
      const userSession = {
        email: token.email,
        id: token.id,
      }

      const teamSession = {
        id: token.teamId,
      }

      session.user = userSession
      session.team = teamSession
      
      return session
    }
  },

  pages: {
    signIn: '/sign-in',
  }
}