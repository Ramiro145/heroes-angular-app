import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl:string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  public getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id:string):Observable<Hero | undefined>{

    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        //manejamos los errores que puedan surgir al escribir en el url
        //con of decimos que se retorna un observable que da undefined
        catchError( error =>  {
          return of(undefined)} )
      )

  }

  getSuggestions(query:string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero:Hero):Observable<Hero>{
    //put para atualizar todo el registro o patch para actualizar parcialmente
    if(!hero.id)throw new Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id:string):Observable<boolean>{
    //put para atualizar todo el registro o patch para actualizar parcialmente

    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map(resp => true),
      catchError(err=> of(false)),
      //aunque venga un objeto y no hay un error siempre retornamos boolean

    );

  }



}
