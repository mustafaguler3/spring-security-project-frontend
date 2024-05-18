import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../model/alert';
import { AlertType } from '../enum/alert-type';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Subject<Alert> = new Subject();

  constructor() { }

  showAlert(message: string,alertType: AlertType){
    const alert = new Alert(message,alertType)
    this.alerts.next(alert)
  }
}
