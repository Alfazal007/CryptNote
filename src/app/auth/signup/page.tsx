'use client';

import axios from "axios"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { DOMAIN } from "@/constants";

const formSchema = z.object({
    username: z.string().min(6, {
        message: 'Username must be at least 6 characters.',
    }).max(20, { message: "Username must not be greater than 20 characters" }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }).max(20, { message: "Password must not be greater than 20 characters" }),
    confirmPassword: z.string().min(6, {
        message: 'Confirm password must be at least 6 characters.',
    }).max(20, { message: "Confirm password must not be greater than 20 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
    });

    async function onSubmit() {
        try {
            setIsLoading(true);
            const { username, password, confirmPassword } = form.getValues()
            if (password !== confirmPassword) {
                toast("Password and confirm password dont match")
                return
            }
            const responseSignup = await axios.post(`${DOMAIN}/api/auth/signup`, {
                username,
                password
            })
            if (responseSignup.status !== 201) {
                if (responseSignup.data.message)
                    toast(responseSignup.data.message)
                else
                    toast("Issue signing up")
            } else {
                toast(responseSignup.data.message)
                router.push("/auth/signin")
            }
        } catch (err: any) {
            toast(err.response.data.message)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-2">
                            <UserPlus className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                        <CardDescription className="text-center">
                            Enter your details to register a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Choose a username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Create a password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirm your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full" type="submit" disabled={isLoading} onClick={onSubmit} >
                                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/auth/signin" className="text-primary underline">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
