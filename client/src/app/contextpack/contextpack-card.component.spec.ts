import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextpackCardComponent } from './contextpack-card.component';

describe('ContextpackCardComponent', () => {
  let component: ContextpackCardComponent;
  let fixture: ComponentFixture<ContextpackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextpackCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextpackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
