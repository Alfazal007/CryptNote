export type GeneralFile = {
    id: string;
    key: string;
    content: string;
    createdAt: string;
};

export type SecretFile = {
    id: string;
    key: string;
    content: string;
    passwordHash: string;
    createdAt: string;
};

// Mock data for demonstration purposes
export const mockGeneralFiles: GeneralFile[] = [
    {
        id: '1',
        key: 'Project Notes',
        content: 'These are my important project notes. They contain details about the architecture, design decisions, and implementation strategies. This content can be quite long and detailed, containing multiple paragraphs of information that I want to keep track of...',
        createdAt: '2025-01-15T10:30:00Z',
    },
    {
        id: '2',
        key: 'Shopping List',
        content: '1. Milk\n2. Eggs\n3. Bread\n4. Apples\n5. Coffee\n6. Pasta\n7. Tomatoes\n8. Cheese',
        createdAt: '2025-01-17T14:45:00Z',
    },
    {
        id: '3',
        key: 'Meeting Minutes',
        content: 'Team Meeting - January 20, 2025\n\nAttendees: John, Sarah, Michael, Emily\n\nDiscussed:\n- Q1 goals and OKRs\n- Project timeline updates\n- Resource allocation\n- Upcoming deadlines\n\nAction Items:\n- John to finalize the project plan by Friday\n- Sarah to coordinate with the design team\n- Michael to review the budget\n- Emily to schedule the follow-up meeting',
        createdAt: '2025-01-20T09:15:00Z',
    },
];

export const mockSecretFiles: SecretFile[] = [
    {
        id: '1',
        key: 'Bank Account',
        content: 'Account Number: XXXX-XXXX-XXXX-1234\nRouting Number: XXXXXXXXX\nPIN: 1234',
        passwordHash: 'password123', // In a real app, this would be a proper hash
        createdAt: '2025-01-10T08:20:00Z',
    },
    {
        id: '2',
        key: 'Email Credentials',
        content: 'Email: user@example.com\nPassword: SecureP@ss123',
        passwordHash: 'password123', // In a real app, this would be a proper hash
        createdAt: '2025-01-12T16:35:00Z',
    },
    {
        id: '3',
        key: 'API Keys',
        content: 'API Key 1: ak_test_12345abcdef\nAPI Key 2: sk_live_67890ghijkl\nWebhook Secret: whsec_mnopqrstuvwxyz',
        passwordHash: 'password123', // In a real app, this would be a proper hash
        createdAt: '2025-01-18T11:10:00Z',
    },
];
