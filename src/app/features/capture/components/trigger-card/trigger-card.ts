import { Component, Input } from '@angular/core';
import { CaptureItem } from '../../../../core/models/capture-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trigger-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trigger-card.html',
  styleUrl: './trigger-card.scss',
})
export class TriggerCard {
 @Input() item?: CaptureItem;
}
