import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { getToken } from '../../../../utils/tokenHelper';
import { FileResponseModelI } from '../../../../models/file.model';

@Injectable()
export class FileService {
  constructor(private readonly http: HttpClient) { }

  setUserProfile(image: FormData): Observable<FileResponseModelI> {
    const headers= new HttpHeaders()
      .set('Authorization', JSON.parse(getToken()).token)
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post<FileResponseModelI>(`${environment.API_URL}/files/avatar`, image, {headers: headers});
  };

}
