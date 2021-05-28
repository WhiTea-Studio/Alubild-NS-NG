import { Component, OnInit } from '@angular/core';
import { FileSystemEntity, ImageAsset } from '@nativescript/core';
import * as camera from '@nativescript/camera';
import { getString } from '@nativescript/core/application-settings';
import { User } from 'src/app/_models/user';
import { Order } from 'src/app/_models/order';
import { OrderPhotoService } from '../_services/order-photo.service';
import * as fs from '@nativescript/core/file-system';
import * as bgHttp from "@nativescript/background-http";
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-orders-photos',
  templateUrl: './add-orders-photos.component.html',
  styleUrls: ['./add-orders-photos.component.scss']
})
export class AddOrdersPhotosComponent implements OnInit {
  
  constructor(private orderPhotoService: OrderPhotoService, private router: Router) { }

  ngOnInit() {
    
  }


    public saveToGallery: boolean = true;
    public allowsEditing: boolean = false;
    public keepAspectRatio: boolean = true;
    public width: number = 320;
    public height: number = 240;
    public cameraImage: ImageAsset;
    public cameraImages: ImageAsset[] = [];
    public actualWidth: number;
    public actualHeight: number;
    public scale: number = 1;
    public labelText: string;
    uploadingImages = false;

    public tasks: bgHttp.Task[] = [];
    public events: { eventTitle: string, eventData: any }[] = [];
    private file: string;
    private url: string = 'http://localhost:5000/api/orderphoto/';
    private counter: number = 0;
    private session: any;

    onTakePictureTap(args) {
        camera.requestPermissions().then(
            () => {
                camera.takePicture({ width: this.width, height: this.height, keepAspectRatio: this.keepAspectRatio, saveToGallery: this.saveToGallery, allowsEditing: this.allowsEditing })
                    .then((imageAsset: any) => {
                        this.cameraImage = imageAsset;
                        this.cameraImages.push(imageAsset);
                        let that = this;
                        imageAsset.getImageAsync(function (nativeImage, ex) {
                            if (ex instanceof Error) {
                                throw ex;
                            } else if (typeof ex === "string") {
                                throw new Error(ex);
                            }

                            if (imageAsset.android) {
                                // get the current density of the screen (dpi) and divide it by the default one to get the scale
                                that.scale = nativeImage.getDensity() / android.util.DisplayMetrics.DENSITY_DEFAULT;
                                that.actualWidth = nativeImage.getWidth();
                                that.actualHeight = nativeImage.getHeight();
                            } else {
                                that.scale = nativeImage.scale;
                                that.actualWidth = nativeImage.size.width * that.scale;
                                that.actualHeight = nativeImage.size.height * that.scale;
                            }
                        });
                    }, (error) => {
                        console.log("Error: " + error);
                    });
            },
            () => alert('Odbijen je pristup kameri!')
        );
    }


    deleteImage(imageAsset: ImageAsset){
        this.cameraImages = this.cameraImages.filter(x => x !== imageAsset);
    }

    savePhotos(){
        const orderId = (<Order>JSON.parse(getString("order"))).id;
        const userId = (<User>JSON.parse(getString('user'))).id;
        this.session = bgHttp.session("image-upload");
        this.uploadingImages = true;

        for(let i = 0; i<this.cameraImages.length; i++){
            this.file = fs.path.normalize(this.cameraImages[i].android);
            const name = this.file.substr(this.file.lastIndexOf("/") + 1);

            const request = {
                url: this.url,
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": name
                },
                androidAutoDeleteAfterUpload: false,
                androidNotificationTitle: 'Uploadovanje slike',
            };

            let task: bgHttp.Task;
            let lastEvent = "";
            const params = [
                { name: "userId", value: userId },
                { name: "orderId", value: orderId },
                { name: "file", filename: this.file, mimeType: 'image/jpeg' }
            ];
            task = this.session.multipartUpload(params, request);


            function onEvent(e) {
                if (lastEvent !== e.eventName) {
                    lastEvent = e.eventName;
                } else {
                    return;
                }
    
                this.events.push({
                    eventTitle: e.eventName + " " + e.object.description,
                    eventData: JSON.stringify({
                        error: e.error ? e.error.toString() : e.error,
                        currentBytes: e.currentBytes,
                        totalBytes: e.totalBytes,
                        body: e.data,
                        responseCode: e.responseCode
                    })
                });
            }

            function onSuccess(e){
                if (lastEvent !== e.eventName) {
                    lastEvent = e.eventName;
                    if(i == this.cameraImages.length-1){
                        alert("Uspešno ste poslali fotografije");
                        this.router.navigate(['/main/tabs/']);
                    }
                } else {
                    return;
                }
    
                this.events.push({
                    eventTitle: e.eventName + " " + e.object.description,
                    eventData: JSON.stringify({
                        error: e.error ? e.error.toString() : e.error,
                        currentBytes: e.currentBytes,
                        totalBytes: e.totalBytes,
                        body: e.data,
                        responseCode: e.responseCode
                    })
                });
            }

            task.on("progress", onEvent.bind(this));
            task.on("error", onEvent.bind(this));
            task.on("responded", onEvent.bind(this));
            task.on("complete", onSuccess.bind(this));
            lastEvent = "";
            this.tasks.push(task);
            
        }

        this.uploadingImages = false;
    }

    next(){
        alert("Uspešno kreiran nalog");
        this.router.navigate(['/main/tabs/']);
    }
}
