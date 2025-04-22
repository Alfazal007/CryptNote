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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SecretFile } from '@/lib/types';
import axios from 'axios';
import { DOMAIN } from '@/constants';
import { toast } from 'sonner';

interface SecretFileDialogProps {
    file: SecretFile | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (id: number) => void;
    getSecretData: () => Promise<void>
}

export function SecretFileDialog({ getSecretData, file, isOpen, onClose, onDelete }: SecretFileDialogProps) {
    const [password, setPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [secret, setSecret] = useState("")
    const [, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (file) {
            await navigator.clipboard.writeText(secret);
            setIsCopied(true);
            toast.success('Content copied to clipboard');
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleVerify = async () => {
        try {
            if (!file) {
                return
            }
            const openSecretResponse = await axios.post(`${DOMAIN}/api/secret/get`, {
                key: file.key,
                password
            })
            if (openSecretResponse.status == 200) {
                setIsVerified(true)
                setSecret(openSecretResponse.data.secret)
            }
        } catch (err: any) {
            toast(err.response.data.message)
        }
    };

    const handleDelete = async () => {
        try {
            if (!file) {
                return
            }
            const deleteResult = await axios.post(`${DOMAIN}/api/secret/delete`, {
                key: file.key,
                password
            })
            if (deleteResult.status == 200) {
                toast("Deleted secret file successfully")
            } else {
                toast("Issue deleting the secret")
            }
            await getSecretData()
        } catch (err: any) {
            toast(err.response.data.message)
        } finally {
            onClose()
            handleClose()
        }
    };

    const handleClose = () => {
        console.log("ran")
        setPassword('')
        setSecret("")
        setIsVerified(false);
        setIsDeleteConfirmOpen(false);
        onClose();
    };

    if (!file) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{file.key}</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                        Created on {new Date(file.createdAt).toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>

                {!isVerified ? (
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="password">Enter password to view content</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <Button onClick={handleVerify} className="w-full"
                            disabled={
                                password ? false : true
                            }
                        >
                            Open Secret
                        </Button>
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
                                    <Button variant="outline" onClick={handleClose}>
                                        Close
                                    </Button>
                                    {onDelete && (
                                        <Button
                                            disabled={
                                                password ? false : true
                                            }
                                            variant="destructive"
                                            onClick={() => setIsDeleteConfirmOpen(true)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </>
                            )}
                        </DialogFooter>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="h-[200px] mt-2 p-4 border rounded-md">
                            <div className="whitespace-pre-wrap">{secret}</div>
                        </ScrollArea>
                        <Button
                            className='mr-2'
                            onClick={handleCopy}
                        >
                            Copy
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog >
    );
}
