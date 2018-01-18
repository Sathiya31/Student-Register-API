import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import {AddDetailDialogComponent} from './add-detail-dialog/add-detail-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {StudentService} from './student.service';
import {StudentData} from './student.data';
import {ViewDetailDialogComponent} from './view-detail-dialog/view-detail-dialog.component'
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  displayedColumns = ['rollNo', 'name', 'gender', 'age', 'marks', 'average', 'edit', 'delete'];
  dataSource: MatTableDataSource<StudentData>;
  showSpinner:boolean;
  selection = new SelectionModel<StudentData>(true, []);
  searchValue:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private http:HttpClient, private studentService:StudentService) {


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
    this.showSpinner=true;
    this.studentService.getAllStudentDetails().subscribe(data =>  {
        this.dataSource=new MatTableDataSource(data as StudentData[]);
        this.ngAfterViewInit();
        this.showSpinner=false;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(): void {
    this.studentService.clearData();
    let dialogRef = this.dialog.open(AddDetailDialogComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.showSpinner=true;
      this.studentService.getAllStudentDetails().subscribe(data => {
        this.dataSource=new MatTableDataSource(data as StudentData[]);
        this.ngAfterViewInit();
        this.showSpinner=false;
      });
    });
  }

  editDetail(row):void{
    this.studentService.addData(row);
    let dialogRef = this.dialog.open(AddDetailDialogComponent, {
      width: '50%'
    });
  }

  deleteDetail(rollNo:Number):void{
    this.showSpinner=true;
    this.studentService.deleteStudentDetail(rollNo).subscribe(data => {
    this.studentService.getAllStudentDetails().subscribe(data => {
        this.dataSource=new MatTableDataSource(data as StudentData[]);
        this.ngAfterViewInit();
        this.showSpinner=false;
      });
    })
  }

  getDetail():void{
    var search = this.searchValue.trim(); 
    if(search.length>0){
      this.studentService.getStudentDetail(search).subscribe(data => {
        console.log(data);
        if(data){
          this.studentService.addData(data);
          let dialogRef = this.dialog.open(ViewDetailDialogComponent, {
            width: '25%'
          });
        }
        
      });
    }
    else{
      alert("Search input cannot be blank");
    }
  }
}

