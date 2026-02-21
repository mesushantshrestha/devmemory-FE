import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'login-page',
  },
})
export class LoginPage implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = this.auth.user;
  readonly status = this.auth.status;
  readonly isAuthenticated = this.auth.isAuthenticated;
  readonly greeting = computed(() => this.user()?.name ?? this.user()?.email ?? 'there');

  ngOnInit(): void {
    this.auth.refreshSession();
  }

  onLogin(): void {
    this.auth.loginWithGoogle();
  }

  onSwitchAccount(): void {
    this.auth.loginWithGoogle();
  }

  onLogout(): void {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
