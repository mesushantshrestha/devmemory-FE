import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CaptureItem } from '../../../../core/models/capture-item';
import { CommonModule } from '@angular/common';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { TriggerService } from '../../../../core/services/trigger-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Trigger {
  id: string;
  label: string;
}

@Component({
  selector: 'app-trigger-card',
  standalone: true,
  imports: [CommonModule, ClipboardModule, FormsModule, RouterLink],
  templateUrl: './trigger-card.html',
  styleUrl: './trigger-card.scss',
})
export class TriggerCard implements OnChanges {
  @Input() item?: CaptureItem;
  @Output() trigger = new EventEmitter<string>();
  @Input() isPinned = false;

  copied = false;
  selectedAction = '';

  // Cache computed values to prevent infinite change detection
  pinTrigger?: Trigger;
  menuTriggers: Trigger[] = [];

  constructor(private triggerService: TriggerService, private clipboard: Clipboard) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.updateTriggers();
    }
  }

  private updateTriggers(): void {
    if (this.item) {
      this.pinTrigger = this.triggerService.getPinTrigger(this.item);
    } else {
      this.pinTrigger = undefined;
    }
  }

  onPin(): void {
    this.trigger.emit('toggle_pin');
  }

}
