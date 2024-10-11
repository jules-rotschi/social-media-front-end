import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEmailSentComponent } from './reset-password-email-sent.component';

describe('ResetPasswordEmailSentComponent', () => {
  let component: ResetPasswordEmailSentComponent;
  let fixture: ComponentFixture<ResetPasswordEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordEmailSentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
