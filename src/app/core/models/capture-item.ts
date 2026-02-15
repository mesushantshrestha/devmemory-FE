export interface CaptureItem {
    id: string;
    text: string;
    createdAt: string; // ISO
    type: 'remember' | 'task' | 'idea' | 'snippet';
    language?: string;      // only for snippets
}
