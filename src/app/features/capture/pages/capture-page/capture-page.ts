import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map, shareReplay, timer } from 'rxjs';

import { CaptureItem } from '../../../../core/models/capture-item';
import { CaptureBox } from '../../components/capture-box/capture-box';
import { TriggerCard } from '../../components/trigger-card/trigger-card';
import { ItemList } from '../../components/item-list/item-list';
import { CaptureService } from '../../../../core/services/capture';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TopNav } from '../../../../shared/components/top-nav/top-nav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-capture-page',
  standalone: true,
  imports: [CommonModule, CaptureBox, TriggerCard, TopNav, RouterLink],
  templateUrl: './capture-page.html',
  styleUrl: './capture-page.scss',
})
export class CapturePage implements OnInit {
  readonly items$: Observable<CaptureItem[]>;
  readonly activeTriggerItem$: Observable<CaptureItem | undefined>;

  private readonly pinnedTriggerId$ = new BehaviorSubject<string | null>(null);
  pinnedTriggerId: string | null = null;

  constructor(private captureService: CaptureService, private router: Router) {
    this.items$ = this.captureService.items$;

    const tick$ = timer(0, 20_000); // shuffle every 20s

    this.activeTriggerItem$ = combineLatest([this.items$, tick$, this.pinnedTriggerId$]).pipe(
      map(([items, tick, pinnedId]) => {
        if (!items.length) return undefined;
        if (pinnedId) return items.find(i => i.id === pinnedId) ?? items[0];
        return items[tick % items.length];
      }),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    this.captureService.load();
  }

  onSaved(item: CaptureItem): void {
    this.captureService.add(item);
  }


  onTrigger(action: string, currentItem?: CaptureItem): void {
    if (!currentItem) return;
    const currentPinned = this.pinnedTriggerId;

        const next = currentPinned === currentItem.id ? null : currentItem.id;

        this.pinnedTriggerId = next;
        this.pinnedTriggerId$.next(next);
  }

  // Used by template to show correct pin label
  isTriggerPinned(id: string | undefined): boolean {
    return !!id && this.pinnedTriggerId$.value === id;
  }
}