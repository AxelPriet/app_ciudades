import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonBackButton, IonButtons, IonImg, IonList, IonItem, IonLabel 
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonBackButton, IonButtons, IonImg, IonList, IonItem, IonLabel
  ],
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage {
  private route = inject(ActivatedRoute);
  country = inject(CountryService).getCountryById(
    this.route.snapshot.paramMap.get('id')!
  );
}