// ==UserScript==
// @name         AVA/TX
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       guckt
// @match        https://snowtrace.io/tx/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var tickers = [];
    var tokens = [];
    var addresses = [];

    /*
    var links =['https://snowtrace.io/token/',
                'https://dexscreener.com/avalanche/',
                'https://traderjoexyz
                .com/#/trade?outputCurrency='];
    */
    var ignore =['0x130966628846bfd36ff31a822705796e8cb8c18d', //MIM
                 '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', //WAVAX
                 '0xc7198437980c041c805a1edcba50c1ce5db95118', //USDTe
                 '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7', //USDT
                 '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', //USDC
                 '0x19860ccb0a68fd4213ab9d8266f7bbf05a8dde98', //BUSD
                 '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab']; //WETH

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

    console.info(addresses);

    var itemNumber = 0;

    var removeUndefined = addresses.filter(item => { return item !== undefined });
    var removeDuplicates = [...new Set(removeUndefined)]
    let filteredAddresses = removeDuplicates.filter(function (item) {
        return item.indexOf("s") !== 0;
    });

        console.info(filteredAddresses);

    Chart(filteredAddresses, itemNumber);

    if (filteredAddresses.length > 1) {
        $("#ContentPlaceHolder1_maintable > div:nth-child(12) > div.col-md-3.font-weight-bold.font-weight-sm-normal.mb-1.mb-md-0").append('<input type="button" value="NEXT" id="NB" >')
        //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
        $("#NB").css("position", "absolute").css("bottom", 5).css("left", 8);
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
            chart.setAttribute("src", "https://dexscreener.com/avalanche/" + filteredAddresses[itemNumber]);
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
                    document.querySelector("#ContentPlaceHolder1_maintable > hr:nth-child(13)").before(chart);
                }
            }
        }
    }

    //$('#ContentPlaceHolder1_maintable > iframe').on('load', function() {
    //        let iframe = $('#ContentPlaceHolder1_maintable > iframe');
    //});
});












