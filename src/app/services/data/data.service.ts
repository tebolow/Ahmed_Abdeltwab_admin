import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private baseURL = environment.apiUrl;

  private dataSubject = new BehaviorSubject<any>(null);
  currentData$ = this.dataSubject.asObservable();

  loadData() {
    return this.http.get<any>(`${this.baseURL}/data/getData`).pipe(
      tap((res) => {
        if (res?.data) {
          this.dataSubject.next(res.data);
        }
      })
    );
  }

  setData(data: any): void {
    this.dataSubject.next(data);
  }

  getSnapshot(): any {
    return this.dataSubject.value;
  }
}

