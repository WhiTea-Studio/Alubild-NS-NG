import { Component, Input, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { isAndroid } from '@nativescript/core'

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
  moduleId: module.id
})
export class ActionBarComponent implements OnInit {
    @Input() title: string;
    @Input() showBackButton = true;

  constructor(private router: RouterExtensions) { }

  ngOnInit() {
  }

  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  get android(){
      return isAndroid;
  }

//   onGoBack() {
//       this.router.backToPreviousPage();
//   }

//   onToggleMenu(){
//     this.uiService.toggleDrawer();
//   }

//   onLoadedActionBar() {
//     //samo na androidu, za back dugme
//     if (isAndroid) {
//         const androidToolbar = this.page.actionBar.nativeView;
//         const backButton = androidToolbar.getNavigationIcon();
//         if (backButton) {
//             backButton.setColorFilter(android.graphics.Color.parseColor('#171717'), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
//         }
//     }
//   }
}
