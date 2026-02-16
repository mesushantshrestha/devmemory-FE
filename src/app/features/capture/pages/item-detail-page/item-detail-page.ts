import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { CaptureItem } from '../../../../core/models/capture-item';
import { CommonModule } from '@angular/common';
import { CaptureApiService } from '../../../../core/services/capture-api-service';
import { CaptureService } from '../../../../core/services/capture';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-item-detail-page',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './item-detail-page.html',
  styleUrl: './item-detail-page.scss',
})
export class ItemDetailPage implements OnInit {
  item$!: Observable<CaptureItem | undefined>;
  isEditing = false;
  editText = '';
  editDone = false;
  confirmDelete = false;
  copied = false;
  constructor(private route: ActivatedRoute,
    private api: CaptureApiService,
    private router: Router,
    private captureService: CaptureService,
    private clipboard: Clipboard) { }

  private loadItem(id: string): Observable<CaptureItem | undefined> {
    return this.api.getById(id).pipe(
      catchError(() => of(undefined))
    );
  }

  ngOnInit(): void {
    this.item$ = this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => this.loadItem(id))
    );
  }

  startEdit(item: CaptureItem) {
    this.isEditing = true;
    this.editText = item.text ?? '';
    this.editDone = !!item.done;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit(item: CaptureItem) {
    const patch: any = { text: this.editText };

    // only allow done toggle for TASK
    if (String(item.type).toLowerCase() === 'task') {
      patch.done = this.editDone;
    }

    const optimisticItem: CaptureItem = {
      ...item,
      text: this.editText,
      done: String(item.type).toLowerCase() === 'task' ? this.editDone : item.done,
    };

    this.item$ = of(optimisticItem);
    this.isEditing = false;

    this.captureService.update(item.id, patch).subscribe({
      next: () => {
        this.item$ = this.loadItem(item.id);
      },
      error: () => {
        this.item$ = this.loadItem(item.id);
      }
    });
  }

  toggleTaskDone(item: CaptureItem) {
    if (String(item.type).toLowerCase() !== 'task' || this.confirmDelete) {
      return;
    }

    const nextDone = !item.done;
    const optimisticItem: CaptureItem = {
      ...item,
      done: nextDone,
    };

    this.item$ = of(optimisticItem);
    if (this.isEditing) {
      this.editDone = nextDone;
    }

    this.captureService.update(item.id, { done: nextDone }).subscribe({
      next: () => {
        this.item$ = this.loadItem(item.id);
      },
      error: () => {
        this.item$ = this.loadItem(item.id);
      }
    });
  }

  copySnippet(text: string) {
    const ok = this.clipboard.copy(text);
    if (!ok) return;

    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 1200);
  }

  requestDelete() {
    this.confirmDelete = true;
  }

  cancelDelete() {
    this.confirmDelete = false;
  }

  doDelete(item: CaptureItem) {
    this.captureService.remove(item.id).subscribe({
      next: () => {
        this.confirmDelete = false;
        this.router.navigate(['/saved']);
      }
    });
  }

}
