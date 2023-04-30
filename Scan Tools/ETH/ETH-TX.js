// ==UserScript==
// @name         ETH/TX
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       guckt
// @match        https://etherscan.io/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    var tickers = [];
    var tokens = [];
    var addresses = [];

    var APIpullTotal = 3500;
    var APIdisplayed = 3000;

    let filteredAddresses = [];
    var pairAddress = "";

    var address = [];

    var decimal;

    var ignore =['0xdac17f958d2ee523a2206206994597c13d831ec7', //TETHER
                 '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', //USDC
                 '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', //WBTC
                 '0x4fabb145d64652a948d72533023f6e7a623c7c53', //BUSD
                 '0x6b175474e89094c44da98b954eedeac495271d0f', //DAI
                 '0xa47c8bf37f92abed4a126bda807a7b7498661acd', //UST
                 '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', //WETH
                 '0x0000000000000000000000000000000000000000', //Burn
                 '0x0000000000000000000000000000000000000001', //Burn
                 '0x000000000000000000000000000000000000dead']; //Burn

    var contract = false;

    const loader = document.createElement("div");

    if (TransactionType())
    return;

    Loading(loader);

    //for (let i = 0; i < 10; i++) {
        let totalSelector = document.getElementsByClassName("d-flex align-items-center gap-0.5")

        console.log(totalSelector)

        for (let k = 0; k < totalSelector.length; k++) {
            //if (k == totalSelector.length- 1) {

                var href = $(totalSelector[k]).attr('href');
                console.log(href)

                var address = jQuery.trim(href).substring(7)
                .trim(this);
                console.log(address)

                address = address.slice(0,42)

                if (ignore.indexOf(address) == -1)
                {
                    var i = 1;
                    var ticker
                    var token
                    var element = totalSelector[k].outerHTML;

                    //console.info("round " + i + ": " + totalSelector[k].childNodes.length);
                    if ((totalSelector[k].childNodes.length) == 1) {
                        token = element.substring(
                            element.indexOf(">") + 1,
                            element.lastIndexOf("(")
                        );
                        ticker = element.substring(
                            element.indexOf("(") + 1,
                            element.lastIndexOf(")")
                        );
                    }
                    else if ((totalSelector[k].childNodes.length) == 2){
                        token = totalSelector[k].childNodes[0].getAttribute("data-original-title");
                        ticker = element.substring(
                            element.indexOf("(") + 1,
                            element.lastIndexOf(")")
                        );
                    }
                    else if ((totalSelector[k].childNodes.length) == 3){
                        token = element.substring(
                            element.indexOf(">") + 1,
                            element.lastIndexOf("(")
                        );
                        ticker = totalSelector[k].childNodes[1].getAttribute("data-original-title");
                    }
                    else if ((totalSelector[k].childNodes.length) == 4){
                        token = totalSelector[k].childNodes[0].getAttribute("data-original-title");
                        ticker = totalSelector[k].childNodes[2].getAttribute("data-original-title")
                    }

                    tickers[i] = ticker;
                    tokens[i] = token;
                    addresses[i] = address;
                    var clickCount = 0;

                    $(totalSelector[k].parentNode).append('<input type="button" value="X" id="BT'+i+'" >')
                    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
                    $("#BT"+i).css("margin", "0px 6px");
                    $("#BT"+i).css("border-radius", "16px");
                    $("#BT"+i).css("color", "DodgerBlue");
                    $("#BT"+i).css("background", "white");
                    $("#BT"+i).css("border-color", "DodgerBlue");
                    $("#BT"+i).click(function(){

                      if (clickCount % 3 == 0)
                        window.open('https://twitter.com/search?q=%22' + addresses[i] + '%22&src=typed_query&f=live');
                      else if (clickCount % 3 == 1)
                        window.open('https://twitter.com/search?q=%22' + tokens[i] + '%22&src=typed_query&f=live');
                      else if (clickCount % 3 == 2)
                        window.open('https://twitter.com/search?q=%22' + '$' + tickers[i] + '%20until%3A2023-04-15%20since%3A2023-04-04&src=typed_query&f=live');
                      clickCount++;
                      /*
                      window.open('https://web.telegram.org/z/');
                      window.open('https://twitter.com/search?q=%22' + addresses[i] + '%22&src=typed_query&f=live');
                      window.open('https://twitter.com/search?q=%22' + tokens[i] + '%22&src=typed_query&f=live');
                      window.open('https://twitter.com/search?q=%22' + '$' + tickers[i] + '%22&src=typed_query&f=live');
                      */
                      //}
                      //window.location = current;
                    });
                }
            }
        //}
    //}



    var itemNumber = 0;
    var removeUndefined = addresses.filter(item => { return item !== undefined });
    var removeDuplicates = [...new Set(removeUndefined)]
    filteredAddresses = removeDuplicates.filter(function (item) {
        return item.indexOf("s") !== 0;
    });

    console.log(filteredAddresses);
  if (filteredAddresses.length == 0)
    {
      Progress("No tokens exchanged");
      throw new Error();
    }

  Progress("Creating HUD...");
  Chart(filteredAddresses);
  GetPair(filteredAddresses, pairAddress, contract, APIpullTotal, APIdisplayed, ignore);
  Purchase(filteredAddresses, itemNumber)

});

function Chart(filteredAddresses){

  if (filteredAddresses) {
        $("#ContentPlaceHolder1_maintable > div:nth-child(14) > div.col-md-3.font-weight-bold.font-weight-sm-normal.mb-1.mb-md-0")
          .append('<input type="button" value="NEXT" id="NB" >')
        //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
        $("#NB").css("position", "absolute").css("bottom", 5).css("left", 10);
        //$("#NB").css("border-radius", "15px")
        $("#NB").css("margin", "0px 6px");
        $("#NB").css("width", "100px");
        $("#NB").css("color", "DodgerBlue");
        $("#NB").css("background", "white");
        $("#NB").css("border-color", "DodgerBlue");
        $("#NB").click(function(){
            itemNumber = itemNumber + 1;
            itemNumber = itemNumber % filteredAddresses.length;
            Chart(filteredAddresses, itemNumber);
        });
    }

    if (filteredAddresses) {
        var chart = document.createElement("iframe");
        chart.setAttribute("src", "https://dexscreener.com/ethereum/" + filteredAddresses);
        chart.setAttribute("id", "dex");

        chart.style.width = "100%";
        chart.style.height = "800px";

        if (document.querySelector("#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(15)")){
            document.querySelector("#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(15)").replaceWith(chart);
        }
        else {
            document.querySelector("#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(15)").before(chart);
        }

        var rug = document.createElement("iframe");
            rug.setAttribute("src", "https://www.cyberscope.io/cyberscan?network=ETH&address=" + filteredAddresses);
            rug.style.width = "100%";
            rug.style.height = "870px";

            $("#dex").after(rug);

    }

    Progress("Grabbing Pair, Token & ETH Price...");
}

async function GetPair(filteredAddresses, pairAddress, contract, APIpullTotal, APIdisplayed, ignore)
{

    const query = `
{
  ethereum(network: ethereum) {
    pairs: dexTrades(
      baseCurrency: {is: "`+filteredAddresses+`"}
      options: {desc: "trades", limit: 10}
    ) {
      poolToken: smartContract {
        address {
          address
        }
      }
      exchange {
        fullName
      }
      pair: quoteCurrency {
        address
        symbol
      }
      trades: count
    }
     token: dexTrades(
      options: {asc: ["block.height"], limit: 1}
      exchangeName: {in: ["Uniswap"]}
      baseCurrency: {is: "`+filteredAddresses+`"}
    ) {
      block {
        height
        timestamp {
          unixtime
        }
      }
      baseCurrency {
        decimals
        symbol
        name
      }
    }
     priceBNB: dexTrades(
      options: {desc: ["block.height"], limit: 1}
      exchangeName: {in: ["Uniswap"]}
      baseCurrency: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}
      quoteCurrency: {is: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"}
    ) {
      block {
        height
        timestamp {
          unixtime
        }
      }
      baseCurrency {
        decimals
        symbol
      }
      quotePrice
    }
  }
}
    `;

    const url = "https://graphql.bitquery.io/";
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          "X-API-KEY": "BQYdjt4ocpcbVMcZEdl1e00T4V2ewXik"
          //"address": filteredAddresses
        },
        body: JSON.stringify({
            query
        })
    };

    var res = await fetch(url, opts)
        .then(res => res.json())
        .catch((error) => {
        console.log(error);
        Progress("Failed grabbing pair")
        });
        //.catch(console.error);
        console.log(res)

        pairAddress = (res.data.ethereum.pairs["0"].poolToken.address.address)
        var pairToken = (res.data.ethereum.pairs["0"].pair.address)
        var priceBNB = (res.data.ethereum.priceBNB["0"].quotePrice).toFixed(20)
        console.log(pairToken)
        var decimal = (res.data.ethereum.token["0"].baseCurrency.decimals)
        var startTime = (res.data.ethereum.token["0"].block.timestamp.unixtime)
        var name = (res.data.ethereum.token["0"].baseCurrency.name)
        console.log(name);
        //if (res.data.ethereum.price["0"].quotePrice  !== null)


        var price = await TokenPrice(filteredAddresses, pairToken);
        var tokenPrice;

        if ((pairToken == 0xdac17f958d2ee523a2206206994597c13d831ec7) ||
            (pairToken == 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) ||
            (pairToken == 0x4fabb145d64652a948d72533023f6e7a623c7c53))
          tokenPrice = price
        else if (pairToken == 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
          tokenPrice = priceBNB * price

       console.log("TOKEN ADDRESS: " + filteredAddresses);
       console.log("TOKEN PRICE: " + tokenPrice);
       console.log("PAIR ADDRESS: " + pairAddress);
       console.log("ETH PRICE: " + priceBNB);

       console.timeEnd("Finished First Fetch");


      if ((pairAddress == filteredAddresses)||(pairAddress == '0x0000000000000000000000000000000000000000'))
        {
          contract = true;
          console.log("Restarting GetPair...");
          //Progress("Finding Block Fetch...");
          GetPair(filteredAddresses, pairAddress, contract);
        }

      Progress("Filtering " + res.data.ethereum.pairs["0"].trades + " Addresses, Holdings & Times...");

      if (!contract)
        GetData(filteredAddresses, pairAddress, decimal, startTime, tokenPrice, priceBNB, name, APIpullTotal, APIdisplayed, ignore);
}

async function TokenPrice(filteredAddresses, tokenAddress)
{

  Progress("Calculating Token Price...");

  const query = `
{
  ethereum(network: ethereum) {
    price: dexTrades(
      options: {desc: ["block.height"], limit: 1}
      exchangeName: {in: ["Uniswap"]}
      baseCurrency: {is: "`+filteredAddresses+`"}
      quoteCurrency: {is: "`+tokenAddress+`"}
    ) {
      block {
        height
        timestamp {
          unixtime
        }
      }
      baseCurrency {
        decimals
        symbol
        name
      }
      quotePrice
    }
  }
}
    `;

    const url = "https://graphql.bitquery.io/";
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          "X-API-KEY": "BQYlv5U1AuogoWUB4jNWVj3nYJ5mzt7K"
          //"address": filteredAddresses
        },
        body: JSON.stringify({
            query
        })
    };

    var res = await fetch(url, opts)
        .then(res => res.json())
        .catch((error) => {
        console.log(error);
        Progress("Failed token price calc")
        });
        console.log(res)
    var tokenPrice = (res.data.ethereum.price["0"].quotePrice).toFixed(20)

    return tokenPrice;

}
async function GetData(filteredAddresses, pairAddress, decimal, startTime, tokenPrice, priceBNB, name, APIpullTotal, APIdisplayed, ignore)
{
 const query = `
  {
    ethereum(network: ethereum) {
      transfers(
        currency: {is: "`+filteredAddresses+`"}
        options: {asc: ["block.height"], offset: 0, limit: `+APIpullTotal+`}
      ) {
        transaction {
          hash
        }
        block {
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
            unixtime
          }
          height
        }
        amount
        receiver {
          uniq: address
          smartContract {
            contractType
          }
        }
      }
    }
  }
    `;

    const url = "https://graphql.bitquery.io/";
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          "X-API-KEY": "BQYlv5U1AuogoWUB4jNWVj3nYJ5mzt7K"
          //"address": filteredAddresses
        },
        body: JSON.stringify({
            query
        })
    };

    var res = await fetch(url, opts)
      .then(res => res.json())
      .catch((error) => {
      console.log(error);
      Progress("Failed filtering token")
      });
      console.log(res)

      var totalDisplay;
      //if (Object.values(res.data.ethereum.transfers).length < APIdisplayed)
      //  totalDisplay = Object.values(res.data.ethereum.transfers).length;
      //else
      totalDisplay = Object.values(res.data.ethereum.transfers).length

      if (totalDisplay >= APIdisplayed)
        totalDisplay = APIdisplayed

      console.log(totalDisplay);



      var tempTokenMatches = [];
      var tempTokenTimes = [];
      var tempTokenOrder = [];
      var tempTokenAmount = [];

      for(var i = 0; i < totalDisplay; i++) {

        //console.log(res.data.ethereum.transfers[i].receiver.smartContract.contractType, i)
        if (res.data.ethereum.transfers[i].receiver.smartContract.contractType == undefined)
          {
            var tempAdd = res.data.ethereum.transfers[i].receiver.uniq
            if (!tempTokenMatches.includes(tempAdd) && !ignore.includes(tempAdd))
              {
                tempTokenMatches.push(tempAdd)
                tempTokenTimes.push(res.data.ethereum.transfers[i].block.timestamp.unixtime)
                tempTokenOrder.push(i)
                tempTokenAmount.push(res.data.ethereum.transfers[i].amount)
              }
          }
      }

      //console.log(tempTokenMatches)
      //console.log(tempTokenTimes)
      //console.log(tempTokenOrder)
      //console.log(tempTokenAmount)

      var scanTotal = tempTokenMatches.length;
      console.log(scanTotal)
      console.timeEnd("Finished Block Fetch");
      Progress("Fetching Master List...");

      //const masterlistfull = await fetch("https://raw.githubusercontent.com/gabethomco/Masterlist/main/masterlistfull.json").then(masterlistfull => masterlistfull.json());
      const masterlistfull = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1vwndKfmF9si3_87l0Q9VtksmLA80z3gEKJ6G6kKe3Ag/values/Sheet1?alt=json&key=AIzaSyCA-O4oevl25zPwR8_3hl6KlGrXrpYOScw").then(masterlistfull => masterlistfull.json());
      //console.log(masterlistfull)
      var sings = [];
      var dupes = [];
      var trips = [];
      var quads = [];
      var quints = [];
      var extra = []

      for(let value of masterlistfull.values){
        for(let matchMaker of Object.values(value)){
          if (matchMaker != "")
            if(quints.includes(matchMaker))
              extra.push(matchMaker);
              //console.log("based alert: " +matchMaker)
            else if(quads.includes(matchMaker))
              quints.push(matchMaker);
            else if(trips.includes(matchMaker))
              quads.push(matchMaker);
            else if(dupes.includes(matchMaker))
              trips.push(matchMaker);
             else if(sings.includes(matchMaker))
              dupes.push(matchMaker)
            else
              sings.push(matchMaker);
        }
      }
      //console.log(sings);
      //console.log(dupes.length);
      //console.log(trips);
      //console.log(quads);
      //console.log(quints);

      var tokenMatches = [];
      var tokenTimes = [];
      var tokenOrder = [];
      var tokenAmount = [];

      for(var i = 0; i < scanTotal; i++) {

          if (dupes.includes(tempTokenMatches[i]))
            {
              tokenMatches.push(tempTokenMatches[i])
              tokenTimes.push(tempTokenTimes[i])
              tokenOrder.push(tempTokenOrder[i])
              tokenAmount.push(tempTokenAmount[i])
            }
      }

    var values = tempTokenMatches.slice(0,500);

    var realname = name.split(' ')[0]
    values.unshift(realname.toUpperCase());

  GoogleSheetDB(values);
  GenerateTable(tokenMatches, tokenTimes, tokenOrder, tokenAmount, scanTotal, filteredAddresses, tokenPrice, priceBNB,masterlistfull, pairAddress, decimal, startTime, ignore, dupes);
  TopHolders(filteredAddresses);
    //Friends(tokenMatches, masterlistfull, ignore, dupes);
}
async function GoogleSheetDB(values)
{
  var clickCount = -1;

  $('#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(3) > div.col-md-9').before('<input type="button" value=" COPY " id="DB">')
    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
    $("#DB").css("margin", "0px 6px");
    $("#DB").css("margin-left", "-75px");

    $("#DB").css("width", "70px");
    $("#DB").css("border-radius", "16px");
    $("#DB").css("color", "DodgerBlue");
    $("#DB").css("background", "white");
    $("#DB").css("border-color", "DodgerBlue");
    $("#DB").click(function(){
      if (clickCount == -1){
        $("#DB").attr("value", "1ST?");
          openurl(values);
      }
      if (clickCount == 0){
          $("#DB").attr("value", "25");
          openurlFirstTransactions(values.slice(1,10));
      }
      else if (clickCount == 1){
        $("#DB").attr("value", "50");
        openurlFirstTransactions(values.slice(10,25));
      }
      else if (clickCount == 2){
        $("#DB").attr("value", "DONE");
        openurlFirstTransactions(values.slice(25,50));
      }
      else if (clickCount == 3){
        $("#DB").attr("value", "DONE");
        openurlFirstTransactions(values.slice(50,100));
      }
      clickCount++;
    });
}

async function openurl(values)
{
    await navigator.clipboard.writeText(values);
    window.open('https://convert.town/comma-separated-list-to-column');
    await new Promise(r => setTimeout(r, 400));
    //$("#DB").attr("value", "COPY");

}

async function openurlFirstTransactions(values)
{
  for (let i in values){
    window.open("https://etherscan.io/tokentxns?a=" +  values[i]);
    if (i % 10) await new Promise(r => setTimeout(r, 300));
  }
}

async function TopHolders(filteredAddresses)
{

 const query = `
      query MyQuery{
  EVM(dataset: combined, network: eth) {
    BalanceUpdates(
      orderBy: {descendingByField: "balance_wallet"}
      limit: {count: 100}
      where: {Currency: {SmartContract: {is: "`+filteredAddresses+`"}}}
    ) {
      balance_wallet: sum(of: BalanceUpdate_Amount)
      BalanceUpdate {
        Address
      }
    }
  }
}

`;

  var settings = {
     "url": "https://streaming.bitquery.io/graphql",
     "method": "POST",
     "timeout": 0,
     "headers": {
        "Content-Type": "application/json",
        "X-API-KEY": "BQYlv5U1AuogoWUB4jNWVj3nYJ5mzt7K"
     },
     "data": JSON.stringify({
        query
     }),
  };
  var res;
  await $.ajax(settings).done(function (response) {
     console.log(response);
    res = response;
  });

  var topHolders =[]


  for(var i = 1; i < 100; i++) {
    //console.log(Key(i))
    var tempAdd = res.data.EVM.BalanceUpdates[i].BalanceUpdate.Address;
    //var tempBalance = await fetch("https://api.etherscan.io/api?module=account&action=txlist&address=" + tempAdd +
    //"&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=" + await Key(i)).then(tempBalance => tempBalance.json());
    //console.log(tempBalance.result.length)
    //console.log(tempAdd)
    //if (tempBalance.result.length < 10000){
      topHolders.push("https://etherscan.io/tokentxns?a=" + tempAdd)
    //}
  }


  var clickCount = -1;

  $('#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(3) > div.col-md-9').before('<input type="button" value=" HOLD " id="HB">')
  //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
  $("#HB").css("margin", "0px 6px");
  $("#HB").css("width", "70px");
  $("#HB").css("border-radius", "16px");
  $("#HB").css("color", "DodgerBlue");
  $("#HB").css("background", "white");
  $("#HB").css("border-color", "DodgerBlue");
  $("#HB").click(function(){
    $("#HB").attr("value", "OPENED");
    if (clickCount == -1)
        $("#HB").attr("value", "SURE?");
    if (clickCount == 0){
        $("#HB").attr("value", "25");
        openurlHolders(topHolders.slice(0,10));
    }
    else if (clickCount == 1){
      $("#HB").attr("value", "50");
      openurlHolders(topHolders.slice(10,25));
    }
    else if (clickCount == 2){
      $("#HB").attr("value", "DONE");
      openurlHolders(topHolders.slice(25,50));
    }
    else if (clickCount == 3){
      $("#HB").attr("value", "DONE");
      openurlHolders(topHolders.slice(50,100));
    }
    clickCount++;
  });
}

async function openurlHolders(topHolders)
{
  for (let i in topHolders){
    window.open(topHolders[i]);
    if (i % 10) await new Promise(r => setTimeout(r, 1000));
  }
}

async function GoogleSheet(spreadsheetId, range, valueInputOption, _values, callback) {

// Client ID and API key from the Developer Console
  var my_awesome_script = document.createElement('script');
  my_awesome_script.setAttribute('src','https://accounts.google.com/gsi/client');
  document.head.appendChild(my_awesome_script);

  var CLIENT_ID = '385555558551-lqqrlia335qcfkdngvpkpqso8vvs7et8.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyDzyxmEAgEMqCbUD58np0b-uBmXcs_E0iQ';
  var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
  var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  handleClientLoad();
 function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }


  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      console.log("fuck2")

       return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1vwndKfmF9si3_87l0Q9VtksmLA80z3gEKJ6G6kKe3Ag',
      range: 'Sheet1!A1:AA500', // for example: List 1!A1:B6
    })
    }).then((response) => {

     console.log("fuck"+response.result.values)

     let values = [
      [

      ],
      // Additional rows ...
      ];
      values = _values;
      const body = {
        values: values,
      };
      try {
        gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: spreadsheetId,
          range: 'Sheet1!A1:AAA500',
          valueInputOption: valueInputOption,
          resource: body,
          insertDataOption: 'INSERT_ROWS',
        }).then((response) => {
          const result = response.result;
          console.log("fuck"+result);
          console.log(`${result.updates.updatedCells} cells appended.`);
          if (callback) callback(response);
        });
      } catch (err) {
        document.getElementById('content').innerText = err.message;
        console.log(err);

        return;
      }
      // Listen for sign-in state changes.        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    });
  }
};

async function GenerateTable(tokenMatches, tokenTimes, tokenOrder, tokenAmount, scanTotal, filteredAddresses, tokenPrice, priceBNB, masterlistfull, pairAddress, decimal, startTime, ignore, dupes){

  const thisAddress = document.querySelector("#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(10) > div.col-md-9 > div > span > a").innerHTML.toLowerCase();
  //const thisAddress = '0xBf2D5d8eBF05947245B3D7f38b2776A6a49710DD';
  //var myDate = new Date(earliestDate *1000);
  //var startTime = epochMatch[0];
  Progress("Finding Project Matches...")

  var projectMatches = RelatedProjects(tokenMatches, masterlistfull);

  Progress("Generating Table...")

  var headers = ['#', 'wallet', 'after', 'date', 'bal', 'team', '$'];

  var myTableDiv = document.querySelector("#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > hr:nth-child(7)");
  var table = document.createElement('TABLE');

  table.style.borderCollapse = 'separate';
  table.style.borderSpacing = '4px';
  //table.style.textAlign = 'center';
  table.style.overflowX = 'scroll';
  table.width = '100%';
  table.style.color = 'black';

  var caption = table.createCaption();
  caption.style.whiteSpace =  'normal';
  caption.style.overflowX = 'auto';
  table.id = "table1";

  caption.innerHTML = tokenMatches.length + " matches of  " + scanTotal  + " addresses scanned. " + "TOKEN: " + filteredAddresses + " PAIR: " + pairAddress;
  //console.log(matchHoldings);
  var APIkey;

  for(var i = 0; i < tokenMatches.length; i++) {
    if (i % 15) await new Promise(r => setTimeout(r, 12));
      var row = table.insertRow(i);
      row.insertCell(0).innerHTML = tokenOrder[i];
      if  (tokenMatches[i] == thisAddress)
      row.insertCell(1).innerHTML = thisAddress.slice(0,5);
        else
      row.insertCell(1).innerHTML = '<a href="https://etherscan.io/address/' + tokenMatches[i] +'">' + tokenMatches[i].slice(0,5) + '..' +'</a>';
      //row.insertCell(1).innerHTML = new Date((epoc
      //hMatch[i]- firstTransaction)*1000).toLocaleTimeString('de-DE', {timeZone: 'UTC'});
      var time = tokenTimes[i]- startTime
      row.insertCell(2).innerHTML = Timer(time);
      var date = new Date(tokenTimes[i] *1000).toUTCString();
      row.insertCell(3).innerHTML = date.slice(17,26);//date.slice(8,11) + "-" + date.slice(5,7) + "-" + date.slice(14,16) + " " + date.slice(17,26);
      row.insertCell(4).innerHTML = await MatchHold(tokenMatches, filteredAddresses, decimal, tokenPrice, tokenAmount[i]);
      row.insertCell(5).innerHTML = projectMatches[i].slice(0,4);
      //row.insertCell(6).innerHTML = orderNumber[i];
      row.insertCell(6).innerHTML = '<a href="https://etherscan.io/token/' + filteredAddresses +'?a='+tokenMatches[i]+'">$</a>';

      row.id = i;
      row.className = tokenMatches[i];
      //row.p.className = i;

        Progress("Generating table " + i + "/" + tokenMatches.length)

  }

       $(table).click(function(event) {
        event.stopPropagation();
        var $target = $(event.target);

        if ( $target.closest("td").attr("colspain")) {
            console.log("clicked: "+$target);
            $target.remove();
        } else {
          //console.log($target.closest("tr").attr('class'));
          var target = $target.closest("tr");
          var token = target.attr('class');

          if ($('.'+token).attr('id') != null)
            var row = $('.'+token).attr('id');
          else return;
          //console.log(projectMatches)
          Transactions(filteredAddresses, tokenMatches, projectMatches, decimal, row, tokenPrice, priceBNB,target);
          $('.'+token).removeAttr('id');

        }
       });

    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    for(var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).innerHTML = headers[i];
     }

    document.querySelector(".loader").style.display = "none"
    $('.log').remove();

    $(table).each(function(){$(this).find('tr:odd').css('background-color','#F5F6F9')});

    $(table).each(function(){$(this).find('th').css('outline', '1px dashed LightGray')});
    myTableDiv.append(table);
    console.timeEnd("Finished Table")

        //$("#ContentPlaceHolder1_divTimeStamp > div > div.col-md-9")
          $("#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(3) > div.col-md-3.text-dt.mb-2.mb-md-0")
          .before('<input type="button" value="MORE" id="ER" >')
        //$("#ER").css("position", "fixed").css("top", 1).css("right", 100);
        $("#ER").css("position", "static")
        $("#ER").css("border-radius", "16px")
        $("#ER").css("margin", "0px 6px");
        //$("#ER").css("height", "40");
        $("#ER").css("width", "70px");
        $("#ER").css("color", "DodgerBlue");
        $("#ER").css("background", "white");
        $("#ER").css("border-color", "DodgerBlue");
        $("#ER").click(function(){
            ExpandRows(filteredAddresses, tokenMatches, projectMatches, decimal, row, tokenPrice, priceBNB)
        });

    Friends(tokenMatches, masterlistfull, tokenOrder, decimal, tokenPrice, priceBNB, ignore, dupes);

};


function RelatedProjects(tokenMatches, masterlistfull){
  let tempArr1 = [];

  let evergrow = ["TITANO", "LIBERO", "SAFUU", "CYLUM", "OCTO", "SAFEJET", "EVERGROW", "CORSAC", "CRYPTER", "Y-5", "GALAXY"];
  let sesta = ["TIME", "SPELL", "POPSICLE", "MIM", "MAGIC", "POOCH", "FROGNATION"];
  let bonfire = ["SATURNA", "BONFIRE", "HAPPY", "CHAD", "PHOENIX", "SAKURA", "PUPPYDOGE", "DINGER"];
  let jade = ["JADE", "SMRT", "SMRTr", "BOOST", "ROCKET"];
  let drip = ["DRIP", "DOG", "PIG"];
  let guardian = ["GUARDIAN", "WOLFIE", "KNIGHT"];
  let shib = ["SHIB", "BONE", "LEASH"];
  let dogs = ["FLOKI", "BABY", "VOLT", "DOGELON", "KISHU", "DOGEBONK", "CATECOIN", "TAMADOGE", "POODL", "PREDATOR"];
  let hex = ["HEX"];
  let ai = ["ENCRYPTION", "0X0", "XAI"];
  let misc = ["PEPE", "CRAZY", "ROKO", "OGGY", "RICHQUACK", "MONSTA", "CUMROCKET", "WOJAK", "OPTIMUS", "TSUKA", "KERMIT", "HONK", "APED"];

 var totalMatches=[];
  for (let i in tokenMatches){
    var tempArr2=[];
    var tempArr3=[];

    for(let value of masterlistfull.values){
      for(let matchMaker of Object.values(value)){
        if (matchMaker == tokenMatches[i])
        {
          var key = masterlistfull.values[0][Object.values(value).indexOf(matchMaker)]
          tempArr2.push(" "+key)
          if (evergrow.includes(key))
            tempArr3.push("EVERGROW8")
          else if (sesta.includes(key))
            tempArr3.push("SESTA   8")
          else if (bonfire.includes(key))
            tempArr3.push("BONFIRE 8")
          else if (jade.includes(key))
            tempArr3.push("JADE    8")
          else if (drip.includes(key))
            tempArr3.push("DRIP    8")
          else if (guardian.includes(key))
            tempArr3.push("GUARDIAN8")
          else if (shib.includes(key))
            tempArr3.push("SHIB    8")
          else if (dogs.includes(key))
            tempArr3.push("DOGS    8")
          else if (hex.includes(key))
            tempArr3.push("HEX     8")
          else if (ai.includes(key))
            tempArr3.push("AI      8")
          else if (misc.includes(key))
            tempArr3.push("MISC    8")
        }
      }
    }

    var match;
    let freq = 0;
      var n = tempArr3.length;
        for(let i=0;i<n;i++){
          let count = 0;
          for(let j=i+1;j<n;j++){
              if(JSON.stringify(tempArr3[j]) === JSON.stringify(tempArr3[i])){
                  count++;
              }
          }
          if(count>=freq){
              match = tempArr3[i];
              freq = count;
          }
        }
      totalMatches.push(tempArr2)

    tempArr1.push(match + tempArr2.join());

  }

  TopTokens(totalMatches.flat(), tokenMatches.length)

  return tempArr1;
}

function TopTokens(matches, totalScanned){

    const partialResult = matches.reduce((result, name) => {
      if (!result[name]) result[name] = 1;
      else result[name]+=1;

      return result;
    }, {});

  const result = Object.entries(partialResult).map(([name, count]) => ({name, count})).sort(({count: countA},{count: countB})=> countB-countA);
  try {
    var topTokens = "⓵ \xa0\ " + result[0].name + "\xa0\ " + result[0].count +
        "\xa0\xa0\ ⓶ \xa0\ " + result[1].name + "\xa0\ " + result[1].count +
        "\xa0\xa0\ ⓷ \xa0\ " + result[2].name + "\xa0\ " + result[2].count +
        "\xa0\xa0\ ⓸ \xa0\ " + result[3].name + "\xa0\ " + result[3].count +
        "\xa0\xa0\ ⓹ \xa0\ " + result[4].name + "\xa0\ " + result[4].count +
        " ᐟ " + totalScanned

    document.querySelector("#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(2) > div.col-md-9").innerHTML = topTokens.replace(/(\d+)/g, '<sup>$1</sup>');
  } catch (error) {

  }

  TopTokens = function(){};
};

async function MatchTimes(tokenMatches, scanTime, scanDirty)
{
  let tempArray = [];
    for (var x in tokenMatches)
    {
      tempArray.push(scanTime[scanDirty.indexOf(tokenMatches[x])]);
      //console.log("unclean: " + scanDirty.indexOf(tokenMatches[x]));
    }
}

function Timer(temp)
{

  var timer;
  //console.log(temp);
  var delta = temp;
  var time = temp;
  if (temp < 0)
    {
          delta *= -1;
          time *= -1;
    }

    var days = Math.floor(time / 86400);
    time -= days * 86400;
    var hours = Math.floor(time / 3600) % 24;
    time -= hours * 3600;
    var minutes = Math.floor(time / 60) % 60;
    time -= minutes * 60;
    var seconds = time % 60;
    //console.log('Days:', days, 'Hours:', hours, 'Minutes:', minutes, 'Seconds:', seconds)
      if  (delta > 86400)
        timer = days + " day " + hours + " hr";
      else if (delta > 3600)
        timer = hours + " hr " + minutes + " min";
      else if (delta >= 60)
        timer = minutes + " min " + seconds + " sec";
      else if (delta < 60)
        timer = seconds + " seconds";

    if (temp < 0)
      return "-" + timer;
   else
    return timer;
}

async function MatchHold(tokenMatches, filteredAddresses, decimal, tokenPrice, preBalance, APIKey)
{
   decimal = 1 + '0'.repeat(decimal);
    var balance
   if (preBalance == null)
     {
       var tempBalance = await fetch("https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + filteredAddresses +
      "&address=" + tokenMatches +
      "&tag=latest&apikey=" + APIKey).then(tempBalance => tempBalance.json());

       if (tempBalance.result != 0)
       {
         var temp = (tempBalance.result / decimal).toFixed(20)
         var bal = (Math.trunc(temp) * tokenPrice);
         return "$"+bal.toLocaleString('en-US', {maximumFractionDigits:2});
       }
       else
        return "$0"
     }
   else
   {
    if (preBalance != 0)
   {
     var temp = (preBalance).toFixed(20);
     var bal = (Math.trunc(temp) * tokenPrice);
     return "$"+bal.toLocaleString('en-US', {maximumFractionDigits:2});
   }
   else
     return "$0"
   }
};

async function Transactions(filteredAddresses, tokenMatches, projectMatches, decimal, row, tokenPrice, priceBNB, target)
{

  var newRow = $('<tr class="newRow"><td>'+"↪"+
                 '</td><td>'+ projectMatches[row].slice(9) +
                 '</td><td ID="in'+ row + '">' + "+ 🕐" +
                 '</td><td ID="out'+ row + '">' + "- 🕐" +
                 '</td><td>' + "￬ total" + await MatchHold(tokenMatches[row], filteredAddresses, decimal, tokenPrice, null, await Key(row)) +
                 '</td><td>' + "⎆ $" + await BNBbalance(tokenMatches[row], decimal, priceBNB, await Key(row)) +
                 '</td><td>' + '<a href="https://etherscan.io/myaddress?cmd=addnew&a=' + tokenMatches[row] +'#add">#</a>' +
                 '</td></tr>');
 if (row%2 == 0)
    newRow.css('background-color','#F5F6F9');

  if (target !=null)
    target.after(newRow);
  else
    $('#'+row).after(newRow);

    const query = `
{
  ethereum(network: ethereum) {
    address(address: {is: "`+tokenMatches[row]+`"}) {
      balances(currency: {is: "`+filteredAddresses+`"}) {
        currency {
          address
          symbol
          tokenType
        }
        history {
          transferAmount
          timestamp
          value
          block
        }
      }
    }
    outbound: coinpath(
      initialAddress: {is: "`+tokenMatches[row]+`"}
      currency: {is: "`+filteredAddresses+`"}
      options: {direction: outbound}
    ) {
       amount

    }
    inbound: coinpath(
      initialAddress: {is: "`+tokenMatches[row]+`"}
      currency: {is: "`+filteredAddresses+`"}
      options: {direction: inbound}
    ) {
       amount

    }
    coinpath(
      initialAddress: {is: "`+tokenMatches[row]+`"}
      options: {desc: "count"}
    ) {
      count
      receiver {
        uniq: address
        smartContract {
          contractType
        }
      }
    }
  }
}
    `;

    const url = "https://graphql.bitquery.io/";
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          "X-API-KEY": "BQYdjt4ocpcbVMcZEdl1e00T4V2ewXik"
          //"address": filteredAddresses
        },
        body: JSON.stringify({
            query
        })
    };

    var res = await fetch(url, opts)
      .then(res => res.json())
      .catch(console.error);
      //console.log(res)

      var totalOut = res.data.ethereum.outbound["0"].amount;
      var totalIn = res.data.ethereum.inbound["0"].amount;

      var tempOut = (totalOut / decimal).toFixed(20);
      var balOut = (Math.trunc(tempOut) * tokenPrice);
      var balanceOut = "$"+balOut.toLocaleString('en-US', {maximumFractionDigits:2});

      var tempIn = (totalIn / decimal).toFixed(20);
      var balIn = (Math.trunc(tempIn) * tokenPrice);
      var balanceIn = "$"+balIn.toLocaleString('en-US', {maximumFractionDigits:2});

      $("#in" + row).text("⤥ " + balanceIn)
      $("#out" + row).text("⤤ " + balanceOut)


      var interactedAddress = [];
      for(var i = 0; i < res.data.ethereum.coinpath.length; i++) {
        //console.log(res.data.ethereum.coinpath[i].count)
        if (res.data.ethereum.coinpath[i].receiver.smartContract.contractType == null)
          {
            interactedAddress.push(res.data.ethereum.coinpath[i].receiver.uniq);
          }
      }
}

async function ExpandRows(filteredAddresses, tokenMatches, projectMatches, decimal, row, tokenPrice, priceBNB)
{
        var table = document.getElementById('table1');
        var rowLength = tokenMatches.length;
        // console.log(rowLength);
        $('#ER').attr("value", "OPEN");

        $('#ER').off('click');
        $("#ER").click(function(){
          var random = Math.floor(Math.random() * 3)
          if (random == 2)
            $("#ER").attr("value", "Its open");
          if (random == 1)
            $("#ER").attr("value", "idiot");
          if (random == 0)
            $("#ER").attr("value", "look down");
        });

        //$('#ER').disable();
        $(table).off('click');

         for(var i=1; i<(rowLength *2); i++){
          //if (i % 12) await new Promise(r => setTimeout(r, 500));

            var row = table.rows[i];
            var rowID = row.id;
            if (rowID != "")
              {
                 Transactions(filteredAddresses, tokenMatches, projectMatches, decimal, rowID, tokenPrice, priceBNB)
                await new Promise(r => setTimeout(r, 500));
                i++;

              }
            /*var cellLength = row.cells.length;
            for(var y=0; y<cellLength; y+=1){
              var cell = row.cells[y];
            }
             */
        }
}

async function Friends(tokenMatches, masterlistfull, tokenOrder, decimal, tokenPrice, priceBNB, ignore, twos)
{
  var interactedRow = $('<tr class="newRowF"><td>'+"#"+
   '</td><td ID="progress">' + "1 of " + tokenMatches.length + "" +
   '</td><td ID="progress2">' + "" +
   '</td><td ID="progress3">' + "" +
   '</td><td ID="progress4">' + "" +
   '</td><td ID="progress5">' + "" +
   '</td><td ID="progress6">' + "" +
   '</td></tr>');
   //if (row%2 == 0)
   // interactedRow.css('background-color','#F9FAFD');
    $("#" + (tokenMatches.length - 1)).closest("tr").after(interactedRow);

    interactedRow.css('outline', '1px dashed LightGray');
    interactedRow.css('background-color','#F5F6F9');

  var interactedAddress = [];

  var j = 1;
  var broked = 0;

  for await (let match of tokenMatches) {
      //console.log(tokenMatches)
      //console.log(match)
    const query = `
      {
        ethereum(network: ethereum) {
          coinpath(
            initialAddress: {is: "`+match+`"}
            options: {desc: "count"}
          ) {
            count
            receiver {
              uniq: address
              smartContract {
                contractType
              }
            }
          }
        }
      }
      `;

    const url = "https://graphql.bitquery.io/";
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          "X-API-KEY": "BQYdjt4ocpcbVMcZEdl1e00T4V2ewXik"
          //"address": filteredAddresses
        },
        body: JSON.stringify({
            query
        })
    };

    var res = await fetch(url, opts)
      .then(res => res.json())
      .catch(console.error);
    //console.log(match, res.data.ethereum.coinpath)
    if (res.data.ethereum.coinpath !== null)
    {
      for(var i = 0; i < res.data.ethereum.coinpath.length; i++)
      {
        var temp = res.data.ethereum.coinpath[i].receiver.uniq;
        if ((res.data.ethereum.coinpath[i].receiver.smartContract.contractType == null) && !ignore.includes(temp))
        {
         interactedAddress.push(temp);
        }
       }
    }
    else
      {
        broked = broked + 1;
        $("#progress2").text(broked + " of " + j + " f")
      }

    if (j == tokenMatches.length)
    {
      $("#progress").text("Fren")
      $("#progress1").text("")
      //$("#progress2").text("")
      $("#progress3").text("last")
      $("#progress4").text("eth")
      $("#progress5").text("team")
      $("#progress6").text("#")
    }
    else
      $("#progress").text(j + " of " + tokenMatches.length + " friends scanned")

    j++;
  }

  var sings = [];
  var dupes = [];
  var trips = [];
  var quads = [];
  var quints = [];
  var extra = [];


  for(var i = 0; i < interactedAddress.length; i++) {
    if (interactedAddress[i] != "")
      if(quints.includes(interactedAddress[i]))
        extra.push(interactedAddress[i]);
      else if(quads.includes(interactedAddress[i]))
        quints.push(interactedAddress[i]);
      else if(trips.includes(interactedAddress[i]))
        quads.push(interactedAddress[i]);
      else if(dupes.includes(interactedAddress[i]))
        trips.push(interactedAddress[i]);
      else if(sings.includes(interactedAddress[i]))
        dupes.push(interactedAddress[i])

      else
        sings.push(interactedAddress[i]);
  }

  //console.log(sings);
  //console.log("dupes: "+dupes.length);
  //console.log(dupes);
  //console.log(trips);
  //console.log(quads);
  //console.log(quints);

  var projectMatches = RelatedProjects(dupes, masterlistfull);

  var j = 0;
  for(var i = 0; i < twos.length; i++) {
    if (twos.includes(dupes[i]))
      {
        if (tokenMatches.includes(dupes[i]))
          {
            var index = tokenMatches.indexOf(dupes[i])
            var interactedRow = $('<tr class="newRowF"><td>'+ tokenOrder[index] +
           '</td><td>'+ '<a href="https://etherscan.io/address/' + dupes[i] +'">' + dupes[i].slice(0,5) + "" + '</a>' +
           '</td><td colspan="2">'+ "" + await projectMatches[i].slice(9) +
           //'</td><td>'+ "Last Active" +
           '</td><td>' + "⎆ $" + await BNBbalance(dupes[i], decimal, priceBNB, await Key(i)) +
           '</td><td>'+  "" + await projectMatches[i].slice(0,8) +
           '</td><td>' + '<a href="https://etherscan.io/myaddress?cmd=addnew&a=' + dupes[i] +'#add">#</a>' +
           '</td></tr>');
          }
        else
          {
            var interactedRow = $('<tr class="newRowF"><td>'+""+
           '</td><td>'+ '<a href="https://etherscan.io/address/' + dupes[i] +'">' + dupes[i].slice(0,5) + '</a>' +
           '</td><td colspan="2">'+ "" + await projectMatches[i].slice(9) +
           //'</td><td>'+ "Last Active" +
           '</td><td>' + "⎆ $" + await BNBbalance(dupes[i], decimal, priceBNB, await Key(i)) +
           '</td><td>'+  "" + await projectMatches[i].slice(0,8) +
           '</td><td>' + '<a href="https://etherscan.io/myaddress?cmd=addnew&a=' + dupes[i] +'#add">#</a>' +
           '</td></tr>');
          }
        $("#progress").closest("tr").after(interactedRow);

        if (j%2 == 0)
        interactedRow.css('background-color','#F5F6F9');

        j++;
      }
    }
      $(".newRowF").css('outline', 'none');
      $(".newRowF").css('background-color','white');
  if (j == 0)
    {
      $("#progress").text("No friends detected")
      $("#progress1").text("")
     // $("#progress2").text("")
      $("#progress3").text("")
      $("#progress4").text("")
      $("#progress5").text("")
      $("#progress6").text("")
      //$(".newRow").remove();
    }
  //$('#ER').remove();
}

async function BNBbalance(tokenMatches, decimal, priceBNB, APIKey)
{
  var tempBalance = await fetch("https://api.etherscan.io/api?module=account&action=balance&address=" + tokenMatches +
  "&apikey=" + APIKey).then(tempBalance => tempBalance.json());
  //console.log(tempBalance)
  var bal = ((tempBalance.result / 1000000000000000000).toFixed(20) * priceBNB)
  return bal.toLocaleString('en-US', {maximumFractionDigits:2});

};

async function Key(i)
{
  var APIKey0;

  if (i % 3 == 0)
    APIKey0 = '3JH5GCHDFFTXMK8DSGN2S7BQZCK83FMEM6';
  else if (i % 3 == 1)
    APIKey0 = 'EGB1SGWRZ45UT8IZ7GF2M85K2FVMNJGQ8M';
  else if (i % 3 == 2)
    APIKey0 = 'QS8G6BEE34913C179R3YMMDSGZV76WPMUI';
  return APIKey0;
}

function TransactionType()
{
  console.time("Finished First Fetch");
  console.time("Finished Block Fetch");
  console.time("Finished Table");

  if (document.querySelector("#inputdata").innerHTML.indexOf("contribute") != -1) {
    Contribute();

    console.log("TOKEN ADDRESS: " + filteredAddresses);
    console.log("PAIR ADDRESS: " + pairAddress);
    console.timeEnd("Finished First Fetch");
    Progress("Finding Block Fetch...");
    return true;
  }
};

function Contribute()
{
  const pink = document.querySelector("#contractCopy").innerHTML;

  var pinksale = document.createElement("iframe");
          pinksale.setAttribute("src", "https://www.pinksale.finance/launchpad/" + pink + "?chain=BSC");
          pinksale.setAttribute("sandbox", "allow-same-origin allow-scripts allow-forms");
          pinksale.style.width = "100%";
          pinksale.style.height = "800px";
          document.querySelector("#ContentPlaceHolder1_maintable > div:nth-child(6) > div.col-md-9").before(pinksale);
          document.querySelector('#ContentPlaceHolder1_maintable > div:nth-child(6) > div.col-md-3.font-weight-bold.font-weight-sm-normal.mb-1.mb-md-0').remove();

        throw new Error();
};

function Loading(loader)
{
  loader.className = "loader";
  const emoji = document.createElement("div");
  loader.appendChild(emoji);

  document.querySelector("#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(8) > div.col-md-3.text-dt.mb-2.mb-md-0").after(loader);
  loader.style.border = '1px';
  document.querySelector('#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(8) > div.col-md-3.text-dt.mb-2.mb-md-0').remove();
  document.querySelector('#ContentPlaceHolder1_li_disqus').remove();

  $('#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(3) > div.col-md-9').empty();
  $('#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(2) > div.col-md-9').empty();
  $('#ContentPlaceHolder1_maintable > div.card.p-5.mb-3 > div:nth-child(3) > div.col-md-3.text-dt.mb-2.mb-md-0').empty();

  const logger = document.createElement("div");
  loader.after(logger);
  logger.className = 'logger';
  const log = document.createElement("div");
  logger.appendChild(log);
  log.className = 'log';

  logger.style.paddingLeft = '10px';
  loader.style.padding = '6px';

  const emojis = ["🕐", "🕜", "🕑","🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢",  "🕗", "🕣", "🕘", "🕤", "🕙",  "🕥", "🕚", "🕦",  "🕛", "🕧"];
  const interval = 100;

  const loadEmojis = (arr) => {
      setInterval(() => {
        //emoji.width = "50%";
        emoji.innerText = arr[Math.floor(Math.random() * arr.length)];
      }, interval);
  }
  const init = () => {
    loadEmojis(emojis);
  }
  init();
}

function Progress(output)
{
  $('.log').remove();
  const log = document.createElement("div");
  $('.logger').after(log);
  log.className = "log";
  log.innerText = output;
}

function Purchase(addresses, itemNumber){

    $("#logoAndNav > nav > div.w-lg-auto").append('<input type="button" value="BUY" id="BB" >')
    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
    $("#BB").css("position", "fixed").css("top", 1).css("right", 60);
    //$("#NB").css("border-radius", "15px")
    $("#BB").css("margin", "5px");
    $("#BB").css("width", "130px");
    $("#BB").css("height", "40px");

    $("#BB").css("color", "white");
    $("#BB").css("background", "DodgerBlue");
    $("#BB").css("border-color", "white");
    $("#BB").click(function(){
        window.open('https://metamask.app.link/dapp/pancakeswap.finance/swap?chain=bsc&outputCurrency=' + addresses[itemNumber]);
    });
};
