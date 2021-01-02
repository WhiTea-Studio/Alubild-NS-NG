import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Order } from "../../_models/order";

@Component({
    selector: "ns-order-creating",
    templateUrl: "./order-creating.component.html",
    styleUrls: ["./order-creating.component.scss"],
    moduleId: module.id,
})
export class OrderCreatingComponent implements OnInit {
    orderForm: FormGroup;
    newOrder: Order;
    phonePattern = '^06[0-9](([0-9]{7})|([0-9]{6}))$';
    pattern = new RegExp(this.phonePattern);
    isTapped = false;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
      this.createOrderForm();
    }

    createOrderForm(){
      this.orderForm = this.fb.group({
        clientsName: ["", Validators.required],
        clientsSurname: ["", Validators.required],
        clientsAdress: ["", Validators.required],
        clientsPhoneNumber: ["", {validators: [Validators.pattern(this.phonePattern)], updateOn: "blur"}],
        clientsEmail: ["", {validators: [Validators.email], updateOn: "blur"}],
        service: [false, Validators.required],
        note: [""],
        orderItems: this.fb.array([], this.validateSubjectsArray)
      });
    }

    validateSubjectsArray(arr: FormArray){
      return arr.length <= 0 ? {'invalid-length': true} : null;
    }


    addTypologyTap(){
      this.isTapped = !this.isTapped;
    }
}
