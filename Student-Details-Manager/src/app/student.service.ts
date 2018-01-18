import { Injectable } from '@angular/core';
import {StudentData} from './student.data'
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class StudentService {
  studentDetail: StudentData = {rollNo:null,name:'',marks:null,age:null,average:null,gender:null};
  editFlag:boolean;

  constructor(private http:HttpClient) {}
 
  addData(data: StudentData) {
    this.studentDetail=data;
    this.editFlag=true;
  }
 
  clearData() {
    this.studentDetail = {rollNo:null,name:'',marks:null,age:null,average:null,gender:null};
    this.editFlag=false;
  }

  getData(){
      return this.studentDetail;
  }

  getEditFlag(){
      return this.editFlag;
  }

  getAllStudentDetails():Observable<StudentData[]>{
    return this.http.get<StudentData[]>("http://localhost:8081/students")
    .pipe(
      catchError(this.handleError('getAllDetail', []))
    );
  }

  getStudentDetail(searchValue:string):Observable<any>{
    return this.http.get<StudentData>("http://localhost:8081/students/"+searchValue)
    .pipe(
      catchError(this.handleError('getStudentDetail', []))
    );
  }

  saveStudentDetail(studentData:StudentData):Observable<any>{
    return this.http.post<StudentData>("http://localhost:8081/students", studentData, httpOptions)
    .pipe(
      catchError(this.handleError('saveDetail', []))
    )
  }

  updateStudentDetail(studentData:StudentData):Observable<any>{
    return this.http.put<StudentData>("http://localhost:8081/students", studentData, httpOptions)
    .pipe(
      catchError(this.handleError('updateDetail', []))
    )
  }

  deleteStudentDetail(rollNo:Number){
    return this.http.delete("http://localhost:8081/students/"+rollNo)
    .pipe(
      catchError(this.handleError('deleteDetail', []))
    )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      alert(error.error);
      return of(result as T);
    }
  }
}