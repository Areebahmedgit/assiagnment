import { save } from "@/service/user"

export default function(req,res){
    if(req.method !=="POST"){
       return res.status(404).send() 
    }
    const {email, password,firstn , lastn} = req.body
    try{
       save(email, password,firstn , lastn)
        res.status(201).send()
    }
    catch(err){
        res.status(400).json({message:err})
    }
}