import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

@ViewChild(ToastContainerDirective, { static: true })
toastContainer: ToastContainerDirective;

heroes: Hero[] = [];

  heroForm: Hero;
  id: number;
  name: string; 

  constructor(private heroService: HeroService, private router: Router, private toastr: ToastrService) { 

  }

  ngOnInit(): void {
    this.getHeroes();
    this.heroForm = new Hero(); 
    this.name = this.heroService.name; 
    this.toastr.overlayContainer = this.toastContainer;
  }

  onSubmit() {
    this.heroService.addHero(this.heroForm).subscribe(data => {
      this.getHeroes();
      this.showSuccess();
      this.router.navigate(['heroes']);
    })
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  } 
  
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
    this.showDeleteSuccess();
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

 
  showSuccess() {
    this.toastr.success('Le chevalier a bien été créé ! ');
  }
  showDeleteSuccess() {
    this.toastr.error('Le chevalier a bien été supprimé');
  }
}
