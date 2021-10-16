// Validaciones Front del Register

let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

let regExPass = /^[a-zA-Z0-9!@#$%^&*]{6,12}$/;

window.addEventListener('load', () => {
    console.log('registerValidator connected success');

    $('name-input').addEventListener('blur', () => {
        /* Validación Nombre */

        if (!$('name-input').value.trim()) {
            $('name-input').classList.add('is-invalid')
            $('error-name').innerHTML = "El nombre es obligatorio"
        } else {
            $('name-input').classList.remove('is-invalid')
            $('name-input').classList.add('is-valid')
            $('error-name').innerHTML = null
        }
    })

    $('last-name-input').addEventListener('blur', () => {
        /* Validación Apellido */

        if (!$('last-name-input').value.trim()) {
            $('last-name-input').classList.add('is-invalid')
            $('error-last-name').innerHTML = "El apellido es obligatorio"
        } else {
            $('last-name-input').classList.remove('is-invalid')
            $('last-name-input').classList.add('is-valid')
            $('error-last-name').innerHTML = null
        }
    })

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

    $('password-input').addEventListener('focus', () => {
        $('error-password').innerHTML = "6-12 caracteres, un número, una mayúscula y un caracter especial"
    })

    $('password-input').addEventListener('blur', () => {
        /* Validación Clave */

        if (!regExPass.test($('password-input').value)) {
            $('password-input').classList.add('is-invalid')
            $('error-password').innerHTML = "Debes ingresar una contraseña acorde a los parámetros"
        } else {
            $('password-input').classList.remove('is-invalid')
            $('password-input').classList.add('is-valid')
            $('error-password').innerHTML = null
        }
    })

    $('phone-input').addEventListener('blur', () => {
        /* Validación Teléfono */

        if (!$('phone-input').value.trim()) {
            $('phone-input').classList.add('is-invalid')
            $('error-phone').innerHTML = "El número de teléfono es obligatorio"
        } else {
            $('phone-input').classList.remove('is-invalid')
            $('phone-input').classList.add('is-valid')
            $('error-phone').innerHTML = null
        }
    })

    $('file-input').addEventListener('blur', () => {
        /* Validación Archivos */

        if (!allowedFile.exec(filePath)) {
            $('error-file').classList.add('is-invalid')
            $('error-file').innerHTML = "Solo se pueden cargar archivos JPG, JPEG, PNG, GIF"
        } else {
            $('error-file').classList.remove('is-invalid')
            $('error-file').classList.add('is-valid')
            $('error-file').innerHTML = null
        }
    })


    $('form-register').addEventListener('submit', e => {
        e.preventDefault();

        let elementosForm = $('form-register').elements;
        let error = false;

        for (let i = 0; i < elementosForm.length - 1; i++) {

            if (!elementosForm[i].value) {
                elementosForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML = 'Los campos señalados son obligatorios';
                error = true
            }
        }

        if (!error) {

            $('form-register').submit()
        
        }

    })


});

