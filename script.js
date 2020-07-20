// mainpage video playback speed

// document.querySelector("#mainpagevideo").playbackRate = 0.7

let apiUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=msft&apikey=486OHSPRRLZR5IJI';




document.querySelector('#saver-search-btn').addEventListener('click', function () {
    searchInput = document.querySelector('#saver-search').value;
    let newApiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchInput}&apikey=486OHSPRRLZR5IJI
    `
    axios.get(newApiUrl).then(function (response) {
        if (response.data.PERatio<20){
            let fireRating = "Firey Hot!"
        }else if(response.data.PERatio<30){
            let fireRating = "Hot!"
        }else if(response.data.PERatio<50){
            let fireRating = "Warm"
        }else if(response.data.PERatio<100){
            let fireRating = "Cold"
        }else{
            let fireRating = "Icy Cold"
        };
        let mktCap = parseFloat(response.data.MarketCapitalization)
        let mktCapInB = parseInt(mktCap/1000000000)
        let divYield = parseFloat(response.data.DividendYield)
        let divYieldInP = divYield * 100
        let saverResult = `
        <div id="accordion">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ${response.data.Name}'s Stock Information
                        </button>
                    </h5>
                </div>

                <div id="collapseOne" class="collapse show container" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body row" id="saver-results-stock-info">
                        <div class="col-10 col-lg-5">
                            <ul>
                                <li>Market cap: ${mktCapInB}B<li>
                                <li>Dividend yield: ${divYieldInP}%<li>
                                <li>P/E ratio: ${response.data.PERatio}<li>
                                <li>FIRE rating: ${fireRating}<li>
                            </ul>
                        </div>
                        <div class="col-10 col-lg-5"></div>
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
                <div class="card-body">
                ${response.data.Description}
                </div>
                </div>
            </div>
        </div>
        `
    })
})

