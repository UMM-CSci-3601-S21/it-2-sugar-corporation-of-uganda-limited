import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContextpackService } from '../app/contextpack.service';
import { ContextPack } from '../app/contextpack/contextpack';
import { WordPack } from '../app/wordpack/wordpack';
import { Words } from '../app/words/words';

/**
 * A "mock" version of the `ContextpackService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockContextPackService extends ContextpackService {
  public noun: Words = {
    word: 'you',
    forms: ['you', 'yos']
  };
  public adjective: Words = {
    word: 'green',
    forms: ['green', 'greener']
  };
  public verb: Words = {
    word: 'ran',
    forms: ['ran', 'running']
  };
  public misc: Words = {
    word: 'langerhans',
    forms: ['langerhans']
  };

  public testNouns: Words[] = [this.noun];
  public testVerbs: Words[] = [this.verb];
  public testAdjectives: Words[] = [this.adjective];
  public testMisc: Words[] = [this.misc];
  public testWordPacks: WordPack[] =[
    {
      name: 'happy',
      enabled: false,
      nouns: this.testNouns,
      verbs: this.testVerbs,
      adjectives: this.testAdjectives,
      misc: this.testMisc
    }
  ];

  public testContextPacks: ContextPack[] =
    [
      {
        _id: 'chris_id',
        name: 'fun',
        icon: 'http://placehold.it/32x32',
        enabled: true,
        wordPacks: this.testWordPacks
      },
      {
        _id: 'pat_id',
        name: 'sun',
        icon: 'http://placehold.it/32x32',
        enabled: true,
        wordPacks: this.testWordPacks
      },
      {
        _id: 'jamie_id',
        name: 'happy',
        icon: 'http://placehold.it/32x32',
        enabled: true,
        wordPacks: this.testWordPacks
      }
  ];

  constructor() {
    super(null);
  }

  getContextPacks(): Observable<ContextPack[]> {
    return of(this.testContextPacks);
  }

  getTodoById(id: string): Observable<ContextPack> {
    // If the specified ID is for the first test user,
    // return that user, otherwise return `null` so
    // we can test illegal user requests.
    if (id === this.testContextPacks[0]._id) {
      return of(this.testContextPacks[0]);
    } else {
      return of(null);
    }
  }


}
