import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: any[]=[];
  dateForm!: FormGroup;
  endDate = new Date().valueOf();
  minDate = new Date("2021-11-01").toISOString().split("T")[0];
  maxDate = new Date().toISOString().split("T")[0];
  readonly ROOT_API = 'http://localhost:3000';

  constructor(private httpCLient: HttpClient){
    this.dateForm = new FormGroup({
      startDate: new FormControl(this.minDate, [
        Validators.required,
        Validators.max(this.endDate),
      ]),
      endDate: new FormControl(this.endDate, [
        Validators.required,
      ]),
      complete: new FormControl(false),
      inProgress: new FormControl(false),
      rejected: new FormControl(false),
    });
  }

  setStartDate($event: any){
    this.dateForm.get('startDate')?.setValue(new Date($event).valueOf());
  }
  setEndDate($event: any){
    this.maxDate = new Date($event).toISOString().split("T")[0];
    this.dateForm.get('endDate')?.setValue(new Date($event).valueOf());
  }

  getData(){
    let params = new HttpParams();
    let {startDate, endDate, complete, inProgress, rejected} = this.dateForm.value;

    if (startDate > 0) params = params.append('startDate', startDate)
    if (endDate > 0) params = params.append('endDate', endDate);

    const observer = this.httpCLient.get(this.ROOT_API+'/getData', { params: params });
    observer.subscribe((value: any) => {
      this.data = value.sort((a: any, b: any) =>{ return a.date-b.date});
      this.data = this.filterComplete(this.data,complete);
      this.data = this.filterInProgress(this.data,inProgress);
      this.data = this.filterRejected(this.data,rejected);
    });
  }

  filterComplete(data: any[], complete:boolean){
    if (complete) data = this.data.filter((element: any)=>{ return element.status != 'COMPLETED'});
    return data;
  }

  filterRejected(data: any[], rejected:boolean){
    if (rejected) data = this.data.filter((element: any)=>{ return element.status != 'REJECTED'});
    return data;
  }

  filterInProgress(data: any[], inProgress:boolean){
    if (inProgress) data = this.data.filter((element: any)=>{ return element.status != 'IN PROGRESS'});
    return data;
  }
}
