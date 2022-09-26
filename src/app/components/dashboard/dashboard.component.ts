import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  id: number;
  name: string; 

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.name = this.heroService.name; 
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    //this.heroes = this.heroes.slice(1,2);
  }

}
