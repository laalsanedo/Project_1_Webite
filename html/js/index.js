
async function check(){
    let option = document.getElementById("selection").checked;
    if(option === true){
        await newaccount();
    }
    else{
        await login();
    }
}

async function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const url = "http://localhost:9000/ts/login";
    let response = await fetch(url, {
        method: "POST",
        headers:{
            username: username,
            password: password
        }
    });
    if(await response.status == 200){
       document.cookie = "jwtKey="+await response.text();
       document.location.href = "dashboard.html";
    }
    else{
        document.getElementById('loginform').reset();
    }
}  

async function newaccount(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const url = "http://localhost:9000/ts/login/newuser";
    let response = await fetch(url, {
        method: "POST",
        headers:{
            username: username,
            password: password
        }
    });
    if(await response.status == 200){
        document.cookie = "jwtKey="+await response.text();
        document.location.href = "dashboard.html";

    }
    else{
        document.getElementById('loginform').reset();
    }
}  