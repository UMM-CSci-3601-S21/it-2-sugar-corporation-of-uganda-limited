import { Component, OnInit } from '@angular/core';
import { ContextPack } from './contextpack';
import { ContextpackService } from '../contextpack.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Input } from '@angular/core';
import { WordPack } from '../wordpack/wordpack';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-contextpack-list',
  templateUrl: './contextpack-list.component.html',
  styleUrls: ['./contextpack-list.component.scss']
})
export class ContextpackListComponent implements OnInit {

  @Input() contextPack: ContextPack;
  @Input() simple?: boolean = false;

  public serverFilteredContextPacks: ContextPack[];
  public filteredPacks: ContextPack[];
  public wordPacks: WordPack[];

  public contextPackName: string;
  public viewType: 'card' | 'list' = 'list';
  getContextPacksSub: Subscription;

  constructor(private contextPackService: ContextpackService) { }

  getContextPacksFromServer() {
    this.unsub();
    this.contextPackService.getContextPacks()
    .subscribe(returnedPacks => {
      this.serverFilteredContextPacks = returnedPacks;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    this.filteredPacks = this.contextPackService.filterContextPacks(
      this.serverFilteredContextPacks
    );
  }

  ngOnInit(): void {
    this.getContextPacksFromServer();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getContextPacksSub) {
      this.getContextPacksSub.unsubscribe();
    }
  }

}
