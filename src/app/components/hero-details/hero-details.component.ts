import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { HeroService } from '../../services/hero.service';
@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  @Input() hero?: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  update(): void {
    if(this.hero) {
      this.heroService.updateHero(this.hero, this.hero.id).subscribe(() => this.goBack());
    }
  }
  goBack(): void {
    this.location.back();
/*     this.router.navigate(['/heroes']).then(() => {
      window.location.reload();
    }); */
  }
  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe();
    this.goBack();

  }
}
