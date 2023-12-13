import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  template: `
    <div  *ngIf="shouldShowErrors()">
      <div *ngFor="let error of getErrorMessages()">
        {{ error }}
      </div>
    </div>
  `,
  styles: [
    `
      div {
        color: red;
      }
    `,
  ],
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl;
  @Input() controlName: string;

  shouldShowErrors(): boolean {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessages(): string[] {
    const errors: string[] = [];
    if (this.control && this.shouldShowErrors()) {
      for (const key of Object.keys(this.control.errors)) 
      {
        switch (key) {
          case 'required':
            errors.push(`${this.controlName} is required.`);
            break;
          case 'minlength':
            errors.push(`${this.controlName} must be at least ${this.control.errors[key].requiredLength} characters.`);
            break;
          case 'maxlength':
            errors.push(`${this.controlName} cannot exceed ${this.control.errors[key].requiredLength} characters.`);
            break;
          case 'email':
            errors.push(`${this.controlName} must be a valid email.`);
            break;
          // Add more cases for other validators as needed
          default:
            errors.push(`${this.controlName} has an invalid value.`);
            break;
        }
      }
    }
    return errors;
  }
}
