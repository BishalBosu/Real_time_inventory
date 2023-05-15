const socket = io('http://localhost:3000')

async function editItem(){
    //checking if editing is initialized or not

    if(!localStorage.getItem('editItemId')){
        return window.location.href = "/html/index.html";
    }

    const itemId = localStorage.getItem("editItemId");

   const amount = document.getElementById("amount").value;
   const desc = document.getElementById("desc").value;
   const type = document.getElementById("type").value;

   let obj = {
    amount,
    desc,
    type
   }

    const item_puted = await axios.put(`${url}/inventory/${itemId}`, obj);

    socket.emit("edited-data", item_puted.data);
   
   localStorage.removeItem("editItemId");

   window.location.href = "/html/index.html"
}


window.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("amount").value = localStorage.getItem('priceText');
    document.getElementById("desc").value = localStorage.getItem('descText');
    document.getElementById("type").placeholder = localStorage.getItem('typeText');

    localStorage.removeItem("priceText")
    localStorage.removeItem("descText")
    localStorage.removeItem("typeText")

})

