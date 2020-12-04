/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuTabsComponent } from './menu-tabs.component';

describe('MenuTabsComponent', () => {
  let component: MenuTabsComponent;
  let fixture: ComponentFixture<MenuTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
