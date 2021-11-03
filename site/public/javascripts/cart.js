window.addEventListener("load", () => {
    
    let form = document.getElementById("compra")
    
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Gracias por tu compra',
            icon: 'top-end',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar',
          }).then((result) => {
            if (result.isConfirmed) {
              form.submit()
            }
          })
    })
})