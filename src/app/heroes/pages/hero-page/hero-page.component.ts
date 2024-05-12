import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
//peticion http tan pronto el componente este listo, se utiliza oninit
export class HeroPageComponent implements OnInit{

  //cuando el componente se construye en un punto es nulo
  //por eso se indica que es opcional
  public hero?:Hero;

  constructor(
    private heroService:HeroesService,
    //para leer el url
    private activatedRoute:ActivatedRoute,
    //sacar a la persona de la zona de url
    private router:Router,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      //desestructuramos de los params el id del url
      delay(500),
      switchMap(({id}) => this.heroService.getHeroById(id)),
    ).subscribe(hero=>{
        if(!hero) return this.router.navigate([ '/heroes/list' ]);

        this.hero = hero;
        return;
    })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }
}
