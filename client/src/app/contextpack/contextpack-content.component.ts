import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextpackService } from '../contextpack.service';
import { ContextPack, WordPack, Words } from './contextpack';

//Shows the wordPacks inside context pack
@Component({
  selector: 'app-contextpack-content',
  templateUrl: '../wordpack/wordpack.component.html',
  styleUrls: ['../wordpack/wordpack.component.scss']
})
export class ContextpackContentComponent implements OnInit, OnDestroy {

  contextPack: ContextPack;
  wordPacks: WordPack[];
  wordPack: WordPack;
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
      this.wordPacks = this.contextPack.wordPacks;
    });
  }

  ngOnDestroy(): void {
    if(this.getContextPackSub) {
      this.getContextPackSub.unsubscribe();
    }
  }

  displayWordPacks(wordPacks: WordPack[]): string[] {
    let wordPack = null;
    const toString = [];

    for(wordPack in wordPacks){
      if(wordPack){
      toString.push(this.displayWords(wordPack.nouns));
      toString.push(this.displayWords(wordPack.verbs));
      toString.push(this.displayWords(wordPack.adjectives));
      toString.push(this.displayWords(wordPack.misc));
    }}
    return toString;
  }

  displayWords(words: Words[]): string[] {
    let word = null;
    let form = null;
    const toString = [];

    for(word in words){
      if(word){
        toString.push(word.word);
        for(form in word.forms){
          if(word){
            toString.push(form);
          }}}}
    return toString;
  }
}
