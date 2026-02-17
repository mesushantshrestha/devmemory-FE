import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ErrorToastService } from '../../../core/services/error-toast.service';

@Component({
  selector: 'app-error-toast',
  imports: [CommonModule],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.scss',
})
export class ErrorToast {
  private readonly toastService = inject(ErrorToastService);
  readonly toasts = this.toastService.toasts;

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
