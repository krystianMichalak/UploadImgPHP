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
  imageUrlsMap: Map<string, string>;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) {
    this.imageUrlsMap = new Map();
    this.imageUrlsMap['1.png'] = "../../assets/1.png";
    this.imageUrlsMap['2.png'] = "../../assets/2.png";
    this.imageUrlsMap['3.png'] = "../../assets/3.png";
    this.imageUrl = "../../assets/1.png";
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      img: ['']
    })
  }

  onChange(newValue) {
    this.imageUrl = this.imageUrlsMap[newValue];
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('img').setValue(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.imageUrlsMap['new'] = imgBase64Path;
          this.imageUrl = imgBase64Path;
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
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getKeys(): string[] {
    return Object.keys(this.imageUrlsMap);
  }
}
