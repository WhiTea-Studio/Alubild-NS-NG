import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Color } from 'src/app/_models/color';
import { GlassPackage } from 'src/app/_models/glass-package';
import { GlassQuality } from 'src/app/_models/glass-quality';
import { Guide } from 'src/app/_models/guide';
import { Manufacturer } from 'src/app/_models/manufacturer';
import { Quality } from 'src/app/_models/quality';
import { Series } from 'src/app/_models/series';
import { Tabakera } from 'src/app/_models/tabakera';
import { TypologyModel } from 'src/app/_models/typology-model';
import { Typology } from 'src/app/_models/typology';
import { Category } from 'src/app/_models/category';
import { CategoryService } from '../_services/category.service';
import { EventData, ListPicker } from '@nativescript/core';
import { ManufacturerService } from '../_services/manufacturer.service';
import { TypologyService } from '../_services/typology.service';
import { TabakeraService } from '../_services/tabakera.service';
import { GuideService } from '../_services/guide.service';
import { GlassPackageService } from '../_services/glass-package.service';
import { GlassQualityService } from '../_services/glass-quality.service';
import { TypologyModelService } from '../_services/typology-model.service';
import { SeriesService } from '../_services/series.service';
import { ColorService } from '../_services/color.service';
import { QualityService } from '../_services/quality.service';
import { OrderItem } from 'src/app/_models/order-item';

@Component({
  selector: 'ns-order-item-creating',
  templateUrl: './order-item-creating.component.html',
  styleUrls: ['./order-item-creating.component.scss'],
  moduleId: module.id
})
export class OrderItemCreatingComponent implements OnInit {
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
  typologies: Typology[] = [];
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
    this.createOrderItemForm();

    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.orderItemForm.get('category').setValue(0);
    }, error => {
      alert(error.message);
    });

    this.typologyService.getAll().subscribe((typologies: Typology[]) => {
      this.typologies = typologies;
      this.orderItemForm.get('typology').setValue(0);
    }, error => {
      alert(error.message);
    });

  }

  // {validators: [Validators.pattern(this.phonePattern)], updateOn: "blur"}

  createOrderItemForm(){
    this.orderItemForm = this.fb.group({
      category: [0, Validators.required],
      typology: [0, Validators.required],
      typologyModel:[0, Validators.required],
      width: [0, {validators: [Validators.required], updateOn: "blur"}],
      height: [0, {validators: [Validators.required], updateOn: "blur"}], 
      quantity: [0, {validators: [Validators.required], updateOn: "blur"}], 
      manufacturer: [0, Validators.required],
      series: [0, Validators.required],
      note: [""],
      color: [0, Validators.required],
      colorString: [""],
      quality: [0, Validators.required],
      guide: [0],
      tabakera: [0],
      glassQuality: [0],
      glassPackage: [0],
      left: [true],
      right: [false]
    }, {validator: this.colorValidator(this.colors)});
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
      const typologyId = this.typologies[this.orderItemForm.get('typology').value].id;
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

  onSelectedTypologyChanged(args: EventData){
    const picker = <ListPicker>args.object;
    const typology = this.typologies[picker.selectedIndex];

    if(typology.tabakera == true){
      this.tabakeraService.getAll().subscribe((tabakere: Tabakera[]) => {
        this.tabakere = tabakere;
      }, error => {
        alert(error);
      });
    } else {
      this.tabakere = null;
    }

    if(typology.guide == true){
      this.guideService.getAll().subscribe((guides: Guide[]) => {
        this.guides = guides;
      }, error => {
        alert(error);
      });
    } else {
      this.guides = null;
    }

    if(typology.glass == true){
      this.glassPackageService.getAll().subscribe((glassPackages: GlassPackage[]) => {
        this.glassPackages = glassPackages;
      }, error => {
        alert(error);
      });

      this.glassQualityService.getAll().subscribe((glassQualities: GlassQuality[]) => {
        this.glassQualities = glassQualities;
      }, error => {
        alert(error);
      });

      this.showGlass = true;
    } else {
      this.glassQualities = null;
      this.glassPackages = null;
      this.showGlass = false;
    }

    if(this.orderItemForm){
      const categoryId = this.categories[this.orderItemForm.get('category').value].id;

      this.typologyModelService.getAll(typology.id, categoryId).subscribe((typologyModels: TypologyModel[]) => {
        this.typologyModels = typologyModels;
        if(this.typologyModels.length === 0)
          this.validTypologyCategory = false;
        else this.validTypologyCategory = true;
      }, error => {
        alert(error);
      });
    }

    
  }

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

  addOrderItem(){
    if(this.orderItemForm.valid){
      let orderItem = Object.assign({}, this.orderItemForm.value);
      
      const orderItemToCreate: OrderItem = {
        width: orderItem.width,
        height: orderItem.height,
        quantity: orderItem.quantity,
        note: orderItem.note,
        category: this.categories[orderItem.category],
        typologyModel: this.typologyModels[orderItem.typologyModel],
        series: this.series[orderItem.series],
        color: this.colors[orderItem.color],
        quality: this.qualities[orderItem.quality],
        sideChecker: (orderItem.left && orderItem.right) ? 'Both' : (orderItem.left ? 'Left' : 'Right')
      }

      const typology = this.typologies[orderItem.typology];
      if(typology.guide)
        orderItemToCreate.guide = this.guides[orderItem.guide];
      if(typology.tabakera)
        orderItemToCreate.tabakera = this.tabakere[orderItem.tabakera];
      if(typology.glass){
        orderItemToCreate.glassPackage = this.glassPackages[orderItem.glassPackage];
        orderItemToCreate.glassQuality = this.glassQualities[orderItem.glassQuality];
      }
      
      orderItemToCreate.insert = true;


      // console.log(orderItem);
      // console.log();
      // console.log(orderItemToCreate);
      this.closeItem.emit(orderItemToCreate);
    } else{
      console.log("error")
    }
  }

  
}
