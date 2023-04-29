const url = "http://localhost:3009";

//Util functions
function showItem(item){
    document.getElementById("inventory-body").innerHTML += `<tr id="${item.id}-row"><th scope="row">${item.id}</th><td>${item.amount}</td> <td>${item.desc}</td> <td>${item.type}</td><td><button class="btn btn-secondary" onclick="editItem(${item.id})">Edit</button></td><td><button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button></td></tr>`
}

