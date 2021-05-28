import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File, ImageAsset, Observable } from '@nativescript/core';
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';

@Injectable({
  providedIn: 'root'
})
export class OrderPhotoService {
  baseUrl ='http://localhost:5000/api/orderphoto/';
  private session: any;

  constructor(private http: HttpClient) { }

  async insert(userId: number, orderId: number, imageAsset: ImageAsset) {
    
    imageAsset.getImageAsync(async (image, error)=>{
      let fd = new TNSHttpFormData();
      let params = [];
      let imageData: any;

      if(!image)
        throw 'Ne moze da ucita sliku';


      if(image.ios){
        imageData = UIImagePNGRepresentation(image);
      } else {
        let bitmapImage: android.graphics.Bitmap = image;
        let stream = new java.io.ByteArrayOutputStream();
        bitmapImage.compress(android.graphics.Bitmap.CompressFormat.JPEG, 100, stream);
        let byteArray = stream.toByteArray();
        bitmapImage.recycle();

        imageData = byteArray;
      }

      console.log("Asset=> " + imageAsset.toString());
      console.log("Asset=> " + imageAsset.android);

      let param: TNSHttpFormDataParam = {
        data: imageData,
        contentType: 'image/jpeg',
        fileName: 'name.jpg',
        parameterName: 'file'
      };
      
      let param2: TNSHttpFormDataParam = {
        parameterName: 'userId',
        data: userId
      };

      let param3: TNSHttpFormDataParam = {
        parameterName: 'orderId',
        data: orderId
      };
      params.push(param);
      params.push(param2);
      params.push(param3);

      try {
        const response: TNSHttpFormDataResponse = await fd.post(this.baseUrl, params);
        console.log('RESPONSEE >>>> ' + response);
        return true;
      } catch (e){
        console.log(e);
        return false;
      }
    }).catch((e) => {
      console.log(e);
      return false;
    });
    









    // this.session = bgHttp.session('image-upload');
    // const name = photos.substr(photos.lastIndexOf('/')+1);
    // const request = {
    //   url: this.baseUrl,
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/octet-stream",
    //     "File-Name": name
    //   }
    // };

    // let task: bgHttp.Task;

    // const params = [
    //   {name: 'userId', value: userId},
    //   {name: 'orderId', value: orderId},
    //   {name: 'file', filename: photos, mimeType: 'image/jpeg'},
    // ];

    // task = this.session.multipartUpload(params, request);


    

    // const formData: FormData = new FormData();

    // formData.append('file', photos, photos.name);
    
    // formData.append('userId', userId.toString());
    // formData.append('orderId', orderId.toString());

    // return this.http.post(this.baseUrl, formData);
  }

}
