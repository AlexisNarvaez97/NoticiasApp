import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../interfaces/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData( event ) {

    console.log(event.target.complete);

    this.cargarNoticias(event);

  }

  cargarNoticias( event? ) {

    this.noticiasService.getTopHeadlines().subscribe(resp =>{
      console.log(resp);

      if ( resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      // this.noticias = resp.articles;
      this.noticias.push(...resp.articles);

      if ( event ) {
        event.target.complete();
      }

    });

  }



}
