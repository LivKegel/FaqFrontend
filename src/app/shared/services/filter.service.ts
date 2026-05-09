import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FilterGroup } from '../interface/questionAnswer';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filtergroupUrl = 'http://127.0.0.1:8000/filtergroup/';
  private subfilterUrl = 'http://127.0.0.1:8000/subfilter/';
  private changeOrderUrl = 'http://127.0.0.1:8000/updateorder/'

  constructor(private http: HttpClient) {}

  getFilterGroups(): Observable<any> {
    return this.http.get<FilterGroup[]>(this.filtergroupUrl).pipe(
      map(filtergroups => filtergroups.map(filter => ({
          ...filter,
          liveInput: filter.live,
          nameInput: filter.name,
          type: "FilterGroup",
          subfilters: filter.subfilters.map(subfilter => ({
            ...subfilter,
            liveInput: subfilter.live,
            nameInput: subfilter.name,
            type: "Subfilter",
          }))
      })))
  );
  }

  createFilterGroup(filtergroup: FilterGroup): Observable<FilterGroup> {
    return this.http.post<FilterGroup>(this.filtergroupUrl, filtergroup);
  }

  updateFilterGroup(filtergroup: FilterGroup): Observable<FilterGroup> {
    return this.http.put<FilterGroup>(this.filtergroupUrl + filtergroup.id + '/', filtergroup);
  }

  deleteFilterGroup(filtergroup: FilterGroup): Observable<FilterGroup> {
    return this.http.delete<FilterGroup>(this.filtergroupUrl + filtergroup.id + '/');
  }

  getSubFilters(): Observable<any> {
    return this.http.get(this.subfilterUrl);
  }

  createSubFilter(subfilter: any): Observable<any> {
    return this.http.post(this.subfilterUrl, subfilter);

  }
  

  updateSubFilter(subfilter: any): Observable<any> {
    return this.http.put(this.subfilterUrl + subfilter.id + '/', subfilter);
  }

  deleteSubFilter(subfilter: any): Observable<any> {
    return this.http.delete(this.subfilterUrl + subfilter.id + '/');
  }

  updateOrder(orderData: any[]): Observable<any> {
    return this.http.post(this.changeOrderUrl, orderData);
  }
}