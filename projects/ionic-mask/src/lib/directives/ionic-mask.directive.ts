import { ChangeDetectorRef, Directive, ElementRef, inject, Input } from '@angular/core';

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
    public defaultValue: any;
    public defaultValueWasSet: boolean = false;

    // inputs
    @Input('ionic-mask') dataMask: any = null;

    // injects
    private _ref = inject(ElementRef);
    private _changeDetectorRef = inject(ChangeDetectorRef);

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
            fixed_morpheme: this.dataMask.fixed_morpheme || false,
            thousand_separator: this.dataMask.thousand_separator || '.',
            decimal_separator: this.dataMask.decimal_separator || ',',
            decimal_places: (this.dataMask.decimal_places !== null && this.dataMask.decimal_places !== undefined) ? this.dataMask.decimal_places : 2,
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
        this.defaultValue = null;
        this.integerPart = null;
        this.decimalPart = null;

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
            
        }
        
        // se há valor na inicialização então extrai parte decimal e inteira
        if(!this.defaultValueWasSet && this.defaultInput && this.defaultInput.value && !this.auxInput.value) {

            this.auxInput.value = this.defaultInput.value;
            this.defaultValue = this.auxInput.value.replace(/\D\./g, '');
            
            // dividindo o valor em duas partes (integer e decimal)
            [this.integerPart, this.decimalPart] = String(this.defaultValue).split('.');
            if(this.integerPart && !this.decimalPart){
                this.decimalPart = 0;
            }
            
            var event = new Event('input');          
            this.auxInput.dispatchEvent(event);
            
            this.defaultValueWasSet = true;
        }


    }

    /**
     * Aplica formatação dos valores
     */
    private apply() {

        let value = (this.defaultValue !== null && this.defaultValue !== undefined) ? this.defaultValue : this.auxInput.value;

        if (value) {
            // seta morphema(prefix ou sufix), se enviado
            this.setMorpheme();


            if(this.params.type == 'number' ){

                // Limpa o texto de entrada permitindo somente números se não há valor incial
                if(!this.defaultValue){

                    value = value.replace(/\D/g, '');
                    // dividindo o valor em duas partes (integer e decimal)
                    this.decimalPart = value.substring(value.length - this.params.decimal_places);
                    this.integerPart = value.substring(0, value.length - this.params.decimal_places);
                    
                }else{
                    //seta valor default para nulo pois já foi utilizado
                    this.defaultValue = null;
                }
                
                if(this.params.decimal_places){

                    this.formatDecimalPlaces();
                }
                
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
        
        if(this.params.type == 'number' ){
            // para o tipo number monta formatação de acordo com os parametros
            
            let integerPart = this.integerPart || 0 ;
            let decimalPart = this.decimalPart || 0 ;

            if(integerPart && decimalPart){

                val = Number(`${integerPart}.${this.decimalPart}`);

            } else if (integerPart){

                val = Number(`${integerPart}`);

            } else {
                val = null;
            }

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
     * Formata as casas decimais do valor.
     */
    private formatDecimalPlaces(): void {
        
        let value = `${this.integerPart}${this.params.decimal_separator}${this.decimalPart}`;
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

            if(this.params.decimal_places){

                value = `${IntPartFormated}${this.params.decimal_separator}${this.decimalPart}`;
            }else{

                value = IntPartFormated;
            }

            this.auxInput.value = value;

            this._changeDetectorRef.detectChanges();

        }

    }

    /**
     * Formata para padrão telefone
     * TODO
     */
    private formatPhone(): void {

    }



}
