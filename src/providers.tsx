'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster richColors closeButton />
        </ThemeProvider>
    );
}
