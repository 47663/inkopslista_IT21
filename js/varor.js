function saveProduct(){
    // bestämmer vad "vara" är genom att hämta värdet av "varainput"
    let vara = document.getElementById('varainput');
    //gör så att "varatext" blir samma som värdet av "vara"
    let varatext=vara.value;
    //kollar ifall "varatext" är tom eller ifall den är för lång, sedan ifall den är rätt så appendar den nodes, använder funktionen sparavara och skickar in den data som behövs
    if (varatext.trim()!= "" && varatext.length<50){
        let FD = new FormData();
        FD.append("vara", varatext);

        fetch(serverurl+"sparaVara.php",
        {
            method: 'POST',
            body: FD
        })
        // om allt ok skickar den nu en json
        .then(function (response){
            if (response.status==200){
                return response.json();
            }
        })
        .then(function(data){
            getProducts();
        })
    }else{
        alert("this field is either empty or is too long");
    }

    vara.value="";
}

// den gör att "varainput" värdet är "vara" alltså namnet på varan och id av varan i databasen   
function editVaraForm(id){
    document.getElementById("varainput").value = document.getElementById("vara" + id).innerHTML;
    // gör att knappen som heter "varabutton" har funktionen "editProduct"
    document.getElementById("varabutton").onclick=function(){
        editProduct(id);
    }
}

function editProduct(id){
    //gör att "varanode" har samma värde som "varainput" och att "vara" är samma som värdet av "varanode" 
    let varanode = document.getElementById('varainput');
    let vara =varanode.value;
    //kollar ifall "vara" är tomt eller längre än 50 tecken
    if (vara.trim() != "" && vara.length<50){
        let FD = new FormData();
        FD.append("vara", vara);
        FD.append("id", id);
        //hämtar funktonen "uppdateraVara och shickar in det viktiga för funktionen"
        fetch(serverurl+"uppdateraVara.php",
        {
            method: 'POST',
            body: FD
        })
        //skickar json
        .then(function (response){
            if (response.status==200){
                return response.json();
            }
        })
        //anropar på en funktion
        .then(function(data){
            getProducts();
        })
    }else{
        //skickar ett felmeddelande
        alert("this field is either empty or is too long");
    }
    //gör att "varanode" värdet är ingenting
    varanode.value="";
    //gör att knappen "varabutton" ankallar funktionen saveProduct när man clickar på den
    document.getElementById("varabutton").onclick=function(){
        saveProduct();
    }
    document.getElementById("varabutton").innerHTML="+";


}



function deleteProduct(id, namn){
    //gör att ifall man bekräftar att man vill ta bort den saken man försöker ta bort så tas saken bort
    if(confirm("are you sure you want to delete "+namn+"?")){
        let FD = new FormData();
        FD.append("id", id);
        //skickar det som krävs för funktionen "raderaVara"
        fetch(serverurl+"raderaVara.php",
        {
            method: 'POST',
            body: FD
        })
        //skickar json
        .then(function (response){
            if (response.status==200){
                return response.json();
            }
        })
        //ankallar funktionen "getProducts"
        .then(function(data){
            getProducts();
        })
    }
}
function deleteAllProduct(){
    //gör så att ifall du confirmar på promten att du vill ta bort allting att det faktiskt tar bort allting
    if(confirm("are you sure you want to delete everything?")){
        //säger åt php att ta bort allting i tabellen
        fetch(serverurl+"raderaAllaVaror.php",
        {
            method: 'POST'
        })
        //skickar json
        .then(function (response){
            if (response.status==200){
                return response.json();
            }
        })
        //ankallar funktionen "getProducts"
        .then(function(data){
            getProducts();
        })
    }
}

function productChecked(id){

    let FD = new FormData();
    FD.append("id", id);
    //skickar in den data som behövs för funktionen "kryssaVara"
    fetch(serverurl+"kryssaVara.php",
    {
        method: 'POST',
        body: FD
    })
    //skickar json
    .then(function (response){
        if (response.status==200){
            return response.json();
        }
    })
    //ankallar funktionen "getProducts"
    .then(function(data){
        getProducts();
    })
}
function deleteCheckedProduct(id){
    //ifall man bekräftar att man faktiskt vill ta bort allt man har ikryssat så gör denna så att php tar bort det som man kryssat i
    if(confirm("are you sure you want to delete chosen?")){
        let FD = new FormData();
        FD.append("id", id);
        //skickar den data som behövs till php
        fetch(serverurl+"raderaValda.php",
        {
            method: 'POST',
            body: FD
        })
        //skickar json
        .then(function (response){
            if (response.status==200){
                return response.json();
            }
        })
        //ankallar funktionen "getProducts"
        .then(function(data){
            getProducts();
        })
    }
}