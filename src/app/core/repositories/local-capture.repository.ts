import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CaptureItem } from '../models/capture-item';
import { CaptureRepository } from './capture.repository';

@Injectable()
export class LocalCaptureRepository implements CaptureRepository {
  private readonly STORAGE_KEY = 'qc_items_v1';

  getAll(): Observable<CaptureItem[]> {
    return of(this.load());
  }

  add(item: CaptureItem): Observable<CaptureItem[]> {
    const next = [item, ...this.load()];
    this.save(next);
    return of(next);
  }

  remove(id: string): Observable<CaptureItem[]> {
    const next = this.load().filter(x => x.id !== id);
    this.save(next);
    return of(next);
  }

  clear(): Observable<CaptureItem[]> {
    this.save([]);
    return of([]);
  }

  private load(): CaptureItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as CaptureItem[]) : [];
    } catch {
      return [];
    }
  }

  private save(items: CaptureItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }

  update(id: string, patch: Partial<CaptureItem>) {
    const next = this.load().map(item =>
        item.id === id ? { ...item, ...patch } : item
        );
        this.save(next);
        return of(next);
        }
}
