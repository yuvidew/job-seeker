import React from 'react'
import { SignUp } from './SignUp'
import { Button } from './ui/button'

export const Header = () => {
    return (
        <header>
            <div className=' container'>
                <div className='h-[5rem]  flex items-center justify-between'>
                    <div className=' flex items-center justify-start gap-2'>
                        <h3 className=' text-[2rem] font-bold text-[#3e6ed7]'>Job.com</h3>
                    </div>
                    <main className=' flex items-center justify-end'>
                        <SignUp>
                            <Button variant={"blue"} size={"sm"}>
                                Sign Up
                            </Button>
                        </SignUp>
                    </main>
                </div>
            </div>
        </header>
    )
}
