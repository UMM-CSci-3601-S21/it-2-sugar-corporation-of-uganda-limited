import { Component, Input, OnInit } from '@angular/core';
import { reduce } from 'rxjs/operators';
import { ContextPack, WordList, WordRole, Words } from './contextpack';
import { ContextpackService } from './contextpack.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contextpack-card',
  templateUrl: './contextpack-card.component.html',
  styleUrls: ['./contextpack-card.component.scss']
})
export class ContextpackCardComponent implements OnInit {

  @Input() contextPack: ContextPack;
  @Input() simple?: boolean;

  constructor(private contextPackService: ContextpackService, private router: Router, private snackBar: MatSnackBar) { }

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

  displayAllWords(contextpack: ContextPack, pos: WordRole){
      let words: WordPack[];
      let m: number;
      let str: string;
      if(contextpack.wordPacks === undefined || contextpack.wordPacks[0][`${pos}`][0] === undefined){
        words = null;
        str = null;
      }
      else{
        words = [];
      for (m = 0; m < contextpack.wordPacks.length; m++){
          words = words.concat(contextpack.wordPacks[m]);
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

  deletePack(id: string) {
    this.contextPackService.deleteContextPack(id).subscribe(deletedId => {
      this.snackBar.open('Deleted Context Pack', null, {duration: 2000});
      this.router.navigate(['/contextpacks']);
    }, err => {
      this.snackBar.open(
        'Failed to delete the context pack', 'OK', {duration: 5000}
      );
    });
  }
}
