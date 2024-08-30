import React, { ReactNode } from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FormComp } from './Form'
import { QueryProvider } from './provider/QueryProvider'



export const SignUp = ({children} : {children : ReactNode}) => {
    return (
        <QueryProvider>
            <Sheet>
                <SheetTrigger>
                    {children}
                </SheetTrigger>
                <SheetContent>
                    <FormComp/>
                </SheetContent>
            </Sheet>
        </QueryProvider>
    )
}
