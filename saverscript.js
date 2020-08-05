// Alpha vantage stocks info Api URL

let apiUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=msft&apikey=486OHSPRRLZR5IJI';

// Alpha vantage Api monthly stock price URL

let chartApiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=tsla&apikey=486OHSPRRLZR5IJI';

// Saver search button click

document.querySelector('#saver-search-btn').addEventListener('click', function () {
    searchInput = document.querySelector('#saver-search').value;
    let newApiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchInput}&apikey=486OHSPRRLZR5IJI
    `;
    let newChartApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${searchInput}&apikey=486OHSPRRLZR5IJI
    `;
    axios.get(newApiUrl).then(function (response) {
        let fireRating = "";
        let mktCap = parseFloat(response.data.MarketCapitalization);
        let mktCapInB = (mktCap / 1000000000).toFixed(2);
        let divYield = parseFloat(response.data.DividendYield);
        let divYieldInP = (divYield * 100).toFixed(2);
        let peRatio = parseFloat(response.data.PERatio).toFixed(2)
        let fireTextColor = "";
        if (searchInput == "" || searchInput.toUpperCase() != response.data.Symbol) {
            alert ("Please Enter a Valid Ticker Symbol!")
            return
        };
        if (isNaN(peRatio)) {
            peRatio = "Not Applicable"
        }
        if (isNaN(divYieldInP)) {
            divYieldInP = "Not Applicable"
        }
        if (peRatio < 20) {
            fireRating = "Firey Hot!"
            fireTextColor = "#e62c2c"
        } else if (peRatio < 30) {
            fireRating = "Hot!"
            fireTextColor = "#e62c2c"
        } else if (peRatio < 50) {
            fireRating = "Warm"
            fireTextColor = "#fc6203"
        } else if (peRatio < 100) {
            fireRating = "Cold"
            fireTextColor = "#78b6db"
        } else {
            fireRating = "Icy Cold"
            fireTextColor = "#78b6db"
        };
        let saverSearchDiv = document.querySelector("#saver-search-results");

        // search results formatted

        let saverResults = `
        <div id="accordion">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        ${response.data.Name}'s Stock Information
                        </button>
                    </h5>
                </div>
                <div id="collapseOne" class="collapse show container-fluid" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body row" id="saver-results-stock-info">
                        <div class="container-fluid">
                            <p><h4 class="orange-text">FIRE rating is based on ${response.data.Name}'s PE ratio because it is a 
                            time tested measure of a stable and profitable company.</h4></p>
                        </div><br><br>
                        <div class="col-12">
                            <ul class=" text-left">
                                <p><strong>FIRE ratings Legend:</strong></p>
                                <li>Firey HOT! : PE ratio below 20.</li>
                                <li>HOT! : PE ratio from 20 to 29.</li>
                                <li>Warm : PE ratio from 30 to 49</li>
                                <li>Cold : PE ratio from 50 to 99</li>
                                <li>Icy Cold : PE ratio above 100.</li>
                            </ul>
                        </div><br>
                        <div class="col-12"><br>
                            <ul class=" text-left">
                                <li><strong>Market cap : ${mktCapInB} B</strong></li>
                                <li><strong>PE Ratio : ${peRatio}</strong></li>
                                <li><strong>Dividend Yield (%) : ${divYieldInP}</strong></li>
                                <li><strong style="color:${fireTextColor};">FIRE rating : ${fireRating}</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            ${response.data.Name}'s Summary
                        </button>
                    </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div id="saver-search-results-description">
                        ${response.data.Description}
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            ${response.data.Name}'s 10 Month Price Chart
                        </button>
                    </h5>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <canvas id="saver-search-results-chart">

                    </canvas>
                </div>
            </div>
        </div>
        `
        saverSearchDiv.innerHTML = saverResults
    });

    // 10 month chart created with chartJS

    let chartData = [];
    let chartMonth = [];
    axios.get(newChartApiUrl).then(function (response) {
        let resultCount = 0;
        for (let [k, v] of Object.entries(response.data["Monthly Time Series"])) {
            chartData.push(v["4. close"]);
            chartMonth.push(k)
            resultCount++;
            if (Object.keys(response.data["Monthly Time Series"]).length < 10) {
                if (Object.keys(response.data["Monthly Time Series"]).length === resultCount) {
                    break;
                };
            } else if (resultCount === 10) {
                break;
            };
        };

        let saverChart = document.getElementById('saver-search-results-chart').getContext('2d');
        let myChart = new Chart(saverChart, {
            type: 'line',
            data: {
                labels: chartMonth.reverse(),
                datasets: [{
                    label: '10 Month Stock Price',
                    data: chartData.reverse(),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }],
            },
        });
    });
});

