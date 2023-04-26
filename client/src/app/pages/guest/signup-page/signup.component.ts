import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { setAvatarId, setToken } from '../../../utils/tokenHelper';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { FileService } from '../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {IAuthForm} from "../auth-form.model";
import {authFormConstant} from "../auth-form.constant";

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  host: { class: 'fl-mid-wrapper' },
  styleUrls: ['../style/signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnDestroy {
  selectedFile: File | null = null;

  private readonly unsubscribe$: Subject<void> = new Subject();
  authFormGroup: FormGroup<IAuthForm> = authFormConstant;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly fileService: FileService,
    private readonly _snackBar: MatSnackBar
  ) {
  }

  signUp(): void {
    const { login, password } = this.authFormGroup.value
    if (login && password) {
      this.authService.registration(login, password)
        .pipe(
          takeUntil(this.unsubscribe$),
          catchError(err => {
            return of(err)
          })
        )
        .subscribe(token => {
          token.error
            ? this._snackBar.open(token.error.message, 'Ok')
            : setToken(JSON.stringify(token));
        })
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }

  onUpload(): void {
    const fd = new FormData()
    fd.append('image', <Blob>this.selectedFile, this.selectedFile?.name)
    this.fileService.setUserProfile(fd)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response) => {
          setAvatarId(response.id)
          this.router.navigate(['/rooms'])
        }
      )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
