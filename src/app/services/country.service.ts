import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _countries = signal<any[]>([]);
  private _searchTerm = signal<string>('');

  countries = computed(() => {
    const term = this._searchTerm().toLowerCase();
    return term 
      ? this._countries().filter(c => c.name.common.toLowerCase().includes(term))
      : this._countries();
  });

  constructor(private http: HttpClient) {
    this.loadCountries();
  }

  private loadCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe({
      next: (data) => this._countries.set(data),
      error: (err) => console.error('Error loading countries:', err)
    });
  }

  updateSearch(term: string) {
    this._searchTerm.set(term);
  }

  getCountryById(id: string) {
    return this._countries().find(c => c.cca3 === id);
  }
}