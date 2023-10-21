
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Form from '@/component/auth/form'
import Globblog from './globblog'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
  <Globblog/>
    </>
  )
}
