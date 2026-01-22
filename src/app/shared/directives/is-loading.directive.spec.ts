import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IsLoadingDirective } from './is-loading.directive';

@Component({
  standalone: true,
  imports: [IsLoadingDirective],
  template: `<button [isLoading]="isLoading()">Salvar</button>`,
})
class TestComponent {
  isLoading = signal(false);
}

describe('IsLoadingDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const directive = new IsLoadingDirective();
    expect(directive).toBeTruthy();
  });

  it('should show loading spinner when isLoading is true', () => {
    component.isLoading.set(true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    const spinner = button.nativeElement.querySelector('.spinner-border');

    expect(spinner).toBeTruthy();
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should hide loading spinner when isLoading is false', () => {
    component.isLoading.set(true);
    fixture.detectChanges();

    component.isLoading.set(false);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    const spinner = button.nativeElement.querySelector('.spinner-border');

    expect(spinner).toBeFalsy();
    expect(button.nativeElement.disabled).toBe(false);
  });

  it('should restore original content when loading stops', () => {
    component.isLoading.set(true);
    fixture.detectChanges();

    component.isLoading.set(false);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain('Salvar');
  });
});
