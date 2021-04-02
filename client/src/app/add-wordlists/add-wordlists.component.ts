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

  addWordListForm: FormGroup;
  contextPack: ContextPack;
  wordPack: WordPack;
  word: Words;

  addWLValidation = {
    wordPacks: {
      name: [
        {type: 'required', message: 'Name is required'},
        {type: 'minlength', message: 'Name must be at least 2 characters long'},
        {type: 'maxlength', message: 'Name cannot be longer than 50 characters'},
      ],
      enabled: [
        {type: 'required', message: 'Enabled/Disabled is required'},
        {type: 'pattern', message: 'Must be either enabled or disabled'},
      ],
    }
  };

  constructor(private contextPackService: ContextpackService, private fb: FormBuilder,
     private snackBar: MatSnackBar, private router: Router) { }

    // createForms() {
    //   this.addWordListForm = this.fb.group({
    //         name: new FormControl('', Validators.compose([
    //           Validators.required,
    //           Validators.minLength(2),
    //           Validators.maxLength(50)
    //         ])),
    //         enabled: new FormControl('', Validators.compose([
    //           Validators.required,
    //           Validators.pattern('^(false|False|True|true)$')
    //         ])),
    //         nouns: this.fb.array([]),
    //         adjectives: this.fb.array([]),
    //         verbs: this.fb.array([]),
    //         misc: this.fb.array([]),
    //     });
    // }

    createForms() {
      this.addWordListForm = this.fb.group({
        wordPacks: this.fb.array([])
      });
      // this.addWordListForm.valueChanges.subscribe(data => this.validateForm());
    }

    ngOnInit(): void{
      this.createForms();
      this.initWordPack();
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
      const control = this.addWordListForm.controls.wordPacks as FormArray;
      control.push(this.initWordPack());
    }

    addPosArray(ix: number, pos: string){
      const control = (this.addWordListForm.controls.wordPacks as FormArray).at(ix).get(`${pos}`) as FormArray;
      control.push(this.initWords());
    }


    submitForm() {
      this.contextPackService.addWordPack(this.addWordListForm.value).subscribe(newID => {
        this.snackBar.open('Added Word List', null, { duration: 2000});
        this.router.navigate(['/contextpacks/', newID]);
      }, err => {
        this.snackBar.open('Failed to add the todo', 'OK', { duration: 5000});
      });
    }
}
