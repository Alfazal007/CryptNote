'use client';

import { useEffect, useState } from 'react';
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
import axios from 'axios';
import { DOMAIN } from '@/constants';
import { toast } from 'sonner';

interface GeneralFileDialogProps {
    file: GeneralFile | null;
    isOpen: boolean;
    onClose: () => void;
    getNormalData: () => Promise<void>
}

export function GeneralFileDialog({ file, isOpen, onClose, getNormalData }: GeneralFileDialogProps) {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [content, setContent] = useState<string>("loading...");
    const [, setIsCopied] = useState(false);

    useEffect(() => {
        getContent()
    }, [file])

    const handleDelete = async () => {
        if (file) {
            try {
                const deleteResponse = await axios.post(`${DOMAIN}/api/general/delete`, {
                    key: file.key
                })
                console.log({ deleteResponse })
                if (deleteResponse.status == 200) {
                    toast("Deleted the data successfully")
                    getNormalData()
                }
            } catch (err) {
                toast("Issue deleting the data")
            } finally {
                setIsDeleteConfirmOpen(false)
                onClose();
            }
        }
    };

    async function getContent() {
        try {
            if (!file) {
                return
            }
            const contentResponse = await axios.post(`${DOMAIN}/api/general/get`, {
                key: file.key
            })
            if (contentResponse.status == 200) {
                setContent(contentResponse.data.data)
            }
        } catch (err) {
        }
    }

    const handleCopy = async () => {
        if (file) {
            await navigator.clipboard.writeText(content);
            setIsCopied(true);
            toast.success('Content copied to clipboard');
            setTimeout(() => setIsCopied(false), 2000);
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
                    <div className="whitespace-pre-wrap">{content}</div>
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
                            {(

                                <div>
                                    <Button
                                        className='mr-2'
                                        onClick={handleCopy}
                                    >
                                        Copy
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => setIsDeleteConfirmOpen(true)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
