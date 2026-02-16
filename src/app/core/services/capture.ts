import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { CaptureItem } from '../models/capture-item';
import { CAPTURE_REPOSITORY, CaptureRepository } from '../repositories/capture.repository';
import { CaptureApiService, CreateCaptureItemRequest, UpdateCaptureItemRequest } from './capture-api-service';

@Injectable({
  providedIn: 'root',
})
export class CaptureService {
  private readonly _itemsSubject = new BehaviorSubject<CaptureItem[]>([]);
  readonly items$ = this._itemsSubject.asObservable();
  constructor(private api: CaptureApiService) { }

  load(): void {
    this.api.getAll().subscribe(items => {
      this._itemsSubject.next(items);
    });
  }

  add(req: CreateCaptureItemRequest) {
    return this.api.create(req).pipe(
      tap(saved => {
        const current = this._itemsSubject.value;
        this._itemsSubject.next([saved, ...current]);
      })
    );
  }

  remove(id: string) {
    return this.api.delete(id).pipe(
      tap(() => {
        const current = this._itemsSubject.value;
        this._itemsSubject.next(current.filter(x => x.id !== id));
      })
    );
  }

  update(id: string, patch: UpdateCaptureItemRequest) {
    return this.api.update(id, patch).pipe(
      tap(updated => {
        const current = this._itemsSubject.value;
        const next = current.map(x => (x.id === id ? updated : x));
        this._itemsSubject.next(next);
      })
    );
  }
}
