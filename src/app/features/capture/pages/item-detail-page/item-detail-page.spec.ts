import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailPage } from './item-detail-page';

describe('ItemDetailPage', () => {
  let component: ItemDetailPage;
  let fixture: ComponentFixture<ItemDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
