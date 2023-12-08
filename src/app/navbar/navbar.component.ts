import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  loggedIn:any;
  constructor(private listing:ListingService){

    this.loggedIn = this.listing.isLoggedIn;


  }
  ngOnInit(): void {
    
  }

}
