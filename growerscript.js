// mainpage video playback speed

// document.querySelector("#mainpagevideo").playbackRate = 0.7

let apiUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=msft&apikey=486OHSPRRLZR5IJI';

let chartApiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=tsla&apikey=486OHSPRRLZR5IJI';

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
        if (isNaN(divYieldInP)) {
            divYieldInP = "Not Applicable"
        };
        if (growthRatePercent <= 0) {
            fireRating = "Icy Cold"
        } else if (growthRatePercent < 5) {
            fireRating = "Cold"
        } else if (growthRatePercent < 10) {
            fireRating = "Warm"
        } else if (growthRatePercent < 20) {
            fireRating = "Hot"
        } else {
            fireRating = "Fiery Hot!"
        };
        let growerSearchDiv = document.querySelector("#grower-search-results");
        let growerResults = `
        <div id="accordion">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ${response.data.Name}'s Stock Information
                        </button>
                    </h5>
                </div>
                <div id="collapseOne" class="collapse show container-fluid" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body row" id="grower-results-stock-info">
                        <div class="container">
                            <p>FIRE rating is based on ${response.data.Name}'s P/E ratio because that is the time tested 
                            indicator of a stable company.</p>
                        </div>
                    <div>
                        <ul>
                            <li>Firey HOT! : P/E ratio of 20 or less.</li>
                            <li>HOT! : P/E ratio of 20 to 29.</li>
                            <li>Warm : P/E ratio of 30 to 49</li>
                            <li>Cold : P/E ratio of 50 to 99</li>
                            <li>Icy Cold : P/E ratio of 100 and above.</li>
                        </ul>
                </div>
                        <div class="col-10 col-lg-5">
                            <ul>
                                <li>Market cap : ${mktCapInB} B</li>
                                <li>Dividend yield (%) : ${divYieldInP} </li>
                                <li>Growth rate per quarter (%) : ${growthRatePercent}</li>
                                <li>FIRE rating : ${fireRating}</li>
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