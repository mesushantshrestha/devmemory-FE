import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { CaptureItem } from '../../../../core/models/capture-item';
import { CommonModule } from '@angular/common';
import { CaptureApiService } from '../../../../core/services/capture-api-service';

@Component({
  selector: 'app-item-detail-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './item-detail-page.html',
  styleUrl: './item-detail-page.scss',
})
export class ItemDetailPage implements OnInit {
  item$!: Observable<CaptureItem | undefined>;

  constructor(private route: ActivatedRoute, private api: CaptureApiService) { }
  ngOnInit(): void {
    this.item$ = this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => {
        return this.api.getById(id).pipe(
          catchError(() => of(undefined))
        );
      })
    );
  }
}
