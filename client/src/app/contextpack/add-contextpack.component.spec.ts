import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { AddContextpackComponent } from './add-contextpack.component';
import { ContextpackService } from '../contextpack.service';

describe('AddContextpackComponent', () => {
  let addContextpackComponent: AddContextpackComponent;
  let addContextPackForm: AddContextpackComponent;
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
});
