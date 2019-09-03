import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaHeadlines } from '../pages/interfaces/interface';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;

const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';

  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {

    query = apiUrl + query;

    return this.http.get<T>( query, { headers } );
  }


  getTopHeadlines() {
    // tslint:disable-next-line:max-line-length
    // return this.http.get<RespuestaHeadlines>('https://newsapi.org/v2/top-headlines?country=mx&category=business&apiKey=f221cb315b1f4d568d26edc890de7b7b');

    this.headlinesPage ++;

    return this.ejecutarQuery<RespuestaHeadlines>(`/top-headlines?country=mx&page=${this.headlinesPage}`);
  }


  getTopHeadlinesCategories(categoria: string) {

    if( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaHeadlines>(`/top-headlines?country=mx&category=${categoria}&page=${this.categoriaPage}`);

    // return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=f221cb315b1f4d568d26edc890de7b7b`);

  }

}
