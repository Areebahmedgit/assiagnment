import { useRef } from "react"
import Link from "next/link"
import {  useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Form({signin,onformsubmit}){
  const { data: session } = useSession();
  const router = useRouter();

  const emailref = useRef()
  const passwordref = useRef()
  const firstref = useRef()
  const lastref = useRef()
  const submithandler = (e)=>{
    const email = emailref.current.value
    const password = passwordref.current.value
    const firstn = firstref.current.value
    const lastn = lastref.current.value
e.preventDefault()
onformsubmit(email ,password,firstn , lastn)
  }
    return(
    <>
  <div><h1 class="mar-left si">{signin ? "signin" : "signup"}</h1></div>
   <div class="form-flex">
   <div class="forum">
    <form onSubmit={submithandler}>
   <div class="form-floating mb-3">
  <input ref={firstref} type="text" class="form-control" id="floatingInput" placeholder="First Name"/>
  <label for="floatingInput">First Name</label>
</div>
<div class="form-floating mb-3">
  <input ref={lastref} type="text" class="form-control" id="floatingInput" placeholder="Last Name"/>
  <label for="floatingInput">Last Name</label>
</div>
   <div class="form-floating mb-3">
  <input ref={emailref} type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label for="floatingInput">Email address</label>
</div>
<div class="form-floating">
  <input ref={passwordref} type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Password</label>
</div>
<Link href={signin ? "/auth/signup" :"/auth/login"  }>
{signin ? "Do not have an account signup":
      "Already have account signin"
}
</Link>
{session ? (
              <button type="button" className="btn btn-primary" onClick={() => signOut()}>
                Logout
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                {signin ? "Sign In" : "Sign Up"}
              </button>
            )}
</form>
</div>
</div>
    </>
    )
}