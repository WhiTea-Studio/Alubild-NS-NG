import { Component, OnInit } from '@angular/core';
import { ImageAsset } from '@nativescript/core';
import * as camera from '@nativescript/camera';


@Component({
  selector: 'app-add-orders-photos',
  templateUrl: './add-orders-photos.component.html',
  styleUrls: ['./add-orders-photos.component.scss']
})
export class AddOrdersPhotosComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    // this.requestPermissions();
  }


  // requestPermissions(){
  //   camera.requestPermissions().then(
  //     function success(){
  //       camera.takePicture().then((imageAsset) => {
  //         var image = new Image();
  //         image.src = imageAsset;
  //       }).catch((err) => {
  //         alert("Greska " + err.message);
  //       });
  //     },
  //     function failure(){
  //       alert("Ne mozete dodati fotografiju");
  //     }
  //   )
  // }

  public saveToGallery: boolean = false;
    public allowsEditing: boolean = false;
    public keepAspectRatio: boolean = true;
    public width: number = 320;
    public height: number = 240;
    public cameraImage: ImageAsset;
    public actualWidth: number;
    public actualHeight: number;
    public scale: number = 1;
    public labelText: string;

    onTakePictureTap(args) {
        camera.requestPermissions().then(
            () => {
                camera.takePicture({ width: this.width, height: this.height, keepAspectRatio: this.keepAspectRatio, saveToGallery: this.saveToGallery, allowsEditing: this.allowsEditing })
                    .then((imageAsset: any) => {
                        this.cameraImage = imageAsset;
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
                            that.labelText = `Displayed Size: ${that.actualWidth}x${that.actualHeight} with scale ${that.scale}\n` +
                                `Image Size: ${Math.round(that.actualWidth / that.scale)}x${Math.round(that.actualHeight / that.scale)}`;

                            console.log(`${that.labelText}`);
                        });
                    }, (error) => {
                        console.log("Error: " + error);
                    });
            },
            () => alert('permissions rejected')
        );
    }


}
