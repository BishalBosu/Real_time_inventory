const url = "http://localhost:3009";

async function editItem(){
    //checking if editing is initialized or not

    if(!localStorage.getItem('editItemId')){
        return window.location.href = "/html/index,html";
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

    await axios.put(`${url}/inventory/${itemId}`, obj);

   
   localStorage.removeItem("editItemId");

   window.location.href = "/html/index.html"
}