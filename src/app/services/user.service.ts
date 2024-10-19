import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = 'https://roobetconnect.com/affiliate/stats'; 
  // private apiUrl = '/api/affiliate/v2/stats';
  private apiUrl = '/api/affiliate/stats';
  constructor(private http: HttpClient) {}

  getUserStats() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NmExZTIxLTA5YTgtNGZhNS04ODY2LWFhMjBkYjQwYTZjNCIsIm5vbmNlIjoiMmVlMTkwYjEtMWI5MC00YTkyLWIxMWMtNDRhMTAzNTljNmIwIiwic2VydmljZSI6ImFmZmlsaWF0ZVN0YXRzIiwiaWF0IjoxNzI0MzQzNDc5fQ.qjVt2sy2T30xVatftJZi8nBLC6gttcXc5ZMAIkRHuHk';

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.get(this.apiUrl, { headers });
  }
}
