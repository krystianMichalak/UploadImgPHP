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
  image: string;
  fileAdded: boolean = false;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      avatar: ['']
    })
  }

  onFileSelect(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
      this.fileAdded = true;
      const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    this.image = imgBase64Path;
                    this.fileAdded = true;
                };
            };
            reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);

    this.uploadService.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
          console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

}
