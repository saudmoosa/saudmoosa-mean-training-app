import { Component, OnInit } from '@angular/core';
import { trigger,animate,style,transition,keyframes,stagger,query } from '@angular/animations';
import techList from './../../techlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('listAnimation',[
       transition("* => *",[
        query(':enter', [
         style({transform:"translateX(600px)", opacity: 0}),
         stagger(1000, [
          animate(
            '1s',keyframes([
              style({transform:"translateX(600px)", opacity: 0}),
              style({transform:"translateX(0px)", opacity: 1})
      
               ])
          ) 
           ])] , { optional: true } )
          ])
        ]) 
  ]
})
export class HomeComponent implements OnInit {

  
  techItems = [];

  constructor() { }

  ngOnInit() { 
    this.showItems();
  }

  showItems() {  
    this.techItems = techList;
  }

}
