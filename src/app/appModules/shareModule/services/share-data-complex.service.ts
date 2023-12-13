import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataComplexService {

  private dataMap: Map<string, BehaviorSubject<any>> = new Map<string, BehaviorSubject<any>>();



  constructor() { }

  getOrCreateSubject(key: string): BehaviorSubject<any> {
    if (!this.dataMap.has(key)) {
      this.dataMap.set(key, new BehaviorSubject<any>(null));
    }
    return this.dataMap.get(key);
  }

  getDataObservable(key: string): Observable<any> {
    return this.getOrCreateSubject(key).asObservable();
  }

  updateData(key: string, data: any): void {
    this.getOrCreateSubject(key).next(data);

  }
}
