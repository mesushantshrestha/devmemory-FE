import { Routes } from '@angular/router';
import { CapturePage } from './features/capture/pages/capture-page/capture-page';
import { SavedPage } from './features/capture/pages/saved-page/saved-page';

export const routes: Routes = [
    { path: '', component: CapturePage },
    { path: 'saved', component: SavedPage },
    { path: '**', redirectTo: '' },
];
