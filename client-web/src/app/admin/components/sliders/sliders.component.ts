import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SliderAddComponent } from '../slider-add/slider-add.component';
import { SlidersService } from '../../../services/sliders.service';
import { MediaService } from '../../../services/media.service';
import { SliderEditComponent } from '../slider-edit/slider-edit.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {

  mediaAll: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['title', 'photo', 'published', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private _snackBar:MatSnackBar, private confirmDialog: ConfirmDialogService, private dialog: MatDialog, private sliderService: SlidersService, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.getSliders();
    this.getImages();
  }

  // open snackbar
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  // add slider popup
  addSlider() {
    const dialogRef = this.dialog.open(SliderAddComponent, {
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getSliders();
    })
  }

  // get sliders for datatable
  getSliders(): void {
    this.sliderService.getAll()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        }
      )
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

  // datatable filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // slider edit
  editSlider(slider: number) {
    const dialogRef = this.dialog.open(SliderEditComponent, {
      width: '500px',
      data: slider
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSliders();
    })
  }

  // delete slider
  deleteSlider(id): void {
    this.confirmDialog.openConfirmDialog('Are you sure to delete this?').afterClosed().subscribe(res => {
      if (res) {
        this.sliderService.delete(id)
          .subscribe(
            response => {
              console.log(response);
              this.openSnackBar('The slider deleted successfully');
              this.getSliders();
            },
            error => {
              console.log(error);
            }
          );
      }
    })
  }



}
