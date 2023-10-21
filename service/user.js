import { compare, hash } from 'bcrypt'
import fs from 'fs'
import path from 'path'

const filepath = path.join(process.cwd(),"data","user.json")

export function getAll(){
   const data = fs.readFileSync(filepath)
   return JSON.parse(data)
}
export function getid(id){
    const data = getAll()
   return data.find(p => p.id === Number(id)  )
 }
export function getEmail(email){
    const data = getAll()
   return data.find(p => p.email=== email)
 }
 export async function verifypassword(hashpass,password){
    const isvalid = await compare (password, hashpass)
    return isvalid
 }
 export async function save(email, password ,firstn , lastn){
    const find = getEmail(email)
    if(find){
         throw new Error ("user alredy exist")
    }
    const data = getAll()
    const hashpass =await hash(password,12)
    data.push({
        id: data.length + 1,
        email,
        password:hashpass,
        firstn,lastn
    })
    fs.writeFileSync (filepath, JSON.stringify(data))
 }

