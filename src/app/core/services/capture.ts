import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { CaptureItem } from '../models/capture-item';
import { CAPTURE_REPOSITORY, CaptureRepository } from '../repositories/capture.repository';

@Injectable({
  providedIn: 'root',
})
export class CaptureService {
  private readonly _items$ = new BehaviorSubject<CaptureItem[]>([]);
  readonly items$ = this._items$.asObservable();

  get snapshot(): CaptureItem[] {
    return this._items$.value;
  }

  constructor(@Inject(CAPTURE_REPOSITORY) private repo: CaptureRepository) {}

  load(): void {
    this.repo.getAll().pipe(take(1)).subscribe(items => this._items$.next(items));
  }

  add(item: CaptureItem): void {
    this.repo.add(item).pipe(take(1)).subscribe(items => this._items$.next(items));
  }

  remove(id: string): void {
    this.repo.remove(id).pipe(take(1)).subscribe(items => this._items$.next(items));
  }

  clear(): void {
    this.repo.clear().pipe(take(1)).subscribe(items => this._items$.next(items));
  }
}
