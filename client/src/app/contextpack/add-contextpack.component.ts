import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContextPack } from './contextpack';
import { ContextpackService } from '../contextpack.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WordPack } from './contextpack';

@Component({
  selector: 'app-add-contextpack',
  templateUrl: './add-contextpack.component.html',
  styleUrls: ['./add-contextpack.component.scss']
})
export class AddContextpackComponent implements OnInit {

  addContextPackForm: FormGroup;
  shown = false;
  wordPack: WordPack;
  contextpack: ContextPack;

  formErrors = {
    wordpacks: this.wordPacksErrors()
  };

  addContextPackValidationMessages = {
    wordPacks: {
      name: [
        {type: 'required', message: 'Name is required'}
      ],
      enabled: {required: 'Must be true or false'},
      nouns: { word: {}, forms: {}},
      verbs: { word: {}, forms: {}},
      adjectives: { word: {}, forms: {}},
      misc: { word: {}, forms: {}}
    }
  };

  constructor(private fb: FormBuilder, private contextPackService: ContextpackService,
    private snackBar: MatSnackBar, private router: Router) { }

    createForms() {

      //add context pack form validations
      this.addContextPackForm = this.fb.group({

        name: new FormControl('', Validators.compose([
          Validators.required,
        ])),

        enabled: new FormControl('', Validators.compose([
          Validators.required,
        ])),

        wordPacks: new FormControl('', Validators.compose([
          Validators.minLength(1)
        ]))
      });

    }

  ngOnInit(): void {
    this.addContextPackForm
  }

  wordPacksErrors() {
    return [{
      name: [' ', [Validators.required]],
      enabled: [' ', [Validators.required]],
      nouns: this.wordsErrors(),
      verbs: this.wordsErrors(),
      adjectives: this.wordsErrors(),
      misc: this.wordsErrors()
    }];
  };

  wordsErrors() {
    return [{
      word: [' ', [Validators.required]],
      forms: this.fb.array([this.fb.control('')])
    }];
  };

  submitForm() {
    console.log(this.addContextPackForm.value);
    const { name, icon, enabled, wordPacks } = this.addContextPackForm.value;

    this.contextPackService.addContextPack({
      _id: undefined,
      name,
      icon,
      enabled: enabled !== undefined ? status === 'enabled' : undefined,
      wordPacks
    }).subscribe(newID => {
      this.snackBar.open('Added context pack ' + this.addContextPackForm.value.name, null, {
        duration: 2000,
      });
      this.router.navigate(['/contextpacks/', newID]);
    }, err => {
      this.snackBar.open('Failed to add the context pack', 'OK', {
        duration: 5000,
      });
      console.log(err);
    });
  }

}
