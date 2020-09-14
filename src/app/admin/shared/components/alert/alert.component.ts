import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay: 5000;

  text: string;
  type = 'success';
  aSub: Subscription;

  constructor(private alerService: AlertService) { }

  ngOnInit(): void {
    this.alerService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;
    });
    const  timeout = setTimeout(() => {
      clearTimeout(timeout);
      this.text = '';
    }, this.delay);
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
