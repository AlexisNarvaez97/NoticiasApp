import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../pages/interfaces/interface';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;

  constructor() { }

  ngOnInit() {}

}
