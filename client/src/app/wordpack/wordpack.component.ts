import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ContextpackService } from '../contextpack.service';
import { ContextPack } from '../contextpack/contextpack';
// This is essentially just a context pack profile.
@Component({
  selector: 'app-wordpack-profile',
  templateUrl: './wordpack.component.html',
  styleUrls: ['./wordpack.component.scss']
})
export class WordPackComponent implements OnInit, OnDestroy {

  wordPack: ContextPack;
  id: string;
  getWordPackSub: Subscription;

  constructor(private route: ActivatedRoute, private contextPackService: ContextpackService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getWordPackSub) {
        this.getWordPackSub.unsubscribe();
      }
      this.getWordPackSub = this.contextPackService.getContextPackById(this.id).subscribe(wordPack => this.wordPack = wordPack);
    });
  }

  ngOnDestroy(): void {
    if(this.getWordPackSub) {
      this.getWordPackSub.unsubscribe();
    }
  }

}
