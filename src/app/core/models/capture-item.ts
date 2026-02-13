export interface CaptureItem {
    id: string;
    text: string;
    createdAt: string; // ISO
    type?: 'idea' | 'task' | 'remember';
}
