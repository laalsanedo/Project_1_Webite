//API ENDPOINTS
const baseURL = "http://localhost:9000/";
const updateURL = "ts/update";
const openpl = "ts/stats/openpl";
const openstatURL = "ts/stats/opentrades";
const closestatURL = "ts/stats/closetrades";
const powerURL = "ts/user/power/";

const openwinners = "ts/opentrade/get/winners";
const openlossers = "ts/opentrade/get/losers";
const opentradesall = "ts/opentrade/get/all";
const closewinners = "ts/closetrade/get/winners";
const closelossers = "ts/closetrade/get/losers";
const closetradesall = "ts/closetrade/get/all";




//COOKIE VALUE
const cookieValue = getCookieValue();

// on load the function will be called.
window.onload = async function(){
    await updatePrices(cookieValue);
    await printTables(cookieValue);
    await updateCards(cookieValue);
    
}

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
async function getOWinners(cookieValue){
    let response = await fetch(baseURL+ openwinners, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    return response;
}
//Get all open losers
async function getOLosers(cookieValue){
    let response = await fetch(baseURL+ openlossers, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    return response;
}
//Get all open trades
async function getAllOpen(cookieValue){
    let response = await fetch(baseURL+ opentradesall, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    return response;
}
//Get all close winners
async function getCWinners(cookieValue){
    let response = await fetch(baseURL+ closewinners, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    return response;
}
//Get all close losers
async function getCLossers(cookieValue){
    let response = await fetch(baseURL+ closelossers, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    return response;
}
//Get all close trades
async function getAllClose(cookieValue){
    let response = await fetch(baseURL+ closetradesall, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response = await response.json();
    console.log(response);
    return response;
}



//Filling the card data
async function updateCards(cookievalue){
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
    document.getElementById('plreturn').innerHTML = ((response.openPL/response.investment)*100).toFixed(2)+ "%";
    document.getElementById('currentpower').innerHTML = (parseFloat(response1)+response.openPL).toFixed(2);
    document.getElementById('nobuys').innerHTML = response.buy;
    document.getElementById('noshort').innerHTML = response.shorts;
}


//Printing the table
async function printTables(cookieValue){
    let response = null;
    let selection = 6;
    switch(selection){
        case 1:{
            response = await getOWinners(cookieValue);
            break;
        }
        case 2:{
            response = await getOLosers(cookieValue);
            break;
        }
        case 3:{
            response = await getAllOpen(cookieValue);
            break;
        }
        case 4:{
            response = await getCWinners(cookieValue);
            break;
        }
        case 5:{
            response = await getCLossers(cookieValue);
            break;
        }
        case 6:{
            response = await getAllClose(cookieValue);
            break;
        }
    }
        let table = document.getElementById("tradeinfotab");

        let template = null;

        for(let i = 0; i < Object.keys(response).length; i++){
            if(selection<=3){
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
            }
            else{
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
            }   
            //adding to the table
            table.innerHTML += template;
        }

}