import Link from "next/link";

export default function Success() {
    return(
        <>
      <div  class="center">
        <h5>Successful signup for security purpose please Signin</h5>
       <Link href="/auth/login"><button type="submit" className="btn btn-primary ju"> Signin</button></Link> 
      </div>
        </>
    )
}