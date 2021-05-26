import { Component, OnInit, ViewChild } from "@angular/core";
import {
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    ValidatorFn,
} from "@angular/forms";
import { RouterExtensions } from '@nativescript/angular';
import { ItemEventData } from '@nativescript/core';
import { OrderItem } from "src/app/_models/order-item";
import { OrderService } from '../../_services/order.service';
import { Order } from "../../_models/order";
import { getString, setString } from '@nativescript/core/application-settings';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';

@Component({
    selector: "ns-order-creating",
    templateUrl: "./order-creating.component.html",
    styleUrls: ["./order-creating.component.scss"],
    moduleId: module.id,
})
export class OrderCreatingComponent implements OnInit {
    orderForm: FormGroup;
    newOrder: Order;
    phonePattern = "^06[0-9](([0-9]{7})|([0-9]{6}))$";
    pattern = new RegExp(this.phonePattern);
    isTapped = false;
    isService = false;
    orderItemList: OrderItem[] = [];
    minDate = new Date();

    constructor(private fb: FormBuilder, private orderService: OrderService,
        private router: Router) {}

    ngOnInit() {
        this.createOrderForm();
    }

    createOrderForm() {
        this.orderForm = this.fb.group({
            clientsName: ["", {validators: Validators.required, updateOn: "blur"}],
            clientsSurname: ["", {validators: Validators.required, updateOn: "blur"}],
            clientsAdress: ["", {validators: Validators.required, updateOn: "blur"}],
            clientsPhoneNumber: [
                "",
                {
                    validators: [Validators.pattern(this.phonePattern)],
                    updateOn: "blur",
                },
            ],
            clientsEmail: [
                "",
                { validators: [Validators.email], updateOn: "blur" },
            ],
            service: [false, Validators.required],
            note: [""],
            schedulingDate: [null],
            orderItems: this.fb.array([]),
        }, {validators: [this.validateSubjectsArrayNotService]});
    }

    validateSubjectsArray(arr: FormArray) {
        return arr.length <= 0 ? { "invalid-length": true } : null;
    }

    validateSubjectsArrayNotService(form: FormGroup) {
        const service = form.controls['service'].value;
        const arr = <FormArray>form.controls['orderItems'].value;
        if (service) {
           return null;
        }
        return arr.length <= 0 ? { "invalid-length": true } : null;
     }

    addTypologyTap() {
        this.isTapped = !this.isTapped;
    }

    checkBoxChange() {
        if (this.orderForm.get("service").value === true) {
            this.isService = true;
        } else {
            this.isService = false;
        }
    }

    closeAddOrderItem(orderItem?: OrderItem) {
        this.isTapped = false;
        if (orderItem !== null && orderItem !== undefined) {
            this.orderItemList.push(orderItem);
            (<FormArray>this.orderForm.controls.orderItems).push(new FormControl(orderItem));
        }
    }

    deleteItem(item: OrderItem){
        this.orderItemList = this.orderItemList.filter(x => x !== item);
    }

    showOrderItemList(){
        if(this.orderItemList == null)
            return false;
        if(this.orderItemList == undefined)
            return false;
        if(this.orderItemList.length == 0)
            return false;
        return true;
    }

    refresh(){
        this.isTapped = false;
        this.isService = false;
        this.orderItemList = [];
        this.newOrder = null;
        this.createOrderForm();
    }

    createOrder(){
        if(this.orderForm.valid){
            this.newOrder = Object.assign({}, this.orderForm.value);
            if(this.isService)
                this.newOrder.orderItems = null;
            
            this.newOrder.orderItems = this.orderItemList;
            this.newOrder.dateCreated = new Date();
            const userData = JSON.parse(getString('user'));

            this.newOrder.userId = userData.id;
            this.orderService.insert(this.newOrder).subscribe((result: Order) => {
                setString("order", JSON.stringify(result));
                this.router.navigate(["/main/add-orders-photos"]);
            }, (error) => {
                alert(error.message);
            });
        }
    }
}
