import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSearchbar, IonList, IonItem, IonAvatar, IonLabel, IonButton 
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  templateUrl: 'home.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonList, IonItem, IonAvatar, IonLabel, IonButton
  ]
})
export class HomePage {
  private countryService = inject(CountryService);
  private router = inject(Router);
  
  countries = this.countryService.countries;
  searchTerm = '';

  onSearch(event: any) {
    this.countryService.filterCountries(event.detail.value);
  }

  navigateToDetail(name: string) {
    this.router.navigate(['/detail', name]);
  }
}