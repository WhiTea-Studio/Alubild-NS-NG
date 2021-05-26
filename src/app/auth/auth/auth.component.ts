import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { prompt, TextField } from '@nativescript/core';
import { capitalizationType, inputType, PromptOptions, PromptResult } from '@nativescript/core/ui/dialogs/dialogs-common';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  moduleId: module.id
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    @ViewChild('passwordEl') passwordEl: ElementRef<TextField>;
    @ViewChild('usernameEl') usernameEl: ElementRef<TextField>;
    user = {};
    isLogin = true;
    isLoading = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // this.authService.autoLogin().subscribe(success =>{
    //     this.router.navigate(['/main/tabs']);
    //     console.log(success);
    //     return;
    // });
      this.form = new FormGroup({
          username: new FormControl('user', { updateOn: 'blur', validators: [Validators.required, Validators.minLength(1)]}),
          password: new FormControl('1234', { updateOn: 'blur', validators: [Validators.required, Validators.minLength(4)]})
      });
  }

  onDone(){
    this.usernameEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSubmit(){
    this.usernameEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();

    if(!this.form.valid)
        return;

    this.user = Object.assign({}, this.form.value);

    this.isLoading = true;

    this.authService.login(this.user).subscribe(res=>{
        // console.log(res);
        this.isLoading = false;
        this.router.navigate(['/main/tabs']);
    }, err =>{
        console.log(err);
        this.isLoading = false;
    });
    this.reset();
  }

  reset(){
    this.usernameEl.nativeElement.focus();
    this.form.reset();
  }

  passwordForgotten(){
    // console.log('Izmena lozinke');
    let options: PromptOptions = {
        title: "Izmena lozinke",
        defaultText: null,
        message: "Unesite vaše korisničko ime ili email",
        okButtonText: "Potvrdi",
        cancelButtonText: "Odustani",
        cancelable: true,
        inputType: inputType.email,
        capitalizationType: capitalizationType.none
    };
    prompt(options).then((result: PromptResult) => {
      console.log("Hello, " + result.text);
      });
  }


  switch(){
    this.isLogin = !this.isLogin;
  }

}
