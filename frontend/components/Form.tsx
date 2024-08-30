"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFetch } from "@/hook/useFetch"
import { useMutation } from "@tanstack/react-query"
import { Spinner } from "./Spinner"

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export const FormComp = () => {
    const { onAddInfo } = useFetch()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ["sign up"],
        mutationFn: (data: z.infer<typeof FormSchema>) => onAddInfo("http://localhost:2000/api/post", data)
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <h2 className=" mt-[1.4rem] text-blue-500 text-[1.3rem]">Sign Up</h2>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Enter your name.." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Enter your email.." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={"blue"} size={"sm"} className="w-full">
                    {isPending ? <Spinner /> : "Submit"}
                    {/* Submit */}
                </Button>
            </form>
        </Form>
    )
}
