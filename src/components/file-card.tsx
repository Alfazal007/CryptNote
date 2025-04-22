'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Lock } from 'lucide-react';

interface FileCardProps {
    id: number;
    title: string;
    date: string;
    isSecret: boolean;
    onClick: () => void;
}

export function FileCard({ id, title, date, isSecret, onClick }: FileCardProps) {
    return (
        <Card
            className="cursor-pointer overflow-hidden transition-all hover:shadow-md"
            onClick={onClick}
        >
            <CardHeader className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        {isSecret ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        )}
                        <CardTitle className="text-base">{title}</CardTitle>
                    </div>
                </div>
                <CardDescription className="text-xs mt-1">
                    {new Date(date).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
