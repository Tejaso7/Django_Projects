
(function (window) {
  var admin = {};
  var adminFrontHtml = "snippets/admin-front-snippet.html";
  var addCaseStatusAppelantForm = "snippets/addCaseStatus-Appelant.html";
  var addCaseStatusDefendantForm = "snippets/addCaseStatus-Defendant.html";
  var addCaseForm = "snippets/addCaseStatus-Case.html";
  var updateCaseStatusAppelantForm = "snippets/updateCaseStatus-Appelant.html";
  var updateCaseStatusDefendantForm = "snippets/updateCaseStatus-Defendant.html";
  var updateCaseForm = "snippets/updateCaseStatus-Case.html";


  var clientUrl = "http://localhost:3000/client/index.html";
  // var serverUrl = "http://localhost:5000/";
  var serverUrl = "https://mysterious-castle-46911.herokuapp.com/";

  admin.lawyerUsername = "";
  var case_id = "";

  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }

  function showLoadingSpinner() {
    var html =
      "<div class='text-center'><img src='./images/ajax-loader.gif'></div>";
    insertHtml("#admin-content", html);
  }

  document.addEventListener("DOMContentLoaded", function (event) {
    admin.loadFrontPage();
  });

  admin.loadFrontPage = function () {
    showLoadingSpinner();
    $ajaxUtils.sendGetRequest(adminFrontHtml, responseHandler);
    fetch(serverUrl + "noOfLawyers", {
      method: "get"
    })
      .then(res => res.json())
      .then(data => {
        document.getElementsByClassName("noOfLawyers")[0].innerHTML = data.foundLawyer;
      })
      .catch(error => {
        console.log(error);
      });
    fetch(serverUrl + "totalNumberOfCases", {
      method: "get"
    })
      .then(res => res.json())
      .then(data => {
        document.getElementsByClassName("noOfCasesRunning")[0].innerHTML = data.ongoingCases;
        document.getElementsByClassName("noOfCasesClosed")[0].innerHTML = data.closedCases;
        document.getElementsByClassName("totalNumberOfCasesRegistered")[0].innerHTML = data.ongoingCases + data.closedCases;
        document.getElementsByClassName("noOfUsers")[0].innerHTML = data.user;
      })
      .catch(error => {
        console.log(error);
      });
  }

  admin.verifyLawyer = function () {
    $.ajax({
      type: "GET",
      url: serverUrl + "verifyLawyer",
      success: function (data) {
        insertHtml("#admin-content", data);
      }
    });
  }

  admin.addCaseStatusAppelant = function () {
    showLoadingSpinner();
    setTimeout(function () {
      $ajaxUtils.sendGetRequest(addCaseStatusAppelantForm, responseHandler);
    }, 1000);
  }

  admin.addCaseStatusDefendant = function () {
    var data = {
      fullname: document.getElementsByClassName("firstName")[0].value + " " + $(".middleName").val() + " " + $(".lastName").val(),
      address: $(".address").val(),
      username: $(".username").val(),
      lawyerId: $(".lawyerId").val()
    };
    showLoadingSpinner();
    setTimeout(function () {
      $.ajax({
        type: "post",
        url: serverUrl + "addAppelantCase",
        data: data,
        success: function (response) {
          $ajaxUtils.sendGetRequest(addCaseStatusDefendantForm, responseHandler);
        }
      });
    }, 1000);
  }

  admin.addCase = function () {
    var data = {
      fullname: document.getElementsByClassName("firstName")[0].value + " " + $(".middleName").val() + " " + $(".lastName").val(),
      address: $(".address").val(),
      username: $(".username").val(),
      lawyerId: $(".lawyerId").val()
    };
    showLoadingSpinner();
    setTimeout(function () {
      $.ajax({
        type: "post",
        url: serverUrl + "addDefendantCase",
        data: data,
        success: function (response) {
          $ajaxUtils.sendGetRequest(addCaseForm, responseHandler);
        }
      });
    }, 1000);
  }

  admin.registerCase = function () {
    var codes = document.getElementsByClassName("codes")[0].value.split(" ");
    var data = {
      complaint: document.getElementsByClassName("complaint")[0].value,
      dateOfComplaint: document.getElementsByClassName("dateOfComplaint")[0].value,
      codes: codes,
      status: document.querySelector('input[name="status"]:checked').value,
      lastCourtOfHearing: document.getElementsByClassName("lastCourtOfHearing")[0].value,
      nextCourtOfHearing: document.getElementsByClassName("nextCourtOfHearing")[0].value,
      lastDateOfHearing: document.getElementsByClassName("lastDateOfHearing")[0].value,
      nextDateOfHearing: document.getElementsByClassName("nextDateOfHearing")[0].value,
    };
    showLoadingSpinner();
    $.ajax({
      type: "post",
      url: serverUrl + "registerCase",
      data: data,
      success: function (response) {
        Swal.fire(
          "Added Case Successfully",
          "Click the below Button",
          "success"
        );
        admin.loadFrontPage();
      }
    });
  }

  admin.getLawyerId = function () {
    var data = {
      lawyerUsername: $(".lawyerUsername").val()
    };
    $.ajax({
      type: "post",
      url: serverUrl + "getLawyerId",
      data: data,
      success: function (response) {
        if (response.lawyerId) {
          document.getElementsByClassName("lawyerId")[0].value = response.lawyerId;
          document.getElementsByClassName("lawyerId")[0].disabled = true;
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter Correct Lawyer Username!",
            footer: "<a href>Why do I have this issue?</a>",
          });
        }
      }
    });
  }

  admin.updateCaseStatusAppelant = function () {
    console.log("Inside of updateCaseStatusAppelant");
  }

  admin.viewAllLawyers = function () {
    showLoadingSpinner();
    $.ajax({
      type: "GET",
      url: serverUrl + "viewLawyers",
      success: function (data) {
        insertHtml("#admin-content", data);
      }
    })
  }

  admin.viewPic = function (url) {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes, left = 300, top = 100, width = 500, height = 500, scrollbars = yes");
  }

  admin.viewCertificate = function (url) {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes, left = 300, top = 100, width = 500, height = 500, scrollbars = yes");
  }

  admin.rejectApplication = function (id) {
    var message = prompt("Reason for Rejecting Application");
    var newdata = {
      id: id,
      message: message
    };
    $.ajax({
      type: "POST",
      url: serverUrl + "rejectApplication",
      data: newdata,
      success: function (data) {
        admin.loadFrontPage();
      }
    });
  }

  admin.acceptApplication = function (id) {
    var newdata = {
      id: id
    };
    $.ajax({
      type: "POST",
      url: serverUrl + "acceptApplication",
      data: newdata,
      success: function (data) {
        admin.loadFrontPage();
      }
    });
  }

  admin.logout = function () {
    $.ajax({
      type: "get",
      url: serverUrl + "logout",
      success: function (data) {
        if (data.logout) {
          sessionStorage.removeItem("admin");
          $(".trigger-class a.nav-link").text("");
          $(".trigger-class").addClass("manipulated-text");
          location.replace(clientUrl);
        }
      }
    });
  }

  admin.registeredCases = function () {
    fetch(serverUrl + "registeredCases", {
      method: "get"
    })
      .then(res => res.text())
      .then(data => {
        console.log(data);
        insertHtml("#admin-content", data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  admin.pendingCases = function () {
    $.ajax({
      type: "get",
      url: serverUrl + "pendingCases",
      success: function (data) {
        console.log(data);
        responseHandler(data);
      }
    });
  }

  admin.solvedCases = function () {
    $.ajax({
      type: "get",
      url: serverUrl + "solvedCases",
      success: function (data) {
        console.log(data);
        responseHandler(data);
      }
    });
  }

  admin.lawyerApprovedCases = function () {
    fetch(serverUrl + "lawyerApprovedCases", {
      method: "get"
    })
      .then(res => res.text())
      .then(data => {
        insertHtml("#admin-content", data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  admin.updateCaseStatusAppelant = function () {
    case_id = prompt("Enter Case ID");
    var data = {
      case_id: case_id
    };
    // console.log(case_id);
    setTimeout(function () {
      $.ajax({
        type: "post",
        url: serverUrl + "getAppelantDetails",
        data: data,
        success: function (response) {
          $ajaxUtils.sendGetRequest(updateCaseStatusAppelantForm, responseHandler);
          setTimeout(function () {
            document.getElementsByClassName("fullName")[0].value = response.fullname;
            document.getElementsByClassName("fullName")[0].disabled = true;
            document.getElementsByClassName("address")[0].value = response.address;
            document.getElementsByClassName("username")[0].value = response.a_username;
            document.getElementsByClassName("username")[0].disabled = true;
            document.getElementsByClassName("lawyerUsername")[0].value = response.l_username;
            document.getElementsByClassName("lawyerId")[0].value = response.l_id;
            document.getElementsByClassName("lawyerId")[0].disabled = true;
          }, 200);

        }
      });
    });

  }

  admin.updateCaseStatusDefendant = function () {
    var data = {
      address: $(".address").val(),
      lawyerId: $(".lawyerId").val(),
      case_id: case_id
    }
    showLoadingSpinner();
    // setTimeout(function () {
    $.ajax({
      type: "post",
      url: serverUrl + "getDefendantDetails",
      data: data,
      success: function (response) {
        $ajaxUtils.sendGetRequest(updateCaseStatusDefendantForm, responseHandler);
        setTimeout(function () {
          document.getElementsByClassName("fullName")[0].value = response.fullname;
          document.getElementsByClassName("fullName")[0].disabled = true;
          document.getElementsByClassName("address")[0].value = response.address;
          document.getElementsByClassName("username")[0].value = response.d_username;
          document.getElementsByClassName("username")[0].disabled = true;
          document.getElementsByClassName("lawyerUsername")[0].value = response.l_username;
          document.getElementsByClassName("lawyerId")[0].value = response.l_id;
          document.getElementsByClassName("lawyerId")[0].disabled = true;
        }, 200);
      }
    });
    // });
  }

  admin.updateCase = function () {
    var data = {
      address: $(".address").val(),
      lawyerId: $(".lawyerId").val(),
      case_id: case_id
    }
    showLoadingSpinner();
    // setTimeout(function () {
    $.ajax({
      type: "post",
      url: serverUrl + "getCaseDetails",
      data: data,
      success: function (response) {
        $ajaxUtils.sendGetRequest(updateCaseForm, responseHandler);
        setTimeout(function () {
          document.getElementsByClassName("complaint")[0].value = response.complaint;
          document.getElementsByClassName("dateOfComplaint")[0].value = response.dateOfComplaint;
          document.getElementsByClassName("dateOfComplaint")[0].disabled = true;
          document.getElementsByClassName("codes")[0].value = response.codes;
          status = response.status;
          if (status == "Ongoing") {
            document.getElementById("Ongoing").checked = true;
          }
          else {
            document.getElementById("Closed").checked = true;
          }
          document.getElementsByClassName("lastCourtOfHearing")[0].value = response.lastCourtOfHearing;
          document.getElementsByClassName("nextCourtOfHearing")[0].value = response.nextCourtOfHearing;
          document.getElementsByClassName("lastDateOfHearing")[0].value = response.lastDateOfHearing;
          document.getElementsByClassName("nextDateOfHearing")[0].value = response.nextDateOfHearing;
        }, 200);
      }
    });
    // });

  }

  admin.registerUpdateCase = function () {
    var codes = document.getElementsByClassName("codes")[0].value.split(" ");
    var data = {
      complaint: document.getElementsByClassName("complaint")[0].value,
      codes: codes,
      status: document.querySelector('input[name="status"]:checked').value,
      lastCourtOfHearing: document.getElementsByClassName("lastCourtOfHearing")[0].value,
      nextCourtOfHearing: document.getElementsByClassName("nextCourtOfHearing")[0].value,
      lastDateOfHearing: document.getElementsByClassName("lastDateOfHearing")[0].value,
      nextDateOfHearing: document.getElementsByClassName("nextDateOfHearing")[0].value,
      case_id: case_id
    };
    showLoadingSpinner();
    $.ajax({
      type: "post",
      url: serverUrl + "updateCase",
      data: data,
      success: function (response) {
        alert("Updated Case Successfully");
        admin.loadFrontPage();
      }
    });

  }

  function responseHandler(responseText) {
    insertHtml("#admin-content", responseText);
  }

  window.$admin = admin;

})(window);

