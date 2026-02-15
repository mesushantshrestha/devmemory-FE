import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CaptureItem } from '../models/capture-item';

export interface CaptureRepository {
  getAll(): Observable<CaptureItem[]>;
  add(item: CaptureItem): Observable<CaptureItem[]>;
  remove(id: string): Observable<CaptureItem[]>;
  clear(): Observable<CaptureItem[]>;
}

export const CAPTURE_REPOSITORY = new InjectionToken<CaptureRepository>('CAPTURE_REPOSITORY');
