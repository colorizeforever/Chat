import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Token} from "../../../../models/token.model";
import {environment} from "../../../../../environments/environment";
import {setLoginInStorage} from "../../../../utils/tokenHelper";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private readonly http: HttpClient) {
  }

  login(login: string, password: string): Observable<Token> {
    setLoginInStorage(login)
    return this.http.post<Token>(`${environment.API_URL}/auth/login`, {
      login, password
    })

  }

  registration(login: string, password: string): Observable<Token> {
    setLoginInStorage(login)
    return this.http.post<Token>(`${environment.API_URL}/auth/registration`, {
      login, password
    })
  }


}


