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

    if (heightValue > 90)
      $(".total").css("bottom","90%");
    else
      $(".total").css("bottom",heightString);

    if (heightValue > 97)
      $(".amount").css("height","97%");
    else
      $(".amount").css("height",heightString);
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
  ajaxapi.getDonorTotal(callbackAmount);

  $('#registerButton').on('click',function (e){

    if ($('#regInputName').val() === "" || $('#regInputEmail').val() === "" ||
        $('#regDonorAmount').val() === "" || ($('#regInputEmail').val().indexOf("@") === -1))
      return;

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
    $(".bikePic").css("top","40px");
    $(".bikePic").css("left","627px");

    if (currentDonationMode === "Credit Card"){
           $(".infoText").empty();
           $('.infoText').append("Thank-you for donating to the ride. YDI is building a partnership with Trinity Boston Foundation (TBF).  Donations for the ride can be made through TBF and are thereforetax deductible as a donation to a 501(c)(3) organization.            <br><br> Credit Card donations are being collected through the Trinity Boston Foundation website.  Clicking on the Continue button will take you to their site. <br><br><b>IMPORTANT: in the DESIGNATION section on their web donation form, in the Notes field enter YDI RIDE to insure that the Yoga Diversity Initiative is credited with your donation.</b> <br><br>  If have any questions you can contact me at ydiride@gmail.com");
        $("#continueButton").show();

    } else if (currentDonationMode === "Check") {
      $(".infoText").empty();
      $('.infoText').append("Thank-you for donating to the ride. YDI is building a partnership with Trinity Boston Foundation (TBF).  Donations for the ride can be made through TBF and are thereforetax deductible as a donation to a 501(c)(3) organization.  <br><br>Please make your check out to Trinity Boston Foundation. Write \"For YDI Ride\" in the memo field. You can mail your donation check to me. <br><br>  If you need my address or have any questions you can contact me at ydiride@gmail.com");
    } else {
      $(".infoText").empty();
      $('.infoText').append("Thank-you for donating to the ride.  YDI is building a partnership with Trinity Boston Foundation (TBF).  Donations for the ride can be made through TBF and are thereforetax deductible as a donation to a 501(c)(3) organization.  <br><br>When you make your request through your giving fund make the donation to Trinity Boston Foundation. <br><br> <b>IMPORTANT: Be sure to designate that your donation is for the YDI Ride so that the Yoga Diversity Initiative is credited with your donation. </b> <br><br> If have any questions you can contact me at ydiride@gmail.com");
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

   $('#websiteButton').on('click',function (e){
    e.preventDefault();
    window.location.href = "http://www.yogadiversityinitiative.org";
    });

    $('#donateButton').on('click',function (e){
    e.preventDefault();
    $(".infoText").hide();
    $("#websiteButton").hide();
    $("#donateButton").hide();
    $('#allInputs').show();
    $('.donation-meter').show();
    $(".bikePic").css("top","-742px");
    $(".bikePic").css("left","627px");
    });

  $("#mMethodDropDown").on("click", "li", function(e){
    e.preventDefault();
    currentDonationMode = $(this).text();
    var newButtonText = currentDonationMode + '   <span class="caret">';
    document.getElementById("dropdownMenu1").innerHTML = newButtonText;

  });

 });
