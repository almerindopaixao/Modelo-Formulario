const _cpfLimpo = Symbol();
class ValidaCPF {
    constructor(cpfEnviado) {
        this[_cpfLimpo] = cpfEnviado;
    }

    get cpfLimpo() {
        return this[_cpfLimpo].replace(/\D+/g, '')
    }

    set cpfLimpo(valor) {
        this[_cpfLimpo] = valor;

    }

    isSequencia() {
        const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);

        return this.cpfLimpo === sequencia
    }

    geraNovoCpf() {
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.criaDigito(cpfParcial);
        const digito2 = ValidaCPF.criaDigito(cpfParcial + digito1);

        this.novoCpf = cpfParcial + digito1 + digito2;
    }

    valida() {
        if(typeof this.cpfLimpo !== 'string') return false
        if(!this.cpfLimpo) return false
        if(this.cpfLimpo.length !==  11) return false
        if(this.isSequencia()) return false
        this.geraNovoCpf()

        return this.novoCpf === this.cpfLimpo
    }

    static criaDigito(cpfParcial) {
        const cpfArray = cpfParcial.split('');

        let regressivo = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, valor) => {
            ac += regressivo * Number(valor);
            regressivo--
            return ac
        }, 0);

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito)
    }

}
