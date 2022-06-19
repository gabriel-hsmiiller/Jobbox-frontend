import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'jbx-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  currentIndex = 0;

  constructor(public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { index: number, images: any[]}) {
      this.currentIndex = this.data.index;
    }

  ngOnInit(): void { }

  next() {
    if (this.currentIndex === this.data.images.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.data.images.length - 1;
    } else {
      this.currentIndex--;
    }
  }

  downloadContent() {
    window.open(URL.createObjectURL(this.data.images[this.currentIndex].original));
  }

}
