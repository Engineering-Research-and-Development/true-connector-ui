import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedResourceDetailsComponent } from './offered-resource-details.component';

describe('OfferedResourceDetailsComponent', () => {
  let component: OfferedResourceDetailsComponent;
  let fixture: ComponentFixture<OfferedResourceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferedResourceDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferedResourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
