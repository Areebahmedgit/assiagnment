// import { signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// export default function Header (){
//     const { data: session } = useSession();
//     return(
//         <>
//         <div class="head">
//             <div class="head-fle">
//            <div class="mar-left">
//             <Link href="/"><h1>My Blog Site</h1></Link>
//              </div>
//            <div class="log-fle">
//             {!session ? (
//                 <>
//            <Link href="/auth/login"><h6 class="mar">Login</h6></Link>
//            <Link href="/auth/signup"><h6 class="mar">signup</h6></Link>
//            </>
//            ):(
//           <Link href=""><h6 onClick={signOut}>Logout</h6></Link>)}
//            </div>
           
//            </div>
//         </div>
//         </>
//     )
// }
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="head">
      <div className="head-fle">
        <div className="mar-left">
          <Link href="/">
            <h1>My Blog Site</h1>
          </Link>
        </div>
        <div className="log-fle">
          {!session ? (
            <>
              <Link href="/auth/login">
                <h6 className="mar">Login</h6>
              </Link>
              <Link href="/auth/signup">
                <h6 className="mar">Signup</h6>
              </Link>
            </>
          ) : (
            <Link href="">
              <h6 onClick={() => signOut()}>Logout</h6>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
