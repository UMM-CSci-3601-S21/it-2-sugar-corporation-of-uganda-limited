import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContextpackCardComponent } from './contextpack-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ContextpackService } from './contextpack.service';
import { ActivatedRoute } from '@angular/router';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { ContextPack, WordList, Words } from './contextpack';

describe('ContextpackCardComponent', () => {
  let component: ContextpackCardComponent;
  let fixture: ComponentFixture<ContextpackCardComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  let component2: ContextpackCardComponent;
  let fixture2: ComponentFixture<ContextpackCardComponent>;
  let wordList: WordList;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule
      ],
      declarations: [ ContextpackCardComponent ],
      providers: [
        {provide: ContextpackService, useValue: new MockContextPackService() },
        {provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  //PurpleTigers Tests
  beforeEach(() => {
    fixture = TestBed.createComponent(ContextpackCardComponent);
    fixture2 = TestBed.createComponent(ContextpackCardComponent);


    component = fixture.componentInstance;
    component2 = fixture2.componentInstance;

    const noun: Words = {
      word: 'you',
      forms: ['you', 'yoyo', 'yos', 'yoted']
    };
    const adjective: Words = {
      word: 'green',
      forms: ['green', 'greener']
    };
    const verb: Words = {
      word: 'ran',
      forms: ['ran', 'running']
    };
    const misc: Words = {
      word: 'langerhans',
      forms: ['langerhans', 'langerhan']
    };
    const testNouns: Words[] = [noun,noun];
    const testVerbs: Words[] = [verb,verb];
    const testAdjectives: Words[] = [adjective,adjective];
    const testMisc: Words[] = [misc,misc];
    const testWordList: WordList[] = [{
      name: 'howdy',
      enabled: true,
      nouns: testNouns,
      verbs: testVerbs,
      adjectives: testAdjectives,
      misc: testMisc
    }];
    const testWordListBig: WordList[] = [{
      name: 'howdy',
      enabled: true,
      nouns: testNouns,
      verbs: testVerbs,
      adjectives: testAdjectives,
      misc: testMisc
    },
  {
      name: 'partner',
      enabled: true,
      nouns: testNouns,
      verbs: testVerbs,
      adjectives: testAdjectives,
      misc: testMisc
  }];

  wordList = {

  };

    component.contextPack = {
      _id: 'pat_id',
      enabled: true,
      name: 'happy',
      wordLists: testWordList
    };
    component2.contextPack = {
      _id: 'mat_id',
      enabled: true,
      name: 'Joy',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should list the nouns, verbs, adjectives and misc words when displayWordLists() is called', () => {
  //   expect(component.displayWordLists(component.contextPack.n)
  //   expect(component.displayWordLists(component.contextPack.wordLists[0])).toContain('you, yoyo, yos, yoted');
  //   expect(component.displayWordLists(component.contextPack.wordLists[0])).toContain('green, greener');
  //   expect(component.displayWordLists(component.contextPack.wordLists[0])).toContain('ran, running');
  //   expect(component.displayWordLists(component.contextPack.wordLists[0])).toContain('langerhans, langerhan');
  //   expect(component.displayWordLists(component.contextPack.wordLists[0])).not.toContain('barbie');
  // });

  // it('should return the nouns displayAllNouns() is called', () => {
  //   expect(component.displayAllWords(component.contextPack, 'nouns')).toContain('you, yoyo, yos, yoted');
  // });
  // it('should return the verbs when displayAllVerbs() is called', () => {
  //   expect(component.displayAllWords(component.contextPack, 'verbs')).toContain('ran, running');
  // });
  // it('should return the adjectives when displayAllAdjectives() is called', () => {
  //   expect(component.displayAllWords(component.contextPack, 'adjectives')).toContain('green, greener');
  // });
  // it('should return the misc words when displayAllMisc() is called', () => {
  //   expect(component.displayAllWords(component.contextPack, 'misc')).toContain('langerhans, langerhan');
  // });


  // it('should have displayNouns,ver,adjective,misc return null if undefined', () => {
  //   expect(component.displayWords(wordList, 'nouns')).toBeNull();
  //   expect(component.displayWords(wordList, 'verbs')).toBeNull();
  //   expect(component.displayWords(wordList, 'adjectives')).toBeNull();
  //   expect(component.displayWords(wordList, 'misc')).toBeNull();
  // });

  // it('should have displayNouns,ver,adjective,misc return null if undefined', () => {
  //   expect(component2.displayAllWords(component2.contextPack, 'nouns')).toBeNull();
  //   expect(component2.displayAllWords(component2.contextPack, 'verbs')).toBeNull();
  //   expect(component2.displayAllWords(component2.contextPack, 'adjectives')).toBeNull();
  //   expect(component2.displayAllWords(component2.contextPack, 'misc')).toBeNull();
  // });
});
