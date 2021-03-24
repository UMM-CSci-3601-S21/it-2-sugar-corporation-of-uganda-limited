import { Component, Input, OnInit } from '@angular/core';
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
        wordLists += 'Enabled: ' + contextpack.enabled + '\n';
        wordLists += 'Nouns: \n' + this.displayWords(contextpack, 'nouns');
        wordLists += 'Verbs: \n' + this.displayWords(contextpack, 'verbs');
        wordLists += 'Adjectives: \n' + this.displayWords(contextpack, 'adjectives');
        wordLists += 'Misc: \n' + this.displayWords(contextpack, 'misc');
    return wordLists;
  }

  displayWords(wordList: WordList, pos: WordRole){
    let words: string[];
    let str: string;
    if (wordList[`${pos}`] === undefined){
      words = null;
      str = null;
    }
    else{
      let i: number;
      words = [];
        for (i = 0; i < wordList[`${pos}`].length; i++) {
          words = words.concat(wordList[`${pos}`][i].forms) ;
        }
        str = words.join(', ');
        str += '\n';
    }

    return str;
  }

  displayAllWords(contextpack: ContextPack, pos: WordRole){
      let words: WordList[];
      let m: number;
      let str: string;
      if(contextpack.wordLists === undefined || contextpack.wordLists[0][`${pos}`][0] === undefined){
        words = null;
        str = null;
      }
      else{
        words = [];
      for (m = 0; m < contextpack.wordLists.length; m++){
          words = words.concat(contextpack.wordLists[m]);
        }

      let z: number;
      str = '\n';
      for (z = 0; z < words.length; z++){
        str += this.displayWords(words[z], pos);
        str = str.slice(0, -1);
        if (z < words.length-1){
          str += ', ';
          }
        }
      }
      return str;
  }
}
