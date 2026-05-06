/*
Program name: homework4.js
Author: Kevin Hung Trinh
Date created: 5/1/26
Date last edited: 5/1/26
Version: 1.4
Description: Redisplay the form by table and validate on the fly. Cookies added.
*/

var error_flag = 0;

function checkfirstname() {
  let x = document.getElementById("firstname").value;

  if (x.length < 2) {
    document.getElementById("firstname_message").innerHTML = "Invalid name. Too short.";
    document.getElementById("firstname_message").style.color = "red";
    error_flag = 1;
  } 
  else if (!x.match(/^[A-Za-z'-]+$/)) {
    document.getElementById("firstname_message").innerHTML = "Invalid characters. Use only letters, apostrophes, or dashes.";
    document.getElementById("firstname_message").style.color = "red";
    error_flag = 1;
  } 
  else {
    document.getElementById("firstname_message").innerHTML = "Valid";
    document.getElementById("firstname_message").style.color = "green";
    setCookie("fname", x, 1);
  }
}

function checkmiddleinitial() {
  let x = document.getElementById("middleinitial").value;

  if (x === "") {
    document.getElementById("middle_message").innerHTML = "";
  } 
  else if (x.match(/[a-zA-Z ]/)) {
    document.getElementById("middle_message").innerHTML = "Valid";
    document.getElementById("middle_message").style.color = "green";
  } 
  else {
    document.getElementById("middle_message").innerHTML = "Invalid";
    document.getElementById("middle_message").style.color = "red";
    error_flag = 1;
  }
}

function checklastname(){
    let x = document.getElementById("lastname").value;
    if( x.length < 2) { 
        document.getElementById("lastname_message").innerHTML = "Invalid name. too short.";
        document.getElementById("lastname_message").style.color = "red";
        error_flag = 1;  
    }
    else {
        if (x.match(/^[a-zA-Z2-5'-]+$/)) {
            document.getElementById("lastname_message").innerHTML = "Valid";
            document.getElementById("lastname_message").style.color = "green";
        }
        else  {
            document.getElementById("lastname_message").innerHTML = "Use only letters, apostrophes, numbers 2-5, or dashes.";
            document.getElementById("lastname_message").style.color = "red";
            error_flag = 1;
        }
    }
}

function checkPhone() {
    let phone = document.getElementById("phone").value;

    if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)) {
        document.getElementById("phone_message").innerHTML = "Invalid format. Use ###-###-####.";
        document.getElementById("phone_message").style.color = "red";
        error_flag = 1;
    } else {
        document.getElementById("phone_message").innerHTML = "Valid";
        document.getElementById("phone_message").style.color = "green";
    }
}

function checkdob() {
    let birthDate = new Date(document.getElementById("dob").value);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (!document.getElementById("dob").value) {
        document.getElementById("birthday_message").innerHTML = "Please enter your date of birth.";
        document.getElementById("birthday_message").style.color = "red";
        error_flag = 1;
    } 
    else if (birthDate > today) {
        document.getElementById("birthday_message").innerHTML = "Date cannot be from the future.";
        document.getElementById("birthday_message").style.color = "red";
        error_flag = 1;
    } 
    else if (age > 120) {
        document.getElementById("birthday_message").innerHTML = "Age cannot exceed 120 years.";
        document.getElementById("birthday_message").style.color = "red";
        error_flag = 1;
    } 
    else {
        document.getElementById("birthday_message").innerHTML = "Valid";
        document.getElementById("birthday_message").style.color = "green";
    }
}

function checkSSN() {
    let ssn = document.getElementById("ssn").value;

    if (!/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(ssn)) {
        document.getElementById("ssn_message").innerHTML = "SSN must be in the format ###-##-####";
        document.getElementById("ssn_message").style.color = "red";
        error_flag = 1;
    } else {
        document.getElementById("ssn_message").innerHTML = "Valid";
        document.getElementById("ssn_message").style.color = "green";
    }
}

function checkAddress1() {
    let x = document.getElementById("add1").value;

    if (x.length < 2) {
        document.getElementById("address1_message").innerHTML = "Address too short (min 2 characters).";
        document.getElementById("address1_message").style.color = "red";
        error_flag = 1;
    }
    else if (x.length > 30) {
        document.getElementById("address1_message").innerHTML = "Address too long (max 30 characters).";
        document.getElementById("address1_message").style.color = "red";
        error_flag = 1;
    }
    else {
        document.getElementById("address1_message").innerHTML = "Valid";
        document.getElementById("address1_message").style.color = "green";
    }
}

function checkEmail() {
    let email = document.getElementById("email").value;

    if (!/^[A-Za-z0-9._%+-]+@domain\.tld$/.test(email)) {
        document.getElementById("email_message").innerHTML = "Email must end with @domain.tld";
        document.getElementById("email_message").style.color = "red";
        error_flag = 1;
    } else {
        document.getElementById("email_message").innerHTML = "Valid";
        document.getElementById("email_message").style.color = "green";
    }
}

async function getStates(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();

    document.getElementById("state").innerHTML = myText;
}

function updateHealthValue() {
  let value = document.getElementById("health").value;
  document.getElementById("health_value").textContent = value;
}

function checkUsername() {
    let x = document.getElementById("username").value;

    if (x.length < 5 || x.length > 30) {
        document.getElementById("username_message").innerHTML = "Username must be 5-30 characters long.";
        document.getElementById("username_message").style.color = "red";
        error_flag = 1;
    }
    else if (!/^[A-Za-z]/.test(x)) {
        document.getElementById("username_message").innerHTML = "Username must start with a letter.";
        document.getElementById("username_message").style.color = "red";
        error_flag = 1;
    }
    else if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(x)) {
        document.getElementById("username_message").innerHTML = "Use only letters, numbers, underscores, or dashes.";
        document.getElementById("username_message").style.color = "red";
        error_flag = 1;
    }
    else {
        let lowerUsername = x.toLowerCase();
        document.getElementById("username").value = lowerUsername;
        document.getElementById("username_message").innerHTML = "Valid";
        document.getElementById("username_message").style.color = "green";
    }
}

function checkPassword() {
  let x = document.getElementById("password").value;

  if (x.length < 8 || x.length > 30) {
    document.getElementById("password_message").innerHTML = "Last name must be 8-30 characters long.";
    document.getElementById("password_message").style.color = "red";
    error_flag = 1;
  } 
  else if (!x.match(/[A-Z]/)) {
    document.getElementById("password_message").innerHTML = "Must contain at least 1 uppercase letter.";
    document.getElementById("password_message").style.color = "red";
    error_flag = 1;
  }
  else if (!x.match(/[a-z]/)) {
    document.getElementById("password_message").innerHTML = "Must contain at least 1 lowercase letter.";
    document.getElementById("password_message").style.color = "red";
    error_flag = 1;
  }
  else if (!x.match(/[0-9]/)) {
    document.getElementById("password_message").innerHTML = "Must contain at least 1 number.";
    document.getElementById("password_message").style.color = "red";
    error_flag = 1;
  }
  else if (!x.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    document.getElementById("password_message").innerHTML = "Must contain at least 1 special character.";
    document.getElementById("password_message").style.color = "red";
    error_flag = 1;
  }
  else {
    document.getElementById("password_message").innerHTML = "Valid";
    document.getElementById("password_message").style.color = "green";
  }
}

function checkConfirmPassword() {
    let x = document.getElementById("password").value;
    let y = document.getElementById("confirmPassword").value;

    if (x === y) {
        document.getElementById("confirmError").innerHTML = "Valid";
        document.getElementById("confirmError").style.color = "green";
    } else {
        document.getElementById("confirmError").innerHTML = "Passwords do not match";
        document.getElementById("confirmError").style.color = "red";
        error_flag = 1;
    }
}

function getdata() {
    var form, formoutput, datatype, name, value, i;

    form = document.getElementById("register");

    formoutput = "<table class='formoutput' border='1' cellpadding='5'><tr><th>Data Names</th><th>Data Type</th><th>Value</th></tr>";

    for (i = 0; i < form.elements.length; i++ ) {

        datatype = form.elements[i].type;
        name = form.elements[i].name;
        value = form.elements[i].value;

        switch(datatype) {
            case "checkbox":
                if (form.elements[i].checked) {
                formoutput += "<tr><td>" + name + "</td><td>" + datatype + "</td><td>Checked (" + value + ")</td></tr>";
            }
            break;
            case "radio":
                if (form.elements[i].checked) {
                formoutput += "<tr><td>" + name + "</td><td>" + datatype + "</td><td>" + value + "</td></tr>";
            }
            break;
            case "button":
            case "submit":
            case "reset":
            break;
            default:
            formoutput += "<tr><td>" + name + "</td><td>" + datatype + "</td><td>" + value + "</td></tr>";
              
        }
    }
            formoutput += "</table>";
            document.getElementById("outputformdata").innerHTML = formoutput;
}

function checkform() {
    error_flag = 0;

    checkfirstname();
    checkmiddleinitial();
    checklastname();
    checkPhone();
    checkdob();
    checkSSN();
    checkAddress1();
    checkEmail();
    checkUsername();
    checkPassword();
    checkConfirmPassword();

    console.log("Error flag: " + error_flag);

    if (error_flag == 1) {
        alert("Please fix the indicated errors!");
    } else {
        document.getElementById("Submit").disabled = false;
    }
}

function setCookie(cname, cvalue, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname){
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
  let c = ca[i];
  while (c.charAt(0) == ' ') {
  c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
  return c.substring(name.length, c.length);
  }
}
  return "";
}

function checkCookie(){
    let message;
    let fname = getCookie("fname");
    if (fname != "") 
    {
      message = "Welcome back "+ fname + ".\nPress OK to confirm or Cancel if this isn't "+fname+".";
      if (confirm(message)) 
    {
      document.getElementById("firstname").setAttribute('value',fname);
    }
      else
        {
          setCookie("fname", "" , 0);  
        } 
    }
}


