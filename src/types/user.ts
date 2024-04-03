export type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'unverified';
    emailVerified: boolean;
    beatLeaderLink: string;
    scoreSaberLink: string;
};