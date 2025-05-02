window.addEventListener('scroll', function () {
    var footer = document.querySelector('.rodape-institucional');
    if (window.scrollY > 300) { // Define o ponto de rolagem onde o rodapé aparece
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});
