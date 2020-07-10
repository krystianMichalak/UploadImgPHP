import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UploadService } from "../upload.service";

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {

  form: FormGroup;
  uploadResponse;
  imageUrl: string;
  fileAdded: boolean = false;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      img: ['']
    })
  }

  onFileSelect(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('img').setValue(file);
      this.fileAdded = true;
      const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    this.imageUrl = imgBase64Path;
                    console.log(this.imageUrl);
                    this.fileAdded = true;
                };
            };
            reader.readAsDataURL(event.target.files[0]);
    }
    this.upload();
  }

  upload() {
    const formData = new FormData();
    formData.append('img', this.form.get('img').value);

    this.uploadService.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
      },
      (err) => {  
        console.log(err);
      }
    );
  }

}
