import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor(private http:HttpClient) { }

  private sharedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>('Initial data');
  sharedData$: Observable<any> = this.sharedDataSubject.asObservable();

  updateSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }

  getExtensions(): Observable<any> {
    return this.http.get('/assets/formatosDoc.json');
  }
}
