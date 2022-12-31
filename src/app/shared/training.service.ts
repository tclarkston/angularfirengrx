import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { IExercise } from '../training/models/exercise.model';
@Injectable()
export class TrainingService{

  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  finishedExercisesChanged = new Subject<IExercise[]>();
  
  private availableExercies: IExercise[] = [];
  private runningExercise: any;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore){}

  fetchAvailableExercises()  {
   this.fbSubs.push(this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...(doc.payload.doc.data() as IExercise)
        }
      })
    }))
    .subscribe((exercises: IExercise[]) => {
      this.availableExercies = exercises;
      this.exercisesChanged.next([...this.availableExercies]);
    }))
    ;
  }

  startExercise(selectedId: string) : void {
    this.runningExercise = this.availableExercies.find(ex => ex.id === selectedId)

    this.exerciseChanged.next({...this.runningExercise });
  }

  completeExercise(){
    this.addDataToDatabase( {
      ...this.runningExercise,
      date: new Date(),
      state: 'Completed'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number){
    this.addDataToDatabase( {
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress /100),
      calories: this.runningExercise.calories * (progress /100),
      state: 'Cancelled'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExcercise(): IExercise{
    return { ...this.runningExercise }
  }

  fetchCompletedOrCancelledExercises(){
    this.fbSubs.push(this.db.collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: IExercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }))
    ;
  }

  cancelSubscriptions(){
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
  private addDataToDatabase(exercise: IExercise){
    this.db.collection('finishedExercises').add(exercise);
  }
}

