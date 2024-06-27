// Para que a função seja carregada depois de todo o processo
document.addEventListener('DOMContentLoaded', function(){

//Função do sorteio
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {
        evento.preventDefault();       //Prevenir o comportamento padrão de um formulario atualizar a pagina
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = Math.random() * numeroMaximo; //random Para deixar o resultado em aleatório
        numeroAleatorio = Math.floor(numeroAleatorio + 1); // +1 - é para que o resultado não mostre zero

        document.getElementById ('resultado-valor').innerText = numeroAleatorio;

//JS ao clicar no resultado aparecer o display do numero sorteado
        document.querySelector ('.resultado').style.display = 'block';
    })

})