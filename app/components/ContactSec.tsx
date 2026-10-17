import React from 'react'
import { Reveal } from './Reveal'
import SectionHeader from './SectionHeader'
import Image from 'next/image'
import Github from "./../../public/github.png"
import Facebook from "./../../public/facebook.png"
import Tiktok from "./../../public/tiktok.png"
import { Mail } from 'lucide-react'

function ContactSec() {
  return (
    <>
      <Reveal id='contact'>
        <SectionHeader order='04.' title='CONTACT'/>
      </Reveal>

      <div className="flex lg:flex-row flex-col items-center lg:items-end justify-between gap-25 pb-30 border-b">
        <Reveal className='text-7xl md:text-9xl ld:text-[150px] lg:leading-35 font-display lg:text-start text-center'>
          GOT <br />  A PROJECT?
        </Reveal>
        <Reveal className='flex gap-5'>
          <a href='https://github.com/Micheal43-web' className='bg-stone-200 p-3 shadow-btn border rounded-md hover:shadow-none hover:translate-2 transition-all'>
            <Image  
              src={Github}
              alt='Github'
              height={10}
              width={10}
              className='h-10 w-10'
            />
          </a>
          <a href='https://www.facebook.com/profile.php?id=61591663772420&locale=ar_AR' className='bg-stone-200 p-3 shadow-btn border rounded-md hover:shadow-none hover:translate-2 transition-all'>
            <Image  
              src={Facebook}
              alt='Facebook'
              height={10}
              width={10}
              className='h-10 w-10'
            />
          </a>
          <a href='https://www.facebook.com/profile.php?id=61591663772420&locale=ar_AR' className='bg-stone-200 p-3 shadow-btn border rounded-md hover:shadow-none hover:translate-2 transition-all'>
            <Image  
              src={Tiktok}
              alt='Tiktok'
              height={10}
              width={10}
              className='h-10 w-10'
            />
          </a>
          
        </Reveal>
      </div>
    </>
  )
}

export default ContactSec