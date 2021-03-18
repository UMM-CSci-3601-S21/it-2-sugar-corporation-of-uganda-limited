import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContextPack } from './contextpack';
import { ContextpackService } from './contextpack.service';

@Component({
  selector: 'app-add-contextpack',
  templateUrl: './add-contextpack.component.html',
  styleUrls: ['./add-contextpack.component.scss']
})
export class AddContextpackComponent implements OnInit {

  addContextPackForm: FormGroup;

  contextpack: ContextPack;

  addContextPackValidationMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      {type: 'existingName', message: 'Name has already been taken'}
    ],
    enabled: [
      { type: 'required', message: 'Enabled is required' },
      { type: 'pattern', message:'Must be enabled or disabled' }
    ],
  };

  constructor(private fb: FormBuilder, private contextPackService: ContextpackService,
    private snackBar: MatSnackBar, private router: Router) { }

    createForms() {

      //add context pack form validations
      this.addContextPackForm = this.fb.group({

        name: new FormControl('', Validators.compose([
          Validators.required,
          (fc) => {
            if (fc.value.toLowerCase() === 'abc123' || fc.value.toLowerCase() === '123abc') {
              return ({existingName: true});
            } else {
              return null;
            }
          },
        ])),

        enabled: new FormControl('disabled', Validators.compose([
          Validators.required,
          Validators.pattern('^(true|false)$'),
        ])),
      });

    }

  ngOnInit() {
    this.createForms();
  }

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
