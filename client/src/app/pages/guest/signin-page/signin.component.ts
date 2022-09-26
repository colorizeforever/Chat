import { ChangeDetectionStrategy, Component, OnDestroy, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { setToken } from '../../../utils/tokenHelper';
import { Router } from '@angular/router';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './signin.component.html',
  styleUrls: ['../style/signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  login: string = '';
  password: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar
  ) { }

  signIn(): void {
    this.authService.login(this.login, this.password)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(err => {
          return of(err)
        })
      )
      .subscribe(token => {
        token.error
          ? this._snackBar.open(token.error.message, 'Ok')
          : this.redirect(token)
      })
  }

  private redirect(token: string): void {
    setToken(JSON.stringify(token));
    this.router.navigate(['/rooms']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
