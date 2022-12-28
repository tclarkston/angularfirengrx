import { IExercise } from './../models/exercise.model';
import { TrainingService } from './../../shared/training.service';
import { StopTrainingComponent } from './stop-training.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-current-trainings',
  templateUrl: './current-trainings.component.html',
  styleUrls: ['./current-trainings.component.css']
})
export class CurrentTrainingsComponent implements OnInit{
  progress = 0;
  timer: any;
  
  constructor(private dialog: MatDialog, private trainingService: TrainingService){

  }

  ngOnInit(): void {
      this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    const step = this.trainingService.getRunningExcercise().duration / 100 * 1000
    
    this.timer = setInterval(() => {
      this.progress = this.progress + 5
      if (this.progress >= 100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step)
  }


  onStop(){
    clearInterval(this.timer);

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
