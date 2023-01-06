import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { adminProduct } from './adminProduct';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) {   }

  getProducts(page: number, size: number): Observable<Page<adminProduct>> {
    return this.http.get<Page<adminProduct>>(`/api/admin/products?page=${page}&size=${size}`);

}
}
