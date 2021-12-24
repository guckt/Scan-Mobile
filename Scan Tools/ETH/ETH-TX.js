// ==UserScript==
// @name         ETH/TX
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       guckt
// @match        https://etherscan.io/tx/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var tickers = [];
    var tokens = [];
    var addresses = [];

    /*
    var links =['https://etherscan.io/token/',
                'https://dexscreener.com/ethereum/',
                'https://app.uniswap.org/#/swap?outputCurrency='];
    */

    var ignore =['0xdac17f958d2ee523a2206206994597c13d831ec7', //TETHER
                 '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', //USDC
                 '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', //WBTC
                 '0x4fabb145d64652a948d72533023f6e7a623c7c53', //BUSD
                 '0x6b175474e89094c44da98b954eedeac495271d0f', //DAI
                 '0xa47c8bf37f92abed4a126bda807a7b7498661acd', //UST
                 '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2']; //WETH

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
                        window.open('https://web.telegram.org/z/');
                        window.open('https://twitter.com/search?q=%22' + addresses[i] + '%22&src=typed_query&f=live');
                        window.open('https://twitter.com/search?q=%22' + tokens[i] + '%22&src=typed_query&f=live');
                        window.open('https://twitter.com/search?q=%22' + '$' + tickers[i] + '%22&src=typed_query&f=live');
                        //}
                        //window.location = current;
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

    if (filteredAddresses.length > 1) {
        $("#ContentPlaceHolder1_maintable > div:nth-child(11) > div.col-md-3.font-weight-bold.font-weight-md-normal.mb-1.mb-md-0").append('<input type="button" value="NEXT" id="NB" >')
        //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
        $("#NB").css("position", "absolute").css("bottom", 0).css("left", 10);
        //$("#NB").css("border-radius", "15px")
        $("#NB").css("width", "100px");
        $("#NB").css("color", "DodgerBlue");
        $("#NB").css("background", "white");
        $("#NB").css("border-color", "DodgerBlue");
        $("#NB").click(function(){
            itemNumber = itemNumber + 1;
            itemNumber = itemNumber % filteredAddresses.length;
            Chart(addresses, itemNumber);
        });
    }

    function Chart(addresses, itemNumber){

        if (filteredAddresses.length != 0) {
            var chart = document.createElement("iframe");
            chart.setAttribute("src", "https://dexscreener.com/ethereum/" + filteredAddresses[itemNumber]);
            chart.style.width = "100%";
            chart.style.height = "800px";

            if (document.querySelector("#ContentPlaceHolder1_maintable > iframe")){
                document.querySelector("#ContentPlaceHolder1_maintable > iframe").replaceWith(chart);
            }
            else {
                if (document.querySelector("#ContentPlaceHolder1_maintable > div:nth-child(6) > div.col-md-3.font-weight-bold.font-weight-md-normal.mb-1.mb-md-0 > div > i")) {
                    document.querySelector("#ContentPlaceHolder1_maintable > hr:nth-child(12)").before(chart);

                }
                else{
                    document.querySelector("#ContentPlaceHolder1_maintable > hr:nth-child(10)").before(chart);
                }
            }
        }
    }

});

















