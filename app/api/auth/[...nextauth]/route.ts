import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret : process.env.JWT_SECRET,
  callbacks : {
    async signIn(x:any) {
      console.log(x);
      x.user.name = "x.profile.login"
      return x.user
      
    }
  }
}

// export default NextAuth(authOptions)
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}