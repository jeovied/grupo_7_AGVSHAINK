// Validaciones Front del login

let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

let regExPass = /^[a-zA-Z0-9!@#$%^&*]{6,12}$/;

function mostrarPassword(){
    var cambio = document.getElementById("password-input");
    if(cambio.type == "password"){
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}





window.addEventListener('load', () => {
    console.log('loginValidator connected success');

    

    $('email-input').addEventListener('blur', () => {
        /* Validación Email */

        if (!regExEmail.test($('email-input').value)) {
            $('email-input').classList.add('is-invalid')
            $('error-email').innerHTML = "Debes ingresar un email válido"
        } else {
            $('email-input').classList.remove('is-invalid')
            $('email-input').classList.add('is-valid')
            $('error-email').innerHTML = null
        }
    })

    /* $('password-input').addEventListener('focus', () => {
        $('error-password').innerHTML = null
    }) */

    $('password-input').addEventListener('blur', () => {
        /* Validación Clave */

        if (!regExPass.test($('password-input').value)) {
            $('password-input').classList.add('is-invalid')
            $('error-password').innerHTML = "Debes ingresar una contraseña"
        } else {
            $('password-input').classList.remove('is-invalid')
            $('password-input').classList.add('is-valid')
            $('error-password').innerHTML = null
        }
    })


    $('form-login').addEventListener('submit', e => {
        e.preventDefault();

        let elementosForm = $('form-login').elements;
        let error = false;

        for (let i = 0; i < elementosForm.length - 1; i++) {

            if (!elementosForm[i].value) {
                elementosForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML = 'Los campos señalados son obligatorios';
                error = true
            }
        }

        if (!error) {

            $('form-login').submit()
        
        }

    })


});