'use client';

import { useContext, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/navbar';
import { FileCard } from '@/components/file-card';
import { GeneralFileDialog } from '@/components/general-file-dialog';
import { SecretFileDialog } from '@/components/secret-file-dialog';
import { GeneralFile, SecretFile, mockGeneralFiles, mockSecretFiles } from '@/lib/types';
import { FileText, Lock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
    const { user, fetchMe } = useContext(UserContext)
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMe();
                if (!response) {
                    router.push("/auth/signin")
                    return
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    const [generalFiles, setGeneralFiles] = useState<GeneralFile[]>(mockGeneralFiles);
    const [secretFiles, setSecretFiles] = useState<SecretFile[]>(mockSecretFiles);
    const [selectedGeneralFile, setSelectedGeneralFile] = useState<GeneralFile | null>(null);
    const [selectedSecretFile, setSelectedSecretFile] = useState<SecretFile | null>(null);
    const [isGeneralDialogOpen, setIsGeneralDialogOpen] = useState(false);
    const [isSecretDialogOpen, setIsSecretDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredGeneralFiles = generalFiles.filter(file =>
        file.key.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSecretFiles = secretFiles.filter(file =>
        file.key.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenGeneralFile = (file: GeneralFile) => {
        setSelectedGeneralFile(file);
        setIsGeneralDialogOpen(true);
    };

    const handleOpenSecretFile = (file: SecretFile) => {
        setSelectedSecretFile(file);
        setIsSecretDialogOpen(true);
    };

    const handleDeleteGeneralFile = (id: string) => {
        setGeneralFiles(prev => prev.filter(file => file.id !== id));
        toast.success('File deleted successfully');
    };

    const handleDeleteSecretFile = (id: string) => {
        setSecretFiles(prev => prev.filter(file => file.id !== id));
        toast.success('Secret file deleted successfully');
    };

    if (!user) {
        return <Skeleton />
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold">Your Vault</h1>

                        <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search files..."
                                className="pl-8 w-full sm:w-[250px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <Tabs defaultValue="general" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="general" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>General Files</span>
                            </TabsTrigger>
                            <TabsTrigger value="secret" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                <span>Secret Files</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="general" className="space-y-4">
                            {filteredGeneralFiles.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <FileText className="h-12 w-12 mb-4 text-muted-foreground" />
                                    <h3 className="text-lg font-medium">No general files found</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {searchQuery ? 'Try a different search term' : 'Create your first general file to get started'}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {filteredGeneralFiles.map((file) => (
                                        <FileCard
                                            key={file.id}
                                            id={file.id}
                                            title={file.key}
                                            date={file.createdAt}
                                            isSecret={false}
                                            onClick={() => handleOpenGeneralFile(file)}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="secret" className="space-y-4">
                            {filteredSecretFiles.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Lock className="h-12 w-12 mb-4 text-muted-foreground" />
                                    <h3 className="text-lg font-medium">No secret files found</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {searchQuery ? 'Try a different search term' : 'Create your first secret file to get started'}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {filteredSecretFiles.map((file) => (
                                        <FileCard
                                            key={file.id}
                                            id={file.id}
                                            title={file.key}
                                            date={file.createdAt}
                                            isSecret={true}
                                            onClick={() => handleOpenSecretFile(file)}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <GeneralFileDialog
                file={selectedGeneralFile}
                isOpen={isGeneralDialogOpen}
                onClose={() => setIsGeneralDialogOpen(false)}
                onDelete={handleDeleteGeneralFile}
            />

            <SecretFileDialog
                file={selectedSecretFile}
                isOpen={isSecretDialogOpen}
                onClose={() => setIsSecretDialogOpen(false)}
                onDelete={handleDeleteSecretFile}
            />
        </div>
    );
}
