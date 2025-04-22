'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import axios from 'axios';
import { DOMAIN } from '@/constants';

const formSchema = z.object({
    key: z.string().min(3, {
        message: 'Key must be at least 3 characters.',
    }),
    content: z.string().max(255, {
        message: 'Content cannot exceed 255 characters.',
    }).min(1, {
        message: 'Content cannot be empty.',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
})

export default function AddSecretFilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [charactersLeft, setCharactersLeft] = useState(255);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            key: '',
            content: '',
            password: '',
        },
    });

    async function onSubmit() {
        try {
            setIsLoading(true)
            const { key, content, password } = form.getValues()
            const createSecretResponse = await axios.post(`${DOMAIN}/api/secret/create`, {
                key,
                secret: content,
                password
            })
            if (createSecretResponse.status == 201) {
                toast("Created the secret successfully")
                router.push("/dashboard")
            } else {
                toast("There was an issue creating the secret")
            }
        } catch (err: any) {
            toast(err.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const remainingChars = 255 - e.target.value.length;
        setCharactersLeft(remainingChars);
        form.setValue('content', e.target.value);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="gap-1">
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-primary" />
                                <CardTitle>Create Secret File</CardTitle>
                            </div>
                            <CardDescription>
                                Add a new password-protected secret file to your vault
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="key"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Secret Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter a name for your secret" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Secret Content</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter your secret content here..."
                                                        className="min-h-[100px]"
                                                        {...field}
                                                        onChange={handleContentChange}
                                                        maxLength={255}
                                                    />
                                                </FormControl>
                                                <FormDescription className="flex justify-end">
                                                    <span className={charactersLeft < 50 ? "text-orange-500" : charactersLeft < 10 ? "text-red-500" : ""}>
                                                        {charactersLeft} characters left
                                                    </span>
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Protection Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Enter your original password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <ShieldCheck className="h-4 w-4 mr-1 text-green-500" />
                                            <span>Password protected content</span>
                                        </div>
                                        <Button onClick={onSubmit} disabled={isLoading}>
                                            {isLoading ? 'Creating...' : 'Create Secret File'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </main >
        </div >
    );
}
