import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  imageSources: any[];
  constructor() { }

  ngOnInit() {
    this.imageSources = [
      '../../../assets/images/gato.png',
      '../../../assets/images/tigre.jpg',
      '../../../assets/images/leon.jpg',
      '../../../assets/images/lobo.jpg'
    ];
  }

}