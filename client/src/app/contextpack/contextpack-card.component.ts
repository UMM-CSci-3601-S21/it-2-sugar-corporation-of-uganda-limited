import { Component, Input, OnInit } from '@angular/core';
import { reduce } from 'rxjs/operators';
import { ContextPack, WordList, WordRole, Words } from './contextpack';

@Component({
  selector: 'app-contextpack-card',
  templateUrl: './contextpack-card.component.html',
  styleUrls: ['./contextpack-card.component.scss']
})
export class ContextpackCardComponent implements OnInit {

  @Input() contextPack: ContextPack;
  @Input() simple?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  //All functions below from the minds of Team-PurpleTigers
  displayWordLists(contextpack: WordList){
    let  wordLists: string;
      wordLists = '';
        wordLists += 'Name: ' + contextpack.name + '\n';
        wordLists += ' Enabled: ' + contextpack.enabled + '\n';
    return wordLists;
  }

  displayWord(wordList: WordList, pos: WordRole, n: number) {
    let str: string;
    let word: string;
    if (wordList[`${pos}`] === undefined){
      word = null;
      str = null;
    }
    else{
      const comma = /,/g;
          word = wordList[`${pos}`][n].forms;
          str = word.toString().replace(comma, ', ');
    }

    return str;
  }
}
