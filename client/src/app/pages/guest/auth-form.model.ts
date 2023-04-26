import {FormControl} from "@angular/forms";

export interface IAuthForm {
  login: FormControl<string>;
  password: FormControl<string>
}

export interface IAuth {
  login: string;
  password: string;
}
