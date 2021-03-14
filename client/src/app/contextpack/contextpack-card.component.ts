import { Component, Input, OnInit } from '@angular/core';
import { }

@Component({
  selector: 'app-contextpack-card',
  templateUrl: './contextpack-card.component.html',
  styleUrls: ['./contextpack-card.component.scss']
})
export class ContextpackCardComponent implements OnInit {

  @Input() pack: C
  constructor() { }

  ngOnInit(): void {
  }

}
