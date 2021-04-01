import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextpackService } from './contextpack.service';
import { ContextPack, WordPack, Words } from './contextpack';

//Shows the wordPacks inside context pack
@Component({
  selector: 'app-contextpack-content',
  templateUrl: './contextpack-content.component.html',
  styleUrls: ['./contextpack-content.component.scss']
})
export class ContextpackContentComponent implements OnInit, OnDestroy {

  contextPack: ContextPack;
  wordPacks: WordPack[];
  wordPack: WordPack;
  index: number;
  id: string;
  getContextPackSub: Subscription;

  constructor(private route: ActivatedRoute, private contextPackService: ContextpackService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getContextPackSub) {
        this.getContextPackSub.unsubscribe();
      }
      this.getContextPackSub = this.contextPackService.getContextPackById(this.id).subscribe(contextPack => this.contextPack = contextPack);
      if (this.contextPack) {
        this.createDownloadLink();
      }
    });
  }

  ngOnDestroy(): void {
    this.getContextPackSub.unsubscribe();
  }

  convertToJson(jsonBetter: ContextPack){
    const obj: any =
      {
      _id: {oid: jsonBetter._id},
      schema: '../schema/pack.schema.json',
      name: jsonBetter.name,
      icon: jsonBetter.icon,
      enabled: jsonBetter.enabled,
      wordPacks: jsonBetter.wordPacks
      };
      return JSON.stringify(obj, null, 2);
  }

  createDownloadLink() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(this.convertToJson(this.contextPack)));
    element.setAttribute('download', this.contextPack.name + '.json');
    return element;
  }

}
