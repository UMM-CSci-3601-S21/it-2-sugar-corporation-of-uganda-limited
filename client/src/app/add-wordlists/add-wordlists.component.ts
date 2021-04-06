import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContextPack, WordList, Words } from '../contextpack/contextpack';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContextpackService } from '../contextpack/contextpack.service';
import { stringify } from '@angular/compiler/src/util';
import { ValidationService } from '../contextpack/validation.service';

@Component({
  selector: 'app-add-wordlists',
  templateUrl: './add-wordlists.component.html',
  styleUrls: ['./add-wordlists.component.scss']
})
export class AddWordlistsComponent implements OnInit {

  addWordListForm: FormGroup;
  shown = false;
  wordList: WordList;
  contextpack: ContextPack;
  enabled = true;
  id: string;
  regEx: RegExp;

  addContextPackValidationMessages = {
    wordLists: {
      name: [
        {type: 'required', message: 'Name is required'},
        {type: 'minLength', message: 'Name must be at least 2 characters'},
        {type: 'maxLength', message: 'Name cannot be more than fifty characters'}
      ],
      enabled: {required: 'Must be true or false'},
      nouns: { word: {}, forms: {}},
      verbs: { word: {}, forms: {}},
      adjectives: { word: {}, forms: {}},
      misc: { word: {}, forms: {}}
    }
  };

  constructor(private fb: FormBuilder, private contextPackService: ContextpackService, private validationService: ValidationService,
    private snackBar: MatSnackBar, private router: Router) { }

    createForms() {
      this.addWordListForm = this.fb.group({
        name: new FormControl('test', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])),
        enabled: new FormControl('', Validators.compose([
        ])),
        icon: '',
        wordLists: this.fb.array([])
      });
      this.addWordListForm.valueChanges.subscribe(data => this.validateForm());
    }

  ngOnInit(): void {
    this.createForms();
    this.addWordList();
  }

  initWordList() {
    return this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])),
      enabled: new FormControl('true', Validators.compose([
        Validators.required,
        Validators.pattern('^(true|false|True|False)$'),
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

  addWordList() {
    const control = this.addWordListForm.controls.wordLists as FormArray;
    control.push(this.initWordList());
  }

  addPosArray(ix: number, pos: string){
    const control = (this.addWordListForm.controls.wordLists as FormArray).at(ix).get(`${pos}`) as FormArray;
    control.push(this.initWords());
  }

  addForms(ix: number, iy: number, pos: string) {
    const control = ((this.addWordListForm.controls.wordLists as FormArray).at(ix).get(`${pos}`) as FormArray)
    .at(iy).get('forms') as FormArray;
    control.push(this.fb.control(''));
  }

  setWord(ix: number, iy: number, pos: string){
    const control = ((this.addWordListForm.controls.wordLists as FormArray).at(ix).get(`${pos}`) as FormArray)
    .at(iy).get('forms') as FormArray;
  }

  validateForm(){
    this.validationService.validateWordLists(this.addWordListForm, this.fb);
  }

  getIdFromUrl() {
    console.log(this.router.url);
    this.id = this.router.url.split('/')[2];
    return this.id;
  };

  submitForm() {
    this.contextPackService.addWordLists(this.addWordListForm.value, this.getIdFromUrl()).subscribe(newID => {
      this.snackBar.open('Added List(s)', null, {
        duration: 2000,
      });
      this.router.navigate(['/contextpacks/', this.id]);
    }, err => {
      this.snackBar.open(
        'Failed to add the context pack (check that all required fields are filled in', 'OK', {
        duration: 5000,
      });
    });
  }
}
