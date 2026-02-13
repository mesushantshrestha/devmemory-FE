import { Component } from '@angular/core';
import { CaptureItem } from '../../../../core/models/capture-item';
import { CommonModule } from '@angular/common';
import { CaptureBox } from '../../components/capture-box/capture-box';
import { TriggerCard } from '../../components/trigger-card/trigger-card';
import { ItemList } from '../../components/item-list/item-list';

@Component({
  selector: 'app-capture-page',
  standalone: true,
  imports: [CommonModule, CaptureBox, TriggerCard, ItemList],
  templateUrl: './capture-page.html',
  styleUrl: './capture-page.scss',
})
export class CapturePage {
    items: CaptureItem[] = [];
    lastSaved?: CaptureItem;

    onSaved(item: CaptureItem) {
      this.lastSaved = item;
      this.items = [item, ...this.items];
    }

    onDelete(id: string) {
      this.items = this.items.filter(x => x.id !== id);
    }

}
