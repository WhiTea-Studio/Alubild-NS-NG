import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderItem } from '../../_models/order-item';
import { Order } from '../../_models/order';
import { OrderService } from '../../_services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getString, setString } from '@nativescript/core/application-settings';
import { OrderItemHelpService } from '../_services/order-item-help.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
    orderForm: FormGroup;
    public order: Order;
    editedOrder: Order;
    phonePattern = "^06[0-9](([0-9]{7})|([0-9]{6}))$";
    pattern = new RegExp(this.phonePattern);
    isTapped = false;
    isService = false;
    orderItemList: OrderItem[] = [];
    helpItemsList: OrderItem[] = [];
    minDate = new Date();
    toEdit = false;
    itemToEdit: OrderItem;

    constructor(private fb: FormBuilder, private orderService: OrderService,private route: ActivatedRoute,
        private router: Router, private helpService: OrderItemHelpService) {}

    ngOnInit() {
        this.route.data.subscribe( data => {
            this.order = data['order'];
          });
        this.createOrderForm();
        this.orderItemList = this.order.orderItems;
    }

    createOrderForm() {
        this.orderForm = this.fb.group({
            clientsName: [this.order.clientsName, {validators: Validators.required, updateOn: "blur"}],
            clientsSurname: [this.order.clientsSurname, {validators: Validators.required, updateOn: "blur"}],
            clientsAdress: [this.order.clientsAdress, {validators: Validators.required, updateOn: "blur"}],
            clientsPhoneNumber: [
                this.order.clientsPhoneNumber,
                {
                    validators: [Validators.pattern(this.phonePattern)],
                    updateOn: "blur",
                },
            ],
            clientsEmail: [
                this.order.clientsEmail,
                { validators: [Validators.email], updateOn: "blur" },
            ],
            service: [this.order.service, Validators.required],
            note: [this.order.note],
            schedulingDate: [this.order.schedulingDate],
            orderItems: this.fb.array(this.order.orderItems),
        }, {validators: [this.validateSubjectsArrayNotService]});
        this.orderItemList = this.order.orderItems;
        this.isService = this.order.service;
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

    closeEditOrderItem(orderItem?: OrderItem) {
        console.log(orderItem);

        this.toEdit = false;
        if (orderItem != null && orderItem != undefined) {
            if(orderItem.update === false){
                alert("Nije selektovan update");
                return;
            }

            const i = this.orderItemList.findIndex(x => x.id == orderItem.id);
            this.orderItemList[i].note = orderItem.note;
            this.orderItemList[i].height = orderItem.height;
            this.orderItemList[i].width = orderItem.width;
            this.orderItemList[i].quantity = orderItem.quantity;
            this.orderItemList[i].update = true;

            (<FormArray>this.orderForm.controls.orderItems).setValue(this.orderItemList);
            alert("Zamenio");
            // this.orderItemList.forEach(item => {
            //     if(item.id == orderItem.id){
            //         alert("Zamenio");
            //         item.note = orderItem.note;
            //         item.height = orderItem.height;
            //         item.width = orderItem.width;
            //         item.quantity = orderItem.quantity;
            //         item.update = true;
            //         return;
            //     }
            // });
        }
        else {alert("Nije usao u if")};
    }

    deleteItem(item: OrderItem){
        this.orderItemList = this.orderItemList.filter(x => x !== item);
        item.delete = true;
        this.helpItemsList.push(item);
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

    back(){
        this.router.navigate(['/main/tabs']);
    }

    editOrder(){
        if(this.orderForm.valid){
            this.editedOrder = Object.assign({}, this.orderForm.value);
            if(this.isService){
                this.order.orderItems.forEach(item => {
                    item.delete = true;
                    this.helpItemsList.push(item);
                });
                this.editedOrder.orderItems = [];
            }

            this.editedOrder.orderItems = this.orderItemList;
            this.editedOrder.dateCreated = this.order.dateCreated;
            this.editedOrder.id = this.order.id;
            const userData = JSON.parse(getString('user'));

            this.editedOrder.userId = userData.id;

            //check if something is edited
            if( !this.editedOrder.service && this.editedOrder.orderItems.length === 0){
                alert("Morate uneti makar jednu stavku naloga.");
                return;
            }
            if(!this.changes() && !this.changedItems()){
                alert("Morate izmeniti podatke o nalogu.");
                return;
            }

            this.helpItemsList.forEach(item => {
                this.editedOrder.orderItems.push(item);
            });
            this.editedOrder.schedulingDate = new Date(this.editedOrder.schedulingDate);
            console.log(this.editedOrder);
            this.orderService.edit(this.editedOrder).subscribe((result: Order) => {
                alert("Uspesno izmenjen nalog!");
            }, (error) => {
                alert(error.message);
            });
        this.router.navigate(['/main/tabs']);
        }
    }

    changes(){
        if(this.editedOrder.clientsName !== this.order.clientsName || this.editedOrder.clientsSurname !== this.order.clientsSurname ||
            this.editedOrder.clientsPhoneNumber !== this.order.clientsPhoneNumber || this.editedOrder.note !== this.order.note || this.editedOrder.service !== this.order.service ||
            this.editedOrder.clientsAdress !== this.order.clientsAdress || this.editedOrder.clientsEmail !== this.order.clientsEmail ||
            this.editedOrder.schedulingDate !== this.order.schedulingDate)
            return true;
        return false;
    }

    changedItems(){
        if(this.isService !== this.order.service) return true;
        if(this.order.orderItems.length !== this.editedOrder.orderItems.length) return true;
        this.editedOrder.orderItems.forEach(item => {
            if(item?.insert === true || item?.update === true || item?.delete === true) return true;
        });
        return false;
    }

    editItem(item: OrderItem){
        this.toEdit = true;
        // this.itemToEdit = this.orderItemList.filter(x => x.id == item.id)[0];
        this.helpService.setOrderItem(this.orderItemList.filter(x => x.id == item.id)[0]);
    }

}
