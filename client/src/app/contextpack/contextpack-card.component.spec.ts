import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContextPackCardComponent } from './contextpack-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('ContextpackCardComponent', () => {
  let component: ContextPackCardComponent;
  let fixture: ComponentFixture<ContextPackCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule
      ],
      declarations: [ ContextPackCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextPackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
