function run() {
  var results;
  $.when(
      $.ajax({
          type: "GET",
          url: './stats.json?nocache',
          contentType: "application/json; charset=utf-8",
          dataType: "text",
          success: function(data) {
              results = JSON.parse(data);
          },
          error: function (xhr, textStatus, errorThrown) {
              console.log("Error getting the stats", newTS, xht, textStatus, errorThrown);
          }
      }),
  ).then(function() {
    //# show stats
    //console.log(results);
    div = $("<div>").html(parseInt(results["stats"]["days_since_last_local_covid"])
      + "<div class=\"small\">days since the last local Covid-19 case in HK!</div>");
    div.addClass("number");
    $("#container").append(div);
    
    buffer = '';
    if(results["stats"]["number_of_too_recent_local_cases"] == 0) {
      //buffer = "No other recent local cases that could be reclassified";
    } else {
      s = (results["stats"]["number_of_too_recent_local_cases"] > 1) ? 's' : '';
      buffer = parseInt(results["stats"]["number_of_too_recent_local_cases"])
      + "<div class=\"small\">case"+s+" within the last " +
          parseInt(results["stats"]["days_waited_for_classification_confirmation"]) +
          " days, to be confirmed as local or not</div>";
      div = $("<div>").html(buffer);
      div.addClass("number");
      $("#container").append(div);
    }

    buffer = '';    
    if(results["stats"]["days_since_last_local_covid"] == 
       results["stats"]["longest_no_local_case"]) {
      buffer = "This is currently the longest period without local cases since the start of the pandemic!";
    } else {
      buffer = "The longest period without local cases was " +
                results["stats"]["longest_no_local_case"] +
               " days";
    }
    div = $("<div>").html(buffer);
    div.addClass("info");
    $("#container").append(div);

    div = $("<div>").html(parseInt(results["stats"]["number_of_deceased"])
      + "<div class=\"small\">deceased victims of Covid-19 in HK since the beginning of the pandemic</div>");
    div.addClass("number");
    $("#container").append(div);
    
    div = $("<div>").html(Math.round(parseFloat(results["stats"]["mean_age_deceased"])*10, 1)/10 +
      "<div class=\"small\">years old is the average age of the deceased victims of Covid-19 in HK (the median age is " +
      Math.round(parseFloat(results["stats"]["median_age_deceased"])*10, 1)/10 +
      " years old)</div>");
    div.addClass("number");
    $("#container").append(div);
    
    number_hospitalised = parseInt(results["stats"]["number_hospitalised"]);
    buffer = number_hospitalised +
      "<div class=\"small\">people " +
      ((number_hospitalised > 1) ? "are" : "is") +
      " currently hospitalised ";
    n = parseInt(results["stats"]["hospitalised_local_cases"]);
    if(n == 0) {
      buffer += "(all are imported cases)";
    } else if(n==number_hospitalised) {
      buffer += "(all are local cases)";
    } else {
      buffer += "(" + n + " of which " +
      ((n > 1) ? "are" : "is a") +
      " local case" +
      ((n > 1) ? "s" : "") +
      ")";
    }
    buffer += "</div>";
    div = $("<div>").html(buffer);
    div.addClass("number");
    $("#container").append(div);

    div = $("<div>").html(parseInt(results["stats"]["longest_currently_hospitalised"]) +
      "<div class=\"small\">days is the longest hospitalisation among current patients</div>");
    div.addClass("number");
    $("#container").append(div);
  });
}