import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  loginForm: FormGroup;
  profileType!: string;
  errorMessage: string | null = null;
  loggingIn = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      serverError: [''],
    });
    this.profileType = data.profileType;
  }

  /**
   * Handles form submission. Authenticates the user and navigates to the appropriate page
   * based on the profile type if the credentials are valid.
   */
  onSubmit() {
    this.errorMessage = null;
    this.loggingIn = true;
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.value.username,
          this.loginForm.value.password,
          this.profileType as 'provider' | 'consumer'
        )
        .subscribe((isValid) => {
          if (isValid) {
            this.loggingIn = false;
            this.dialogRef.close();
            if (this.profileType === 'provider') {
              this.router.navigate(['/self-description']);
            } else if (this.profileType === 'consumer') {
              this.router.navigate(['/download-artifact']);
            }
          } else {
            this.loggingIn = false;
            this.errorMessage = 'Username or password is incorrect';
          }
        });
    }
  }

  /**
   * Closes the login modal.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
