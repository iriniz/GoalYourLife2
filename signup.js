function set_label(field, value, valid) {
	var label = document.querySelector('.js-feedback[for="'+field+'"]');
	var formElement = document.forms["signup_form"][field];
	label.innerText = value;
	if (valid) {
		label.style.color = "#7064db";
		formElement.style.border = "inherit";
	} else {
		label.style.color = "#db7064";
		formElement.style.border = "2px solid #db7064";
	}
}
function set_address_label(field, value, valid) {
	var label = document.querySelector('.js-feedback[for="postcode"]');
	var formElement = document.forms["signup_form"][field];
	label.innerText = value;
	if (valid) {
		label.style.color = "#7064db";
		formElement.style.border = "inherit";
	} else {
		label.style.color = "#db7064";
		formElement.style.border = "2px solid #db7064";
	}
}
function charTypeAt(string, position) {
	code = string.charCodeAt(position)
	if (code >= 48 && code < 58) return "number";
	if (code >= 65 && code < 91) return "capital";
	if (code >= 97 && code < 123) return "lower";
	return "special";
}
function check_fields() {
	let form = document.forms["signup_form"];
	var success = true;
	document.querySelector(".behaviour").style.display = "block";
	
	// check username
	var val = form["username"].value;
	if (val.length < 5 || val.length > 14) {
		set_label("username", "Must be 5 to 14 characters long.", false);
		success = false;
	} else if (charTypeAt(val,0) != "capital") {
		set_label("username", "Must begin with a capital letter", false);
		success = false;
	} else if (charTypeAt(val,val.length - 1) != "special")  {
		set_label("username", "Must end with a special character", false);
		success = false;
	} else {
		set_label("username", "Correct input!", true)
	}
	
	// check password
	val = form["password"].value;
	if (val.length < 12) {
		set_label("password", "Must be at least 12 characters long.", false);
		success = false;
	} else{
		var numberFound = false;
		var capitalFound = false;
		var lowerFound = false;
		var specialFound = false;
		for (var i = 0; i < val.length; i++) {
			let type = charTypeAt(val, i);
			if (type == "number") numberFound = true;
			if (type == "capital") capitalFound = true;
			if (type == "lower") lowerFound = true;
			if (type == "special") specialFound = true;
		}
		if (!numberFound) {
			set_label("password", "Must contain a number.", false);
			success = false;
		} else if (!capitalFound) {
			set_label("password", "Must contain a capital letter.", false);
			success = false;
		} else if (!lowerFound) {
			set_label("password", "Must contain a lowercase letter.", false);
			success = false;
		} else if (!specialFound) {
			set_label("password", "Must contain a special character.", false);
			success = false;
		} else if (val.length < 14) {
			set_label("password", "Correct input, but a longer password would be better.", true);
		} else {
			set_label("password", "Correct input!", true);
		}
	}
	
	// check name
	val = form["name"].value;
	var invalidChars = false;
	for (var i = 0; i < val.length; i++) {
		if (charTypeAt(val, i) != "capital" && charTypeAt(val, i) != "lower" && val.charAt(i) != " ") {
			invalidChars = true;
		}
	}
	if (invalidChars) {
		set_label("name", "Must only contain space-separated characters.", false);
		success = false;
	} else if (val.length == 0) {
		set_label("name", "Must not be empty.", false); 
		success = false;
	} else {
		set_label("name", "Correct input!", true);
	}
	
	// check postcode
	val = form["postcode"].value;
	var invalidPostcode = false;
	for (var i = 0; i < val.length; i++) {
		if (i < 4 && charTypeAt(val, i) != "number") {
			invalidChars = true;
		} else if (i >=4 && charTypeAt(val, i) != "capital") {
			invalidChars = true;
		}
	}
	if (val.length != 6 || invalidChars) {
		invalidPostcode = true;
	} else {
		set_address_label("postcode", "Correct input!", true);
	}
	
	// check country
	val = form["country"].value;
	if (val.length == 0) {
		set_address_label("country", "The Country field must not be empty.", false);
		success = false;
	} else {
		set_address_label("country", "Correct input!", true);
	}
	
	if (invalidPostcode) {
		set_address_label("postcode", "Enter a Dutch postcode, formatted like 1234AB.", false);
		success = false;
	}
	
	// check email
	val = form["email"].value;
	let allowedSpecial = "!#$%&'*+-/=?^_`{|}~";
	var atEncountered = false;
	var textAfterAt = false;
	var invalidChars = false;
	for (var i = 0; i < val.length; i++) {
		if (atEncountered) {
			textAfterAt = true;
		}
		if (val.charAt(i) == "@") {
			if (atEncountered || i == 0) invalidChars = true;
			else atEncountered = true;
		} else if (charTypeAt(val, i) != "special") {
			continue;
		} else if ((val.charAt(i) == "." || val.charAt(i) == "-") && i != 0 && i != (val.length - 1)) {
			continue;
		} else if (allowedSpecial.indexOf(val.charAt(i)) > -1 && !atEncountered) {
			continue;
		} else {
			invalidChars = true;
		}
	}
	if (invalidChars || !textAfterAt || !atEncountered) {
		set_label("email", "Must be a valid email address.", false);
		success = false;
	} else {
		set_label("email", "Correct input!", true);
	}
	
	return false;
}