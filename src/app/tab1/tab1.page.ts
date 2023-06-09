import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder

    ) { 
        this.form = this.fb.group({
            prefixReal: [null],
            prefixDolar: [null],
            sufix: [null],
            sufixFixed: [null],
            separators: [null],
            decimal_1: [null],
            decimal_2: [null],
        })
    }

    ngOnInit() {
        // setTimeout(() => {
        
        //     this.form.get('prefixReal')?.setValue(123.52);
        //     this.form.get('decimal_1')?.setValue(123.52);
        //     this.form.get('decimal_2')?.setValue(123.52);
        // }, 1800);
    }

    submit(){

        console.log(this.form.value);


    }

}
