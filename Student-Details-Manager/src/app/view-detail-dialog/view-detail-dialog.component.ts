import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {StudentData} from '../student.data';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-view-detail-dialog',
  templateUrl: './view-detail-dialog.component.html',
  styleUrls: ['./view-detail-dialog.component.css']
})
export class ViewDetailDialogComponent implements OnInit {

  private studentData:StudentData;
  constructor(private studentService:StudentService) { 
    
  }

  ngOnInit() {
    this.studentData=this.studentService.getData();
  }

}
