import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from './model/alert';
import { SpinnerService } from './service/spinner.service';
import { AlertService } from './service/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  private subscriptions: Subscription[] = []
  alerts: Alert[] = []
  loading!: boolean;

  constructor (private spinnerService: SpinnerService,
               private alertService: AlertService){
          this.loading = false;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.spinnerService.isLoading.subscribe(isLoading => {
        this.loading = isLoading
      })
    );
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert)
        this.closeAlert(3)
      })
    )
  }

  private closeAlert(second: number):void {
    setTimeout(() => {
      const element: HTMLElement = document.getElementById("dismissAlert") as HTMLElement;
      element.click();
    },second * 1000)
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
}
