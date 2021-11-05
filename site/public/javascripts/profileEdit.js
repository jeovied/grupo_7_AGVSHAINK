let regExPass = /^[a-zA-Z0-9!@#$%^&*]{6,12}$/;

let regExExt = /(.jpg|.jpeg|.png|.gif)$/i;


let regExPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;


window.addEventListener('load', () => {
    console.log('profileEditValidator connected success');

    $('name').addEventListener('blur', () => {
        /* Validación Nombre */

        if (!$('name').value.trim()) {
            $('name').classList.add('is-invalid')
            $('error-name').innerHTML = "El nombre es obligatorio"
        } else {
            $('name').classList.remove('is-invalid')
            $('name').classList.add('is-valid')
            $('error-name').innerHTML = null
        }
    })

    $('last_name').addEventListener('blur', () => {
        /* Validación Apellido */

        if (!$('last_name').value.trim()) {
            $('last_name').classList.add('is-invalid')
            $('error-last_name').innerHTML = "El apellido es obligatorio"
        } else {
            $('last_name').classList.remove('is-invalid')
            $('last_name').classList.add('is-valid')
            $('error-last_name').innerHTML = null
        }
    })

    $('newPassword').addEventListener('focus', () => {
        $('error-newPassword').innerHTML = "6-12 caracteres, un número, una mayúscula y un caracter especial"
    })

    $('newPassword').addEventListener('blur', () => {
        /* Validación Clave */


        switch(true){
            case !regExPass($('newPassword').value) :
                $('newPassword').classList.add('is-invalid')
                $('error-newPassword').innerHTML = "Debes ingresar una contraseña acorde a los parámetros"
            break;
            case $('newPassword').value == " ":
                $('number').classList.remove('is-invalid')
                $('number').classList.add('is-valid')
                $('error-number').innerHTML = null
            default:
                $('number').classList.remove('is-invalid')
                $('number').classList.add('is-valid')
                $('error-number').innerHTML = null
        }

    })

    $('number').addEventListener('blur', () => {
        /* Validación Teléfono */

         if (!regExPhone.exec($('number').value)) {
            $('number').classList.add('is-invalid')
            $('error-number').innerHTML = "Debes ingresar un numero de telefono acorde a los parámetros"
        } else {
            $('number').classList.remove('is-invalid')
            $('number').classList.add('is-valid')
            $('error-number').innerHTML = null
        } 

    })

    $('image').addEventListener('change', e => {
        /* Validación Archivos */

        switch (true) {
            case !regExExt.exec($('image').value):
                $('error-image').innerHTML = "Solo imágenes con extensión jpg, jpeg, png, gif"
                $('image').classList.add('is-invalid')
                vistaPrevia.src = ""
                break;
            case $('image').files[0].size > oneMB * 2:
                $('error-image').innerHTML = "El archivo debe pesar menos de 2Mb"
                $('image').classList.add('is-invalid')
                vistaPrevia.src = ""
                break
            default:
                $('image').classList.remove('is-invalid');
                $('image').classList.add('is-valid');
                $('error-image').innerHTML = "";
                $('btn btn-primary').innerHTML = "Cambiar imagen"
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    sessionStorage.setItem('image', reader.result)
                    vistaPrevia.src = reader.result
                }
                break;
        }
    })

    let inputImage = document.getElementById('image');

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

    $('profile-edit').addEventListener('submit', e => {
        e.preventDefault();

        let elementosForm = $('profile-edit').elements;
        let error = false;

        for (let i = 0; i < elementosForm.length - 1; i++) {

            if (!elementosForm[i].value) {
                elementosForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML = 'Los campos señalados son obligatorios';
                error = true
            }
        }

        if (!error) {

            $('profile-edit').submit()
        
        }

    })


});

