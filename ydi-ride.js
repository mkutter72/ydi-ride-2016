'use strict';

var currentDonationMode = "Credit Card";
var goal = 5000;


 var callback =  function callback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    $('#result').val(JSON.stringify(data, null, 4));
  };

 var callbackAmount =  function callback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    $('#result').val(JSON.stringify(data, null, 4));

    $("strong.total").text("$" + data);
    var heightValue = (data / goal) * 100;
    var heightString = heightValue + "%";
    $(".amount").css("height",heightString);
    $(".total").css("bottom",heightString);
  };

var ajaxapi = {
   url: 'https://nameless-depths-58511.herokuapp.com',
   // url:'http://localhost:3000',
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

  getDonorTotal: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/donor',
    }, callback);
  },
};


$(document).ready(function () {


$('#registerButton').on('click',function (e){
    e.preventDefault();

    var donorData = {
      "name": $('#regInputName').val(),
      "email": $('#regInputEmail').val(),
      "amount": $('#regDonorAmount').val(),
      "mode" : currentDonationMode
      };

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

  $("strong.total").text("$0");
  $(".amount").css("height","0%");
  $(".total").css("bottom","0%");

  ajaxapi.getDonorTotal(callbackAmount);

 });
