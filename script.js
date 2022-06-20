let cart = []; // array que adicionaremos todas as informações da camisa que adicionaremos no carrinho
let modalQt = 1; // Variável que que usaremos para manipular o valor da quantidade que o usuário selecionar de determinada camisa dentro do modal. Começamos com ela valendo 1.
let modalKey = 0; //Variável declarada inicialmente como 0. Com ela é possível guardarmos qual o id da camisa que foi clicado para conseguirmos manipular ao adicionar o item ao carrinho.

//Ao invés de usarmos no código inteiro "document.querySelector()", podemos criar esta constante chamada "c" e colocarmos dentro do código toda vez que quisermos colocar "document.querySelector()". Neste caso, ele retornará um item com apenas o item que ele achou, e não um array como a outra constante abaixo
const c = (el) => document.querySelector(el);
//Fazemos a mesma coisa da linha de cima, criamos uma variável constante que retorna "document.querySelectorAll(el)". Neste caso, ele irá retornar um array com todos os itens que ele achou.
const cs = (el) => document.querySelectorAll(el);

//Precisamos mapear a lista de camisas que está no JSON e fazemos uma cópia do modelo da estrutura de exibição de camisas na tela que está lá no HTML, preenchemos estes dados da estrutura do HTML e colocamos na tela as informações da camisa etc...
// Para isso, criamos uma arrow function que recebe dois parâmetros: a própria camisa e o seu index do array do JSON que tá lá no arquivo JSON
camisaJson.map((item, index)=>{
    let camisaItem = c('.models .camisa-item').cloneNode(true); //Selecionamos a estrutura "camisa-item" dentro do nosso "models" do HTML e clonamos ela e jogamos para dentro da variável "camisaItem" que acabamos de criar

    //Com a linha abaixo, após rodar o site, ele criará todas as divs contendo as camisas, e em cada div ele irá colocar um atributo nela chamado 'data-key' contendo qual é o index respectivo à camisa daquela lista de JSON das camisas que temos no arquivo 'bandas.js'. O index será o mesmo do id que está na lista do JSON dentro do arquivo 'bandas.js'.
    //Com isso podemos manipular o camisaWindowArea quando clicarmos na camisa para podermos saber qual camisa foi clicada e também puxarmos corretamente as informações daquela camisa.
    camisaItem.setAttribute('data-key', index);

    // Preenchimento de informações para exibir as camisas na área inicial do site
    camisaItem.querySelector('.camisa-item--img img').src = item.img; // Selecionamos todos as áreas de imagens de cada camisa e trocamos 
    camisaItem.querySelector('.camisa-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; //Preenchendo a informação de preço das camisas, usando template string para formatar o preço com o símbolo de "R$" e usando o 'toFixed' para formatar com duas casas decimais após o ponto
    camisaItem.querySelector('.camisa-item--name').innerHTML = item.name; //Preenchendo a informação do nome das camisas
    camisaItem.querySelector('.camisa-item--desc').innerHTML = item.description; //Preenchendo a informação da descrição das camisas

    //Adicionando evento de click em cada camisa. Basicamente retiramos a função do <a> e colocamos evento de click em cada área de modal da camisa, pois assim não irá ficar atualizando a tela toda hora.
    camisaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.camisa-item').getAttribute('data-key'); //Armazenando dentro da variável 'key', qual o index da camisa que foi clicada
        modalQt = 1; //Setamos o modalQt para que toda vez que abra o camisaWindowArea, o modalQt seja resetado para o valor 1;
        modalKey = key; //A variável 'modalKey' que declaramos no início do código como valendo inicialmente 0, passará a valer o id respectivo da camisa clicada. Com este modalKey, conseguimos acessar o JSON e coletar todos os itens necessários referentes ao item do JSON que pegamos aqui através da Key que atribuímos ao 'modalKey'.

        //Preenchemos dentro do camisaWindowArea as informações respectivas à camisa clicada na página inicial.
        //Sempre usamos o index guardado na variável 'key' criada acima para passá-lo como parâmetro na hora de chamar o camisaJson que é o JSON que fica dentro do arquivo 'bandas.js'
        c('.camisaBig img').src = camisaJson[key].img; //Preenchendo a imagem da área de imagem, do camisaWindowArea
        c('.camisaInfo h1').innerHTML = camisaJson[key].name; //Preenchendo a imagem da área de nome da camisa, do camisaWindowArea
        c('.camisaInfo--desc').innerHTML = camisaJson[key].description; //Preenchendo a descrição da área de descrição da camisa, do camisaWindowArea
        c('.camisaInfo--actualPrice').innerHTML = `R$ ${camisaJson[key].price.toFixed(2)}`; //Preenchendo o preço da área de preço da camisa, do camisaWindowArea

        //Toda vez que o camisaWindowArea for aberto, ele iria abrir selecionado sempre o tamanho GRANDE, porque temos a class 'selected' no elemento de tamanho GRANDE no HTML
        //Quando colocamos o código abaixo, ele retira a class 'selected' do elemento GRANDE do HTML e com isso ele não fica mais selecionado
        c('.camisaInfo--size.selected').classList.remove('selected');

        // Preenchendo dentro do camisaWindowArea as informações respectivas ao tamanho da camisa.
        // Utilizamos o 'cs' para selecionar todos os campos de tamanho que temos na estrutura HTML do camisaWindowArea e percorremos cada item do camisaInfo--size, uma vez que seleiconamos para pegar todos os 'camisaInfo--size' que tivermos
        cs('.camisaInfo--size').forEach((size, sizeIndex) => { //Para cada item que ele percorrer, pegamos o index daquele item que ele está percorrendo

            if(sizeIndex == 2) { //Quando a opção que ele tiver for a opção 2, ou seja, o tamanho for GRANDE, então adicione uma class nova a ela chamada 'selected'. Assim o tamanho grande sempre ficará selecionado por padrão caso o camisaWindowArea seja fechado e seja aberto um novo camisaWindowArea só que de outra camisa. Assim, o novo camisaWindowArea que for aberto, será selecionado por padrão a opção de tamanho GRANDE.            
                size.classList.add('selected');
            }

            //Pegamos o item e selecionamos a tag span dele para substituir com a informação respectiva ao tamanho da camisa que foi clicada
            //Colocamos o innerHTML para adicionar informação dentro da tag SPAN
            //Chamamos o JSON passando a 'key' que foi clicada, e a partir disso, ele pega o item correto dentro do JSON e passa para o array 'sizes' do item do JSON qual é o 'data-key' do 'camisaInfo--size' que ele está percorrendo no momento. Com isso, ele irá pegar a informação correta referente ao tamanho da camisa que está no array dentro do item do JSON que ele foi chamado.
            size.querySelector('span').innerHTML = camisaJson[key].sizes[sizeIndex];
        });

        c('.camisaInfo--qt').innerHTML = modalQt; //Setamos o valor do camisaWindowArea visualmente para o usuário ver que foi resetado para o valor 1;

        //Atualizando o CSS via JavaScript:
        c('.camisaWindowArea').style.opacity = 0; //Setando a opacidade do 'camisaWindowArea' para 0
        c('.camisaWindowArea').style.display = 'flex'; //Atualizamos o CSS do camisaWindowArea para flex para poder aparecer para o usuário quando ele clicar na camisa. Assim ele irá aparecer, pois por padrão no CSS ele está como 'display: none'
        setTimeout(() => { //Colocamos o setTimeOut para esperar 200milisegundos para aí sim depois colocarmos a opacidade para 1. Assim dará tempo do JavaScript aplicar a opacidade 0 (conforme a linha 22) e transitar para opacidade 1 conforme pedimos na linha abaixo (linha 25). Essa transição ocorrerá entre 0.5s que foi o que pedimos no CSS da class 'camisaWindowArea'
            c('.camisaWindowArea').style.opacity = 1; //Colocando a opacidade do camisaWindowArea para 1
        }, 200);
    })

    //Preenchendo as informações do modelo "camisa-item" baseado no arquivo JSON
    c('.camisa-area').append(camisaItem); // Aqui, colocamos na tela a estrutura das camisas  que serão exibidas na tela. E aparecerão exatamente a mesma quantidade de camisas que tem dentro do arquivo JSON. Como atualmente são 7 camisas, ele colocará lá 7 estruturas, ou seja, ele multiplicará a estrutura quantas vezes forem preciso até dar o número exato de camisas que tem dentro do JSON

});

// -------------------------------------------------------------------------------------------------------------------------------------------------

//Eventos de Clique dentro do Modal camisaWindowArea

//Função com evento de fechar o camisaWindowArea quando ele tiver aberto e precisar ser fechado por algum motivo
function closeModal() {
    c('.camisaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.camisaWindowArea').style.display = 'none';
    }, 500);
}
//Selecionando os dois botões
cs('.camisaInfo--cancelButton, .camisaInfo--cancelMobileButton').forEach((item) => { //Para cada um destes dois tipos de botões (um mobile e outro para desktop), ele irá adicionar o evendo de click que chama a função 'closeModal' que fecha basicamente o camisaWindowArea, conforme dz a linha 80 abaixo.
    item.addEventListener('click', closeModal);
});

//Eventos de clique dos botões de quantidade de camisas
c('.camisaInfo--qtmenos').addEventListener('click', () => {
    //Com a condicional abaixo, ele basicamente não deixa a quantidade de camisas diminuir caso seja menor que 1, até porque não faz sentido diminuir a quantidade caso ele seja menor que 1, pois ou o usuário adiciona pelo menos 1 camisa ou mais ao carrinho, ou não adiciona nada, pois não tem como ele adicionar 0, -1, -2, -3, camisas ao carrinho por exemplo.
    if(modalQt > 1){
        modalQt--;
        c('.camisaInfo--qt').innerHTML = modalQt;
    }
});
//Adicionamos possibilidade de adicionar quantas camisas ele quiser, através do botão de adicionar
c('.camisaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.camisaInfo--qt').innerHTML = modalQt;
});

//Evento de clique que é responsável por tirar a seleção do elemento que está marcado com 'selected'  que no caso é o GRANDE, e adiciona a seleção no elemento que cliquei.
//Em outras palavras, se eu clicar em um tamanho diferente, ele irá selecionar o tamanho diferente, ele irá remover a class 'selected' do elemento que estava com 'selected' na class, e adicionar 'selected' no elemento que cliquei.
cs('.camisaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.camisaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//Evento do botão de adicionar ao carrinho
c('.camisaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.camisaInfo--size.selected').getAttribute('data-key')); // Pegamos a informação de qual o tamanho da camisa que o usuário selecionou e guardamos dentro desta variável size

    let identifier = camisaJson[modalKey].id + '@' + size; //Variável que serve somente para criarmos um identificador para cada tipo de camisa com seu respectivo tamanho

    let key = cart.findIndex((item) => item.identifier == identifier); //Após criar o identificador do item que estamos adicionando ao carrinho, ele vai para o carrinho e identifica se tem algum identifier igual ao que acabamos de criar. Caso tenha, ele retornará o index deste item já presente no carrinho e guardará o resultado nesta variável 'key' que acabamos de criar. Caso ele não ache, ele retornará -1 e guardará dentro desta variável 'key' que acabamos de criar.

    if(key > -1) { //Se o 'key' for maior que -1, ou seja, se ele achou um identificador dentro do carrinho que já está com o mesmo identificador deste gerado para este item que estamos adicionando ao carrinho, então iremos alterar o item.
        cart[key].qt += modalQt;
    } else { // Caso contrário, quer dizer que não achamos nenhum identificador com o mesmo identificador gerado para este novo item que estamos adicionando ao carrinho.
        //Então, aí sim, podemos dar um novo push no carrinho, pois é um item diferente... ou seja, não há identificadores igual a este já adicionado dentro do carrinho, o que indica que é um novo item podendo ser tanto um tipo de camisa diferente, quanto com tamanhos diferentes...
        cart.push({
            identifier, //Basicamente temos aqui sendo mostrado qual o identificador da camisa adicionada ao carrinho
            id: camisaJson[modalKey].id,
            size,
            qt: modalQt
        });
    }
    updateCart(); // Pedimos para ele chamar a função que atualiza o carrinho.
    closeModal(); // Comando para fechar o camisaWindowArea assim que a camisa for adicionada ao carrinho

});

//Evento de clique ao clicar no ícone de menu no mobile
c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) { //Caso ele tenha pelo menos 1 elemento, então ao ser clicado, o left dele deverá ser mudado para 0 para a área de menu aparecer na tela
        c('aside').style.left = '0';
    }
});

//Evento de clique no ícone de X quando o carrinho tiver aberto no mobile. Ao ser clicado, ele fechará.
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length; //Qualquer coisa que fizermos no carrinho, irá mudar o valor do carrinho para o Mobile

    if(cart.length > 0) { //Caso tenhamos itens no carrinho, mostraremos o carrinho
        c('aside').classList.add('show'); //Comando para fazer aparecer o carrinho
        c('.cart').innerHTML = ''; //Zeramos o item antes de dar o 'append' dentro do FOR, para que quando darmos append em uma camisa de mesmo tamanho e tipo que já esteja dentro do carrinho, ela não fique adicionando novas camisas ao nosso carrinho caso sejam de mesmo tipo e/ou tamanho.

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) { // Percorreremos cada item do meu carrinho para poder exibir as informações que estão adicionadas nele, só que no campo do carrinho, e para isso, usamos a seguinte variável abaixo para coloetar essas informações.
            let camisaItem = camisaJson.find((item) => item.id == cart[i].id); //Através do ID da camisa que temos adicionando no carrinho, ele vai no JSON e retorna as informações da camisa e guarda dentro da variável 'camisaItem' que acabamos de criar.

            subtotal += camisaItem.price * cart[i].qt; //Calculando os subtotais toda vez que o for for rodado em cada evento de modificação ocorrido dentro do carrinho

            let cartItem = c('.models .cart--item').cloneNode(true); //Clocando a estrutura que exibe informações do item no carrinho
            
            let camisaSizeName; //Definição da variável 'camisaSizeName' para manipularmos ele dentro do SWITCH abaixo e colocarmos os tamanhos referentes a 'P', 'M' e 'G'.            
            switch(cart[i].size) { //Tratativa de verificando qual o tamanho selecionado pelo usuário. Basicamente ele converte o valor do 'data-key' referente ao tamanho da camisa selecionada, e mostra no carrinho o tamanho em letras 'P', 'M', e 'G'.
                case 0: // Caso o datakey do tamanho da camisa for 0, o tamanho será P
                    camisaSizeName = 'P';
                    break;
                case 1: // Caso o datakey do tamanho da camisa for 1, o tamanho será M
                    camisaSizeName = 'M';
                    break;
                case 2: // Caso o datakey do tamanho da camisa for 2, o tamanho será G
                    camisaSizeName = 'G';
                    break;
            }

            //Definimos uma variável que é o nome da camisa a ser exibido na área do carrinho. Basicamente o nome da camisa será o nome dela juntamente com o tamanho dela podendo ser 'P', 'M' ou 'G'.
            let camisaName = `${camisaItem.name} (${camisaSizeName})`;

            //Preenchendo os itens do carrinho de acordo com as informações da camisa que o usuário clicou para adicionar ao carrinho
            cartItem.querySelector('img').src = camisaItem.img; //Colocando a imagem da camisa no carrinho
            cartItem.querySelector('.cart--item-nome').innerHTML = camisaName; //Colocando o nome da camisa no carrinho, juntamente com seu tamanho
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt; //Colocamos a quantidade daquele item que foi adicionado ao carrinho de maneira correta, respeitando as informações de tamanho e tipo de camisa
            //Fazendo eventos de adicionar mais ou menos de uma determinada camisa dentro do carrinho apertando os botões de mais e/ou de menos
            //O botão de mais ou menos irá funcionar para qualquer item que tiver no carrinho
            //Cada clique que damos no botão de mais ou de menos dentro de determinado item do carrinho, ele irá atualizar rodar a função 'updatecart' e fazer todas as alterações no carrinho novamente e mudar os resultados de preço, etc.
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }                
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });


            c('.cart').append(cartItem); //Adicionamos o item no carrinho após de ter clonado ele
        }

        desconto = subtotal * 0.1; //Dando o desconto após qualquer modificação feita no carrinho
        total = subtotal - desconto; //Calculando o total do carrinho

        //Preenchendo as informações do subtotal, desconto e total do carrinho
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else { // Caso não tenhamos itens no carrinho, tiramos ele da tela.
        c('aside').classList.remove('show'); // Comando para fazer remover o carrinho caso não tenha nenhum item adicionado nele. Este comando funcionará apenas se acessado pelo computador. No Mobile ele não irá surtir efeito.
        c('aside').style.left = '100vw'; //Comando que servirá apenas para a área de carrinho no mobile, pois caso não tenha item no carrinho (ou então se colocarmos determinado item como zero e ele for o único no carrinho), significa que o carrinho ficará vazio e deverá ser fechado. Então ele zerará o carrinho e fechará o carrinho.
    }
}