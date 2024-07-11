import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOfferDetailsComponent } from './contract-offer-details.component';

describe('ContractOfferDetailsComponent', () => {
  let component: ContractOfferDetailsComponent;
  let fixture: ComponentFixture<ContractOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractOfferDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
