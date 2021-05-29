import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EventData, ListPicker } from '@nativescript/core';
import { Category } from '../../_models/category';
import { Color } from '../../_models/color';
import { GlassPackage } from '../../_models/glass-package';
import { GlassQuality } from '../../_models/glass-quality';
import { Guide } from '../../_models/guide';
import { Manufacturer } from '../../_models/manufacturer';
import { OrderItem } from '../../_models/order-item';
import { Quality } from '../../_models/quality';
import { Series } from '../../_models/series';
import { Tabakera } from '../../_models/tabakera';
import { TypologyModel } from '../../_models/typology-model';
import { CategoryService } from '../_services/category.service';
import { ColorService } from '../_services/color.service';
import { GlassPackageService } from '../_services/glass-package.service';
import { GlassQualityService } from '../_services/glass-quality.service';
import { GuideService } from '../_services/guide.service';
import { ManufacturerService } from '../_services/manufacturer.service';
import { OrderItemHelpService } from '../_services/order-item-help.service';
import { QualityService } from '../_services/quality.service';
import { SeriesService } from '../_services/series.service';
import { TabakeraService } from '../_services/tabakera.service';
import { TypologyModelService } from '../_services/typology-model.service';
import { TypologyService } from '../_services/typology.service';

@Component({
  selector: 'ns-order-item-editing',
  templateUrl: './order-item-editing.component.html',
  styleUrls: ['./order-item-editing.component.scss'],
  moduleId: module.id
})
export class OrderItemEditingComponent implements OnInit {
    // @Input() inputItem: OrderItem;
    inputItem: OrderItem;
    categories: Category[] = [];
    typologyModels: TypologyModel[];
    orderItemForm: FormGroup;
    series: Series[];
    colors: Color[];
    sideChecker: string;
    qualities: Quality[];
    guides: Guide[];
    tabakere: Tabakera[];
    glassQualities: GlassQuality[];
    glassPackages: GlassPackage[];
    manufacturers: Manufacturer[];
    validTypologyCategory = true;

    @ViewChild('CB1') LeftCheckBox: ElementRef;
    @ViewChild('CB2') RightCheckBox: ElementRef;
    checkerError = false;

    showColorString = false;
    showGlass = false;

    @Output() closeItem2 = new EventEmitter<OrderItem>();



    constructor(private fb: FormBuilder, private helpService: OrderItemHelpService) { }

    ngOnInit() {
        this.inputItem = this.helpService.getOrderItem();
        this.createOrderItemForm();
    }

    createOrderItemForm(){
      this.orderItemForm = this.fb.group({
        width: [this.inputItem.width, {validators: [Validators.required], updateOn: "blur"}],
        height: [this.inputItem.height, {validators: [Validators.required], updateOn: "blur"}],
        quantity: [this.inputItem.quantity, {validators: [Validators.required], updateOn: "blur"}],
        note: [this.inputItem?.note]
      });

    }

    closeItemWindow(){
      this.closeItem2.emit(null);
    }

    editOrderItem(){
      if(this.orderItemForm.valid){
        let orderItem = Object.assign({}, this.orderItemForm.value);

        const orderItemToEdit: OrderItem = {
            width: orderItem.width,
            height: orderItem.height,
            quantity: orderItem.quantity,
            note: orderItem.note,
            category: this.inputItem?.category,
            typologyModel: this.inputItem?.typologyModel,
            series: this.inputItem?.series,
            color: this.inputItem?.color,
            quality: this.inputItem?.quality,
            sideChecker: this.inputItem?.sideChecker
        }

        const typology = this.inputItem?.typologyModel.typology;
        if(typology?.guide)
          orderItemToEdit.guide = this.inputItem?.guide;
        if(typology?.tabakera)
          orderItemToEdit.tabakera = this.inputItem?.tabakera;
        if(typology?.glass){
          orderItemToEdit.glassPackage = this.inputItem?.glassPackage;
          orderItemToEdit.glassQuality = this.inputItem?.glassQuality;
        }

        if(this.notEqual(orderItemToEdit)){
            orderItemToEdit.update = true;
        }
        else {
            alert("Niste izmenili tipologiju!");
            return;
        }
        // console.log(orderItemToEdit);
        this.helpService.setOrderItem(orderItemToEdit);
        this.closeItem2.emit(orderItemToEdit);
      } else{
        console.log("error")
      }
    }

    notEqual(orderItemToEdit: OrderItem){
        if(orderItemToEdit.height !== this.inputItem.height
            || orderItemToEdit.width !== this.inputItem.width
            || orderItemToEdit.quantity !== this.inputItem.quantity
            || orderItemToEdit.note !== this.inputItem.note)
            return true;
        return false;
    }
}
