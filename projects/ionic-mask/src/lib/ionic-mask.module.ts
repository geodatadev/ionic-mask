import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicMaskDirective } from './directives/ionic-mask.directive';



@NgModule({
    declarations: [
        IonicMaskDirective

    ],
    imports: [
        IonicModule
    ],
    exports: [
        IonicMaskDirective
    ]
})
export class IonicMaskModule { }
