import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlitersComponent } from './fliters.component';

describe('FlitersComponent', () => {
  let component: FlitersComponent;
  let fixture: ComponentFixture<FlitersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlitersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
