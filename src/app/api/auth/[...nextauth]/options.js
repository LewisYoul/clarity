import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import prisma from "../../../utils/prisma"

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

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: async ({ session, token }) => {
      const userSession = {
        email: token.email,
        id: token.id,
      }

      session.user = userSession
      
      return session
    }
  },

  pages: {
    signIn: '/sign-in',
  },
  useSecureCookies: false
}