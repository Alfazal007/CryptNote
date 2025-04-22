'use client';

import { useContext, useEffect, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { UserContext } from '@/app/context/UserContext';
import axios from 'axios';
import { DOMAIN } from '@/constants';
import { createTemporaryReferenceSet } from 'next/dist/server/app-render/entry-base';

const formSchema = z.object({
    key: z.string().min(3, {
        message: 'Key must be at least 3 characters.',
    }),
    content: z.string().min(1, {
        message: 'Content cannot be empty.',
    }),
});

export default function AddGeneralFilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!user) {
            router.push("/dashboard")
            return
        }
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            key: '',
            content: '',
        },
    });

    async function onSubmit() {
        try {
            setIsLoading(true);
            const { key, content } = form.getValues()
            const createGeneralFileResponse = await axios.post(`${DOMAIN}/api/general/create`, {
                key,
                generalData: content
            })
            if (createGeneralFileResponse.status == 201) {
                toast("Added new data successfully")
                router.push("/dashboard")
            } else {
                toast("Issue creating the data")
            }
        } catch (err: any) {
            if (err.response.data.errors) {
                toast(err.response.data.errors)
            } else {
                toast(err.response.data.message)
            }
        } finally {
            setIsLoading(false);
        }
    }

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
                                <FileText className="h-5 w-5 text-primary" />
                                <CardTitle>Create General File</CardTitle>
                            </div>
                            <CardDescription>
                                Add a new general file to your vault
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
                                                <FormLabel>File Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter a name for your file" {...field} />
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
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter your content here..."
                                                        className="min-h-[200px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end">
                                        <Button onClick={onSubmit} disabled={isLoading}>
                                            {isLoading ? 'Creating...' : 'Create File'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
