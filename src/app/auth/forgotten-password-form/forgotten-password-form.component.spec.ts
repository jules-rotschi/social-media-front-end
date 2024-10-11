import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenPasswordFormComponent } from './forgotten-password-form.component';

describe('ForgottenPasswordFormComponent', () => {
  let component: ForgottenPasswordFormComponent;
  let fixture: ComponentFixture<ForgottenPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgottenPasswordFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgottenPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
