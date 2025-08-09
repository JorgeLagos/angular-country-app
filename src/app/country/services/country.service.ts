import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';

import { CountryMapper } from '../mappers/country.mapper';

import type { RestCountry } from '../interfaces/rest-countries/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import type { Region } from '../types/region.type';

const API_URL = `${environment.url}/${environment.version}`;

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();



  public searchByCapital(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCacheCapital.has(lowerCaseQuery)) {
      return of(this.queryCacheCapital.get(lowerCaseQuery) ?? []);
    }

    // console.log(`Llegando al servidor por ${lowerCaseQuery}`);

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`).pipe(
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      tap((countries) => this.queryCacheCapital.set(lowerCaseQuery, countries)),
      delay(500),
      catchError(() => throwError(() => new Error(`No se encontró país con la capital buscada ${query}`)))
    );
  }

  public searchByCountry(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCacheCountry.has(lowerCaseQuery)) {
      return of(this.queryCacheCountry.get(lowerCaseQuery) ?? []);
    }

    // console.log(`Llegando al servidor por ${lowerCaseQuery}`);

    return this.http.get<RestCountry[]>(`${API_URL}/name/${lowerCaseQuery}`).pipe(
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      tap((countries) => this.queryCacheCountry.set(lowerCaseQuery, countries)),
      delay(500),
      catchError(() => throwError(() => new Error(`No se encontró país ${query}`)))
    );
  }

  public searchByRegion(region: Region): Observable<Country[]> {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      delay(500),
      catchError(() => throwError(() => new Error(`No se encontró país ${region}`)))
    );
  }

  public searchCountryByAlphaCode(alphaCode: string): Observable<Country | undefined> {
    return this.http.get<RestCountry[]>(`${API_URL}/alpha/${alphaCode}`).pipe(
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      map((countries) => countries.at(0)),
      delay(500),
      catchError(() => throwError(() => new Error(`No se encontró país con ese codigo ${alphaCode}`)))
    );
  }

}
