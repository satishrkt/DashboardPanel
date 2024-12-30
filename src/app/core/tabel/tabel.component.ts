import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductModel } from '../../models/product';

@Component({
  selector: 'app-tabel',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tabel.component.html',
  styleUrl: './tabel.component.css'
})
export class TabelComponent implements OnInit {

  @Input() tblColumns: string[] = [];
  @Input() tblData!: MatTableDataSource<any>;

  @Output() onEdit = new EventEmitter<any>;
  @Output() onDelete = new EventEmitter<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayColumns: string[] = [];

  ngOnInit(): void {
    this.displayColumns = this.tblColumns;
    console.log(this.tblData)
  }

  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tblData.filter = filterValue.trim().toLowerCase();

    if (this.tblData.paginator) {
      this.tblData.paginator.firstPage();
    }
  }

  onClickEdit(data: ProductModel) {
    this.onEdit.emit(data);
  }

  onClickDelete(data: Number) {
    this.onDelete.emit(data);
  }
}
