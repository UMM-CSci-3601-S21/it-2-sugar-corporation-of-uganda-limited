import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpackComponent } from './wordpack.component';

describe('WordpackComponent', () => {
  let component: WordpackComponent;
  let fixture: ComponentFixture<WordpackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordpackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
