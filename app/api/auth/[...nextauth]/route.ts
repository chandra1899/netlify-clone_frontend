import { connectMongoDB } from "@/config/mongoose"
import User from "@/models/user"
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
    async signIn(info:any) {
      if(info.profile.login){
        info.user.name = info.profile.login
      }
      await connectMongoDB()
      let user = await User.findOne({email : info.user.email})

      if(!user){
        await User.create({
          name : info.user.name,
          email : info.user.email
        })
      }
      // console.log(info);
      return info.user
    }
  }
}

// export default NextAuth(authOptions)
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}