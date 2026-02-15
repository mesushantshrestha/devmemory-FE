export interface CaptureItem {
    id: string;
    title?: string;
    text: string;
    createdAt: string; // ISO
    type: 'remember' | 'task' | 'idea' | 'snippet';
    language?: string; 
    pinned?: boolean;
    done?: boolean; // for tasks
}
