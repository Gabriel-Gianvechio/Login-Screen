let B7Validator = {
    handleSubmit:(event)=>{
        event.preventDefault(); // impede que execute o comportamento padrão
        let send = true; //guarda true

        let inputs = form.querySelectorAll('input'); //guarda o que foi preenchido nos inputs (nome, email, senha)

        B7Validator.clearErrors();

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input); //guardo em CHECK uma verificação no input (se cumprir os requisitos retorna TRUE, se não retorna uma FRASE)
           
            if(check !== true) { // se nao cumprir os requisitos entra no IF e nao envia o formulario
                send = false;
                B7Validator.showError(input, check); 
            }
        }

        if(send) { //envia o formulario se passar no for que verifica se é valido)
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules'); //guarda as regras do input no RULES

        if(rules !== null) { //se ter alguma regra entra no IF
            
            rules = rules.split('|'); //esse é o simbolo escolhido como SEPARADOR das regras

            for(let k in rules) { // verifico regra por regra

                let rDetails = rules[k].split('=');//separo tambem o que tiver ' = ' para utilizar futuramente

                switch(rDetails[0]) { //entrando nas regras

                    case 'required': //se tiver REQUIRED entao nao pode ser vazio
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.'; 
                        }
                    break;

                    case 'min': // se tiver qtd MINIMA então tem que ter ao menos o minimo (separamos o ' = ' pois agora o valor MINIMO está em rDatails[1])
                        if(input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caractes';
                        }
                    break;

                    case 'email': //verifica email valido
                        if(input.value != '') {
    /*regra email valido */ let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) { //se não passar no teste entra no IF
                                return 'E-mail digitado não é válido!';
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000'; // muda a cor da borda do campo que deu erro

        let errorElement = document.createElement('div'); // cria um local para printar a frase
        errorElement.classList.add('error');
        errorElement.innerHTML = error; //retorna a frase do checkInput

        input.parentElement.insertBefore(errorElement, input.ElementSibling); // parentElement me leva para LABEL (parente de INPUT)  
                                                     // insertBefore insere ANTES DO CAMPO (nao existe um comando para inserir depois)
                                                     // então ElementSibling para selecionar o que vem DEPOIS de INPUT 
                                                     // (gambiarra para printar o que queremos DEPOIS do elemento e não ANTES)
    },

    clearErrors:() => { //função para remover o texto de erros anteriores, antes da verificação atual

        let inputs = form.querySelectorAll('input'); //remove o contorno VERMELHO do erro
        for(let i=0;i<inputs.length;i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error'); //seleciona tudo o que ter a classe ERROR
        for(let i=0;i<errorElements.length;i++) { // entra no loop
            errorElements[i].remove(); //remove
        }
    }
};

let form = document.querySelector('.b7validator'); //guarda o formulário 
form.addEventListener('submit', B7Validator.handleSubmit); //quando clicar no botão chama a função handleSubmit dentro do B7Validator