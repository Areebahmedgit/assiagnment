import { getEmail, verifypassword } from "@/service/user";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  // Configure one or more authentication providers
  session:{
    jwt : true
  },
  providers: [
    CredentialsProvider({
     async authorize ({email, password,firstn , lastn}){
        const user = getEmail(email,firstn , lastn)
        if (!user) {
            throw new Error("user not exist")
        }
        const isvalid = await verifypassword(user.password , password)
        if (!isvalid) {
            throw new Error("incorrect password")
        }return{email}
     }
        
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)