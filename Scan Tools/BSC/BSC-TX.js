// ==UserScript==
// @name         MOBILE/BSC/TX
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       guckt
// @match        https://bscscan.com/tx/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var tickers = [];
    var tokens = [];
    var addresses = [];

    var APIkey = '4MZSGAQDPPK71GU6KK7ZTXDCPXN35V66EUU';
    var APIoffset = 1000;
    var APImax = 2000;

    var ignore =['0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', //WBNB
                 '0xe9e7cea3dedca5984780bafc599bd69add087d56', //BUSD
                 '0x2170ed0880ac9a755fd29b2688956bd959f933f8', //B-ETH
                 '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', //B-USDC
                 '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', //B-DAI
                 '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47', //B-ADA
                 '0x55d398326f99059ff775485246999027b3197955']; //B-BUSD

    // FILTERING
    const topFilter = document.querySelector("#content > div.container.py-3.mn-b3 > div").remove();
    const bannerFilter = document.querySelector("#content > div:nth-child(10)").remove();
    const sponsorFilter = document.querySelector("#ContentPlaceHolder1_maintable > div:nth-child(8) > div.col-md-9").remove();
    const sponsorFilter2 = document.querySelector("#ContentPlaceHolder1_maintable > div:nth-child(8) > div").remove();
    const commentsFilter = document.querySelector("#ContentPlaceHolder1_li_disqus").remove();


    for (let i = 1; i < 20; i++) {
        let totalSelector = document.querySelectorAll("#wrapperContent > li:nth-child("+i+") > div > a")

        for (let k = 0; k < totalSelector.length; k++) {
            if (k == totalSelector.length- 1) {

                var href = $(totalSelector[k]).attr('href');
                var address = jQuery.trim(href).substring(7)
                .trim(this);

                if (ignore.indexOf(address) == -1)
                {
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

                    $(totalSelector[k].parentNode).append('<input type="button" value="X" id="BT'+i+'" >')
                    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
                    $("#BT"+i).css("margin-left", "5px");
                    $("#BT"+i).css("border-radius", "16px");
                    $("#BT"+i).css("color", "DodgerBlue");
                    $("#BT"+i).css("background", "white");
                    $("#BT"+i).css("border-color", "DodgerBlue");
                    $("#BT"+i).click(function(){
                        
                        window.open('https://twitter.com/search?q=%22' + '$' + tickers[i] + '%22&src=typed_query&f=live');
                    });
                }
            }
        }
    }

    var itemNumber = 0;

    var removeUndefined = addresses.filter(item => { return item !== undefined });
    var removeDuplicates = [...new Set(removeUndefined)]
    let filteredAddresses = removeDuplicates.filter(function (item) {
        return item.indexOf("s") !== 0;
    });

    Chart(filteredAddresses, itemNumber);
    Purchase(filteredAddresses, itemNumber);

    if (filteredAddresses.length > 1) {
        $("#ContentPlaceHolder1_maintable > div:nth-child(14) > div.col-md-9").append('<input type="button" value="NEXT" id="NB" >')
        //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
        $("#NB").css("position", "absolute").css("bottom", 2).css("right", 5);
        //$("#NB").css("border-radius", "15px")
        $("#NB").css("margin", "5px");
        $("#NB").css("width", "100px");
        $("#NB").css("color", "white");
        $("#NB").css("background", "DodgerBlue");
        $("#NB").css("border-color", "white");
        $("#NB").click(function(){
            itemNumber = itemNumber + 1;
            itemNumber = itemNumber % filteredAddresses.length;
            Chart(filteredAddresses, itemNumber);
            PurchaseNext(filteredAddresses, itemNumber);
        });
    }
function Chart(addresses, itemNumber){

        if (filteredAddresses.length != 0) {
            var chart = document.createElement("iframe");
            chart.setAttribute("src", "https://dexscreener.com/bsc/" + filteredAddresses[itemNumber]);
            chart.style.width = "100%";
            chart.style.height = "800px";

            if (document.querySelector("#ContentPlaceHolder1_maintable > iframe")){
                document.querySelector("#ContentPlaceHolder1_maintable > iframe").replaceWith(chart);
            }
            else {
                document.querySelector("#ContentPlaceHolder1_maintable > hr:nth-child(15)").before(chart);
            }
        }
    }
});

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

function PurchaseNext(addresses, itemNumber){
    $("#BB").click(function(){
        window.open('https://metamask.app.link/dapp/pancakeswap.finance/swap?chain=bsc&outputCurrency=' + addresses[itemNumber]);
    });
    
    

 Promise.all([
    fetch("https://api.bscscan.com/api?module=account&action=txlist&address=" + filteredAddresses[itemNumber] +
        "&startblock=0&endblock=99999999&page=1&offset=" + APIoffset +
        "&sort=asc&apikey=" + APIkey).then(scan => scan.json()),
    fetch("https://raw.githubusercontent.com/gabethomco/Masterlist/main/masterlist.json").then(masterlist => masterlist.json())
    ]).then(([scan, masterlist]) => {

   var scanDirty = scan.result.map(function(item)
    {
        return item.from;
    });

    var removeUndefined = scanDirty.filter(item => { return item !== undefined });
    var removeDuplicates = [...new Set(removeUndefined)]
    let scanClean = removeDuplicates.filter(function (item) {
        return item.indexOf("s") !== 0;
    });
    var scanMapped = scanClean.slice(0, APImax);
    var scanTotal = scanMapped.length;

    var masterMapped = masterlist.map(function(item)
    {
        return item.token;
    });

      console.log(scanMapped);
      console.log(masterMapped);

  const tokenMatches = masterMapped.filter(element => scanMapped.includes(element));
  console.log(tokenMatches);

  PrintMatches(tokenMatches,scanTotal);

}).catch((err) => {
    console.log(err);
});


function PrintMatches(tokenMatches,scanTotal)
    {
      const printDiv = document.querySelector("#ContentPlaceHolder1_maintable > div:nth-child(8) > div.col-md-9");
      const heading = document.createElement("h1");
      heading.innerHTML = tokenMatches.length + " matches of " + scanTotal + " addresses scanned";
      //heading.innerHTML = "Scanned: " + scanTotal + " Matches: " + tokenMatches.length ;
      printDiv.appendChild(heading);
      const printing = document.createElement("ul");
      printDiv.appendChild(printing);

      for (let pine in tokenMatches)
      {
        let value = tokenMatches[pine];
        //console.log(result[pine]);
        listItem = document.createElement("li");
        listItem.innerHTML = value;
        printing.appendChild(listItem);
      }
    }

};

