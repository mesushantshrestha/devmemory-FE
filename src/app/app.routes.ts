import { Routes } from '@angular/router';
import { CapturePage } from './features/capture/pages/capture-page/capture-page';
import { SavedPage } from './features/capture/pages/saved-page/saved-page';
import { ItemDetailPage } from './features/capture/pages/item-detail-page/item-detail-page';

export const routes: Routes = [
    { path: '', component: CapturePage },
    { path: 'saved', component: SavedPage },
    { path: 'item/:id', component: ItemDetailPage },
    { path: '**', redirectTo: '' },
];
