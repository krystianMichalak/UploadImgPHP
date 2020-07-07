import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadImgComponent } from "./upload-img/upload-img.component";


const routes: Routes = [
  {path: 'upload', component: UploadImgComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
