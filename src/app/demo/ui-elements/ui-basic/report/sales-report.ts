import { Injectable } from '@angular/core';

export interface header {
  idName: string;
  label: string;
}

export interface reports {
  id: number;
  reportName: string;
  details?: header[];
}

const list = {
  id: 1,
  reportName: 'Daily Sales Item Transaction',
  details: [
    {
      idName: 'receiptCtr',
      label: 'Receipt #'
    },
    {
      idName: 'prodDesc',
      label: 'Item'
    },
    {
      idName: 'category',
      label: 'Category'
    },
    {
      idName: 'srp',
      label: 'SRP'
    },
    {
      idName: 'qty',
      label: 'Qty'
    },
    {
      idName: 'discType',
      label: 'Disc. Type'
    },
    {
      idName: 'extAmt',
      label: 'Total'
    },
    {
      idName: 'mop',
      label: 'MOP'
    },
    {
      idName: 'soldType',
      label: 'Sold Type'
    },
    {
      idName: 'datePurch',
      label: 'Date'
    },
    {
      idName: 'time',
      label: 'Time'
    }
  ]
};
@Injectable({
  providedIn: 'root'
})
export class SalesReport {
  get() {
    return list;
  }
}
