import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss'
})
export class DetailsDialogComponent implements OnInit {
  dialogTitle: string = "";
  dialogBody: string = "";

  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>
  ) {}

  ngOnInit(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
