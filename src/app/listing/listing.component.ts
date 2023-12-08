import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../listing.service';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit{
  listing: any;

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getListingDetails();
  }
  getListingDetails(): void {

    const snapshot = this.route.snapshot;
    if (snapshot) {
    const id = this.route.snapshot.paramMap.get('id'); // Get the ID from the route parameter
    

    if(id){
      const numericId: number = parseInt(id, 10); // Convert the string 'id' to a number
      this.listingService.getListingById(numericId)
      .subscribe(listing => this.listing = listing); 
    }
   
    }
  }
}
