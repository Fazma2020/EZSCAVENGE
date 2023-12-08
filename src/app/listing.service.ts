import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  partType: string;
  carYear: string;
}
@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private listings: Listing[] = [];
  isLoggedIn: boolean = false; 

  private brands = [
    'Mustang', 'Cougar', 'T-Bird', 'Ford Bronco', 'Ford Truck',
    'Camaro', 'Chevelle', 'FireBird', 'Chevy Truck', 'GTO',
    'Mopar', 'BMW', 'Mercedes-Benz', 'Audi', 'Other'
  ];

  

  private partTypes: string[] = [
    'Engine', 'Transmission', 'Brakes', 'Suspension',
    'Exhaust System', 'Wheels & Tires', 'Accessories',
    'Air/Fuel', 'Body/Exterior'
  ];

  constructor() {
    this.generateListings();
  }

  
  private generateListings(): void {
    const numberOfListings = 20; 
  const descriptions = [
      'Premium quality part for your vehicle.',
      'Enhance your car\'s performance with this part.',
      'Durable and reliable component for your vehicle.',
      'Improve the look and feel of your car with this part.',
      'Engineered for optimal performance and longevity.',
      
    ];

    const carPart = [
      'Quarter Repair Pane. #100-2LH',
  'Transmission Gear #200-3RH',
  'Brake Drum #300-4FH',
  'Suspension Spring #400-5BH',
  'Exhaust Manifold #500-6CH',
      
    ];

    for (let i = 1; i <= numberOfListings; i++) {
      const randomBrandIndex = Math.floor(Math.random() * this.brands.length);
      const randomPartTypeIndex = Math.floor(Math.random() * this.partTypes.length);
      const randomDescriptionIndex = Math.floor(Math.random() * descriptions.length);
      const part= Math.floor(Math.random() * carPart.length);

      const listing = {
        id: i,
        title: carPart[part],
        description: descriptions[randomDescriptionIndex],
        price: Math.floor(Math.random() * 100) + 50, 
        image: 'https://d2zl5tj7gmc4tr.cloudfront.net/images/products/thumbs/100-2lh_20201231101218.jpg',
        brand: this.brands[randomBrandIndex],
        partType: this.partTypes[randomPartTypeIndex],
        carYear: `19${Math.floor(Math.random() * 10 + 90)}s` 
      };

      this.listings.push(listing);
    }
  }

  login() {
   
    this.isLoggedIn = true;
  }

  logout() {
   
    this.isLoggedIn = false;
  }

  getAllListings(): Observable<any[]> {
    return of(this.listings);
  }

  
  
  getListingById(id: number): Observable<any> {
    const listing = this.listings.find((item) => item.id === id);
    return of(listing);
  }

}