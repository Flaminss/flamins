import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://roobetconnect.com/affiliate/v2/stats';
  constructor(private http: HttpClient) {}
  getUserStats(startDate: string, endDate: string) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NmExZTIxLTA5YTgtNGZhNS04ODY2LWFhMjBkYjQwYTZjNCIsIm5vbmNlIjoiMmVlMTkwYjEtMWI5MC00YTkyLWIxMWMtNDRhMTAzNTljNmIwIiwic2VydmljZSI6ImFmZmlsaWF0ZVN0YXRzIiwiaWF0IjoxNzI0MzQzNDc5fQ.Ye7nWH0CqYCwQjoC6JlTTv5N6ki3D1FdN0Jc8_-do1w';
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', '876a1e21-09a8-4fa5-8866-aa20db40a6c4')
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('limit', '1000');

    return this.http.get(this.apiUrl, { headers, params });
  }
}
