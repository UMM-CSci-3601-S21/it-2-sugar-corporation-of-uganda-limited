import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContextPack, WordPack, Words } from '../contextpack/contextpack';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContextpackService } from '../contextpack/contextpack.service';

@Component({
  selector: 'app-add-wordlists',
  templateUrl: './add-wordlists.component.html',
  styleUrls: ['./add-wordlists.component.scss']
})
export class AddWordlistsComponent implements OnInit {

  addWordPackForm: FormGroup;
  shown = false;
  wordPack: WordPack;
  contextpack: ContextPack;
  enabled = true;
  cpId: string;

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
      this.addWordPackForm = this.fb.group({
        wordPacks: this.fb.array([])
      });
      this.addWordPackForm.valueChanges.subscribe(data => this.validateForm());
    }

  ngOnInit(): void {
    this.createForms();
  }

  initWordPack() {
    return this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      enabled: new FormControl('true', Validators.compose([
        Validators.required,
        Validators.pattern('^(true|false)$'),
      ])),
      nouns: this.fb.array([]),
      adjectives: this.fb.array([]),
      verbs: this.fb.array([]),
      misc: this.fb.array([])

    });
  }

  initWords() {
    return this.fb.group({
      word: [''],
      forms: this.fb.array([
         this.fb.control('')
      ])
    });
  }

  addWordPack() {
    const control = this.addWordPackForm.controls.wordPacks as FormArray;
    control.push(this.initWordPack());
  }

  addPosArray(ix: number, pos: string){
    const control = (this.addWordPackForm.controls.wordPacks as FormArray).at(ix).get(`${pos}`) as FormArray;
    control.push(this.initWords());
  }

  addForms(ix: number, iy: number, pos: string) {
    const control = ((this.addWordPackForm.controls.wordPacks as FormArray).at(ix).get(`${pos}`) as FormArray)
    .at(iy).get('forms') as FormArray;
    control.push(this.fb.control(''));
  }

  setWord(ix: number, iy: number, pos: string){
    const control = ((this.addWordPackForm.controls.wordPacks as FormArray).at(ix).get(`${pos}`) as FormArray)
    .at(iy).get('forms') as FormArray;

    const formAdd = ((this.addWordPackForm.controls.wordPacks as FormArray).at(ix).get(`${pos}`) as FormArray).at(iy).get('word');
    console.log('didn\'t go through');
    if(control.getRawValue()[0] !== formAdd.value  ){
      control.insert(0,formAdd);
      console.log(ix,iy);
    }
  }

  validateForm(){
    this.validateWordPacks();
  }

  validateWordPacks() {
    const wordPacks = this.addWordPackForm.controls.wordPacks as FormArray;
    this.formErrors.wordpacks = [];
    for (let index = 1; index <= wordPacks.length; index++) {
      this.formErrors.wordpacks.push({
        name: [' ', [Validators.required]],
        enabled: [' ', [Validators.required]],
        nouns: [{
          word: '',
          forms: this.fb.array([
            this.fb.control('')
          ]),
        }]
      });
    }
  }

  wordPacksErrors() {
    return [{
      name: [' ', [Validators.required]],
      enabled: [' ', [Validators.required]],
      nouns: this.wordsErrors(),
    }];
  };

  wordsErrors() {
    return [{
      word: '',
      forms: this.fb.array([this.fb.control('')])
    }];
  };

  submitForm() {
    this.contextPackService.addWordPack(this.addWordPackForm.value, this.router.url.search).subscribe(newID => {
      this.snackBar.open('Added Pack ' + this.addWordPackForm.value.name, null, {
        duration: 2000,
      });
      this.router.navigate(['/contextpacks/', newID]);
    }, err => {
      this.snackBar.open(
        'Failed to add the word pack (check that all required fields are filled in)', 'OK', {
        duration: 5000,
      });
    });
  }
}
