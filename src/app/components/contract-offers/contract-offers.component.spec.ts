import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOffersComponent } from './contract-offers.component';

describe('ContractOffersComponent', () => {
  let component: ContractOffersComponent;
  let fixture: ComponentFixture<ContractOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractOffersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
