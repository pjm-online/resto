import { Component, OnDestroy, OnInit } from '@angular/core';
import { SalesReportService } from './sales-service';
import { finalize, fromEvent, Subject, takeUntil } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { GenericService } from 'src/app/services/http-service';

@Component({
  selector: 'app-report-sales',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './report-sales.component.html',
  styleUrl: './report-sales.component.scss'
})
export default class ReportSalesComponent implements OnInit, OnDestroy {
  destroy = new Subject();
  destroy$ = this.destroy.asObservable();
  columns: { idName: string; label: string }[];
  title: string;
  data: any;
  dateFrom: any = null;
  dateTo: any = null;
  isBusy = false;
  total: number = 0;

  constructor(
    private salesReportService: SalesReportService,
    private genericService: GenericService
  ) {
    this.columns = this.salesReportService.get().details;

    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.id = params['reportId'];
    //   this.setColumn(this.id);
    // });
  }

  ngOnInit(): void {
    // fromEvent(window, 'scroll')
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((e: Event) => console.log(e));

    this.title = 'Item Sales Transaction';
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
  }

  search(): void {
    this.isBusy = true;

    if (this.dateFrom !== null) {
      const dtFrom = new Date(this.dateFrom).toISOString();
      const dtTo = this.dateTo !== null ? new Date(this.dateTo).toISOString() : 'na';
      this.genericService
        .get(`report/GetSalesReport/${dtFrom}/${dtTo}`)
        .pipe(
          finalize(() => {
            this.isBusy = false;
          })
        )
        .subscribe((resp) => {
          this.data = resp.data;
          this.total = resp.total;
        });
    }
  }
}
