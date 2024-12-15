import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackdrawserService {
  private apiUrl = 'https://packdraw.com/api/v1/affiliates/leaderboard';
  constructor(private http: HttpClient) {}

  getPackdrawStats(afterDate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('apiKey', '62a9037b-1311-4e82-b3c3-74150b89c5b5')
      .set('after', afterDate);
    return this.http.get(this.apiUrl, { headers, params });
  }
}
