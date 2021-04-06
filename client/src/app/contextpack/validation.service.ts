import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
}
