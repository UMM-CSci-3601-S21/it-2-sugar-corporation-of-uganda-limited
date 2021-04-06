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
