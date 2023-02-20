import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, switchMap } from 'rxjs';
import { AdminProductService } from './admin-product.service';
import { adminProduct } from './adminProduct';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit{

 // dataSource: adminProduct[] = [];
 @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns:string[] = ["id", "name", "price","actions"];
  totalElements: number = 0;
  data: adminProduct[] = [];
  

  constructor(private adminProductService: AdminProductService) { }
  

  // ngOnInit(): void {
  //   this.getProducts()
  // }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize);
      }
      ),
      map(
        data => {
          this.totalElements = data.totalElements;
          return data.content;
        }
      )
    ).subscribe(data => this.data = data);
  }


  // getProducts(){
  //   this.adminProductService.getProducts(0,25)
  //   .subscribe(page => this.dataSource = page.content)
  // }

}
