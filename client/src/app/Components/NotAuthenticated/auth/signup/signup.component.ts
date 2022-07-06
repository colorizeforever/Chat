import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import { getToken, setAvatarId, setToken } from "../../../../utils/tokenHelper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FileService } from "../../../../services/file.service";

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['../style/signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  login: string = '';
  password: string = '';
  selectedFile: File | null = null;

  private readonly unsubscribe$: Subject<void> = new Subject();
  authFormGroup: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private fileService: FileService
  ) { }

  signUp(): void {
    const {login, password} = this.authFormGroup.value
    if (login && password) {
      this.authService.registration(login, password)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(token => {
          setToken(JSON.stringify(token));
        })
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile as Blob, this.selectedFile?.name)
    this.fileService.setUserProfile(fd)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response ) => {
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
