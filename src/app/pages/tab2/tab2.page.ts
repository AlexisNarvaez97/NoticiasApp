import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../interfaces/interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, null) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor(private noticiasServices: NoticiasService) { }

  ngOnInit() {
    this.segment.value = this.categorias[0];

    this.cargarNoticias(this.categorias[0]);
  }


  cambioCategoria(event) {

    console.log(event.detail.value);

    const categoriaSelect = event.detail.value;

    this.noticias = [];

    this.cargarNoticias(categoriaSelect);

  }

  cargarNoticias(categoria: string, event?) {

    this.noticiasServices.getTopHeadlinesCategories(categoria)
      .subscribe(resp => {
        console.log(resp);
        this.noticias.push(...resp.articles);

        if (event) {
          event.target.complete();
        }

      });

  }

  loadData( event ) {

    this.cargarNoticias(this.segment.value, event);

  }

}
