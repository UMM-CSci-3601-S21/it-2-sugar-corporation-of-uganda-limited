import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

export class ValidationService {

  constructor() {}

  validateWordLists(addForm: FormGroup, fb: FormBuilder) {
    const wordLists = addForm.controls.wordLists as FormArray;
    this.getFormErrors(fb).wordLists = [];
    for (let index = 1; index <= wordLists.length; index++) {
      this.getFormErrors(fb).wordLists.push({
        name: [' ', [Validators.required]],
        enabled: [' ', [Validators.required]],
        nouns: [{
          word: '',
          forms: fb.array([
            fb.control('')
          ]),
        }]
      });
    }
  }

  getFormErrors(fb: FormBuilder){
    return { wordLists: this.wordListsErrors(fb) };
  }

  wordListsErrors(fb: FormBuilder) {
    return [{
      name: [' ', [Validators.required]],
      enabled: [' ', [Validators.required]],
      nouns: this.wordsErrors(fb),
    }];
  };

  wordsErrors(fb: FormBuilder) {
    return [{
      word: '',
      forms: fb.array([fb.control('')])
    }];
  };

  initWordList(fb: FormBuilder) {
    return fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])),
      enabled: new FormControl('true', Validators.compose([
        Validators.required,
        Validators.pattern('^(true|false|True|False)$'),
      ])),
      nouns: fb.array([]),
      adjectives: fb.array([]),
      verbs: fb.array([]),
      misc: fb.array([])

    });
  }

  initWords(fb: FormBuilder) {
    return fb.group({
      word: [''],
      forms: fb.array([
         fb.control('')
      ])
    });
  }
}
