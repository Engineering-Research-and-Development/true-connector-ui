import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginModalComponent } from './components/login/login-modal/login-modal.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    RouterOutlet,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TRUE Connector UI';

  isExpanded = true;
  isProviderLoggedIn = false;
  isConsumerLoggedIn = false;

  userName: string = '';

  currentUserType: 'provider' | 'consumer' | null = null;
  selectedMultipartType = localStorage.getItem('multipartType') || 'form'; // Default value for the multipart type

  @ViewChild('providerPanel') providerPanel!: MatExpansionPanel;
  @ViewChild('consumerPanel') consumerPanel!: MatExpansionPanel;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public authService: AuthService
  ) {}

  /**
   * Subscribes to authentication status and profile type updates, and navigates accordingly.
   */
  ngOnInit() {
    this.authService.authStatus$.subscribe((status) => {
      this.isProviderLoggedIn = status.provider;
      this.isConsumerLoggedIn = status.consumer;

      if (!this.isProviderLoggedIn && !this.isConsumerLoggedIn) {
        this.router.navigate(['/login']);
      } else if (this.isProviderLoggedIn) {
        this.setAccountType('provider');
      } else if (this.isConsumerLoggedIn) {
        this.setAccountType('consumer');
      }
    });

    this.authService.currentProfileType$.subscribe((status) => {
      this.currentUserType = status.profileType as 'provider' | 'consumer';
      this.userName = this.authService.getUserName(this.currentUserType);
    });
  }

  /**
   * Sets the current user type and navigates to the appropriate page.
   * @param type The type of user to set ('provider' or 'consumer').
   */
  setAccountType(type: 'provider' | 'consumer') {
    this.currentUserType = type;
    this.userName = this.authService.getUserName(type);

    this.authService.setCurrentUserType(type);
    if (type === 'provider') {
      this.router.navigate(['/self-description']);
      setTimeout(() => {
        this.providerPanel.open();
      });
    } else if (type === 'consumer') {
      this.router.navigate(['/download-artifact']);
      setTimeout(() => {
        this.consumerPanel.open();
      });
    }
  }

  /**
   * Toggles the state of the side navigation.
   */
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  /**
   * Opens the login modal to allow the user to log in as a different user type.
   */
  loginAsDifferentUser() {
    let newLoginUserType: string = '';
    if (this.currentUserType === 'provider') {
      newLoginUserType = 'consumer';
    }
    if (this.currentUserType === 'consumer') {
      newLoginUserType = 'provider';
    }

    this.dialog.open(LoginModalComponent, {
      width: '370px',
      data: { profileType: newLoginUserType },
    });
  }

  /**
   * Logs out the user by clearing authentication tokens and navigating to the login page.
   */
  logout() {
    this.authService.logout('provider');
    this.authService.logout('consumer');
    this.currentUserType = null;
    this.router.navigate(['/login']);
  }
}
