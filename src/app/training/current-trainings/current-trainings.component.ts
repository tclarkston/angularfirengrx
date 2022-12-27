import { StopTrainingComponent } from './stop-training.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-current-trainings',
  templateUrl: './current-trainings.component.html',
  styleUrls: ['./current-trainings.component.css']
})
export class CurrentTrainingsComponent implements OnInit{
  @Output() trainingExit = new EventEmitter<void>()
  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog){

  }

  ngOnInit(): void {
      this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    this.timer = setInterval(() => {
      this.progress = this.progress + 5
      if (this.progress >= 100){
        clearInterval(this.timer);
      }
    }, 1000)
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
        this.trainingExit.emit();
      } else {
        console.log('resumed');
        this.startOrResumeTimer();
      }
    });
  }
}
