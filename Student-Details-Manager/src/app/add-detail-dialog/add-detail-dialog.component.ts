import {Component, Inject, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {StudentData} from '../student.data';
import {StudentService} from '../student.service'

@Component({
  selector: 'add-detail-dialog',
  templateUrl: 'add-detail-dialog.component.html',
  styleUrls:['add-detail-dialog.component.css']
})
export class AddDetailDialogComponent{

  private studentData: StudentData;
  private editFlag: boolean; 
  private showSpinner:boolean;

  constructor(    
    public dialogRef: MatDialogRef<AddDetailDialogComponent>,
    private http: HttpClient, private studentService:StudentService) { 
      this.studentData=studentService.getData();
      this.editFlag=studentService.getEditFlag();
    }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSaveClick():void{
    this.showSpinner=true;
    this.studentService.saveStudentDetail(this.studentData).subscribe(data => {
      this.onCloseClick();
      this.showSpinner=false;
   });
  }

  onUpdateClick(rollNo:number):void{
    this.showSpinner=true;
  this.studentService.updateStudentDetail(this.studentData).subscribe(data => {
    this.onCloseClick();
    this.showSpinner=false;
  });
  }

}