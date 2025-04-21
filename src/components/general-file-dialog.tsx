'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GeneralFile } from '@/lib/types';

interface GeneralFileDialogProps {
    file: GeneralFile | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (id: string) => void;
}

export function GeneralFileDialog({ file, isOpen, onClose, onDelete }: GeneralFileDialogProps) {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const handleDelete = () => {
        if (file && onDelete) {
            onDelete(file.id);
            onClose();
        }
    };

    if (!file) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{file.key}</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                        Created on {new Date(file.createdAt).toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[300px] mt-2 p-4 border rounded-md">
                    <div className="whitespace-pre-wrap">{file.content}</div>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between sm:justify-between">
                    {isDeleteConfirmOpen ? (
                        <>
                            <p className="text-sm text-muted-foreground mr-2">Are you sure?</p>
                            <div>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleDelete}
                                    className="mr-2"
                                >
                                    Yes, Delete
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsDeleteConfirmOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            {onDelete && (
                                <Button
                                    variant="destructive"
                                    onClick={() => setIsDeleteConfirmOpen(true)}
                                >
                                    Delete
                                </Button>
                            )}
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
