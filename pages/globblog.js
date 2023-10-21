import Greeting from "@/component/time";
import Link from "next/link";

export default function Globblog() {
    
    return( 
        <>
        <div class="mar-left">
        <Link href="/profile" class="prof"><h4>Go To Profile</h4></Link>
            <h1><Greeting/></h1>
        <div><h3 class="martop">All Blogs</h3></div>
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?crop=1xw:1.0xh;center,top&resize=1200:*" class="img-fluid rounded-start siz" alt="err"/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
       <div class="fle"> <h3 class="card-title">introducind whisper</h3>
       <h6 class="card-title">Elon musk august 17th 2023</h6>
       </div>
        <p class="card-text par">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
        </p>
      </div>
    </div>
  </div>
</div>
        </div>
        </>
    )
}
