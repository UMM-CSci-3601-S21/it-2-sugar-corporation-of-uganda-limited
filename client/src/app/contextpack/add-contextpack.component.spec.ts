import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { AddContextpackComponent } from './add-contextpack.component';
import { ContextpackService } from './contextpack.service';
import { componentFactoryName } from '@angular/compiler';

describe('AddContextpackComponent', () => {
  let addContextpackComponent: AddContextpackComponent;
  let addContextPackForm: FormGroup;
  let fixture: ComponentFixture<AddContextpackComponent>;

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
        RouterTestingModule
      ],
      declarations: [ AddContextpackComponent ],
      providers: [{ provide: ContextpackService, useValue: new MockContextPackService() }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContextpackComponent);
    addContextpackComponent = fixture.componentInstance;
    addContextpackComponent.ngOnInit();
    fixture.detectChanges();
    addContextPackForm = addContextpackComponent.addContextPackForm;
    expect(addContextPackForm).toBeDefined();
    expect(addContextPackForm.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(addContextpackComponent).toBeTruthy();
    expect(addContextPackForm).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(addContextPackForm.valid).toBeFalsy();
  });

  describe('The name field', () => {
    let nameControl: AbstractControl;

    beforeEach(() => {
      nameControl = addContextpackComponent.addContextPackForm.controls.name;
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

    it('should fail if we provide an "existing" name', () => {
      // We're assuming that "abc123" and "123abc" already
      // exist so we disallow them.
      nameControl.setValue('abc123');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.hasError('existingName')).toBeTruthy();

      nameControl.setValue('123abc');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.hasError('existingName')).toBeTruthy();
    });
  });

  describe('The enabled field', () =>{
    let enabledControl: AbstractControl;
    beforeEach(() => {
      enabledControl = addContextpackComponent.addContextPackForm.controls.enabled;
    });
    it('should only allow boolean values', () => {
      enabledControl.setValue('559546sd');
      expect(enabledControl.valid).toBeFalsy();
      enabledControl.setValue('true');
      expect(enabledControl.valid).toBeTruthy();
      enabledControl.setValue('True');
      expect(enabledControl.valid).toBeFalsy();
      enabledControl.setValue('false');
      expect(enabledControl.valid).toBeTruthy();
    });
  });
});
