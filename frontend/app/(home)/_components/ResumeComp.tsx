"use client"

import React, { useState } from 'react';
import { z } from "zod";
import { SignUp } from '@/components/SignUp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetch } from '@/hook/useFetch';
import { ref , getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import {app} from '@/firebase'
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@/components/Spinner';

const imgDB = getStorage(app)

interface objType {
    resume : string | undefined
}

const FormSchema = z.object({
    resume: z
        .any()
        .refine((files) => files && files.length > 0, "You must upload a resume."),
});

export const ResumeComp:React.FC = () => {
    const {onUpload} = useFetch()
    const [imgUrl , setImgUrl] = useState<string>("")
    const userId = typeof window !== 'undefined' ? localStorage.getItem("user-Id") : null;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            resume: null,
        },
    });

    const onUploadImage = async (img: File) => {
        try {
            const imageRef = ref(imgDB, `Img/${Math.floor(Math.random() * 1e10)}`);
            const snapshot = await uploadBytes(imageRef, img);
            const url = await getDownloadURL(snapshot.ref);
            return url
        } catch (error) {
            console.error("Error uploading image:", error);

        }
    };
    
    const onUploadResume = async (data: z.infer<typeof FormSchema>) => {
        let obj : objType = {
            resume : undefined
        }
        try {
            const file = data.resume[0];
            obj.resume = await onUploadImage(file);

            if (obj.resume) {
                await onUpload(`http://localhost:2000/api/post/${userId}`, obj);
            } else {
                console.error("Image URL is not available.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    const {mutate , isPending} = useMutation({
        mutationKey : ["upload Resume"],
        mutationFn : onUploadResume
    })

    
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        mutate(data)
    };
    return (
        <div>
            {!userId ? (
                        <SignUp>
                            <Button variant={"blue"} size={"sm"}>Get Started</Button>
                        </SignUp>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className=' flex items-center gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="resume"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        id="resume"
                                                        type="file"
                                                        className='text-blue-500 font-bold cursor-pointer'
                                                        onChange={(e) => field.onChange(e.target.files)} // Handle file input correctly
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" variant={"blue"} size={"sm"}>
                                        {isPending ? <Spinner/> : "Submit"}
                                        {/* Submit */}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    )}
        </div>
    )
}
