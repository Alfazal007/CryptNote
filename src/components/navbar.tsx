'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';

export function Navbar() {
    const pathname = usePathname() as string;
    const isAuthPage = pathname.includes('/auth');
    const isHome = pathname === '/';
    const isLoggedIn = pathname !== '/' && !isAuthPage;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xl hidden sm:inline-block">Vault</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/general/add">
                                <Button variant="ghost" size="sm">
                                    Add General
                                </Button>
                            </Link>
                            <Link href="/secret/add">
                                <Button variant="ghost" size="sm">
                                    Add Secret
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="ghost" size="sm">
                                    Logout
                                </Button>
                            </Link>
                        </>
                    ) : isHome ? (
                        <>
                            <Link href="/auth/signin">
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button variant="default" size="sm">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : null}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
