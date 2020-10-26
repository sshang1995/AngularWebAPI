import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuotesComponent } from './add-edit-quotes.component';

describe('AddEditQuotesComponent', () => {
  let component: AddEditQuotesComponent;
  let fixture: ComponentFixture<AddEditQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
