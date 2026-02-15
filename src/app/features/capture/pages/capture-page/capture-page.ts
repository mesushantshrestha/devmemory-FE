import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { CaptureItem } from '../../../../core/models/capture-item';
import { CaptureBox } from '../../components/capture-box/capture-box';
import { TriggerCard } from '../../components/trigger-card/trigger-card';
import { ItemList } from '../../components/item-list/item-list';
import { CaptureService } from '../../../../core/services/capture';

@Component({
  selector: 'app-capture-page',
  standalone: true,
  imports: [CommonModule, CaptureBox, TriggerCard, ItemList],
  templateUrl: './capture-page.html',
  styleUrl: './capture-page.scss',
})
export class CapturePage implements OnInit {

  readonly items$: Observable<CaptureItem[]>;
  readonly lastSaved$: Observable<CaptureItem | undefined>;

  constructor(private captureService: CaptureService) {
    this.items$ = this.captureService.items$;

    this.lastSaved$ = this.captureService.items$.pipe(
      map(items => items[0])
    );
  }

  ngOnInit(): void {
    this.captureService.load();
  }

  onSaved(item: CaptureItem): void {
    this.captureService.add(item);
  }

  onDelete(id: string): void {
    this.captureService.remove(id);
  }
}
