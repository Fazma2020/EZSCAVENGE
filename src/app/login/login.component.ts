import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingService } from '../listing.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = { email: '', password: '' };
  ResetForm = { email: '', password: '' , confirmPassword:''};
reset=false;
  showText = false;
codeSent=false;
usercode:any;
emailcode:any;
verified=false;
resetDone=false;



constructor(private formbuilder:FormBuilder,private router: Router, private listing :ListingService){

  


}
ngOnInit(): void {
    
}
confirm(field: string) {
  if (field === 'confirmPassword') {
    this.showText = !this.showText;
  }
}
user(): boolean {
  
  
  return false;
}
login(){

  if(this.loginForm.email=="wetalk@gmail.com" && this.loginForm.password=="Yes175@"){
    this.listing.login();
   
    this.router.navigate(['/home']);
  }else{
    alert("Failed Credentials");
  }
  }
  
showPassword() {
  this.showText = !this.showText;
}

set(){
this.listing.login();
}
sendCode(){
  
  alert("If Email is Valid, a verification code will be sent to your email")
  this.codeSent=true;


}


verifyCode(){
  if(this.usercode===this.emailcode){
    alert('successful');
    this.verified=true;
  }
  else{
    alert('Invalid Verification Code');
  }

}

resetPassword(){


}

back(){
  window.location.reload();
  this.router.navigateByUrl('/login');
  
}



}


