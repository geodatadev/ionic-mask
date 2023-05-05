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
            prefixReal: [15415.65],
            prefixDolar: [null],
            sufix: [null],
            sufixFixed: [null],
            separators: [null],
            decimal: [null],
        })
    }

    ngOnInit() {
    }

    submit(){

        console.log(this.form.value);

    }

}
