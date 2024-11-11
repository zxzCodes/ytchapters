import {  Button, buttonVariants } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon, PlayCircle } from 'lucide-react'
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper'
import Image from 'next/image'
export default function Page() {
  return (

    <div className='overflow-hidden'>
      <MaxWidthWrapper> 
      <div className='py-20 md:py-28 relative text-center'>
        <h1 className='text-4xl font-extrabold tracking-tighter sm:text-5xl
         bg-clip-text  text-transparent bg-gradient-to-r from-primary to-primary-foreground '>
         easy timeStamps for your Youtube videos
        </h1>
        <p className='mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto'>
Generate timestamps for your Youtube videos with ease. Just paste your video URL and start adding timestamps. You can also share your timestamps with others.

        </p>
        <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Link href={'/signin'}
           className={buttonVariants({
            variant: 'default',
            size:'lg',
            className: 'group w-44'
            
            
            })}>
              Get Started
              <ArrowRightIcon
              className='ml-2 h-4 w-4 group-hover:translate-x-1 transition'
              />
              </Link>

              <Link
               href={'/about'}
               className={buttonVariants({
                variant: 'outline',
                size:'lg',
                className: 'w-44'
               })}
               
               >
              
              Learn more</Link>


        </div>

      </div>

      <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
 {
         [
          {
            
              title: 'AI-powered timestamps',
              description: 'Our AI automatically generates timestamps for your video. Just paste the URL and let us do the rest.',
          
          },

          {
            title: 'Easy to use',
            description: 'Our tool is designed to be user-friendly. You can easily add, edit, and delete timestamps with just a few clicks.',
          },
          {
            title: 'SEO boost',
            description: 'By adding timestamps to your video, you can improve your SEO and make your content more discoverable.',
          }
                  ].map((feature,index) => (
               
                 
                    <div className='bg-secondary/50 p-6 rounded-lg hover:shadow-md transition' key={index}>
                      <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
                      <p className='text-muted-foreground'>{feature.description}</p>

                    </div>
                  ))
 }


      </div>

    
        <div className=' col-span-full flex justify-center mt-24 '>
          <Button variant={'outline'} size={'lg'} className='bg-background/80'>
          <PlayCircle className='mr-2 H-6 w-5'/>
          Watch the demo



          </Button>

   

      </div>
      </MaxWidthWrapper>

      <div className='bg-gradient-to-b from background t0 secondary/20 py-20 md:py-28'>
   
      <MaxWidthWrapper>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold mb-4'>Build by BlackkyDevvs</h2>
        <p className='text-xl text-muted-foreground'>Our mission is to make video content more accessible and engaging for everyone.</p>

      </div>

<div className='mt-5 relative max-w-3xl mx-auto'>
      
<Image width={800}
       height={450}
        src={'/laptop.png'} 
       
        alt='demo image' className='rounded-xl shadow-xl'/>
        <div className='absolute -bottom-8 -right-5 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg'>
          <Link
           href={'/about'}
           className='font-medium hover:underline'
           
           >Learn more about the creator</Link>

        </div>
</div>

</MaxWidthWrapper>

      </div>
    </div>
  )
}
