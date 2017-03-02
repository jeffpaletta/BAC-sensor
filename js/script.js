$( document ).ready(function() {
	getBloodAlcoholLevel();
	$("#beerButton").on("click", function() {
		var counter = $('#beerCounter').val();
		counter++;
		$('#beerCounter').val(counter);
		getBloodAlcoholLevel();
	});
	$("#wineButton").on("click", function() {
		var counter = $('#wineCounter').val();
		counter++;
		$('#wineCounter').val(counter);
		getBloodAlcoholLevel();
	});
	$("#liquorButton").on("click", function() {
		var counter = $('#liquorCounter').val();
		counter++;
		$('#liquorCounter').val(counter);
		getBloodAlcoholLevel();
	});
	
	
	

	$("#genderButton").on("click", function() {
		var current = $('#currentGender').val();
		if (current === "female") {
			$('#currentGender').val("male");
		}
		else {
			$('#currentGender').val("female");
		}
		getBloodAlcoholLevel();
	});
	
	
	
	
	
	
	
	
	$("#weightButtonAdd").on("click", function() {
		var counter = $('#weightCounter').val();
// 		counter = (counter + 5);	// WTF why doesn't this work ?????
		counter++;
		counter++;
		counter++;
		counter++;
		counter++;
		$('#weightCounter').val(counter);
		getBloodAlcoholLevel();
	});
	$("#weightButtonSubtract").on("click", function() {
		var counter = $('#weightCounter').val();
		counter= (counter - 5);
		$('#weightCounter').val(counter);
		getBloodAlcoholLevel();
	});
	
	
		
	
	
	$("#timeButtonAdd").on("click", function() {
		var counter = $('#timeCounter').val();
// 		counter = (counter + 5);	// WTF why doesn't this work ?????
		counter++;
		$('#timeCounter').val(counter);
		getBloodAlcoholLevel();
	});
	$("#timeButtonSubtract").on("click", function() {
		var counter = $('#timeCounter').val();
		counter= (counter - 1);
		$('#timeCounter').val(counter);
		getBloodAlcoholLevel();
	});
	
	
	
	
	$("#resetButton").on("click", function() {
		$('#beerCounter').val(0);
		$('#wineCounter').val(0);
		$('#liquorCounter').val(0);
		$('#currentGender').val("male");
		$('#weightCounter').val(150);
		$('#timeCounter').val(0);
		getBloodAlcoholLevel();
	});
	   
});   



/** 
 * function  getBloodAlcoholLevel()
 * Get values
 */
 
function getBloodAlcoholLevel() {
	var num_beer, num_wine, num_shots, gender, gender_const, weight_lbs, total_time, bac_result, bac_round, bac_status;
	num_beer =  $("#beerCounter").val();
	num_wine = $("#wineCounter").val();
	num_shots = $("#liquorCounter").val();
	gender = $("#currentGender").val();
	switch(gender) {
		case 'male':
			gender_const = 0.73; // male water level constant   
			break;
		case 'female':
			gender_const = 0.66; // female water level constant
			break;	
		default:
			gender_const = 0.73; // male water level constant
			break;	
	}		
	weight_lbs = $("#weightCounter").val();
	total_time = $("#timeCounter").val();	           
	bac_result = getBACResult(num_beer, num_wine, num_shots, weight_lbs, gender_const, total_time);		
	var resultIsNan = (bac_result !== bac_result); //value is NaN	
	if( (bac_result == Math.abs(bac_result)) || (resultIsNan !== true) ) { 
		bac_round = Math.round(bac_result*1000)/1000; // round to 3 decimal places	 	
		$('.result').text(bac_round.toFixed(3));
		bac_status = getBACEffects(bac_result);
		$('.effects').text(bac_status.toString());
	}
};

function getBACResult(num_beer, num_wine, num_shots, weight_lbs, gender_const, total_time) {
	var sd_beer, sd_wine, sd_shots, sd_total, est_bac_result;
	sd_beer = ( num_beer * 0.6 );
	sd_wine = ( num_wine * 0.6 );
	sd_shots = ( num_shots * 0.5 );
	sd_total = sd_beer + sd_wine + sd_shots;            
	est_bac_result = ( ( ( sd_total * 5.14 ) / ( weight_lbs * gender_const ) ) - ( 0.015 * total_time ) ); 
	return est_bac_result;
}

function getBACEffects(bac_result) {
	var effects, bac_num;
	bac_num = Math.round(bac_result*100)/100; // round to 2 decimal places
	if (bac_num < 0.02) {
		effects = "Not impaired";
/*
		var bgColor = document.querySelector('body');
		bgColor.style.backgroundColor = "#358d9d";
*/
	} else if (bac_num >= 0.02 && bac_num <= 0.03) {
		effects = "Mildly relaxed ";
	} else if (bac_num >= 0.04 && bac_num <= 0.06) {
		effects = "Some minor impairment";   
	} else if (bac_num >= 0.07 && bac_num <= 0.09) {
		effects = "Slight impairment";     
	} else if (bac_num >= 0.10 && bac_num <= 0.12) {
		effects = "Significant impairment";   
	} else if (bac_num >= 0.13 && bac_num <= 0.14) {
		effects = "Significant impairment";  	
	} else if (bac_num >= 0.15 && bac_num <= 0.19) {
		effects = "Dysphoria";   
	} else if (bac_num >= 0.20 && bac_num <= 0.24) {
		effects = "Disoriented";  
	} else if (bac_num >= 0.25 && bac_num <= 0.29) {
		effects = "Severe impairment";  		
	} else if (bac_num >= 0.30 && bac_num <= 0.39) {
		effects = "Coma is possible";     
	} else if (bac_num >= 0.40) {
		effects = "Onset of coma";    
	}
	return effects;
}