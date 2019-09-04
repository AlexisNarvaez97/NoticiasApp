import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../pages/interfaces/interface';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ActionSheetController } from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';



@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  // tslint:disable-next-line:max-line-length
  constructor(private iab: InAppBrowser, public actionSheetController: ActionSheetController, private socialSharing: SocialSharing, private dataLocalService: DataLocalService) { }

  ngOnInit() { }

  abrirNoticia() {
    console.log(this.noticia.url);

    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrar;

    if( this.enFavoritos ) {
      guardarBorrar = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      }
    } else {
      guardarBorrar = {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked');
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            )
          }
        },
        guardarBorrar,
        {
          text: 'Cancelar',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

}