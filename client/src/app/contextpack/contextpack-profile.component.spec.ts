import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextpackProfileComponent } from './contextpack-profile.component';

describe('ContextpackProfileComponent', () => {
  let component: ContextpackProfileComponent;
  let fixture: ComponentFixture<ContextpackProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextpackProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextpackProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
