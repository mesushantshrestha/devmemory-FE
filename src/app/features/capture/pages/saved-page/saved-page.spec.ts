import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPage } from './saved-page';

describe('SavedPage', () => {
  let component: SavedPage;
  let fixture: ComponentFixture<SavedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
