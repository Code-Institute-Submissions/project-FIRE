// mainpage video playback speed

// document.querySelector("#mainpagevideo").playbackRate = 0.7

let apiUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=msft&apikey=486OHSPRRLZR5IJI';

let  chartApiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=tsla&apikey=486OHSPRRLZR5IJI'


document.querySelector('#saver-search-btn').addEventListener('click', function () {
    searchInput = document.querySelector('#saver-search').value;
    let newApiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchInput}&apikey=486OHSPRRLZR5IJI
    `;
    let newChartApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${searchInput}&apikey=486OHSPRRLZR5IJI
    `;
    axios.get(newChartApiUrl).then(function (response){
        let chartData = [];
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
        chartData.push(response.data["Monthly Time Series"]["2020-07-20"]["4. close"]);
        console.log(chartData)
    })
    axios.get(newApiUrl).then(function (response) {
        let fireRating = "";
        let mktCap = parseFloat(response.data.MarketCapitalization);
        let mktCapInB = (mktCap/1000000000).toFixed( 2 );
        let divYield = parseFloat(response.data.DividendYield);
        let divYieldInP = (divYield * 100).toFixed( 2 );
        let peRatio = parseFloat(response.data.PERatio).toFixed( 2 )
        if (isNaN(peRatio)){
            peRatio = "Not Applicable"
        }
        if (peRatio < 20){
            fireRating = "Firey Hot!"
        }else if(peRatio < 30){
            fireRating = "Hot!"
        }else if(peRatio < 50){
            fireRating = "Warm"
        }else if(peRatio < 100){
            fireRating = "Cold"
        }else{
            fireRating = "Icy Cold"
        };
        let saverSearchDiv = document.querySelector("#saver-search-results");
        let saverResults = `
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
                    <div class="card-body row" id="saver-results-stock-info">
                        <div class="col-10 col-lg-5">
                            <ul>
                                <li>Market cap: ${mktCapInB} B</li>
                                <li>Dividend yield: ${divYieldInP}%</li>
                                <li>P/E ratio: ${peRatio}</li>
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
                <div id="saver-search-results-description">
                ${response.data.Description}
                </div>
                </div>
            </div>
        </div>
        `
        saverSearchDiv.innerHTML = saverResults
    });
});

