import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
})
export class TableRowComponent implements OnInit {
  @Input() data: datamodel = {
    id: '',
    date: 0,
    sender: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      IDNumber: '',
    },
    recipient: {
      firstName: '',
      lastName: '',
      email: '',
      accountNumber: '',
      bank: '',
    },
    Amount: 0,
    CurrencyCd: '',
    Comments: '',
    status: ''
  };
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  getDate(date: number){
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
}

export interface datamodel {
  id: string;
  date: number;
  sender: Sender;
  recipient: Recipient;
  Amount: number;
  CurrencyCd: string;
  Comments: string;
  status: string;
}

export interface Recipient {
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  bank: string;
}

export interface Sender {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  IDNumber: string;
}
