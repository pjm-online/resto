import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SalesReport } from './sales-report';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/services/http-service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export default class ReportComponent implements OnInit, OnDestroy {
  destroy = new Subject();
  destroy$ = this.destroy.asObservable();

  id: number;
  title: any;
  columns: any[] = [];
  data: any[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private salesReport: SalesReport,
    private genericService: GenericService
  ) {
    this.columns = this.salesReport.get().details;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['reportId'];
      console.log(this.id);
      this.setColumn(this.id);
    });
  }

  ngOnInit(): void {
    // fromEvent(window, 'scroll')
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((e: Event) => console.log(e));
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
  }

  parseDate(dt: string) {
    return dt.split('T')[0];
  }
  setColumn(id: number): void {
    if (this.id == 1) {
      this.title = 'Daily Sales Item Transaction';
      this.genericService.get('report/GetDailySalesReport').subscribe((resp) => {
        this.data = resp.data;
        this.total = resp.total;
      });
    } else if (this.id == 2) {
      this.title = 'Weekly Sales Item Transaction';
      this.genericService.get('report/GetWeeklySalesReport').subscribe((resp) => {
        this.data = resp.data;
        this.total = resp.total;
      });
    } else if (this.id == 3) {
      this.title = 'Monthly Sales Item Transaction';
      this.genericService.get('report/GetMonthlySalesReport').subscribe((resp) => {
        this.data = resp.data;
        this.total = resp.total;
      });
    } else if (this.id == 4) {
      this.title = 'Yearly Sales Item Transaction';
      this.genericService.get('report/GetYearlySalesReport').subscribe((resp) => {
        this.data = resp.data;
        this.total = resp.total;
      });
    }
  }
}
function onWindowScroll() {
  throw new Error('Function not implemented.');
}
