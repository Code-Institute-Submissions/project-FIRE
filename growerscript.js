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
                        <div class="col-10 col-lg-5">
                            <ul>
                                <li>Market cap: ${mktCapInB} B</li>
                                <li>Dividend yield: ${divYieldInP} %</li>
                                <li>Growth rate per quarter: ${growthRatePercent} %</li>
                                <li>FIRE rating: ${fireRating}</li>
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
                        ${response.data.Name}'s 12 Month Price Chart
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
    axios.get(newChartApiUrl).then(function (response) {
        chartData.push(response.data["Monthly Time Series"]["2019-07-31"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2019-08-30"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2019-09-30"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2019-10-31"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2019-11-29"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2019-12-31"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2020-01-31"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2020-02-28"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2020-03-31"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2020-04-30"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2020-05-29"]["4. close"]);
        chartData.push(response.data["Monthly Time Series"]["2020-06-30"]["4. close"]);
        let growerChart = document.getElementById('grower-search-results-chart').getContext('2d');
        let myChart = new Chart(growerChart, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                datasets: [{
                    label: 'Months',
                    data: [chartData[0], chartData[1], chartData[2], chartData[3], chartData[4], chartData[5], chartData[6], chartData[7], chartData[8], chartData[9], chartData[10], chartData[11]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }],
            },
        });
    });
});

