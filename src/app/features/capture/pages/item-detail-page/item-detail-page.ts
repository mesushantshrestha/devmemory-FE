import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CaptureService } from '../../../../core/services/capture';
import { map, Observable, switchMap } from 'rxjs';
import { CaptureItem } from '../../../../core/models/capture-item';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-item-detail-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './item-detail-page.html',
  styleUrl: './item-detail-page.scss',
})
export class ItemDetailPage implements OnInit {
  item$!: Observable<CaptureItem | undefined>;

  constructor(private captureService: CaptureService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.captureService.load();

    this.item$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id =>
        this.captureService.items$.pipe(
          map(items => items.find(x => x.id === id))
        )
      )
    );
  }
}
