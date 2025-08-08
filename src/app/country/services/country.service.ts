import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { map, Observable, catchError, throwError, delay } from 'rxjs';

import { CountryMapper } from '../mappers/country.mapper';

import type { RestCountry } from '../interfaces/rest-countries/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';

const API_URL = `${environment.url}/${environment.version}`;

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  public searchByCapital(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`).pipe(
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      delay(500),
      catchError(() => throwError(() => new Error(`No se encontró país con la capital buscada ${query}`)))
    );
  }

  public searchByCountry(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    return this.http.get<RestCountry[]>(`${API_URL}/name/${lowerCaseQuery}`).pipe(
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      delay(500),
      catchError(() => throwError(() => new Error(`No se encontró país con la capital buscada ${query}`)))
    );
  }

}
