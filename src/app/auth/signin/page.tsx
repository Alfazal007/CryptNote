'use client';

import axios from "axios";
import { useContext, useState } from 'react';
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
import { LogIn } from 'lucide-react';
import { toast } from "sonner";
import { DOMAIN } from "@/constants";
import { UserContext } from "@/app/context/UserContext";

const formSchema = z.object({
    username: z.string().min(6, {
        message: 'Username must be at least 6 characters.',
    }).max(20, { message: "Username must not be greater than 20 characters" }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }).max(20, { message: "Password must not be greater than 20 characters" }),
});

export default function SignInPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(UserContext)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    async function onSubmit() {
        try {
            setIsLoading(true);
            const { username, password, } = form.getValues()
            const responseSignin = await axios.post(`${DOMAIN}/api/auth/signin`, {
                username,
                password
            })
            if (responseSignin.status == 200) {
                setUser({
                    accessToken: responseSignin.data.accessToken,
                    username: responseSignin.data.username
                })
                router.push("/dashboard")
            } else {
                toast(responseSignin.data.message)
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
                            <LogIn className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access your account
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
                                                <Input placeholder="Enter your username" {...field} />
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
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/auth/signup" className="text-primary underline">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
