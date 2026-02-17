import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorToastService } from './core/services/error-toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  private readonly toastService = inject(ErrorToastService);
  readonly toasts = this.toastService.toasts;

  dismissToast(event: MouseEvent, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.toastService.dismiss(id);
  }
}
