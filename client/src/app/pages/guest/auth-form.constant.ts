import {IAuthForm} from "./auth-form.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export const authFormConstant: FormGroup<IAuthForm> = new FormGroup<IAuthForm>({
  login: new FormControl<string>('', [Validators.required, Validators.minLength(4)]) as FormControl,
  password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]) as FormControl,
})
