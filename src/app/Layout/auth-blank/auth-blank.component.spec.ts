import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBlankComponent } from './auth-blank.component';

describe('AuthBlankComponent', () => {
  let component: AuthBlankComponent;
  let fixture: ComponentFixture<AuthBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthBlankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
