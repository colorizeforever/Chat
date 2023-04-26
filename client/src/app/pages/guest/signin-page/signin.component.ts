import { ChangeDetectionStrategy, Component, OnDestroy, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { setToken } from '../../../utils/tokenHelper';
import { Router } from '@angular/router';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormGroup} from "@angular/forms";
import {IAuth, IAuthForm} from "../auth-form.model";
import {authFormConstant} from "../auth-form.constant";

@Component({
  selector: 'app-auth',
  templateUrl: './signin.component.html',
  host: { class: 'fl-mid-wrapper' },
  styleUrls: ['../style/signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();

  authFormGroup: FormGroup<IAuthForm> = authFormConstant;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar
  ) { }

  signIn(): void {
    const { login, password } = this.authFormGroup.value as IAuth
    this.authService.login(login, password)
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
