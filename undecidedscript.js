// Questions to determine recommended stocks

document.querySelector("#undecided-submit").addEventListener("click", function () {
    let errMsg = document.querySelector("#error-message");
    let ageResponse = document.querySelector("#age_response").value;
    let riskResponse = document.querySelector("#risk_response").value;
    let dependantsResponse = document.querySelector("#dependants_response").value;
    let anxiousResponse = document.querySelector("#anxious_response").value;
    let recommendation = "";
    let displayPic = "";
    let displayLink = "";
    let displayText = "";
    // if input fields are empty
    if (ageResponse == null || ageResponse == "", riskResponse == null || riskResponse == "", dependantsResponse == null || dependantsResponse == "", anxiousResponse == null || anxiousResponse == "") {
        return;
    }else{
    // sort results by input field

    if (ageResponse == "below_18") {
        recommendation = "100% Grower Stocks";
        displayPic = "pictures/grower.jpg";
        displayLink = "grower.html";
        displayText = "As someone who is still very young, you have pretty much nothing to lose and everything to gain. So roll the dice and shoot for the stars!";
    };
    if (ageResponse == "51_and_older") {
        recommendation = "100% Saver Stocks";
        displayPic = "pictures/saver.jpg";
        displayLink = "saver.html";
        displayText = "As someone who is very close to the retirement age, we suggest that you take it slow and enjoy your stress free retirement.";
    };
    if (ageResponse == "18_to_30" || ageResponse == "31_to_50") {
        if (riskResponse == "low_risk") {
            recommendation = "100% Saver Stocks";
            displayPic = "pictures/saver.jpg";
            displayLink = "saver.html";
            displayText = "Your risk tolerance level indicates that you have no interest in participating in high risk ventures.";
        };
        if (riskResponse == "high_risk") {
            if (dependantsResponse == "no_dependants") {
                if (anxiousResponse == "not_anxious") {
                    recommendation = "100% Grower Stocks";
                    displayPic = "pictures/grower.jpg";
                    displayLink = "grower.html";
                    displayText = "You have a high risk tolerance. We suggest you go after the major disruptors of the economy.";
                };
                if (anxiousResponse == "anxious") {
                    recommendation = "30% Grower, 70% Saver stocks";
                    displayPic = "pictures/saver.jpg";
                    displayLink = "saver.html";
                    displayText = "You indicated that you have a high risk tolerance but you have a tendency to worry. Therefore we suggest a mix of both worlds.";
                };
            };
            if (dependantsResponse == "have_dependants") {
                if (anxiousResponse == "not_anxious") {
                    recommendation = "30% Saver, 70% Grower stocks";
                    displayPic = "pictures/grower.jpg";
                    displayLink = "grower.html";
                    displayText = "You have a high risk tolerance and a steady hand. However, you have dependants to care for and that's why ww suggest a healthy selection of safe stocks.";
                };
                if (anxiousResponse == "anxious") {
                    recommendation = "100% Saver stocks";
                    displayPic = "pictures/saver.jpg";
                    displayLink = "saver.html";
                    displayText = "Although you have a high risk tolerance, your tendency to worry coupled with your need to card for dependants has led us to conclude that you will be better off with safe stocks.";
                };
            };
        };
        if (riskResponse == "neutral") {
            if (dependantsResponse == "no_dependants") {
                if (anxiousResponse == "not_anxious") {
                    recommendation = "100% Grower Stocks";
                    displayPic = "pictures/grower.jpg";
                    displayLink = "grower.html";
                    displayText = "Since you have no dependants and you are not the anxious type, we suggest 100% growth stocks!";
                };
                if (anxiousResponse == "anxious") {
                    recommendation = "20% Grower, 80% Saver stocks";
                    displayPic = "pictures/saver.jpg";
                    displayLink = "saver.html";
                    displayText = "You have no dependants and you are neutral on your risk tolerance. However, we feel like you are better suited going heavy on safe stocks given your nervous nature.";
                };
            };
            if (dependantsResponse == "have_dependants") {
                if (anxiousResponse == "not_anxious") {
                    recommendation = "50% Saver, 50% Grower stocks";
                    displayPic = "pictures/grower.jpg";
                    displayLink = "grower.html";
                    displayText = "Although you are not anxious, your neutral risk tolerance and need to care for dependants led us to suggest a 50/50 split for stocks.";
                };
                if (anxiousResponse == "anxious") {
                    recommendation = "100% Saver stocks";
                    displayPic = "pictures/saver.jpg";
                    displayLink = "saver.html";
                    displayText = "The ability to sleep at night outweighs any financial incentive. Therefore, we suggest 100% safe stocks for you.";
                };
            };
        };
    };
    let undecidedResults = document.querySelector("#undecided-results");
    let results = `<br><br>
        <div class="card all-card">
            <div class="card-body">
                <img class="card-img-top" src="${displayPic}" alt="Card image cap">
                <h5 class="card-title card-text-header">We recommend ${recommendation}</h5>
                <p class="card-text card-text-body">
                    ${displayText}
                </p>
                <a href="${displayLink}" class="btn main-page-btn">Learn More</a>
            </div>
        </div>
    `;       
    undecidedResults.innerHTML = results;
    };
});

