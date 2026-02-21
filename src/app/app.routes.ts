import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { CapturePage } from './features/capture/pages/capture-page/capture-page';
import { SavedPage } from './features/capture/pages/saved-page/saved-page';
import { ItemDetailPage } from './features/capture/pages/item-detail-page/item-detail-page';

export const routes: Routes = [
    { path: '', component: LoginPage },
    { path: 'capture', component: CapturePage, canActivate: [authGuard] },
    { path: 'saved', component: SavedPage, canActivate: [authGuard] },
    { path: 'item/:id', component: ItemDetailPage, canActivate: [authGuard] },
    { path: '**', redirectTo: '' },
];
