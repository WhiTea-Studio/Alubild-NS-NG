import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextField } from '@nativescript/core';
import { User } from 'src/app/_models/user';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  moduleId: module.id
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    @ViewChild('passwordEl') passwordEl: ElementRef<TextField>;
    @ViewChild('usernameEl') usernameEl: ElementRef<TextField>;
    @ViewChild('nameEl') nameEl: ElementRef<TextField>;
    user: User;
    isLoading = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
        name: new FormControl('',{updateOn: 'blur', validators: [Validators.required]}),
        surname: new FormControl('',{updateOn: 'blur', validators: [Validators.required]}),
        email: new FormControl('', {updateOn: 'blur',validators: [Validators.required]}),
        phoneNumber: new FormControl('', {updateOn: 'blur',validators: [Validators.required]}),
        username: new FormControl('', {updateOn: 'blur',validators: [Validators.required]}),
        password: new FormControl('', { updateOn: 'blur', validators: [Validators.required, Validators.minLength(4)]})
    });
  }

  onSubmit(){
    this.usernameEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();

    if(!this.registerForm.valid)
        return;

    this.user = Object.assign({}, this.registerForm.value);
    this.isLoading = true;
    this.authService.register(this.user).subscribe(res=>{
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/main/tabs']);
    }, err =>{
        console.log(err);
        this.isLoading = false;
    });
    this.reset();
  }

  onDone(){
    this.usernameEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }


  reset(){
    this.nameEl.nativeElement.focus();
    this.registerForm.reset();
  }
}
