import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNav {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = this.auth.user;
  readonly isAuthenticated = this.auth.isAuthenticated;
  readonly initials = computed(() => {
    const name = this.user()?.name ?? this.user()?.email ?? '';
    return name ? name.slice(0, 1).toUpperCase() : '?';
  });

  onLogout(): void {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
