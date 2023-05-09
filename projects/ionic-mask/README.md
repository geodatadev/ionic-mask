<div align="center">
  <img src="https://www.geodata.com.br/wp-content/uploads/2019/07/Logo-Menor.png" alt="geodata-logo" width="" height=""/>
  <br>
</div>

<div align="center">
  <h1>Geodata - Agricultura de informação.</h1>
</div>

<div align="center">
  <h4>Melhorar a vida das pessoas envolvidas no agronegócio através de tecnologia e inovação.</h4>
</div>

<br>
<br>

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDk1ZWRiNDU4ZWZhYmVjNzllMzA0ZDg1MDg2YjUxZjUyNWQwY2EwMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/HmyFiUMAXT9RUAEHiq/giphy.gif" alt="example-ionic-mask" width="" height=""/>

</div>

# @ionic-mask
Um componente Ionic para utilização de máscara personalizada em inputs

<br>

## Instalação

Utilize o gerenciador de pacotes [npm](https://www.npmjs.com/) para fazer a instalação do componente

```bash
npm install ionic-mask
```
<br>

## Como usar

Importação do módulo "IonicMaskModule" na pagina que será utilizado

```typescript
import { IonicMaskModule } from 'ionic-mask';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonicMaskModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
```

## Aplicação em inputs HTML

#### Prefix

```html
<ion-item>
    <ion-label position="floating">
        Prefix (R$)
    </ion-label>
    <ion-input formControlName="prefixReal" type="number" [ionic-mask]="{prefix: 'R$'}" value=""></ion-input>
    <ion-note>Output: {{form.value.prefixReal}}</ion-note>
</ion-item>
```

#### Prefix Fixed
```html
<ion-item>
    <ion-label position="stacked">
        Prefix (U$) Fixed
    </ion-label>
    <ion-input formControlName="prefixDolar" type="number" [ionic-mask]="{prefix: 'U$', type: 'number', fixed_morpheme: true}" value=""></ion-input>
    <ion-note>Output: {{form.value.prefixDolar}}</ion-note>
</ion-item>
```

#### Sufix
```html
<ion-item>
    <ion-label position="floating">
        Sufix
    </ion-label>
    <ion-input formControlName="sufix" type="text" [ionic-mask]="{sufix: '@email.com',  type: 'text', fixed_morpheme: false}" value=""></ion-input>
    <ion-note>Output: {{form.value.sufix}}</ion-note>
</ion-item>
```

#### Sufix Fixed
```html
<ion-item>
    <ion-label position="stacked">
        Sufix Fixed
    </ion-label>
    <ion-input formControlName="sufixFixed" type="text" [ionic-mask]="{sufix: '@email.com', fixed_morpheme: true,  type: 'text'}" value=""></ion-input>
    <ion-note>Output: {{form.value.sufixFixed}}</ion-note>
</ion-item>
```

#### Separators (thousands '.' and decimals ',')
```html
<ion-item lines="full">
    <ion-label position="stacked">
        Separators (thousands '.' and decimals ',')
    </ion-label>
    <ion-input  formControlName="separators"  type="text" [ionic-mask]="{type: 'number', thousand_separator: '.', decimal_separator: ','}" value=""></ion-input>
    <ion-note>Output: {{form.value.separators}}</ion-note>
</ion-item>
```

#### Decimal places
```html
<ion-item>
    <ion-label position="stacked">
        Decimal places (3)
    </ion-label>
    <ion-input formControlName="decimal" type="text" [ionic-mask]="{ decimal_places: 3}" value=""></ion-input>
    <ion-note>Output: {{form.value.decimal}}</ion-note>
</ion-item>
```


### Parâmetros

| Parâmetro         | Descrição |
| :--------         | :-------- |
| `[ion-mask]` | Objeto da interface "IonicMaskInterface" irá definir a formatação da máscara utilizada|


### IonicMaskInterface
Interface do objeto que será passado como parâmetro 
| Atributo | Tipo | Valor padrão
| :--- | :---:  | :---:  | 
|`type`  | string | number
|`prefix` | string | null
|`sufix` | string | null
|`fixed_morpheme` | boolean | false
|`thousand_separator` | string | ,
|`decimal_separator` | string | .
|`decimal_places` | number | 2

<br>
</br>

## Ecossistema

| Tecnologia    | Versão                                                        | Links  |
| -------       | -------                                                       | :-----:|
| **ionic**     | [![version](https://badgen.net/badge/version/v6.0.0/blue)](https://ionicframework.com/docs/) | [`ionic@changelog`](https://ionicframework.com/docs/) |
| **Angular**   | [![version](https://badgen.net/badge/version/v15.0.0/blue)](https://angular.io/) | [`angular@documentation`](https://angular.io/) |

### Versões suportadas
* Ionic 6: >= 6.0.0
* Angular 15: >= 15.0.0
<br>

## Contribuições
Pull requests são bem vindos. Para mudanças importantes, abra um problema primeiro
para discutir o que você gostaria de mudar.