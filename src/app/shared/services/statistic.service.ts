import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Statistic } from '../interface/questionAnswer';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }
  private statisticUrl = 'http://127.0.0.1:8000/stats/'

  getStatistics(days: number, pageSize : number, page: number = 0) {
    return this.http.get<any>(this.statisticUrl + days + '/?limit=' + pageSize+ '&offset=' +  page * pageSize);
  }
}
