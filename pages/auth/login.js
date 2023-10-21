import Form from '@/component/auth/form'
import {signIn} from "next-auth/react"
import { useRouter } from 'next/router'
import { getSession } from "next-auth/react"
export default function signin() {
  const router = useRouter()
  const onsubmit =async (email,password,firstn , lastn) =>{
    
   const dat =await signIn('credentials',{redirect : false , email,password,firstn , lastn})
   if (dat.error) {
    throw new Error ("sign in error")
   }if (dat.ok) {
    router.push("/profile")
   }
  }
    return( 
        <>
       <Form signin = {true}  onformsubmit = {onsubmit}/>
        </>    
    )
    
}
export async function getServerSideProps({req}) {
  const session = await getSession({req})
  if (session) {
      return{
          redirect:{
             destination : "/profile",
             permanent :false
          }
      }   
  }return{
      props:{
          session
      }
      }
  }