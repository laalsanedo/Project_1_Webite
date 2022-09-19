//API ENDPOINTS
const baseURL = "http://localhost:9000/";
const balanceURL = "ts/user/balance/";
const powerURL = "ts/user/power/";
const openpl = "ts/stats/openpl";
const opentradesall = "ts/opentrade/get/all";
const closetradesall = "ts/closetrade/get/all";
const updateURL = "ts/update";
const openstatURL = "ts/stats/opentrades";
const closestatURL = "ts/stats/closetrades";


//COOKIE VALUE
const cookieValue = getCookieValue();

// on load the function will be called.
window.onload = async function(){
    await updatePrices(cookieValue);
    await updateTables(cookieValue);
    await updateAccountInfo(cookieValue); 
    await winlosechart(cookieValue);  
}

// Extracts the key from the cookie
function getCookieValue(){
    return document.cookie.slice((document.cookie.indexOf("=")+1));
}

// function to update the prices at once when the page is loaded so that there is no threading issue.
async function updatePrices(cookieValue){

    let response = await fetch(baseURL+updateURL, {
        method: "PUT",
        headers:{
            jwtKey : cookieValue
        }
    });
}

// funtion to update the cards.
async function updateAccountInfo(cookievalue){


    const balres = await fetch((baseURL+balanceURL), {
        method : "GET",
        headers: {
            jwtKey : cookieValue
        }
    });

    const powres = await fetch((baseURL+powerURL), {
        method: "GET",
        headers:{
            jwtKey: cookieValue
        }
    });

    const openplres = await fetch((baseURL+openpl), {
        method : "GET",
        headers: {
            jwtKey : cookieValue
        }
    });
    //Getting and Setting the balance response
    let balance =  await balres.text();
    document.querySelector('#balnum').innerHTML = parseFloat(balance).toFixed(2);


    //Getting and Setting the buying power response
    let power = await powres.text();
    document.querySelector('#pownum').innerHTML = parseFloat(power).toFixed(2);

    //Getting and Setting the total investment
    document.querySelector('#invnum').innerHTML = (balance-power).toFixed(2);

    //Getting and Setting the OpenPL
    let pl = await openplres.text();
    document.querySelector('#plnum').innerHTML = parseInt(pl).toFixed(2);
}

// Prints the table data.
async function updateTables(cookievalue){

    //getting data
    let response1 = await fetch(baseURL+opentradesall, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response1 = await response1.json();

    let response2 = await fetch(baseURL+closetradesall, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    response2 = await response2.json();

    //adding data
    let table1 = document.getElementById("opentab");
    for(let i = 0; i < Object.keys(response1).length; i++){
        let template = `
        <tr>
            <td>${response1[i].orderType}</td>
            <td>${response1[i].symbol}</td>
            <td>${response1[i].entryPrice}</td>
            <td>${response1[i].currentPrice}</td>
            <td>${response1[i].numOfShares}</td>
            <td>${response1[i].pl}</td>
        </tr>
        `;
        //adding to the table
        table1.innerHTML += template;
        if(i ==4)
            break;
    }

    let table2 = document.getElementById("closetab");
    for(let i = 0; i < Object.keys(response2).length; i++){
        let template = `
        <tr>
            <td>${(response2[i].orderType)}</td>
            <td>${response2[i].symbol}</td>
            <td>${response2[i].entryPrice}</td>
            <td>${response2[i].closePrice}</td>
            <td>${response2[i].numOfShares}</td>
            <td>${response2[i].pl}</td>
        </tr>
        `;
        //adding to the table
        table2.innerHTML += template;
        if(i ==4)
            break;
    }
}

//function to print the winloes chart.
async function winlosechart(cookieValue){

    let openstatres = await fetch(baseURL+openstatURL, {
        method : "GET",
        headers: {
            jwtKey: cookieValue
        }
    });
    let closedstatres = await fetch(baseURL+closestatURL, {
        method: "GET",
        headers: {
            jwtKey: cookieValue
        }
    });

    openstatres = await openstatres.json();
    closedstatres = await closedstatres.json();


    var options = {
        series: [{
        name: 'WINNERS',
        data: [openstatres.winners, closedstatres.cWinners]
      }, {
        name: 'LOSERS',
        data: [openstatres.losers, closedstatres.cLosers]
      }],
        chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: false
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        },
      },
      xaxis: {
        type: 'text',
        categories: ['Open', 'Closed'],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
      };
    var chart = new ApexCharts(document.querySelector(".winlosechart"), options);
    chart.render();

    var options1 = {
        series: [{
        name: 'WINNERS',
        data: [openstatres.buyW, closedstatres.cBuyW]
      }, {
        name: 'LOSERS',
        data: [openstatres.buyL, closedstatres.cBuyL]
      }],
        chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: false
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        },
      },
      xaxis: {
        type: 'text',
        categories: ['Open', 'Closed'],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
      };

    var chart1 = new ApexCharts(document.querySelector(".buyshortchart"), options1)
    chart1.render(); 

}

