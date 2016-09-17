'use strict';

var currentDonationMode = "Credit Card";
var goal = 6000;


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

    // if ($('#regInputName').val() === "" || $('#regInputEmail').val() === "" ||
    //     $('#regDonorAmount').val() === "" || ($('#regInputEmail').val().indexOf("@") === -1))
    //   return;

    e.preventDefault();

    var donorData = {
      "name": $('#regInputName').val(),
      "email": $('#regInputEmail').val(),
      "amount": $('#regDonorAmount').val(),
      "mode" : currentDonationMode
      };

    ajaxapi.createDonor(donorData,callback);


    $("#allInputs").hide();
    $(".donation-meter").hide();
    $(".bikePic").css("top","32px");
    $(".bikePic").css("left","627px");

    if (currentDonationMode === "Credit Card"){
        $("#continueButton").show();

    } else if (currentDonationMode === "Check") {
      $(".infoText").empty();
      $('.infoText').append("Thank-you for donating to the ride.  Please make your check out to Trinity Boston Foundation. Write \"For YDI Ride\" in the memo field. You can mail your donation check to me. <br><br>Your donation is tax deductible.  If you need my address or have any questions you can contact me at ydiride@gmail.com");
    } else {
      $(".infoText").empty();
      $('.infoText').append("Thank-you for donating to the ride.  When you make your request through your giving fund make the donation to Trinity Boston Foundation. <br><br> <b>IMPORTANT: Be sure to designate that your donation is for the YDI Ride so that the Yoga Diversity Initiative is credited with your donation. </b> <br><br>Your donation is tax deductible. If have any questions you can contact me at ydiride@gmail.com");
      };

    $(".infoText").show();
  });

  $(function() {
    $.ajaxSetup({
       xhrFields: {
         withCredentials: false
        }
      })
    });


  $('#continueButton').on('click',function (e){
    e.preventDefault();
    window.location.href = "https://www.trinityinspires.org/donate/";
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
