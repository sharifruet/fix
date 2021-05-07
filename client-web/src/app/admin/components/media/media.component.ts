import {OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MediaUploadComponent } from '../media-upload/media-upload.component';
import { MediaService } from '../../../services/media.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  mediaAll: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  
  displayedColumns = ['photo', 'name', 'description', 'originalName','type', 'status','action'];
  dataSource = new MatTableDataSource();
  
 constructor(private confirmDialog:ConfirmDialogService, private _snackBar: MatSnackBar, public dialog: MatDialog, private mediaService:MediaService) {
  }

  ngOnInit(): void {
    this.retrieveMedia();
    this.getImages();
  }

  retrieveMedia(): void {
    this.mediaService.getAll()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getPhoto(id: number) {
    let photo = this.mediaAll.filter(sh => sh.id == id);
    if (photo.length > 0)
      return this.mediaService.mediaPath + photo[0].name;
      return "";
  }

  getImages() {
    this.mediaService.getAll().subscribe(
      data => {
        this.mediaAll = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // add serviceHierarchy dialog
  addItemDialog() {
    const dialogRef = this.dialog.open(MediaUploadComponent, {
      width:'450px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.refreshList();
    })
  }
  refreshList(): void {
    this.retrieveMedia();
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  deleteMedia(id:number){
    this.confirmDialog.openConfirmDialog('Are you sure to delete this?').afterClosed().subscribe(res => {
      if (res) {
        this.mediaService.delete(id)
          .subscribe(
            response => {
              console.log(response);
              
              this.openSnackBar('The media deleted successfully');
              this.refreshList();
            },
            error => {
              console.log(error);
            }
          );
      }
    })
  }

 

}
