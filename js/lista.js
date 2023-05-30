serverurl='php/'

window.onload = function(){
    //ankallar funktionen "getProducts" 
    getProducts();
    //gör att knappen "varabutton" ankallar funtionen "saveProduct" när den trycks
    document.getElementById("varabutton").onclick=function(){
        saveProduct();
    }
    //gör att knappen "allabutton" ankallar funtionen "deleteAllProduct" när den trycks
        document.getElementById("allabutton").onclick=function(){
        deleteAllProduct();
    }
    //gör att knappen "valdabutton" ankallar funtionen "deleteCheckedProduct" när den trycks
    document.getElementById("valdabutton").onclick=function(){
        deleteCheckedProduct();
    }
}

function getProducts(){
    //ankallar funktinen "hamtaAlla" från php
    fetch(serverurl+'hamtaAlla.php')
    //skickar json
    .then(function(response){
        if (response.status == 200){
            return response.json();
        }
    })
    //ankallar funtionen "appendProducts" och skickar in relevant data
    .then(function (data){
        
        appendProducts(data);
    })
}

function appendProducts(data){
    console.log(data);
    //bestämmer värdet av "btn"
    let btn=document.getElementById("valdabutton");
    btn.setAttribute("disabled",true)
    //bestämmer värdet av "tabell"
    let tabell=document.getElementById("varatable");
    tabell.innerHTML="";

    for(let i=0;i<data.length;i++){
        let rad=document.createElement("tr");
        let checkboxtd=document.createElement("td");
        let checkbox=document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if(data[i].checked){
            checkbox.checked=1;
            btn.removeAttribute("disabled");
        }
        // gör så att när checkboxen blir clicked så ankallas funktionen "productChecked" med relevant data
        checkbox.onclick=function(){
            productChecked(data[i].id);
        }
        checkboxtd.appendChild(checkbox);

        let texttd=document.createElement("td");
        texttd.id="vara"+data[i].id;
        texttd.innerHTML=data[i].namn;

        let redigeratd=document.createElement("td");
        let redigeraicon=document.createElement("i");
        redigeraicon.classList.add("material-icons");
        redigeraicon.innerHTML="edit";
        //gör så att redigera iconen ankallar funktionen "editVaraForm" när man clickar på den och den skickar relevant data
        redigeraicon.onclick=function(){
            editVaraForm(data[i].id);
        }
        redigeratd.appendChild(redigeraicon);

        let raderatd=document.createElement("td");
        let raderaicon=document.createElement("i");
        raderaicon.classList.add("material-icons");
        raderaicon.innerHTML="delete";
        //gör så att radera iconen"sopkorgen" ankallar funktionen "deleteProduct" och skickar relevant dana när man clickar på den
        raderaicon.onclick=function(){
            deleteProduct(data[i].id, data[i].namn);
        }
    raderatd.appendChild(raderaicon);

    rad.appendChild(redigeratd);
    rad.appendChild(checkboxtd);
    rad.appendChild(texttd);
    rad.appendChild(raderatd);
    tabell.appendChild(rad);
    }
}