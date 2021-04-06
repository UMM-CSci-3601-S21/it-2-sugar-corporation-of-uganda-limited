import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ValidationService {

  constructor() {}

  validateWordPacks(addForm: FormGroup, fb: FormBuilder) {
    const wordPacks = addForm.controls.wordPacks as FormArray;
    this.getFormErrors(fb).wordPacks = [];
    for (let index = 1; index <= wordPacks.length; index++) {
      this.getFormErrors(fb).wordPacks.push({
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
    return { wordPacks: this.wordPacksErrors(fb) };
  }

  wordPacksErrors(fb: FormBuilder) {
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
