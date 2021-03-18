import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ContextpackService } from './contextpack.service';

import { MockContextPackService } from '../../testing/contextpack.service.mock';
import { ContextpackListComponent } from './contextpack-list.component';


const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
  HttpClientTestingModule
];

describe('ContextpackListComponent', () => {
  let contextPackList: ContextpackListComponent;
  let fixture: ComponentFixture<ContextpackListComponent>;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [ COMMON_IMPORTS ],
      declarations: [ ContextpackListComponent ],
      providers: [{ provide: ContextpackService, useClass: MockContextPackService}]
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ContextpackListComponent);
      contextPackList = fixture.componentInstance;
      fixture.detectChanges();
      contextPackList.getContextPacksFromServer();
    });
  }));

  it('should create', () => {
    expect(contextPackList).toBeTruthy();
  });
});
