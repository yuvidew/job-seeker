
import React from 'react';
import { Sparkles, } from 'lucide-react';

import { QueryProvider } from '@/components/provider/QueryProvider';

import { ResumeComp } from './ResumeComp';
import Image from 'next/image';
import img from "@/public/img.jpg"



export const Hero: React.FC = () => {

    
    return (
        <QueryProvider>
            <section className='flex items-center gap-2 h-[75vh]'>
                <div className='lg:w-[60%] h-full flex lg:items-start items-center justify-center flex-col gap-2 relative'>
                    <Sparkles className='absolute top-[5rem] left-0 w-[3rem] h-[3rem] text-[#3e6ed7]' />
                    <h2 className='text-[2.5rem] font-bold text-stone-700'>
                        Get your <span className='text-[#3e6ed7]'>dream job</span> easily with just your gadget
                    </h2>

                    <p className='text-[.9rem] opacity-70 mt-3'>
                        Our website helps you find your dream job with ease. Discover job openings that match your skills and interests, customize your search, and apply quickly. Take the first step towards your ideal career today.
                    </p>
                    <br />
                    <ResumeComp/>
                </div>
                
                <div className='w-[40%]  h-full lg:flex hidden items-center justify-center'>
                    <Image 
                        src={img} 
                        alt='img'
                        className='w-[20rem] h-[20rem] object-contain '
                    />
                </div>
            </section>
        </QueryProvider>
    );
};
