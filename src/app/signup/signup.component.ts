import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignUpForm = { name: '', email: '', password: '', confirmPassword: '', role:'restricted', adminkey:''};
  showText = false;
  constructor(private formbuilder:FormBuilder){

  }
 
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  register() {
  }

  confirm(field: string) {
    if (field === 'confirmPassword') {
      this.showText = !this.showText;
    }
  }
  


}
