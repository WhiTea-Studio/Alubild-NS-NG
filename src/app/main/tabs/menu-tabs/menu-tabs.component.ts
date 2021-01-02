import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';

@Component({
  selector: 'ns-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.scss'],
  moduleId: module.id
})
export class MenuTabsComponent implements OnInit {

  constructor(private router: RouterExtensions, private active: ActivatedRoute, private page: Page) { }

  ngOnInit() {
    this.router.navigate([{outlets: {items: ['items'], newOrder: ['new-order'], items3: ['items3']}}],
    {
      relativeTo: this.active
    });

    this.page.actionBarHidden = true;
  }

}
