import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { CaptureItem } from '../../../../core/models/capture-item';
import { CaptureBox } from '../../components/capture-box/capture-box';
import { TriggerCard } from '../../components/trigger-card/trigger-card';
import { ItemList } from '../../components/item-list/item-list';
import { CaptureService } from '../../../../core/services/capture';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TopNav } from '../../../../shared/components/top-nav/top-nav';


@Component({
  selector: 'app-capture-page',
  standalone: true,
  imports: [CommonModule, CaptureBox, TriggerCard, TopNav, RouterLink],
  templateUrl: './capture-page.html',
  styleUrl: './capture-page.scss',
})
export class CapturePage {
  readonly lastSaved$: Observable<CaptureItem | undefined>;

  constructor(private captureService: CaptureService) {
    this.lastSaved$ = this.captureService.items$.pipe(
      map(items => items[0])
    );
  }

   onSaved(item: CaptureItem): void {
    this.captureService.add(item);
  }
}
