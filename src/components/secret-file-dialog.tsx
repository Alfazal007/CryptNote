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

interface SecretFileDialogProps {
    file: SecretFile | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (id: string) => void;
}

export function SecretFileDialog({ file, isOpen, onClose, onDelete }: SecretFileDialogProps) {
    const [password, setPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const handleVerify = () => {
        if (file && password === file.passwordHash) { // In a real app, you'd verify against a hash
            setIsVerified(true);
            setIsError(false);
        } else {
            setIsError(true);
        }
    };

    const handleDelete = () => {
        if (file && onDelete) {
            onDelete(file.id);
            onClose();
        }
    };

    const handleClose = () => {
        setPassword('');
        setIsVerified(false);
        setIsError(false);
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
                                    setIsError(false);
                                }}
                                className={isError ? "border-red-500" : ""}
                            />
                            {isError && (
                                <p className="text-sm text-red-500">Incorrect password. Please try again.</p>
                            )}
                        </div>
                        <Button onClick={handleVerify} className="w-full">
                            Verify Password
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="h-[200px] mt-2 p-4 border rounded-md">
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
                                    <Button variant="outline" onClick={handleClose}>
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
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
