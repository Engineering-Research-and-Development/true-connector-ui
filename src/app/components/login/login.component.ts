import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from './../../services/auth/auth.service';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  currentUserType: 'provider' | 'consumer' | null = null;

  constructor(private dialog: MatDialog, private authService: AuthService) {
    this.authService.currentProfileType$.subscribe((status) => {
      this.currentUserType = status.profileType as 'provider' | 'consumer';
    });
  }

  /**
   * Opens the login modal dialog with the specified profile type.
   * @param profileType The type of profile ('provider' or 'consumer') to log in as.
   */
  openLoginModal(profileType: string) {
    this.dialog.open(LoginModalComponent, {
      width: '370px',
      data: { profileType: profileType },
    });
  }
}
