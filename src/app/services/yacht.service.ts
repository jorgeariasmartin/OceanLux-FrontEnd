import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Yacht} from '../model/yacht';

@Injectable({
  providedIn: 'root'
})
export class YachtService {

  private apiUrl = 'http://localhost:8000/yacht/all';

  constructor(private http: HttpClient) { }

  getYachts(): Observable<Yacht[]> {
    return this.http.get<Yacht[]>(this.apiUrl);
  }
}
