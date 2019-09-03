import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../pages/interfaces/interface';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ActionSheetController } from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';



@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private iab: InAppBrowser, public actionSheetController: ActionSheetController, private socialSharing: SocialSharing) { }

  ngOnInit() { }

  abrirNoticia() {
    console.log(this.noticia.url);

    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

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
        {
          text: 'Favorite',
          icon: 'heart',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
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
