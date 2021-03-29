import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextpackService } from './contextpack.service';
import { ContextPack, WordPack, Words } from './contextpack';
import { DomSanitizer } from '@angular/platform-browser';

//Shows the wordPacks inside context pack
@Component({
  selector: 'app-contextpack-content',
  templateUrl: './contextpack-content.component.html',
  styleUrls: ['./contextpack-content.component.scss']
})
export class ContextpackContentComponent implements OnInit, OnDestroy {

  fileUrl;
  file: JSON;
  contextPack: ContextPack;
  wordPacks: WordPack[];
  wordPack: WordPack;
  index: number;
  id: string;
  getContextPackSub: Subscription;
  downloadContextPackSub: Subscription;

  constructor(private route: ActivatedRoute, private contextPackService: ContextpackService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getContextPackSub) {
        this.getContextPackSub.unsubscribe();
      }
      this.downloadContextPackSub = this.contextPackService.downloadContextPack(this.id).subscribe(file => this.file = file);
      this.getContextPackSub = this.contextPackService.getContextPackById(this.id).subscribe(contextPack => this.contextPack = contextPack);

      //Needs to bypass angular's built in sanitizer to download
      this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(new Blob([JSON.stringify(this.contextPack, null, 1)], {type: 'application/json'})));
    });
  }

  ngOnDestroy(): void {
    this.getContextPackSub.unsubscribe();
    this.downloadContextPackSub.unsubscribe();
  }
}
