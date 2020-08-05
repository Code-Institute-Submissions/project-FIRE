// Alpha vantage stock info API URL

let apiUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=msft&apikey=486OHSPRRLZR5IJI';

// alpha vantage monthly stock price data API URL

let chartApiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=tsla&apikey=486OHSPRRLZR5IJI';

// grower search button click

document.querySelector('#grower-search-btn').addEventListener('click', function () {
    searchInput = document.querySelector('#grower-search').value;
    let newApiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchInput}&apikey=486OHSPRRLZR5IJI
    `;
    let newChartApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${searchInput}&apikey=486OHSPRRLZR5IJI
    `;
    axios.get(newApiUrl).then(function (response) {
        let fireRating = "";
        let mktCap = parseFloat(response.data.MarketCapitalization);
        let mktCapInB = (mktCap / 1000000000).toFixed(2);
        let growthRate = parseFloat(response.data.QuarterlyRevenueGrowthYOY);
        let growthRatePercent = (growthRate * 100).toFixed(2);
        let divYield = parseFloat(response.data.DividendYield);
        let divYieldInP = (divYield * 100).toFixed(2);
        let fireTextColor = "";
        if (isNaN(divYieldInP)) {
            divYieldInP = "Not Applicable"
        };
        if (growthRatePercent <= 0) {
            fireRating = "Icy Cold"
            fireTextColor = "#78b6db"
        } else if (growthRatePercent < 5) {
            fireRating = "Cold"
            fireTextColor = "#78b6db"
        } else if (growthRatePercent < 10) {
            fireRating = "Warm"
            fireTextColor = "#fc6203"
        } else if (growthRatePercent < 20) {
            fireRating = "Hot"
            fireTextColor = "#e62c2c"
        } else {
            fireRating = "Fiery Hot!"
            fireTextColor = "#e62c2c"
        };
        let growerSearchDiv = document.querySelector("#grower-search-results");

        // grower search results formatted

        let growerResults = `
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
                    <div class="card-body row" id="grower-results-stock-info">
                        <div class="container-fluid">
                            <p><h4 class="red-text">FIRE rating is based on ${response.data.Name}'s growth rate because growth is the 
                            most important factor of a growth company.</h4></p>
                        </div><br><br>
                        <div class="col-12">
                            <ul class=" text-left">
                                <p><strong>FIRE ratings Legend:</strong></p>
                                <li>Firey HOT! : Growth rate of 20% and higher.</li>
                                <li>HOT! : Growth rate of 10% to 19%.</li>
                                <li>Warm : Growth rate of 5% to 9%.</li>
                                <li>Cold : Growth rate of 1% to 4%.</li>
                                <li>Icy Cold : Negative or 0 growth rate.</li>
                            </ul>
                        </div><br>
                        <div class="col-12"><br>
                            <ul class=" text-left">
                                <li><strong>Market cap : ${mktCapInB} B</strong></li>
                                <li><strong>Growth rate (%) : ${growthRatePercent}</strong></li>
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
                    <div id="grower-search-results-description">
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
                    <canvas id="grower-search-results-chart">

                    </canvas>
                </div>
            </div>
        </div>
        `
        growerSearchDiv.innerHTML = growerResults
    });

    // 10 month stock chart made with chartJS

       let chartData = [];
       let chartMonth = [];
    axios.get(newChartApiUrl).then(function (response) {
        let resultCount= 0;
        for (let [k, v] of Object.entries(response.data["Monthly Time Series"])) {
            chartData.push(v["4. close"]);
            chartMonth.push(k)
            resultCount ++;
            if (Object.keys(response.data["Monthly Time Series"]).length < 10) {
                if (Object.keys(response.data["Monthly Time Series"]).length === resultCount){
                break;
                };
            }else if(resultCount === 10){
                break;
            };
        };

        let growerChart = document.getElementById('grower-search-results-chart').getContext('2d');
        let myChart = new Chart(growerChart, {
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