import { Injectable } from '@angular/core';
import { CaptureItem } from '../models/capture-item';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

type ApiCaptureItem = Omit<CaptureItem, 'type'> & {
  type: string;
};

export type CreateCaptureItemRequest = {
  title?: string | null;
  text: string;
  type: CaptureItem['type'];      // "remember" | "task" | "idea" | "snippet"
  language?: string | null;
};

export type UpdateCaptureItemRequest = Partial<{
  title: string | null;
  text: string;
  type: CaptureItem['type'];
  language: string | null;
  done: boolean;
}>;
@Injectable({
  providedIn: 'root',
})
export class CaptureApiService {
  private readonly base = `${environment.apiBaseUrl}/api/items`;
  private readonly validTypes = new Set<CaptureItem['type']>(['remember', 'task', 'idea', 'snippet']);

  constructor(private http: HttpClient) {}

  private normalizeType(type: unknown): CaptureItem['type'] {
    const normalized = String(type ?? '').toLowerCase() as CaptureItem['type'];
    return this.validTypes.has(normalized) ? normalized : 'remember';
  }

  private toCaptureItem(item: ApiCaptureItem): CaptureItem {
    return {
      ...item,
      type: this.normalizeType(item.type),
    };
  }

  getAll(): Observable<CaptureItem[]> {
    return this.http
      .get<ApiCaptureItem[]>(this.base)
      .pipe(map((items) => items.map((item) => this.toCaptureItem(item))));
  }

  getById(id: string): Observable<CaptureItem> {
    return this.http
      .get<ApiCaptureItem>(`${this.base}/${id}`)
      .pipe(map((item) => this.toCaptureItem(item)));
  }

  create(req: CreateCaptureItemRequest): Observable<CaptureItem> {
    return this.http
      .post<ApiCaptureItem>(this.base, req)
      .pipe(map((item) => this.toCaptureItem(item)));
  }

  update(id: string, req: UpdateCaptureItemRequest): Observable<CaptureItem> {
    return this.http
      .put<ApiCaptureItem>(`${this.base}/${id}`, req)
      .pipe(map((item) => this.toCaptureItem(item)));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
