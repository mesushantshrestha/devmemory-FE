import { Routes } from '@angular/router';
import { CapturePage } from './features/capture/pages/capture-page/capture-page';

export const routes: Routes = [
    { path: '', component: CapturePage },
    { path: '**', redirectTo: '' },
];
