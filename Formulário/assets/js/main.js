class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();

    }

    eventos() {
        this.formulario.addEventListener('submit', event => {
            this.handleSubmit(event);
        })

        this.formulario.addEventListener('keypress', event => {
            if (event.keyCode === 13) this.handleSubmit(event)
        })

        this.formulario.addEventListener('change', event => {
            const checkbox = event.target
            const classe = checkbox.classList.value

            if (checkbox.checked) {
                this.mostrarSenha(classe)
            } else {
                this.ocultarSenha(classe)
            }    
        })

    }

    mostrarSenha(classe) {
        if (classe === 'check1') {
            const senha = this.formulario.querySelector('.senha');
            senha.setAttribute('type', 'text')
        } else {
            const repetir_senha = this.formulario.querySelector('.repetir-senha');
            repetir_senha.setAttribute('type', 'text')
        }
    }

    ocultarSenha(classe) {
        if (classe === 'check1') {
            const senha = this.formulario.querySelector('.senha')
            senha.setAttribute('type', 'password')
        } else {
            const repetir_senha = this.formulario.querySelector('.repetir-senha');
            repetir_senha.setAttribute('type', 'password')
        }
    }


    handleSubmit(event) {
        /**
         * Função que da inicio a verificação do formulário
         * @returns {Boolean}
         */
        event.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhaSaoValidas();

        if (camposValidos && senhasValidas) {
            alert('Formulário enviado.')
            this.formulario.submit()
        }
    }

    senhaSaoValidas() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');
        
        if(senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais')
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais')
        }

        if(senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres')
        }

        return valid
    }

    camposSaoValidos() {
        /**
         * Função que verifica se os campos do formulário são válidos
         * @returns {Boolean}
         */
        let valid = true;
        const campos = this.formulario.querySelectorAll('.validar');

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }


        campos.forEach(elemento => {
            let label = elemento.previousElementSibling.innerText;
            if(!elemento.value) {
                this.criaErro(elemento, `Campo "${label}" não pode estar vazio`)
                valid = false;
            }

            if(elemento.classList.contains('cpf')) {
                if(!this.validaCPF(elemento)) valid = false;
            }

            if(elemento.classList.contains('usuario')) {
                if(!this.validaUsuario(elemento)) valid = false;
            }
        });

        return valid
    }

    validaUsuario(campo) {
        /**
         * Função que valida o usuário no formulário
         * @param {String} campo
         */
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres')
            valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Nome de usuário precisa conter apenas letras e/ou números')
            valid = false;
        }

        return valid;
    }

    validaCPF(campo) {
        /**
         * Função que valida o cpf do usuário
         * @param {Object} campo
         * @returns {Boolean}
         */
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido')
            return false
        }

        return true
    }

    criaErro(campo, msg) {
        /**
         * Função que cria uma div com uma mensagem de erro
         * @param {Object} campo
         * @param {String} msg
         */
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.setAttribute('class', 'error-text')
        campo.insertAdjacentElement('afterend', div)
    }

}

const valida = new ValidaFormulario();