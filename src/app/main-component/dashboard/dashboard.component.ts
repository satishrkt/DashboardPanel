import { ChartData, LabelItem } from './../../../../node_modules/chart.js/dist/types/index.d';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter(), provideCharts(withDefaultRegisterables())],
  imports: [ReactiveFormsModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, BaseChartDirective, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent {

  constructor(private fb: FormBuilder) {
    // console.log(this.tableData);
  }
  
  readonly range = this.fb.group({
    start: this.fb.control(''),
    end: this.fb.control(''),
  });

  tableData = [
    { position: 1, name: 'John Doe', weight: 20, symbol: 'red' },
    { position: 2, name: 'Jane Doe', weight: 25, symbol: 'black' },
    { position: 3, name: 'John Doe', weight: 20, symbol: 'red' },
    { position: 4, name: 'Jane Doe', weight: 25, symbol: 'black' },
    { position: 5, name: 'John Doe', weight: 20, symbol: 'red' },
    // { position: 2, name: 'Jane Doe', weight: 25, symbol: 'black' },
  ];

  tableColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.tableData;
  

  barChartData : ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { data: [3, 25, 14, 8, 22, 7, 25, 24, 85 , 42, 69, 25], label: 'Sale' }, 
      { data: [14, 28, 68, 74, 25, 90, 62, 47, 25, 34, 58, 6], label: 'Cancel' }, 
    ]
  }

  lineChartData : ChartData<'line'> = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
    datasets: [
      { data: [10, 20, 30, 40, 50, 60, 70], label: 'Sent' },
      { data: [12, 36, 61, 35, 96, 29, 48], label: 'Unsent'}
    ]
  }

  pieChartData : ChartData<'doughnut'> = {
    labels: ['Sale', 'Cancel', 'Orders'],
    datasets: [
      { data: [3, 25, 35], label: 'Sale' },
    ]
  }
  
}
