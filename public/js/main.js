const socket = io('http://localhost:3000')

//edit item
function editItem(id){
    localStorage.setItem('priceText', document.getElementById(`${id}-row`).childNodes[1].innerText);
    localStorage.setItem('descText',  document.getElementById(`${id}-row`).childNodes[3].innerText);
    localStorage.setItem('typeText',  document.getElementById(`${id}-row`).childNodes[5].innerText);

    window.location.href = "/html/edit.html";
    localStorage.setItem('editItemId', id);
 
}



//network calls
const addItem = async()=>{

    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("desc").value;
    const type = document.getElementById("type").value;


    obj = {
        amount,
        desc,
        type
    }

    const item = await axios.post(`${url}/inventory`, obj);

    showItem(item.data);

    socket.emit("new-data-added", item.data);
}

//delete item
async function deleteItem(id){
    try{
        await axios.delete(`${url}/inventory/${id}`)

        document.getElementById(`${id}-row`).remove();

        socket.emit("delete-item", id);

        alert("Item removed successfully!")

    }catch(err){
        console.log("api call error: ", err)
    }

}





//DOM loded event handling
window.addEventListener('DOMContentLoaded', async ()=>{
  
    const items = await axios.get(`${url}/inventory`)
    //console.log(items)
    items.data.forEach(element => {
        showItem(element);
    });


})

socket.on("add-to-your-list", (data) => {
    showItem(data);
})

socket.on("replace-to-your-list", (data) => {
    //console.log( data);
    document.getElementById(`${data.id}-row`).remove();
    showItem(data);
})

socket.on("delete-from-your-list", (id) => {
    document.getElementById(`${id}-row`).remove(); 
    alert("An Item removed by others!")
})

