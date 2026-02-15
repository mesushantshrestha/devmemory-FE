import { Component, EventEmitter, Output } from '@angular/core';
import { CaptureItem } from '../../../../core/models/capture-item';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capture-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './capture-box.html',
  styleUrl: './capture-box.scss',
})
export class CaptureBox {
  @Output() saved = new EventEmitter<CaptureItem>();

  text = '';
  type: CaptureItem['type'] = 'remember';

  quickTypes: Array<{ label: string; value: CaptureItem['type'] }> = [
    { label: 'Remember', value: 'remember' },
    { label: 'Task', value: 'task' },
    { label: 'Idea', value: 'idea' },
    { label: 'Snippet', value: 'snippet' }
  ];

  languages = ['Java', 'TypeScript', 'Solidity', 'Bash', 'SQL'];
  language = 'TypeScript';

  save() {
    const trimmed = this.text.trim();
    if (!trimmed) return;

    const item: CaptureItem = {
    id: crypto.randomUUID(),
    text: trimmed,
    type: this.type,
    createdAt: new Date().toISOString(),
    language: this.type === 'snippet' ? this.language : undefined
  };

  this.saved.emit(item);
  this.text = '';
  }

}
