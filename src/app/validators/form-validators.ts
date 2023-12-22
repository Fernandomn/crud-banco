import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(
  control: AbstractControl
): ValidationErrors | null {
  const cpf = control.value;

  if (!cpf) {
    return null;
  }

  const cleanedCpf = cpf.replace(/\D/g, '');

  if (cleanedCpf.length !== 11) {
    return { invalidCpf: true };
  }

  if (/^(\d)\1+$/.test(cleanedCpf)) {
    return { invalidCpf: true };
  }

  let sum = 0;
  let weight = 10;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCpf.charAt(i), 10) * weight--;
  }

  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanedCpf.charAt(9), 10)) {
    return { invalidCpf: true };
  }

  sum = 0;
  weight = 11;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCpf.charAt(i), 10) * weight--;
  }

  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanedCpf.charAt(10), 10)) {
    return { invalidCpf: true };
  }

  return null;
}

export function ageValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const birthDate = new Date(control.value);
  const today = new Date();

  const age = today.getFullYear() - birthDate.getFullYear();

  if (
    age < 18 ||
    (age === 18 && today.getMonth() + 1 < birthDate.getMonth() + 1) ||
    (age === 18 &&
      today.getMonth() + 1 === birthDate.getMonth() + 1 &&
      today.getDate() < birthDate.getDate()) ||
    age >= 60
  ) {
    return { invalidAge: true };
  }

  return null;
}

export function todayOrPastDateValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const selectedDate = new Date(control.value);
  const today = new Date();

  if (selectedDate > today) {
    return { futureDate: true };
  }

  return null;
}
