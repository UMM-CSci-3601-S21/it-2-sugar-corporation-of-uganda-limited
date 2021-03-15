import { Component, Input, OnInit } from '@angular/core';
import { ContextPack } from './contextpack';

@Component({
  selector: 'app-contextpack-card',
  templateUrl: './contextpack-card.component.html',
  styleUrls: ['./contextpack-card.component.scss']
})
export class ContextPackCardComponent implements OnInit {

  @Input() contextPack: ContextPack;
  @Input() simple?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
