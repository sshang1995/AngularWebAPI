import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuotesComponent } from './show-quotes.component';

describe('ShowQuotesComponent', () => {
  let component: ShowQuotesComponent;
  let fixture: ComponentFixture<ShowQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
