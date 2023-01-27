import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: boolean = false;
  subs: Subscription;

  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.subs = this.trainingService.exerciseChanged.subscribe(
      excersise => {
        if (excersise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  start() {

  }
}
