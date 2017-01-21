import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{Camera, TextToSpeech} from 'ionic-native';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello From Camera Page');
  }

  photos: Photo[] = [new Photo('https://d13yacurqjgara.cloudfront.net/users/37530/screenshots/3221768/dancing_milk.gif', 7), new Photo('https://d13yacurqjgara.cloudfront.net/users/729829/screenshots/3177853/galshir-babushka.gif', 8)]
  labels: Label[] = [
    new Label(1,'labels'),
    new Label(2,'texts'),
    new Label(3,'faces'),
    new Label(4,'landmarks'),
    new Label(5,'logos')
    ]
    languages: Language[]=[
      new Language('English'),
      new Language('French'),
      new Language('German'),
      new Language('Polish'),
      new Language('Spanish')
      ]

takePhoto(){
  Camera.getPicture({
    destinationType: Camera.DestinationType.DATA_URL,
    targetHeight: 500,
    targetWidth: 500,
    correctOrientation: true,
    saveToPhotoAlbum: true
  }).then((imageData)=>{
  this.photos.push(new Photo("data:image/jpeg;base64," + imageData, 0));
},(err)=>{
  console.log(err);
  });
}
removePhoto(photo){
  this.photos.splice(this.photos.indexOf(photo),1)
  TextToSpeech.speak("Picture is removed");
}

likePhoto(photo){
  photo.likes++;
}

getGalleryPicture(){
  Camera.getPicture({
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
    targetHeight: 500,
    targetWidth: 500,
    correctOrientation: true    
  }).then((imageData)=>{
  this.photos.push(new Photo("data:image/jpeg;base64," + imageData, 0));  
},
(err)=>{
  console.log(err);
  });
}
}

class Photo{
constructor(src: string, likes: number){
    this.src = src;
    this.likes = likes;
}

    src: string;
    likes: number;
}

class Label{
  id: number;
  name: string;
  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}

class Language{
  language: string;

  constructor(language: string){
    this.language = language;
  }
}
