import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaptureItem } from '../../../../core/models/capture-item';
import { CommonModule } from '@angular/common';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList {
  @Input() items: CaptureItem[] = [];
  @Output() deleteItem = new EventEmitter<string>();
  copiedId?: string;
  confirmId?: string;
  constructor(private clipboard: Clipboard) {}

  requestDelete(id: string) {
    this.confirmId = id;
  }

  confirmDelete() {
    if (this.confirmId) {
      this.deleteItem.emit(this.confirmId);
      this.confirmId = undefined;
    }
  }

  cancelDelete() {
    this.confirmId = undefined;
  }

  copySnippet(text: string, id: string) {
    const ok = this.clipboard.copy(text);

    if (ok) {
      this.copiedId = id;
      setTimeout(() => {
        if (this.copiedId === id) this.copiedId = undefined;
      }, 1200);
    }
  }
}
