import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { CaptureItem } from '../../../../core/models/capture-item';
import { CaptureBox } from '../../components/capture-box/capture-box';
import { TriggerCard } from '../../components/trigger-card/trigger-card';
import { ItemList } from '../../components/item-list/item-list';
import { CaptureService } from '../../../../core/services/capture';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-capture-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CaptureBox, TriggerCard, ItemList],
  templateUrl: './capture-page.html',
  styleUrl: './capture-page.scss',
})
export class CapturePage implements OnInit {

  readonly items$: Observable<CaptureItem[]>;

    // UI state
  searchTerm = '';
  private readonly searchTerm$ = new BehaviorSubject<string>('');

  // filtered stream
  readonly filteredItems$: Observable<CaptureItem[]>;
  
  readonly lastSaved$: Observable<CaptureItem | undefined>;

  constructor(private captureService: CaptureService) {
    this.items$ = this.captureService.items$;
    this.filteredItems$ = combineLatest([this.items$, this.searchTerm$]).pipe(
      map(([items, term]) => this.filterItems(items, term))
    );
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

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchTerm$.next(value ?? '');
  }

  clearSearch(): void {
    this.onSearchChange('');
  }

  private filterItems(items: CaptureItem[], termRaw: string): CaptureItem[] {
    const term = (termRaw || '').trim().toLowerCase();
    if (!term) return items;

    return items.filter(i => {
      const text = (i.text || '').toLowerCase();
      const type = (i.type || '').toLowerCase();
      const lang = (i.language || '').toLowerCase();
      return text.includes(term) || type.includes(term) || lang.includes(term);
    });
  }
}
