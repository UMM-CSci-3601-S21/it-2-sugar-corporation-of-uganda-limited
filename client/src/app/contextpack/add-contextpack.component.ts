import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, NgControlStatus, Validators } from '@angular/forms';
import { ContextPack } from './contextpack';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WordList } from './contextpack';
import { ContextpackService } from './contextpack.service';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-add-contextpack',
  templateUrl: './add-contextpack.component.html',
  styleUrls: ['./add-contextpack.component.scss']
})
export class AddContextpackComponent implements OnInit {

  // Most of this is from the Purple Tigers https://github.com/UMM-CSci-3601-S21/it-1-purple-tigers
  addContextPackForm: FormGroup;
  shown = false;
  wordList: WordList;
  contextpack: ContextPack;
  enabled = true;
  optionValue ;

  addContextPackValidationMessages = {
    name: [
      {type: 'required', message: 'A Name is required'},
      {type: 'minLength', message: 'Contextpack name must be at least 2 characters'},
      {type: 'maxLength', message: 'Contextpack name cannot be longer than 50 characters'}
    ],
    wordLists: {
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

  constructor(private fb: FormBuilder, private contextPackService: ContextpackService, private validationService: ValidationService,
    private snackBar: MatSnackBar, private router: Router) { }

    createForms() {
      this.addContextPackForm = this.fb.group({
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])),
        enabled: new FormControl('true', Validators.compose([
          Validators.required,
          Validators.pattern('^(true|false)'),
        ])),
        icon: '',
        wordLists: this.fb.array([])
      });
      this.addContextPackForm.valueChanges.subscribe(data => this.validateForm());
    }


  ngOnInit(): void {
    this.createForms();
  }

  initializeWordList() {
    return this.validationService.initWordList(this.fb);
  }

  initializeWords() {
    return this.validationService.initWords(this.fb);
  }

  addWordList() {
    const control = this.addContextPackForm.controls.wordLists as FormArray;
    control.push(this.initializeWordList());
  }

  addPosArray(ix: number, pos: string){
    const control = (this.addContextPackForm.controls.wordLists as FormArray).at(ix).get(`${pos}`) as FormArray;
    control.push(this.initializeWords());
  }

  addForms(ix: number, iy: number, pos: string) {
    const control = ((this.addContextPackForm.controls.wordLists as FormArray).at(ix).get(`${pos}`) as FormArray)
    .at(iy).get('forms') as FormArray;
    control.push(this.fb.control(''));
  }

  setWord(ix: number, iy: number, pos: string){
    const control = ((this.addContextPackForm.controls.wordLists as FormArray).at(ix).get(`${pos}`) as FormArray)
    .at(iy).get('forms') as FormArray;
  }

  validateForm(){
    this.validationService.validateWordLists(this.addContextPackForm, this.fb);
  }

  submitForm() {
    this.contextPackService.addContextPack(this.addContextPackForm.value).subscribe(newID => {
      this.snackBar.open('Added Pack ' + this.addContextPackForm.value.name, null, {
        duration: 2000,
      });
      this.router.navigate(['/contextpacks/', newID]);
    }, err => {
      this.snackBar.open(
        'Failed to add the context pack (check that all fields are filled in and the icon filename ends with .png)', 'OK', {
        duration: 5000,
      });
    });
  }
}
