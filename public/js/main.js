



//edit item
function editItem(id){
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
}

//delete item
async function deleteItem(id){
    try{
        await axios.delete(`${url}/inventory/${id}`)

        document.getElementById(`${id}-row`).remove();
        alert("Item removed successfully!")

    }catch(err){
        console.log("api call error: ", err)
    }

}





//DOM loded event handling
window.addEventListener('DOMContentLoaded', async ()=>{
  
    const items = await axios.get(`${url}/inventory`)
    console.log(items)
    items.data.forEach(element => {
        showItem(element);
    });


})
