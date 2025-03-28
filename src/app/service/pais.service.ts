import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  // Definimos tipos directamente aquí
  private _countries = signal<{
    name: { common: string; official: string };
    flags: { png: string; svg: string };
    capital: string[];
    population: number;
    region: string;
    // ... otros campos que uses
  }[]>([]);

  private _filtered = signal<any[]>([]);
  private _searchTerm = signal<string>('');

  countries = computed(() => this._filtered().length ? this._filtered() : this._countries());
  hasResults = computed(() => this._countries().length > 0);

  constructor(private http: HttpClient) {
    this.loadCountries();
  }

  private loadCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
      tap(data => {
        this._countries.set(data);
        this._filtered.set(data);
      })
    ).subscribe();
  }

  filterCountries(term: string) {
    this._searchTerm.set(term);
    this._filtered.set(
      term ? this._countries().filter(c => 
        c.name.common.toLowerCase().includes(term.toLowerCase())
      ) : this._countries()
    );
  }
}