import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import { ArrowRight, Lock, FileText, Shield } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                <section className="py-20 md:py-28">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                    Secure. Simple. Reliable.
                                </div>
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                    Your Personal Vault for{" "}
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Sensitive Content
                                    </span>
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Store your general files and secret content securely with password protection. Access anytime, anywhere.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/dashboard">
                                    <Button className="px-8 group">
                                        Get Started
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/auth/signin">
                                    <Button variant="outline" className="px-8">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-16 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 backdrop-blur-sm transition-all hover:shadow-md">
                                <Shield className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Secure Storage</h3>
                                <p className="text-center text-muted-foreground">
                                    Password-protected content with advanced encryption to keep your data safe.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 backdrop-blur-sm transition-all hover:shadow-md">
                                <FileText className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">General Files</h3>
                                <p className="text-center text-muted-foreground">
                                    Store general text content with easy access and organization.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 backdrop-blur-sm transition-all hover:shadow-md">
                                <Lock className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Secret Content</h3>
                                <p className="text-center text-muted-foreground">
                                    Extra protection for your most sensitive information with password verification.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        <p className="text-sm text-muted-foreground">
                            © 2025 Vault. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link className="text-sm text-muted-foreground underline-offset-4 hover:underline" href="#">
                            Privacy Policy
                        </Link>
                        <Link className="text-sm text-muted-foreground underline-offset-4 hover:underline" href="#">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
