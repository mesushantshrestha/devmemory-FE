import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaptureItem } from '../../../../core/models/capture-item';
import { CommonModule } from '@angular/common';

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
}
