CodeSettingsValues?
MOBILE/BSC/TX
Use another editor?
SaveSave & CloseClose
82
                        token = totalSelector[k].childNodes[0].getAttribute("data-original-title");
83
                        ticker = totalSelector[k].childNodes[2].getAttribute("data-original-title")
84
                    }
85
​
86
                    tickers[i] = ticker;
87
                    tokens[i] = token;
88
                    addresses[i] = address;
89
​
90
                    $(totalSelector[k].parentNode).append('<input type="button" value="X" id="BT'+i+'" >')
91
                    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
92
                    $("#BT"+i).css("margin-left", "5px");
93
                    $("#BT"+i).css("border-radius", "16px");
94
                    $("#BT"+i).css("color", "DodgerBlue");
95
                    $("#BT"+i).css("background", "white");
96
                    $("#BT"+i).css("border-color", "DodgerBlue");
97
                    $("#BT"+i).click(function(){
98
                        window.open('https://metamask.app.link/dapp/pancakeswap.finance/swap?chain=bsc&outputCurrency=' + addresses[i]);
99
​
100
                        //}
101
                        //window.location = current;
102
                    });
103
                }
104
            }
105
        }
106
    }
107
​
108
    var itemNumber = 0;
109
​
110
    var removeUndefined = addresses.filter(item => { return item !== undefined });
111
    var removeDuplicates = [...new Set(removeUndefined)]
112
    let filteredAddresses = removeDuplicates.filter(function (item) {
113
        return item.indexOf("s") !== 0;
114
    });
115
​
116
    Chart(filteredAddresses, itemNumber);
117
    Purchase(filteredAddresses, itemNumber);
118
​
119
    if (filteredAddresses.length > 1) {
120
        $("#ContentPlaceHolder1_maintable > div:nth-child(14) > div.col-md-9").append('<input type="button" value="NEXT" id="NB" >')
121
        //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
122
        $("#NB").css("position", "absolute").css("bottom", 5).css("left", 10);
123
        //$("#NB").css("border-radius", "15px")
124
        $("#NB").css("margin", "5px");
125
        $("#NB").css("width", "100px");
126
        $("#NB").css("color", "DodgerBlue");
127
        $("#NB").css("background", "white");
128
        $("#NB").css("border-color", "DodgerBlue");
129
        $("#NB").click(function(){
130
            itemNumber = itemNumber + 1;
131
            itemNumber = itemNumber % filteredAddresses.length;
132
            Chart(filteredAddresses, itemNumber);
133
            Purchase(filteredAddresses, itemNumber);
134
        });
135
    }
136
function Chart(addresses, itemNumber){
137
​
138
        if (filteredAddresses.length != 0) {
139
            var chart = document.createElement("iframe");
140
            chart.setAttribute("src", "https://dexscreener.com/bsc/" + filteredAddresses[itemNumber]);
141
            chart.style.width = "100%";
142
            chart.style.height = "800px";
143
​
144
            if (document.querySelector("#ContentPlaceHolder1_maintable > iframe")){
145
                document.querySelector("#ContentPlaceHolder1_maintable > iframe").replaceWith(chart);
146
            }
147
            else {
148
                document.querySelector("#ContentPlaceHolder1_maintable > hr:nth-child(15)").before(chart);
149
            }
150
        }
151
    }
152
});
153
​
154
function Purchase(addresses, itemNumber){
155
​
156
    $("#logoAndNav > nav > div.w-lg-auto").append('<input type="button" value="PURCHASE" id="BB" >')
157
    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
158
    $("#BB").css("position", "fixed").css("top", 10).css("right", 50);
159
    //$("#NB").css("border-radius", "15px")
160
    $("#BB").css("margin", "5px");
161
    $("#BB").css("width", "100px");
162
      $("#BB").css("height", "30px");
163

164
    $("#BB").css("color", "DodgerBlue");
165
    $("#BB").css("background", "white");
166
    $("#BB").css("border-color", "DodgerBlue");
167
    $("#BB").click(function(){
168
        window.open('https://metamask.app.link/dapp/pancakeswap.finance/swap?chain=bsc&outputCurrency=' + addresses[itemNumber]);
169
    });
170
};

