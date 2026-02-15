import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { CaptureItem } from '../../../../core/models/capture-item';
import { CaptureBox } from '../../components/capture-box/capture-box';
import { TriggerCard } from '../../components/trigger-card/trigger-card';
import { ItemList } from '../../components/item-list/item-list';
import { CaptureService } from '../../../../core/services/capture';
import { FormsModule } from '@angular/forms';

type TypeFilter = 'all' | CaptureItem['type'];
type LanguageFilter = 'all' | string;

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
  typeFilter: TypeFilter = 'all';
  languageFilter: LanguageFilter = 'all';

  private readonly searchTerm$ = new BehaviorSubject<string>('');
  private readonly typeFilter$ = new BehaviorSubject<TypeFilter>('all');
  private readonly languageFilter$ = new BehaviorSubject<LanguageFilter>('all');

  // filtered stream
  readonly filteredItems$: Observable<CaptureItem[]>;
  readonly lastSaved$: Observable<CaptureItem | undefined>;

  // Optional: for language dropdown options (computed from items)
  readonly languageOptions$: Observable<string[]>;

  readonly typeOptions: Array<{ label: string; value: TypeFilter }> = [
    { label: 'All', value: 'all' },
    { label: 'Remember', value: 'remember' },
    { label: 'Task', value: 'task' },
    { label: 'Idea', value: 'idea' },
    { label: 'Snippet', value: 'snippet' },
  ];

  constructor(private captureService: CaptureService) {
    this.items$ = this.captureService.items$;

    this.filteredItems$ = combineLatest([
      this.items$,
      this.searchTerm$,
      this.typeFilter$,
      this.languageFilter$,
    ]).pipe(
      map(([items, term, typeF, langF]) => this.filterItems(items, term, typeF, langF))
    );

    this.lastSaved$ = this.captureService.items$.pipe(
      map(items => items[0])
    );

        this.languageOptions$ = this.items$.pipe(
      map(items => {
        const langs = items
          .filter(i => i.type === 'snippet' && !!i.language)
          .map(i => (i.language || '').trim())
          .filter(Boolean);

        // unique + sort
        return Array.from(new Set(langs)).sort((a, b) => a.localeCompare(b));
      })
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

  onTypeChange(value: TypeFilter): void {
    this.typeFilter = value;
    this.typeFilter$.next(value);
  }

  onLanguageChange(value: LanguageFilter): void {
    this.languageFilter = value;
    this.languageFilter$.next(value);
  }

  clearFilters(): void {
    this.onSearchChange('');
    this.onTypeChange('all');
    this.onLanguageChange('all');
  }

  private filterItems(items: CaptureItem[], termRaw: string, typeF: TypeFilter, langF: LanguageFilter): CaptureItem[] {
    const term = (termRaw || '').trim().toLowerCase();

    return items.filter(i => {
      // 1) Type filter
      if (typeF !== 'all' && i.type !== typeF) return false;

      // 2) Language filter (only apply when not 'all')
      if (langF !== 'all') {
        const itemLang = (i.language || '').toLowerCase();
        if (itemLang !== (langF || '').toLowerCase()) return false;
      }

      // 3) Text search (title + text + type + language)
      if (!term) return true;

      const title = (i.title || '').toLowerCase();
      const text = (i.text || '').toLowerCase();
      const type = (i.type || '').toLowerCase();
      const lang = (i.language || '').toLowerCase();

      return (
        title.includes(term) ||
        text.includes(term) ||
        type.includes(term) ||
        lang.includes(term)
      );
    });
  }
}
