import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

@Directive({
    selector: '[ionic-mask]'
})
export class IonicMaskDirective {

    // attributes
    public params: any;
    public decimalPart: any;
    public integerPart: any;
    public originalValue: any;
    public auxInput: any;
    public defaultInput: any;

    // inputs
    @Input('ionic-mask') dataMask: any = null;

    // injects
    private _ref = inject(ElementRef);

    /**
     * Construct
     */
    constructor() { }

    /**
     * Função a ser executada na inicialização do componente
     */
    ngOnInit() {

        // Inicia os parametros com os enviados ou valores padrões
        this.params = {
            type: this.dataMask.type || 'number',
            prefix: this.dataMask.prefix || null,
            sufix: this.dataMask.sufix || null,
            fixed_morpheme: this.dataMask.fixed_morpheme || null,
            thousand_separator: this.dataMask.thousand_separator || '.',
            decimal_separator: this.dataMask.decimal_separator || ',',
            decimal_places: this.dataMask.decimal_places || 2,
            toLocale: this.dataMask.toLocale || null,
        }

        
    }
    /**
     * Função a ser executa após a página ser verificada
     */
    ngAfterViewChecked() {
        
        this.configInputs();
    }

    /**
     * Configura inputs auxiliares
     */
    private configInputs() {
        
        this.defaultInput = this._ref.nativeElement.querySelector('input:not([ionic-mask-value-input-aux])');
        this.auxInput = this._ref.nativeElement.querySelector('input[ionic-mask-value-input-aux]');

        // Se há input padrão e não foi criado input auxiliar então cria o auxiliar para servir de "display"
        if(this.defaultInput && !this.auxInput) {
            
            this.defaultInput.type = 'hidden';
            
            this.auxInput = document.createElement('input');
            this.auxInput.setAttribute('ionic-mask-value-input-aux', 'true');

            this.auxInput.classList = this.defaultInput.classList;
            
            // adiciona evento para ser executado ao inserir dados no input
            this.auxInput.addEventListener("input", (e: any) => {
                this.apply();
            });

            this._ref.nativeElement.append(this.auxInput);

            // seta prefixo ou sufixo na inicialização caso seja fixo
            if(this.params.fixed_morpheme){

                this.setMorpheme();
            }
            if(this.defaultInput.value) {

                this.auxInput.value = this.defaultInput.value;
                
                setTimeout(() => {
                    var event = new Event('input');          
                    this.auxInput.dispatchEvent(event);
                }, 500);
            }

        }

    }

    /**
     * Aplica formatação dos valores
     */
    private apply() {

        let currentValue = this.auxInput.value;
        
        if (currentValue) {
            // seta morphema(prefix ou sufix), se enviado
            this.setMorpheme();


            if(this.params.type == 'number' ){

                // Limpa o texto de entrada permitindo somente números
                this.auxInput.value = currentValue.replace(/\D/g, '');
                
                // this._ref.nativeElement.value = this.auxInput.value;
                
                this.formatDecimalPlaces();
                this.formatSeparators();
            }

            
        }else{
            
            // se não é fixo se não há valor valido remove o prefixo/sufixo para não atrabalhar no label floating
            if(!this.params.fixed_morpheme){
                
                this.removeMorpheme();
            }
        }
        
        this.setOriginalValue();
    }

    /**
     * Seta valor original no input default
     */
    private setOriginalValue() {

        let val = null;
        

        if(this.params.type == 'number' && this.decimalPart){
            // para o tipo number monta formatação de acordo com os parametros
            
            let integerPart = this.integerPart || 0 ;
            val = Number(`${integerPart}.${this.decimalPart}`);
            
        }else if(this.params.type != 'number' && this.auxInput.value){
            // para o tipo diferente de number (text), insere o valor sem formatação

            val = this.auxInput.value;
            
        } else {

            // se não é fixo se não há valor valido remove o prefixo/sufixo para não atrabalhar no label floating
            if(!this.params.fixed_morpheme){
    
                this.removeMorpheme();
            }

            this.auxInput.value = val;

        }
        
        this.defaultInput.value = val;
        
        var event = new Event('input');          
        this.defaultInput.dispatchEvent(event);

    }

    /**
     * Insere prefixo e sufixo
    */
    setMorpheme(){
        this.setPrefix();
        this.setSufix();
    }

    /**
     * Remove prefixo e sufixo
    */
    removeMorpheme(){
        this.removePrefix();
        this.removeSufix();
    }

    /**
     * Insere prefixo  
    */
    setPrefix(){

        let prefixDiv = this._ref.nativeElement.getElementsByClassName('ionic-mask-prefix');
        
        if(!prefixDiv.length && this.params.prefix){
            this.auxInput.insertAdjacentHTML('beforebegin', `<div class="ionic-mask-prefix" style="color: #666666; padding-right: 5px;" > ${this.params.prefix}</div>`);
        }
        
    }   
       
    /**
     * Insere sufixo  
     */
    setSufix(){

       let sufixDiv = this._ref.nativeElement.getElementsByClassName('ionic-mask-sufix');

       if(!sufixDiv.length && this.params.sufix){
           this.auxInput.insertAdjacentHTML('afterend', `<div class="ionic-mask-sufix" style="color: #666666; padding-left: 5px;" > ${this.params.sufix}</div>`);
       }

    }

    /**
     * Remove o prefixo 
     */
    private removePrefix() {

        let prefixDiv = this._ref.nativeElement.getElementsByClassName('ionic-mask-prefix');
        
        if(prefixDiv.length){
            prefixDiv[0].remove();
        }
    }
    /**
     * Remove o sufixo 
     */
    private removeSufix() {

        let sufixDiv = this._ref.nativeElement.getElementsByClassName('ionic-mask-sufix');
        
        if(sufixDiv.length){
            sufixDiv[0].remove();
        }
    }

    /**
     * Formata as casas decimais do valor, dividindo o valor em duas partes (integer e decimal)
     */
    private formatDecimalPlaces(): void {

        let value: any = this.auxInput.value;

        this.decimalPart = value.substring(value.length - this.params.decimal_places);
        this.integerPart = value.substring(0, value.length - this.params.decimal_places);

        value = `${this.integerPart}${this.params.decimal_separator}${this.decimalPart}`;

        this.auxInput.value = value;

    }

    /**
     * Formata com os separadores de milhares e decimais
     * por padrão os separadores são:
     * Milhares: virgula(,)
     * Decimais: ponto(.)
     */
    private formatSeparators(): void {

        let value: any = this.auxInput.value;

        if (this.integerPart) {

            let IntPartFormated = String(this.integerPart).split(/(?=(?:...)*$)/).join(this.params.thousand_separator);

            value = `${IntPartFormated}${this.params.decimal_separator}${this.decimalPart}`;
            this.auxInput.value = value;

        }

    }

    /**
     * Formata para padrão telefone
     * TODO
     */
    private formatPhone(): void {

    }



}
