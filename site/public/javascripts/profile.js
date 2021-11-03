window.addEventListener("load", () => {

    let forms  = document.querySelectorAll("#delete")

    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            
            Swal.fire({
                title: '¿Estas seguro de que quieres borrar tu perfil?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo',
                cancelButtonText: "cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                  form.submit()
                }
              })
        })
    })
    
})