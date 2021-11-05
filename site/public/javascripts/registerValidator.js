// Validaciones Front del Register

let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

let regExPass = /^[a-zA-Z0-9!@#$%^&*]{6,12}$/;

let regExExt = /(.jpg|.jpeg|.png|.gif)$/i;

let regExPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

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

         if (!regExPhone.exec($('phone-input').value)) {
            $('phone-input').classList.add('is-invalid')
            $('error-phone').innerHTML = "Debes ingresar un numero de telefono acorde a los parámetros"
        } else {
            $('phone-input').classList.remove('is-invalid')
            $('phone-input').classList.add('is-valid')
            $('error-phone').innerHTML = null
        } 

    })

    $('file-input').addEventListener('change', e => {
        /* Validación Archivos */

        switch (true) {
            case !regExExt.exec($('file-input').value):
                $('error-file').innerHTML = "Solo imágenes con extensión jpg, jpeg, png, gif"
                $('file-input').classList.add('is-invalid')
                vistaPrevia.src = ""
                break;
            case $('file-input').files[0].size > oneMB * 2:
                $('error-file').innerHTML = "El archivo debe pesar menos de 2Mb"
                $('file-input').classList.add('is-invalid')
                vistaPrevia.src = ""
                break
            default:
                $('file-input').classList.remove('is-invalid');
                $('file-input').classList.add('is-valid');
                $('error-file').innerHTML = "";
                $('btn btn-primary').innerHTML = "Cambiar imagen"
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    sessionStorage.setItem('file-input', reader.result)
                    vistaPrevia.src = reader.result
                }
                break;
        }
    })


    let inputImage = document.getElementById('file-input');

          inputImage.addEventListener('change', function () {
            var preview = document.querySelector('#preview');

            if (this.files) {
              [].forEach.call(this.files, readAndPreview);
            }

            function readAndPreview(file) {


              var reader = new FileReader();
              preview.innerHTML = null;

              reader.addEventListener("load", function () {
                var image = new Image();
                image.height = 150;
                image.title = file.name;
                image.src = this.result;
                preview.appendChild(image);
              });

              reader.readAsDataURL(file);

            }
          })


    $('form-register').addEventListener('submit', e => {
        e.preventDefault();

        let elementosForm = $('form-register').elements;
        let error = false;

        for (let i = 0; i < elementosForm.length - 2; i++) {

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

