let allowedFile = /(.JPG|.JPEG|.PNG|.GIF)$/i;

window.addEventListener("load", () =>{
    

    $('name').addEventListener('blur', () => {
        if(!$('name').value.trim()){
            $('name').classList.add('is-invalid')
            $('error-name').innerHTML = "Debes indicar el nombre del producto"
        }else{
            $('name').classList.remove('is-invalid')
            $('name').classList.add('is-valid')
            $('error-name').innerHTML = null
        }
    }) 

    $('price').addEventListener('blur', () => {
        if(!$('price').value.trim()){
            $('price').classList.add('is-invalid')
            $('error-price').innerHTML = "Debes indicar el precio del producto"
        }else{
            $('price').classList.remove('is-invalid')
            $('price').classList.add('is-valid')
            $('error-price').innerHTML = null
        }
    })

    $('category').addEventListener('blur', () => {
       if(!$('category').value){
        $('category').classList.add('is-invalid')
        $('error-category').innerHTML = "Debes indicar la categoria del producto"
    }else{
        $('category').classList.remove('is-invalid')
        $('category').classList.add('is-valid')
        $('error-category').innerHTML = null
    }
    })

    $('genre').addEventListener('blur', () => {
        if(!$('genre').value){
         $('genre').classList.add('is-invalid')
         $('error-genre').innerHTML = "Debes indicar el genero del producto"
     }else{
         $('genre').classList.remove('is-invalid')
         $('genre').classList.add('is-valid')
         $('error-genre').innerHTML = null
     }
     })
    
     $('brand').addEventListener('blur', () => {
        if(!$('brand').value){
         $('brand').classList.add('is-invalid')
         $('error-brand').innerHTML = "Debes indicar la marca del producto"
     }else{
         $('brand').classList.remove('is-invalid')
         $('brand').classList.add('is-valid')
         $('error-brand').innerHTML = null
     }
     })

     $('description').addEventListener('blur', () => {
        if(!$('description').value.trim()){
            $('description').classList.add('is-invalid')
            $('error-description').innerHTML = "Es preferible dar una descripcion al producto"
        }else{
            $('description').classList.remove('is-invalid')
            $('description').classList.add('is-valid')
            $('error-description').innerHTML = null
        }
    })


        
        $('images').addEventListener('blur',() => {
        let filePath = $('images').value.toUpperCase()

        if(!allowedFile.exec(filePath)){
            $('images').classList.add('is-invalid')
            $('error-images').innerHTML = "Solo se pueden cargar archivos JPG, JPEG, PNG, GIF"
        }else{
            $('images').classList.remove('is-invalid')
            $('images').classList.add('is-valid')
            $('error-images').innerHTML = null
        }
        

    })
    

    let inputImage = document.getElementById('images');

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


    

     $('form-productEdit').addEventListener('submit', e => {
        e.preventDefault();
    
        let elementosForm = $('form-productEdit').elements;
        let error = false;
    
        for (let i = 0; i < elementosForm.length - 2; i++) {
            
            if(!elementosForm[i].value){
                elementosForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML = 'Los campos señalados son obligatorios';
                error = true
            }
        }
        if(!error){
            $('form-productEdit').submit()
        }
    }) 
    

}) 