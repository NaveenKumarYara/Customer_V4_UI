import { FormControl } from '@angular/forms';
export class FormsValidationService {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            'required': 'Required',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximum length is ${validatorValue.requiredLength} you have exceeded`,
            'url': 'Invalid',
            'Phno': 'Invalid Phone Number',
            'zip': 'Invalid Zip Number',
            'pattern': `confirm password not matched with password`,
            'email': 'Invalid E-Mail',
            'phno': 'Invalid Mobile Number ',
            'passwordmatch': 'Password Dosent match',
            'password': 'Invalid Password'
        };

        return config[validatorName];
    }

    static url(control) {

        const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
        if (control.value === '' || control.value === null) {
            return null;
        } else if (control.value.match(pattern)) {
            return null;
        } else {
            return { 'url': true };
        }
    }
    static phone(control) {

        const pattern = /^[0-9]{10}$/;
        if (control.value === '' || control.value === null) {
            return null;
        } else if (control.value.match(pattern)) {
            return null;
        } else {
            return { 'phno': true };
        }
    }

    static zipcode(control) {

        const pattern = /^[0-9]{5}$/;
        if (control.value === '' || control.value === null) {
            return null;
        } else if (control.value.match(pattern)) {
            return null;
        } else {
            return { 'zip': true };
        }
    }
    static password(control) {

        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/;
        if (control.value === '' || control.value === null) {
            return null;
        } else if (control.value.match(pattern)) {
            return null;
        } else {
            return { 'password': 1 };
        }
    }

    static UAENumber(control) {
        // UAE Phone Number
        const pattern = '^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$';
        if (control.value.match(pattern)) {
            return null;
        } else if (control.value === '') {
            return null;
        } else {
            return { 'Phno': true };
        }
    }

    static matchOtherValidator(otherControlName: string) {

        let thisControl: FormControl;
        let otherControl: FormControl;

        return function matchOtherValidate(control: FormControl) {

            if (!control.parent) {
                return null;
            }

            // Initializing the validator.
            if (!thisControl) {
                thisControl = control;
                otherControl = control.parent.get(otherControlName) as FormControl;
                if (!otherControl) {
                    throw new Error('matchOtherValidator(): other control is not found in parent group');
                }
                otherControl.valueChanges.subscribe(() => {
                    thisControl.updateValueAndValidity();
                });
            }

            if (!otherControl) {
                return null;
            }

            if (otherControl.value !== thisControl.value) {
                return {
                    'passwordmatch': true
                };
            }

            return null;

        };

    }
}
