import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {setToken} from "../../../../utils/tokenHelper";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './signin.component.html',
  styleUrls: ['../style/signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  public login: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  signIn(): void {
      this.authService.login(this.login, this.password)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(token => {
          setToken(JSON.stringify(token));
          this.router.navigate(['/rooms']);
        })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
