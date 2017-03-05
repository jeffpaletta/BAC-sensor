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

 
function getBloodAlcoholLevel() {
	var num_beer, num_wine, num_shots, gender, gender_const, weight_lbs, total_time, bac_result, bac_round, bac_effects, bac_status;
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
		$('.result').text(bac_round.toFixed(2));
		bac_effects = getBACEffects(bac_result);
		bac_status = getBACStatus(bac_result);
		$('.effects').text(bac_effects.toString());
		$('.status').text(bac_status.toString());
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
		
		var bgColor = document.querySelector('body');
		bgColor.style.backgroundColor = "#358d9d";
	} 
	
	if (bac_num >= 0.00 && bac_num <= 0.01) {
        effects = "If you are under 22 years of age, it is illegal to drive with any BAC above 0.0%";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#308d9f";  
    }
   
    else if (bac_num >= 0.01 && bac_num <= 0.02) {
        effects = "5% of alcohol is removed by your lungs when you exhale";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#348f9e";  
    }
   
    else if (bac_num >= 0.02 && bac_num <= 0.03) {
        effects = "You are more relaxed, and may experience slight mood changes";  

        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#3e939b";  
    }
   
    else if (bac_num >= 0.03 && bac_num <= 0.04) {
        effects = "90% of alcohol consumed is being metabolized by your liver";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#469997";  
    }
   
    else if (bac_num >= 0.04 && bac_num <= 0.05) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#4c9d94";  
    }
   
    else if (bac_num >= 0.05 && bac_num <= 0.06) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#52a38f";  
    }
   
    else if (bac_num >= 0.06 && bac_num <= 0.07) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#56a88b";  
    }
   
    else if (bac_num >= 0.07 && bac_num <= 0.08) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#5dae86";  
    }
   
    else if (bac_num >= 0.08 && bac_num <= 0.09) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#64b382";  
    }
   
    else if (bac_num >= 0.09 && bac_num <= 0.10) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#76b97e";  
    }
   
    // 0.10
    else if (bac_num >= 0.10 && bac_num <= 0.11) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#89bd7b";  
    }
   
    else if (bac_num >= 0.11 && bac_num <= 0.12) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#9ac379";  
    }
   
    else if (bac_num >= 0.12 && bac_num <= 0.13) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#aec976";  
    }
   
    else if (bac_num >= 0.13 && bac_num <= 0.14) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#bece72";  
    }
   
    else if (bac_num >= 0.14 && bac_num <= 0.15) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#cfd36e";  
    }
   
    else if (bac_num >= 0.15 && bac_num <= 0.16) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#dfd869";  
    }
   
    else if (bac_num >= 0.16 && bac_num <= 0.17) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#efdf64";  
    }
   
    else if (bac_num >= 0.17 && bac_num <= 0.18) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f3d35b";  
    }
   
    else if (bac_num >= 0.18 && bac_num <= 0.19) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f4c450";  
    }
   
    else if (bac_num >= 0.19 && bac_num <= 0.20) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f4b746";  
    }
   
	// 0.20
    else if (bac_num >= 0.20 && bac_num <= 0.21) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f4a83c";  
    }
   
    else if (bac_num >= 0.21 && bac_num <= 0.22) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f39a35";  
    }
   
    else if (bac_num >= 0.22 && bac_num <= 0.23) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f38b2c";  
    }
   
    else if (bac_num >= 0.23 && bac_num <= 0.24) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f37f26";  
    }
   
    else if (bac_num >= 0.24 && bac_num <= 0.25) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f37122";  
    }
   
    else if (bac_num >= 0.25 && bac_num <= 0.26) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f26b2a";  
    }
   
    else if (bac_num >= 0.26 && bac_num <= 0.27) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f2652f";  
    }
   
    else if (bac_num >= 0.27 && bac_num <= 0.28) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f15d35";  
    }
   
    else if (bac_num >= 0.28 && bac_num <= 0.29) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f1573a";  
    }
   
    else if (bac_num >= 0.29 && bac_num <= 0.30) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#f04f3f";  
    }
    
    // 0.30
    else if (bac_num >= 0.30 && bac_num <= 0.31) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#ef4844";  
    }
   
    else if (bac_num >= 0.31 && bac_num <= 0.32) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#ef4445";  
    }
   
    else if (bac_num >= 0.32 && bac_num <= 0.33) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#ee3a49";  
    }
   
    else if (bac_num >= 0.33 && bac_num <= 0.34) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#e03b4a";  
    }
   
    else if (bac_num >= 0.34 && bac_num <= 0.35) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#cd3c49";  
    }
   
    else if (bac_num >= 0.35 && bac_num <= 0.36) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#bc3d48";  
    }
   
    else if (bac_num >= 0.36 && bac_num <= 0.37) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#ac3d47";  
    }
   
    else if (bac_num >= 0.37 && bac_num <= 0.38) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#9b3d46";  
    }
   
    else if (bac_num >= 0.38 && bac_num <= 0.39) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#8c3b44";  
    }
   
    else if (bac_num >= 0.39 && bac_num <= 0.40) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#7d3942";  
    }
    
    // 0.40
    else if (bac_num >= 0.40 && bac_num <= 0.41) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#62343d";
    }
   
    else if (bac_num >= 0.41 && bac_num <= 0.42) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#58313b";
    }
   
    else if (bac_num >= 0.42 && bac_num <= 0.43) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#4b2d37";
    }
   
    else if (bac_num >= 0.43 && bac_num <= 0.44) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#402934";
    }
   
    else if (bac_num >= 0.44 && bac_num <= 0.45) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#352530";
    }
   
    else if (bac_num >= 0.45 && bac_num <= 0.46) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#28202c";
    }
   
    else if (bac_num >= 0.46 && bac_num <= 0.47) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#1b1c28";
    }
   
    else if (bac_num >= 0.47 && bac_num <= 0.48) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#161a27";
    }
   
    else if (bac_num >= 0.48 && bac_num <= 0.49) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#161a27";
    }
   
   else if (bac_num >= 0.49 && bac_num <= 0.50) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#000000";
    }
 
    else if (bac_num >= 0.50) {
        effects = "Onset of coma";  
                 
        var bgColor = document.querySelector('body');
        bgColor.style.backgroundColor = "#ffffff";  
    } 
	return effects;
};



function getBACStatus(bac_result) {
	var status, bac_num;
	bac_num = Math.round(bac_result*100)/100; // round to 2 decimal places
	
	 if (bac_num <= 0.02) {
        status = "Sobriety";
    }
   
    else if (bac_num > 0.02 && bac_num <= 0.09) {
        status = "Euphoria";
    }
    
    else if (bac_num > 0.09 && bac_num <= 0.12) {
        status = "Euphoric Excitement";
    }
   
    else if (bac_num > 0.12 && bac_num <= 0.13) {
        status = "Excitement";
    }
   
    else if (bac_num > 0.13 && bac_num <= 0.18) {
        status = "Excitement";
    }
   
    else if (bac_num > 0.18 && bac_num <= 0.24) {
        status = "Excited Confusion";
    }
   
    else if (bac_num > 0.24 && bac_num <= 0.35) {
        status = "Confused Stuper";
    }
   
    else if (bac_num > 0.35 && bac_num <= 0.40) {
        status = "Stupor Coma";
    }
   
    else if (bac_num > 0.40 && bac_num < 0.50) {
        status = "Coma";
    }
   
    else if (bac_num > 0.50) {
        status = "Death";
    }
    
	return status;
}