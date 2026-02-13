import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerCard } from './trigger-card';

describe('TriggerCard', () => {
  let component: TriggerCard;
  let fixture: ComponentFixture<TriggerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
