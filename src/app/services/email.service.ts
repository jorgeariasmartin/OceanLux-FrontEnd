import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8000/api/send-verification-email';

  constructor(private http: HttpClient) {}

  sendVerificationEmail(userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { user_id: userId }); // 🔹 Enviamos el ID correcto
  }

}
