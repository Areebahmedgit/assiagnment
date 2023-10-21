import Form from "@/component/auth/form";
import { useRouter } from "next/router";
export default function signup(){
    const router = useRouter()
    const onsubmit = async (email, password,firstn , lastn)=>{
        try{
           const respo =  await fetch("/api/auth/signup",{
            method:"POST",
            body:JSON.stringify({email,password,firstn , lastn}),
            headers:{
                "Content-Type": "application/json"
            }
        }) 
        
        if (respo.ok) {
            router.push("/success")
        }
        }catch(err){
            console.error(err)
        }
      
        }
    return(
        <>
        <Form signin={false} onformsubmit = {onsubmit} />
        </>
    )
}
