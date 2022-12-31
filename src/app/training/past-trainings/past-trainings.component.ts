import { Subscription } from 'rxjs';
import { TrainingService } from './../../shared/training.service';
import { IExercise } from './../models/exercise.model';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<IExercise>()
  sub = new Subscription();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService){}
 
  ngOnInit(): void {
    this.sub = this.trainingService.finishedExercisesChanged
    .subscribe(
      (exercises: IExercise[]) => {
      this.dataSource.data = exercises;
    });

    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
