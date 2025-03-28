import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../services/country.service';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSearchbar, IonList, IonItem, IonAvatar, IonLabel 
} from '@ionic/angular/standalone';



@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonList, IonItem, IonAvatar, IonLabel
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  countryService = inject(CountryService);
  searchTerm = '';

  updateSearch() {
    this.countryService.updateSearch(this.searchTerm);
  }

  constructor(private http: HttpClient) {}
}