import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Hero } from 'src/app/interfaces/hero';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

heroes: Hero[] = [];

  heroForm: Hero;
  id: number;
  name: string; 

  constructor(private heroService: HeroService, private router: Router) { 

  }

  ngOnInit(): void {
    this.getHeroes();
    this.heroForm = new Hero(); 
    this.name = this.heroService.name; 
  }

  onSubmit() {
    this.heroService.addHero(this.heroForm).subscribe(data => {
      this.getHeroes();
      this.router.navigate(['heroes']);
    })
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  } 


  

/*   add(name: string): void {
    name = name.trim();
    if(!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  } */

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
