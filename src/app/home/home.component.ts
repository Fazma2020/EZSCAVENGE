import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideUpDown', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void <=> *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit{
  listings: any[] = [];
  filteredListings: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  carBrandFilter: string = '';
  yearFilter: string = '';
  partTypeFilter: string = '';
  selectedCarBrand: string = '';
  selectedYear: string = '';
  selectedPartType: string = '';
  isOpen: boolean = false;
  @ViewChild('chatBox') chatBox!: ElementRef;
  userInput: string = '';

   carBrands:string[] = [
    'Mustang', 'Cougar', 'T-Bird', 'Ford Bronco', 'Ford Truck',
    'Camaro', 'Chevelle', 'FireBird', 'Chevy Truck', 'GTO',
    'Mopar', 'BMW', 'Mercedes-Benz', 'Audi', 'Other'
  ];

  years: number[] = Array.from({ length: 24 }, (_, index) => 2000 + index);

  partTypes: string[] = [
    'Engine',
    'Transmission',
    'Brakes',
    'Suspension',
    'Exhaust System',
    'Wheels & Tires',
    'Accessories',
    'Air/Fuel',
    'Body/Exterior',
    // Add more part types as needed
  ];
  constructor(private listingService: ListingService, private router:Router) {}

  ngOnInit(): void {
    this.getListings();

    console.log("hello",this.listings);

  }

  getListings(): void {
    this.listingService.getAllListings().subscribe((listings) => {
      this.listings = listings;
      this.filteredListings = listings;
    });
  }


  onSearch(): void {
    this.loading = true;
    setTimeout(() => {
      if (this.searchTerm.trim() === '') {
        this.filteredListings = this.applyFiltersToAllListings();
      } else {
        this.filteredListings = this.listings.filter(
          (listing) =>
            listing.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            listing.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        
      }
      this.loading = false;
    }, 1000); 
  }
  navigateToListing(listingId: number) {
    this.router.navigate(['/listing', listingId]);
  }
  
  applyFiltersToAllListings(): any[] {
    return this.listings.filter((listing) =>
      (!this.selectedCarBrand || 
      listing.brand?.toLowerCase().includes(this.selectedCarBrand.toLowerCase())) &&
      (!this.selectedYear || 
      listing.year?.toString().includes(this.selectedYear)) &&
      (!this.selectedPartType || 
      listing.partType?.toLowerCase().includes(this.selectedPartType.toLowerCase()))
    );
  }
  
  applyFilters(): void {
    this.loading = true;
    setTimeout(() => {
      this.filteredListings = this.applyFiltersToAllListings();
      this.loading = false;
    }, 1000); 
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chat-window');

    if (this.isOpen && chatWindow) {
      chatWindow.style.display = 'block';
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    } else {
      if (chatWindow) {
        chatWindow.style.display = 'none';
      }
    }
  }

  sendMessage() {
    this.isOpen = !this.isOpen;
  }

  scrollToBottom() {
    if (this.chatBox && this.chatBox.nativeElement) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }
  }

  clearFilters(): void {
    this.selectedCarBrand = '';
    this.selectedYear = '';
    this.selectedPartType = '';
    this.searchTerm = '';
    this.onSearch(); // Perform a search to update the listings
  }
  
  
  

  



}
