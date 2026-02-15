export interface CaptureItem {
    id: string;
    title?: string;
    text: string;
    createdAt: string; // ISO
    type: 'remember' | 'task' | 'idea' | 'snippet';
    language?: string;      // only for snippets
}
