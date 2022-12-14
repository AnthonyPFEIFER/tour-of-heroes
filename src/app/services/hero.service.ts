import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Hero } from 'src/app/interfaces/hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:8080/heroes';
  private deleteHeroesUrl = this.heroesUrl + '/delete/';
  private createHeroesUrl = this.heroesUrl + '/create/';
  private editHeroesUrl = this.heroesUrl + '/edit/';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  id: number;
  name: string;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }




  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.createHeroesUrl, hero).pipe(
      tap(_ => this.log(`Ajout du chevalier ${this.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`Récupération des chevaliers`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const heroUrl = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(heroUrl).pipe(
      tap(_ => this.log(`Récupération du chevalier ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  
  updateHero(hero: Hero, id: number) {
    return this.http.put<Hero>(this.editHeroesUrl + id, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Mise à jour du chevalier ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }



  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>(this.deleteHeroesUrl + id, this.httpOptions).pipe(
      tap(_ => this.log(`Suppression du chevalier ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`Chevaliers comportant le terme : "${term}"`) :
        this.log(`Aucun chevalier ne comportant le terme : "${term}"`)),
     catchError(this.handleError<Hero[]>('searchHeroes', []))
   );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /*   updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  } */

  /*   addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero with id = ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  } */
}
