import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import CopyKatt from '@/components/CopyKitt/CopyKitt'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
     <CopyKatt />
    </main>
  )
}
