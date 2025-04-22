export type GeneralFile = {
    id: number;
    key: string;
    createdAt: string;
};

export type SecretFile = {
    id: number;
    key: string;
    content: string;
    passwordHash: string;
    createdAt: string;
};

