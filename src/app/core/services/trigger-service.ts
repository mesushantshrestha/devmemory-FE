import { Injectable } from '@angular/core';
import { CaptureItem } from '../models/capture-item';
import { Trigger } from '../../features/capture/components/trigger-card/trigger-card';

@Injectable({
  providedIn: 'root',
})
export class TriggerService {
   getPinTrigger(item: CaptureItem): Trigger {
    return {
      id: 'toggle_pin',
      label: item.pinned ? 'Unpin' : 'Pin',
    };
  }
}
