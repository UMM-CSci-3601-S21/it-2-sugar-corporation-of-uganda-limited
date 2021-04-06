import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { AddWordlistsComponent } from './add-wordlists.component';
import { ContextpackService } from '../contextpack/contextpack.service';
import { ValidationService } from '../contextpack/validation.service';

describe('AddWordListComponent', () => {
  let addWordListComponent: AddWordlistsComponent;
  let addWordListForm: FormGroup;
  let fixture: ComponentFixture<AddWordlistsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ AddWordlistsComponent ],
      providers: [ValidationService, { provide: ContextpackService, useValue: new MockContextPackService() }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordlistsComponent);
    addWordListComponent = fixture.componentInstance;
    addWordListComponent.ngOnInit();
    fixture.detectChanges();
    addWordListForm = addWordListComponent.addWordListForm;
    expect(addWordListForm).toBeDefined();
    expect(addWordListForm.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(addWordListComponent).toBeTruthy();
    expect(addWordListForm).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(addWordListForm.valid).toBeFalsy();
  });

  describe('The name field', () => {
    let nameControl: AbstractControl;

    beforeEach(() => {
      nameControl = addWordListComponent.addWordListForm.controls.name;
    });

    it('should not allow empty names', () => {
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
    });

    it('should be fine with "fun"', () => {
      nameControl.setValue('fun');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should allow digits in the name', () => {
      nameControl.setValue('Bad2Th3B0ne');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should not allow one character names', () => {
      nameControl.setValue('a');
      expect(nameControl.valid).toBeFalsy();
    });

    it('should not allow over fifty character names', () => {
      nameControl.setValue('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      expect(nameControl.valid).toBeFalsy();
    });
  });

  describe('Add word pack', () => {
    it('should add a word pack', () => {
      let formValue = addWordListComponent.addWordListForm.value;
      expect(formValue.wordPacks.length).toEqual(1);
      addWordListComponent.addWordPack();
      formValue = addWordListComponent.addWordListForm.value;
      expect(formValue.wordPacks.length).toEqual(2);
    });
  });

  describe('Add nouns', () => {
    it('should add an array of nouns', () =>{
      addWordListComponent.addWordPack();
      addWordListComponent.addPosArray(0, 'nouns');
      let control = ((addWordListComponent.addWordListForm.value.wordPacks as Array<any>)[0]);
      console.log(control.nouns);
      expect(control.nouns.length).toEqual(1);
      addWordListComponent.addPosArray(0, 'nouns');
      control = ((addWordListComponent.addWordListForm.value.wordPacks as Array<any>)[0]);
      expect(control.nouns.length).toEqual(2);
    });
  });

  describe('Add verbs', () =>{
    it('should add an array of verbs', () =>{
      addWordListComponent.addWordPack();
      addWordListComponent.addPosArray(0, 'verbs');
      let control = ((addWordListComponent.addWordListForm.value.wordPacks as Array<any>)[0]);
      expect(control.verbs.length).toEqual(1);
      addWordListComponent.addPosArray(0, 'verbs');
      control = ((addWordListComponent.addWordListForm.value.wordPacks as Array<any>)[0]);
      expect(control.verbs.length).toEqual(2);
    });
  });

  describe('Add forms', () =>{
    it('should add a form to the forms array', () =>{
      addWordListComponent.addWordPack();
      addWordListComponent.addPosArray(0, 'verbs');
      addWordListComponent.addForms(0, 0, 'verbs');
      const control = ((addWordListComponent.addWordListForm.value.wordPacks as Array<any>)[0]);
      expect(control.verbs[0].forms.length).toEqual(2);
    });
  });

  describe('Test form submission', () =>{
    it('form should validate', () =>{
      expect(addWordListComponent.addWordListForm.valid).toBeFalsy();
      ((addWordListComponent.addWordListForm).get('name').setValue('no'));
      ((addWordListComponent.addWordListForm).get('enabled').setValue('true'));
      ((addWordListComponent.addWordListForm.controls.wordPacks as FormArray).at(0).get('name').setValue('yes'));
      ((addWordListComponent.addWordListForm.controls.wordPacks as FormArray).at(0).get('enabled').setValue('True'));
      expect(addWordListComponent.addWordListForm.valid).toBeTruthy();
    });
  });
});
