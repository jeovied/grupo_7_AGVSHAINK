const $ = id => document.getElementById(id)

window.addEventListener("load", () => {
    
    let burgerMenu = $("burger-menu"),
    asideMenu = $("menu");

    burgerMenu.addEventListener("click", () => {
        asideMenu.classList.toggle("on");
    })

    $("men").addEventListener("click", () => {
        $("ul-men").classList.toggle("on");
        if($("ul-women").className || $("ul-brand").className){
            $("ul-women").classList.remove("on");
            $("ul-brand").classList.remove("on");
        }
    })

    $("women").addEventListener("click", () => {
        $("ul-women").classList.toggle("on");
        if($("ul-men").className || $("ul-brand").className){
            $("ul-men").classList.remove("on");
            $("ul-brand").classList.remove("on");
        }
    })

    $("brand").addEventListener("click", () => {
        $("ul-brand").classList.toggle("on");
        if($("ul-women").className || $("ul-men").className){
            $("ul-women").classList.remove("on");
            $("ul-men").classList.remove("on");
        }
    })

    if ($("user")) {
        $("user").addEventListener("click", () => {
            $("ul-user").classList.toggle("on");
        })
    }

    if ($("avatar")) {
        $("avatar").addEventListener("click", () => {
            $("ul-avatar").classList.toggle("on");
        })
    }

    document.querySelector("main").addEventListener("click", () => {
        asideMenu.classList.remove("on");
        $("ul-men").classList.remove("on");
        $("ul-women").classList.remove("on");
        $("ul-brand").classList.remove("on");
        $("avatar") ? $("ul-avatar").classList.remove("on") : null;
    })

    $("searchBar").addEventListener("submit", (e) => {
        let search = $("search")


        search.value == "" && e.preventDefault() 
    })

    $("buttton").addEventListener("mouseover", () => {
        let search = $("search")

        if(search.value == ""){
            $("buttton").style.cursor = "not-allowed"
        }else{
            $("buttton").style.cursor = "pointer"
        }
    })
})