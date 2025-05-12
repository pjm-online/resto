// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

declare const AmCharts: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import { GenericService } from 'src/app/services/http-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  reports = [
    {
      id: '1',
      title: 'Marquee Mall',
      text: 'Angeles City'
    },
    {
      id: '2',
      title: 'Sm Pampanga',
      text: 'City of San Fernando'
    },
    {
      id: '3',
      title: 'Sm Baguio',
      text: 'Baguio City'
    }
  ];
  salesNode1: any[] = [];
  salesNode2: any[] = [];

  constructor(
    private httpService: GenericService,
    private router: Router,
    private nzMessage: NzMessageService
  ) {}
  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/auth/signin']);
    }

    this.httpService.get('report/GetSalesSummary').subscribe({
      next: (data) => {
        this.salesNode1 = [
          {
            id: 1,
            title: 'Daily Sales',
            icon: 'icon-trending-up text-c-green',
            amount: data.dailyTotal,
            design: 'col-md-6'
          },
          {
            id: 2,
            title: 'Weekly Sales',
            icon: 'icon-pie-chart text-c-green',
            amount: data.weeklyTotal,
            design: 'col-md-6'
          }
        ];

        this.salesNode2 = [
          {
            id: 3,
            title: 'Monthly Sales',
            icon: 'icon-pie-chart text-c-green',
            amount: data.monthlyTotal,
            design: 'col-md-6'
          },
          {
            id: 4,
            title: 'Yearly Sales',
            icon: 'icon-pie-chart text-c-green',
            amount: data.yearlyTotal,
            design: 'col-md-6'
          }
        ];
      },
      error: (err) => {
        this.nzMessage.error('An error occurred, session expired. Please login again.');
        localStorage.clear();
        this.router.navigate(['/auth/signin']);
      }
    });
  }

  showReport(data: any): void {
    console.log(data);
    this.router.navigate([`/report/view/${data.id}`]);
  }

  // sales = [
  //   {
  //     title: 'Daily Sales',
  //     icon: 'icon-arrow-up text-c-green',
  //     amount: '$249.95',
  //     percentage: '67%',
  //     progress: 50,
  //     design: 'col-md-6'
  //   },
  //   {
  //     title: 'Monthly Sales',
  //     icon: 'icon-arrow-down text-c-red',
  //     amount: '$2.942.32',
  //     percentage: '36%',
  //     progress: 35,
  //     design: 'col-md-6'
  //   },
  //   {
  //     title: 'Monthly Sales',
  //     icon: 'icon-arrow-down text-c-red',
  //     amount: '$2.942.32',
  //     percentage: '36%',
  //     progress: 35,
  //     design: 'col-md-6'
  //   },
  //   {
  //     title: 'Yearly Sales',
  //     icon: 'icon-arrow-up text-c-green',
  //     amount: '$8.638.32',
  //     percentage: '80%',
  //     progress: 70,
  //     design: 'col-md-6'
  //   }
  // ];
}
