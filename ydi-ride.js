'use strict';

var currentDonationMode = "Credit Card";

var testDonor = function () {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/donor/makenew",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "fd707644-2f26-8484-9ae4-f49511b1df4a",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "name": "Bob Kutter",
    "email": "bob@gmail.com",
    "amount": "1000"
  }
}


$.ajax(settings).done(function (response) {
  console.log(response);
});

};

 var callback =  function callback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    $('#result').val(JSON.stringify(data, null, 4));
  };

var ajaxapi = {
   //ttt: 'https://powerful-earth-3914.herokuapp.com/',
   url:'http://localhost:3000',
  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },


  createDonor: function (data, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/donor/makenew',
      contentType: 'application/json',
      data: JSON.stringify(data)
    }, callback);
  },

};


$(document).ready(function () {


 $('#submitDonor').on('submit',function (e){
    e.preventDefault();


      // var fbURL = "http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(imgURL);

  //     window.location.href = fbURL;
    //$('#facebookUpload').blur();
    console.log("got Here");
  });


$('#registerButton').on('click',function (e){
    e.preventDefault();

    $(".amount").css("height","75%");
    $(".total").css("bottom","75%");
    $("strong.total").text("$5,000")


    var donorData = {
      "name": $('#regInputName').val(),
      "email": $('#regInputEmail').val(),
      "amount": $('#regDonorAmount').val(),
      "mode" : currentDonationMode
      };

     // testDonor();
    ajaxapi.createDonor(donorData,callback);
    //window.location.href = "https://www.trinityinspires.org/donate/";
  });

});

$(function() {
    $.ajaxSetup({
       xhrFields: {
         withCredentials: false
    }
    });




  $("#mMethodDropDown").on("click", "li", function(e){
    e.preventDefault();
    currentDonationMode = $(this).text();
    var newButtonText = currentDonationMode + '   <span class="caret">';
    document.getElementById("dropdownMenu1").innerHTML = newButtonText;

  });

 });
