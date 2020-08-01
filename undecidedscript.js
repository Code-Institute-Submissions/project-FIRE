// Questions to determine recommended stocks

document.querySelector("#undecided-submit").addEventListener("click", function () {
    let ageResponse = document.querySelector("#age_response").value;
    let riskResponse = document.querySelector("#risk_response").value;
    let dependantsResponse = document.querySelector("#dependants_response").value;
    let anxiousResponse = document.querySelector("#anxious_response").value;
    let recommendation = "";
    let displayPic = "";
    let displayLink = "";

    // if input fields are empty

    if (ageResponse == null || ageResponse == "", riskResponse == null || riskResponse == "", dependantsResponse == null || dependantsResponse == "", anxiousResponse == null || anxiousResponse == "") {
        return;
    };

    // sort results by input field

    if (ageResponse == "below_18") {
        recommendation = "100% Grower Stocks";
        displayPic = "pictures/grower.jpg";
        displayLink = "grower.html";
    } else if (ageResponse == "51_and_older") {
        recommendation = "100% Saver Stocks";
        displayPic = "pictures/saver.jpg";
        displayLink = "saver.html";
    } else if (ageResponse == "18_to_30" && ageResponse == "31_to_50") {
        if (riskResponse == "low_risk") {
            recommendation = "100% Saver Stocks";
            displayPic = "pictures/saver.jpg";
            displayLink = "saver.html";
        };
        if (riskResponse == "high_risk") {
            if (dependantsResponse == "no_dependants") {
                if (anxiousResponse == "not_anxious") {
                    recommendation = "100% Grower Stocks";
                    displayPic = "pictures/grower.jpg";
                    displayLink = "grower.html";
                };
                if (anxiousResponse == "anxious") {
                    recommendation = "30% Grower, 70% Saver";
                    displayPic = "pictures/saver.jpg";
                    displayLink = "saver.html";
                };
            };
            if (dependantsResponse == "have_dependants") {
                if (anxiousResponse == "not_anxious") {
                    recommendation = "30% Saver, 70% Growth";
                    displayPic = "pictures/grower.jpg";
                    displayLink = "grower.html";
                };
                if (anxiousResponse == "anxious") {
                    recommendation = "100% saver";
                    displayPic = "pictures/saver.jpg";
                    displayLink = "saver.html";
                };
            };
        };
        if (riskResponse == "neutral") {
            if (dependantsResponse == "no_dependants") {
                if (anxiousResponse == "not_anxious") {
                    recommendation = "100% Grower Stocks";
                    displayPic = "pictures/grower.jpg";
                    displayLink = "grower.html";
                };
                if (anxiousResponse == "anxious") {
                    recommendation = "20% Grower, 80% Saver";
                    displayPic = "pictures/saver.jpg";
                    displayLink = "saver.html";
                };
            };
            if (dependantsResponse == "have_dependants") {
                if (anxiousResponse == "not_anxious") {
                    recommendation = "40% Saver, 60% Grower";
                    displayPic = "pictures/grower.jpg";
                    displayLink = "grower.html";
                };
                if (anxiousResponse == "anxious") {
                    recommendation = "100% saver";
                    displayPic = "pictures/saver.jpg";
                    displayLink = "saver.html";
                };
            };
        };
    };
    let undecidedResults = document.querySelector("#undecided-results");
    let results = `
        <div class="card teaser-card" id="results-card" style="width: 25rem;">
            <div class="card-body">
                <img class="card-img-top" src="${displayPic}" alt="Card image cap">
                <h5 class="card-title card-text-header">We recommend ${recommendation}</h5>
                <a href="${displayLink}" class="btn main-page-btn">Learn More</a>
            </div>
        </div>
    `;
    undecidedResults.innerHTML = results;
});

