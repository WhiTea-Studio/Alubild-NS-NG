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
    @Input() inputItem: OrderItem;
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

    @Output() closeItem = new EventEmitter<any>();



    constructor(private fb: FormBuilder, private categoryService: CategoryService,
      private manufacturerService: ManufacturerService, private typologyService: TypologyService,
      private tabakeraService: TabakeraService, private guideService: GuideService,
      private glassPackageService: GlassPackageService, private glassQualityService: GlassQualityService,
      private typologyModelService: TypologyModelService, private seriesService: SeriesService,
      private colorService: ColorService, private qualityService: QualityService) { }

    ngOnInit() {
        // console.log(this.inputItem);
        console.log(this.inputItem);

        this.categoryService.getAll().subscribe((categories: Category[]) => {
            this.categories = categories;
          }, error => {
            alert(error.message);
          });
          this.createOrderItemForm();
    //   this.typologyService.getAll().subscribe((typologies: Typology[]) => {
    //     // this.typologies = typologies;
    //     // this.orderItemForm.get('typology').setValue(0);
    //   }, error => {
    //     alert(error.message);
    //   });

    }

    // {validators: [Validators.pattern(this.phonePattern)], updateOn: "blur"}

    createOrderItemForm(){
      this.orderItemForm = this.fb.group({
        // category: [this.categories.findIndex(x => x.id == this.inputItem?.category?.id), Validators.required],
        // typology: [this.inputItem?.typologyModel?.typology?.name, Validators.required],
        // typologyModel:[this.inputItem?.typologyModel.id, Validators.required],
        width: [this.inputItem.width, {validators: [Validators.required], updateOn: "blur"}],
        height: [this.inputItem.height, {validators: [Validators.required], updateOn: "blur"}],
        quantity: [this.inputItem.quantity, {validators: [Validators.required], updateOn: "blur"}],
        // manufacturer: [this.originalItem?.series.manufacturer, Validators.required],
        // series: [this.originalItem?.series, Validators.required],
        note: [this.inputItem?.note],
        // color: [this.inputItem?.color.id, Validators.required],
        // colorString: [this.inputItem?.colorString],
        // quality: [this.inputItem?.quality?.id, Validators.required],
        // guide: [this.inputItem?.guide?.id],
        // tabakera: [this.inputItem?.tabakera?.id],
        // glassQuality: [this.inputItem?.glassQuality?.id],
        // glassPackage: [this.inputItem?.glassPackage?.id]
        // left: [this.originalItem.sideChecker.],
        // right: [false]
      });
    // }, {validator: this.colorValidator(this.colors)});
    }

    colorValidator(colors: Color[]): ValidatorFn{
      return (form: AbstractControl): ValidationErrors | null => {
      if(this.colors == undefined || this.colors.length === 0)
        return null;

      const selectedColorIndex = form.get('color').value;
      const selectedColor = this.colors[selectedColorIndex].name;

      if(selectedColor === 'DRUGO'){
        const stringColor = form.get('colorString').value;
        return stringColor == undefined || stringColor == '' || stringColor == ' ' ? {colorStringError: true} : null;
      }
      return null;
    }}

    onSelectedCategoryChanged(args: EventData){
      const picker = <ListPicker>args.object;
      const id = this.categories[picker.selectedIndex].id;

      this.loadManufacturers(id);
      this.loadColors(id);
      this.loadQualities(id);


      if(this.orderItemForm){
        // const typologyId = this.typologies[this.orderItemForm.get('typology').value].id;
        const typologyId = 1;
        this.typologyModelService.getAll(typologyId, id).subscribe((typologyModels: TypologyModel[]) => {
          this.typologyModels = typologyModels;
          if(this.typologyModels.length === 0)
            this.validTypologyCategory = false;
          else this.validTypologyCategory = true;
        }, error => {
          alert(error);
        });
      }


    }

    // onSelectedTypologyChanged(args: EventData){
    //   const picker = <ListPicker>args.object;
    //   const typology = this.originalItem.typologyModel.typology;

    //   if(typology.tabakera == true){
    //     this.tabakeraService.getAll().subscribe((tabakere: Tabakera[]) => {
    //       this.tabakere = tabakere;
    //     }, error => {
    //       alert(error);
    //     });
    //   } else {
    //     this.tabakere = null;
    //   }

    //   if(typology.guide == true){
    //     this.guideService.getAll().subscribe((guides: Guide[]) => {
    //       this.guides = guides;
    //     }, error => {
    //       alert(error);
    //     });
    //   } else {
    //     this.guides = null;
    //   }

    //   if(typology.glass == true){
    //     this.glassPackageService.getAll().subscribe((glassPackages: GlassPackage[]) => {
    //       this.glassPackages = glassPackages;
    //     }, error => {
    //       alert(error);
    //     });

    //     this.glassQualityService.getAll().subscribe((glassQualities: GlassQuality[]) => {
    //       this.glassQualities = glassQualities;
    //     }, error => {
    //       alert(error);
    //     });

    //     this.showGlass = true;
    //   } else {
    //     this.glassQualities = null;
    //     this.glassPackages = null;
    //     this.showGlass = false;
    //   }

    //   if(this.orderItemForm){
    //     const categoryId = this.categories[this.orderItemForm.get('category').value].id;

    //     this.typologyModelService.getAll(typology.id, categoryId).subscribe((typologyModels: TypologyModel[]) => {
    //       this.typologyModels = typologyModels;
    //       if(this.typologyModels.length === 0)
    //         this.validTypologyCategory = false;
    //       else this.validTypologyCategory = true;
    //     }, error => {
    //       alert(error);
    //     });
    //   }


    // }

    onSelectedManufacturerChanged(args: EventData){
      const picker = <ListPicker>args.object;
      const id = this.manufacturers[picker.selectedIndex].id;
      this.loadSeries(id);
    }

    checkBoxChange(){
      if(!this.LeftCheckBox.nativeElement.checked && !this.RightCheckBox.nativeElement.checked){
        this.sideChecker = null;
        this.checkerError = true;
        console.log('null');
      } else if(this.LeftCheckBox.nativeElement.checked && !this.RightCheckBox.nativeElement.checked){
        this.sideChecker = 'Left';
        console.log('Left');
        this.checkerError = false;
      } else if(!this.LeftCheckBox.nativeElement.checked && this.RightCheckBox.nativeElement.checked){
        this.checkerError = false;
        console.log('Right');
        this.sideChecker = 'Right';
      } else {
        this.checkerError = false;
        console.log('Both');
        this.sideChecker = 'Both';
      }
    }


    private loadSeries(id: number){
      this.seriesService.getByManufacturer(id).subscribe((series: Series[]) => {
        this.series = series;
        this.orderItemForm.get('series').setValue(0);
      }, error => {
        alert(error.Message);
      });
    }

    private loadManufacturers(id: number){
      this.manufacturerService.getByCategory(id).subscribe((manufacturers: Manufacturer[]) => {
        this.manufacturers = manufacturers;
        this.orderItemForm.get('manufacturer').setValue(0);
        this.loadSeries(this.manufacturers[0].id);
      }, error => {
        alert(error.Message);
      });
    }

    private loadColors(id: number){
      this.colorService.getByCategory(id).subscribe((colors: Color[]) => {
        this.colors = colors;
      }, error => {
        alert(error.message);
      });
    }

    private loadQualities(id: number){
      this.qualityService.getByCategory(id).subscribe((qualities: Quality[]) => {
        this.qualities = qualities;
      }, error => {
        alert(error.message);
      })
    }

    onSelectedColorChanged(args: EventData){
      const picker = <ListPicker>args.object;
      const name = this.colors[picker.selectedIndex].name;

      if(name === "DRUGO"){
        this.showColorString = true;
      } else {
        this.showColorString = false;
      }
    }


    closeItemWindow(){
      this.closeItem.emit(null);
    }

    editOrderItem(){
      if(this.orderItemForm.valid){
        let orderItem = Object.assign({}, this.orderItemForm.value);

        const orderItemToEdit: OrderItem = {
          width: orderItem.width,
          height: orderItem.height,
          quantity: orderItem.quantity,
          note: orderItem.note,
        //   category: this.categories[orderItem.category],
        //   typologyModel: this.typologyModels[orderItem.typologyModel],
        //   series: this.series[orderItem.series],
        //   color: this.colors[orderItem.color],
        //   quality: this.qualities[orderItem.quality],
        //   sideChecker: (orderItem.left && orderItem.right) ? 'Both' : (orderItem.left ? 'Left' : 'Right')
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
            alert("Jeste izmena");
        }
        else {
            alert("Niste izmenili tipologiju!");
            return;
        }


        // console.log(orderItem);
        // console.log();
        // console.log(orderItemToEdit);

        //salje izmenjenu odavde
        this.closeItem.emit(orderItemToEdit);
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
