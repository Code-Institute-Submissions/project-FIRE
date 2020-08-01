// Questions to determine recommended stocks

document.querySelector("#undecided-submit").addEventListener("click", function(){
    let age_response = document.querySelector("#age_response").value;
    let risk_response = document.querySelector("#risk_response").value;
    let dependants_response = document.querySelector("#dependants_response").value;
    let anxious_response = document.querySelector("#anxious_response").value;
    let recommendation = ""
    if (age_response == "below_18"){
        recommendation = "100% Grower Stocks";
        break;
    }else if (age_response == "51_and_older"){
        recommendation = "100% Saver Stocks";
        break;
    }else if(age_response != "below_18" && age_response != "51_and_older"){
        if (risk_response == "low_risk"){
            recommendation = "100% Saver Stocks";
            break;
        };
        if (risk_response == "high_risk"){
            if (dependants_response == "no_dependants"){
                if (anxious_response == "not_anxious"){
                    recommendation = "100% Grower Stocks";
                    break;
                };
                if (anxious_response == "anxious"){
                    recommendation = "30% Grower, 70% Saver";
                    break;
                };
            };
            if (dependants_response == "have_dependants"){
                if (anxious_response == "not_anxious"){
                    recommendation = "30% Saver, 70% Growth";
                    break;
                };
                if (anxious_response == "anxious"){
                    recommendation = "100% saver";
                    break;
                };
            };
        };
        if (risk_response == "neutral"){
            if (dependants_response == "no_dependants"){
                if (anxious_response == "not_anxious"){
                    recommendation = "100% Grower Stocks";
                    break;
                };
                if (anxious_response == "anxious"){
                    recommendation = "20% Grower, 80% Saver";
                    break;
                };
            };
            if (dependants_response == "have_dependants"){
                if (anxious_response == "not_anxious"){
                    recommendation = "40% Saver, 60% Grower";
                    break;
                };
                if (anxious_response == "anxious"){
                    recommendation = "100% saver";
                    break;
                };
            };
        }
    }
});

