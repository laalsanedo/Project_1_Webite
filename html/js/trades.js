//API ENDPOINTS
const baseURL = "http://localhost:9000/";
const updateURL = "ts/update";
const openpl = "ts/stats/openpl";
const openstatURL = "ts/stats/opentrades";
const closestatURL = "ts/stats/closetrades";
const powerURL = "ts/user/power/";
const openOrderURL = "ts/opentrade/open";
const openwinners = "ts/opentrade/get/winners";
const openlossers = "ts/opentrade/get/losers";
const opentradesall = "ts/opentrade/get/all";
const closewinners = "ts/closetrade/get/winners";
const closelossers = "ts/closetrade/get/losers";
const closetradesall = "ts/closetrade/get/all";
const closeTradeIDURL = "ts/closetrade/close/tradeid";
const closeSymbolURL = "ts/closetrade/close/symbol";
const closeWinnersURL = "ts/closetrade/close/winners";
const closeLosersURL = "ts/closetrade/close/losers";
const closeLatestURL = "ts/closetrade/close/latest";
const closeAllURl = "ts/closetrade/close/all";



//COOKIE VALUE
const cookieValue = getCookieValue();





// on load the function will be called.
window.onload = async function(){
    await updatePrices(cookieValue);
    await updateCards(cookieValue);
    await getAllOpen();
}

document.getElementById('buybutton').addEventListener('click', buyOrder);
document.getElementById('shortbutton').addEventListener('click', shortOrder);

document.getElementById('latest').addEventListener('click', closeLatest);
document.getElementById('symbo1').addEventListener('click', closeSymbol);
document.getElementById('cwinner').addEventListener('click', closeWinners);
document.getElementById('closer').addEventListener('click', closeLosers);
document.getElementById('call').addEventListener('click', closeAll);

document.getElementById('owin').addEventListener('click', getOWinners);
document.getElementById('olos').addEventListener('click', getOLosers);
document.getElementById('oall').addEventListener('click', getAllOpen);
document.getElementById('cwin').addEventListener('click', getCWinners);
document.getElementById('clos').addEventListener('click', getCLossers);
document.getElementById('clall').addEventListener('click', getAllClose);

document.getElementById('logout').addEventListener("click", logout);



// Extracts the key from the cookie
function getCookieValue(){
    return document.cookie.slice((document.cookie.indexOf("=")+1));
}
//Updates the prices in the open table before other content is loaded.
async function updatePrices(cookieValue){

    let response = await fetch(baseURL+updateURL, {
        method: "PUT",
        headers:{
            jwtKey : cookieValue
        }
    });

    
}
//Get all open winners
async function getOWinners(){
    let table = document.getElementById('tablebody');
    table.innerHTML = "";

    let template = null;

    let response = await fetch(baseURL+ openwinners, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();   
    for(let i = 0; i < Object.keys(response).length; i++){
        template = `
            <tr>
            <td>${response[i].orderType}</td>
            <td>${response[i].symbol}</td>
            <td>${response[i].entryPrice}</td>
            <td>${response[i].currentPrice}</td>
            <td>${response[i].numOfShares}</td>
            <td>${response[i].pl}</td>
            </tr>
            `;  
        //adding to the table
        table.innerHTML += template;
    }
}
//Get all open losers
async function getOLosers(){
    let table = document.getElementById('tablebody');
    table.innerHTML = "";
    let template = null;
    let response = await fetch(baseURL+ openlossers, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    for(let i = 0; i < Object.keys(response).length; i++){
        template = `
            <tr>
            <td>${response[i].orderType}</td>
            <td>${response[i].symbol}</td>
            <td>${response[i].entryPrice}</td>
            <td>${response[i].currentPrice}</td>
            <td>${response[i].numOfShares}</td>
            <td>${response[i].pl}</td>
            </tr>
            `;  
        //adding to the table
        table.innerHTML += template;
    }
}
//Get all open trades
async function getAllOpen(){
    let table = document.getElementById('tablebody');
    table.innerHTML = "";
    let template = null;
    let response = await fetch(baseURL+ opentradesall, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    for(let i = 0; i < Object.keys(response).length; i++){
        template = `
            <tr>
            <td>${response[i].orderType}</td>
            <td>${response[i].symbol}</td>
            <td>${response[i].entryPrice}</td>
            <td>${response[i].currentPrice}</td>
            <td>${response[i].numOfShares}</td>
            <td>${response[i].pl}</td>
            </tr>
            `;   
        //adding to the table
        table.innerHTML += template;
    }
}
//Get all close winners
async function getCWinners(){
    let table = document.getElementById('tablebody');
    table.innerHTML = "";
    let template = null;
    let response = await fetch(baseURL+ closewinners, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    for(let i = 0; i < Object.keys(response).length; i++){
        template = `
        <tr>
        <td>${response[i].orderType}</td>
        <td>${response[i].symbol}</td>
        <td>${response[i].entryPrice}</td>
        <td>${response[i].closePrice}</td>
        <td>${response[i].numOfShares}</td>
        <td>${response[i].pl}</td>
        </tr>
        `;
        //adding to the table
        table.innerHTML += template;
    }
}
//Get all close losers
async function getCLossers(){
    let table = document.getElementById('tablebody');
    table.innerHTML = "";
    let template = null;
    let response = await fetch(baseURL+ closelossers, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    for(let i = 0; i < Object.keys(response).length; i++){
        template = `
        <tr>
        <td>${response[i].orderType}</td>
        <td>${response[i].symbol}</td>
        <td>${response[i].entryPrice}</td>
        <td>${response[i].closePrice}</td>
        <td>${response[i].numOfShares}</td>
        <td>${response[i].pl}</td>
        </tr>
        `;   
        //adding to the table
        table.innerHTML += template;
    }
}
//Get all close trades
async function getAllClose(){
    let table = document.getElementById('tablebody');
    table.innerHTML = "";
    let template = null;
    let response = await fetch(baseURL+ closetradesall, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    for(let i = 0; i < Object.keys(response).length; i++){
        template = `
        <tr>
        <td>${response[i].orderType}</td>
        <td>${response[i].symbol}</td>
        <td>${response[i].entryPrice}</td>
        <td>${response[i].closePrice}</td>
        <td>${response[i].numOfShares}</td>
        <td>${response[i].pl}</td>
        </tr>
        `;
        //adding to the table
        table.innerHTML += template;
    }
}
//Filling the card data
async function updateCards(){
    let response = await fetch(baseURL+openstatURL, {
        method: "GET",
        headers:{
            jwtKey : cookieValue
        }
    });

    let response1 = await fetch(baseURL+powerURL, {
        method: "GET",
        headers:{
            jwtKey : cookieValue
        }
    });

    response = await response.json();
    response1 = await response1.text();


    document.getElementById('opentrades').innerHTML = response.openTrades;
    if (await response.openPL == 0){
        document.getElementById('plreturn').innerHTML = ((response.openPL/response.investment)*100).toFixed(2)+ "%";
    }
    else{
        document.getElementById('plreturn').innerHTML = "0%";
    }
    
    document.getElementById('currentpower').innerHTML = (parseFloat(response1)+response.openPL).toFixed(2);
    document.getElementById('nobuys').innerHTML = response.buy;
    document.getElementById('noshort').innerHTML = response.shorts;
}
//making a trade
async function buyOrder(){
    let symbol = document.getElementById('symbol').value;
    let orderSize = parseInt(document.getElementById('orderSize').value);
    console.log(symbol, orderSize);
    
    
    let data = {
        'symbol' : symbol,
        'numOfShares' : orderSize,
        'orderType' : 'buy'
    }
    let response = await fetch(baseURL+openOrderURL, {
        method : "POST",
        headers:{
            'Content-Type' : 'application/json',
            jwtKey : cookieValue
        },
        body: JSON.stringify(data)
        }
    );
    let result = await response.text();
    if(result == 'true'){
        window.alert("Trade Placed Succesfully: ", symbol, " units:  ", orderSize, " type: buy");
    }
    else if(result == 'false'){
        window.alert("you do not have enough funds currently try again.");
    }
    else{
        window.alert("Something went wrong on our side. our apologize, please try again.");
    }
}
//making a short trade
async function shortOrder(){
    let symbol = document.getElementById('symbol').value;
    let orderSize = document.getElementById('orderSize').value;

    let data = {
        "symbol": symbol,
        "numOfShares": parseInt(orderSize),
        "orderType" : "sell"
    }
    
    let response = await fetch(baseURL+openOrderURL, {
        method : "POST",
        headers: {
            jwtKey : cookieValue
        },
        body: JSON.stringify(data)
    });
    let result = await response.text();
    if(result == 'true'){
        window.alert("Trade Placed Succesfully: ", symbol, " units:  ", orderSize, " type: sell");
    }
    else if(result == 'false'){
        window.alert("you do not have enough funds currently try again.");
    }
    else{
        window.alert("Something went wrong on our side. our apologize, please try again.");
    }
}
//closing trade based on symbol
async function closeSymbol(){
    let symbol1 = document.getElementById('csymbol').value;
    let response = await fetch(baseURL+closeSymbolURL, {
        method : "DELETE",
        headers:{
            jwtKey : cookieValue,
            symbol : symbol1
        }
    });

    let result = await response.text();
    if(result == 'true'){
        window.alert("Trade Closed Succesfully");
    }
    else if(result == 'false'){
        window.alert("Something went wrong on our side. we are sorry");
    }
}
//closing trade based on winners
async function closeWinners(){
    let response = await fetch(baseURL + closeWinnersURL, {
        method : "DELETE",
        headers:{
            jwtKey : cookieValue
        }
    });

    let result = await response.text();
    if(result == 'true'){
        window.alert("Trade Closed Succesfully");
    }
    else if(result == 'false'){
        window.alert("Something went wrong on our side. we are sorry");
    }
}
//closing trade based on losers
async function closeLosers(){
    let response = await fetch(baseURL + closeLosersURL, {
        method : "DELETE",
        headers:{
            jwtKey : cookieValue
        }
    });

    let result = await response.text();
    if(result == 'true'){
        window.alert("Trade Closed Succesfully");
    }
    else if(result == 'false'){
        window.alert("Something went wrong on our side. we are sorry");
    }
}
//closing trade based on latest
async function closeLatest(){
    let response = await fetch(baseURL + closeLatestURL, {
        method : "DELETE",
        headers:{
            jwtKey : cookieValue
        }
    });

    let result = await response.text();
    if(result == 'true'){
        window.alert("Trade Closed Succesfully");
    }
    else if(result == 'false'){
        window.alert("Something went wrong on our side. we are sorry");
    }
}
//closing trade based on all
async function closeAll(){
    let response = await fetch(baseURL + closeAllURl, {
        method : "DELETE",
        headers:{
            jwtKey : cookieValue
        }
    });

    let result = await response.text();
    if(result == 'true'){
        window.alert("Trade Closed Succesfully");
    }
    else if(result == 'false'){
        window.alert("Something went wrong on our side. we are sorry");
    }
}

function logout(){
    document.cookie = "jwtKey=;";
  }