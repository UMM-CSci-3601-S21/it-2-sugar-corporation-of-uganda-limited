import { Component, OnInit } from '@angular/core';
import { ContextPack } from './contextpack';
import { ContextpackService } from '../contextpack.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-contextpack-list',
  templateUrl: './contextpack-list.component.html',
  styleUrls: ['./contextpack-list.component.scss']
})
export class ContextpackListComponent implements OnInit {
  public serverFilteredContextPacks: ContextPack[];
  public filteredPacks: ContextPack[];

  public contextPackName: string;
  getContextPacksSub: Subscription;

  constructor(private contextPackService: ContextpackService) { }

  getContextPacksFromServer() {
    this.unsub();
    this.getContextPacksSub = this.contextPackService.getContextPacks({
      name: this.contextPackName
    })
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
