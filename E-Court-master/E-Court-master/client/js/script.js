(function (window) {
  var ec = {};
  var homeHtml = "snippets/home-snippet.html";
  var contactHtml = "snippets/contact-snippet.html";
  var aboutHtml = "snippets/about-snippet.html";
  var userDashboardHtml = "snippets/user-dashboard-snippet.html";
  var authenticationHtml = "snippets/authentication.html";
  var addLawyerPersonalForm = "snippets/addLawyer-Personal.html";
  var addLawyerProfessionalForm = "snippets/addLawyer-Professional.html";
  var userDashboardFrontHtml = "snippets/user-dashboard-front.html";
  var privacyPolicyHtml = "snippets/privacyPolicy-snippet.html";
  var lawyerDashboardHtml = "snippets/lawyerdashboard-snippet.html";
  var lawyerDashboardFrontHtml = "snippets/lawyerDashboard-front-snippet.html";
  var forgotPasswordHtml = "snippets/forgotPassword.html";

  var adminPanelUrl = "http://localhost:3000/client/adminPanel.html";
  // var serverUrl = "http://localhost:5000/";
  var serverUrl = "https://mysterious-castle-46911.herokuapp.com/";

  ec.lawyerId = "";
  ec.username = "";
  ec.lawyerUsername = "";

  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }

  function showLoadingSpinner() {
    var html =
      "<div class='text-center'><img src='./images/ajax-loader.gif'></div>";
    insertHtml("#main-content", html);
  }

  document.addEventListener("DOMContentLoaded", function (event) {
    showLoadingSpinner();
    setTimeout(function () {
      $ajaxUtils.sendGetRequest(homeHtml, responseHandler);
    }, 1000);
  });

  ec.loadHomePage = function () {
    showLoadingSpinner();
    setTimeout(function () {
      $ajaxUtils.sendGetRequest(homeHtml, responseHandler);
    }, 1000);
  };

  ec.loadContactPage = function () {
    showLoadingSpinner();
    setTimeout(function () {
      $ajaxUtils.sendGetRequest(contactHtml, responseHandler);
    }, 1000);
  };

  ec.loadAboutPage = function () {
    showLoadingSpinner();
    setTimeout(() => {
      $ajaxUtils.sendGetRequest(aboutHtml, responseHandler);
    }, 1000);
  };

  ec.loadAdvocatePage = function () {
    showLoadingSpinner();
    if (ec.username || ec.lawyerUsername) {
      setTimeout(() => {
        $.ajax({
          type: "GET",
          url: serverUrl + "lawyers",
          success: function (data) {
            responseHandler(data);
          },
        });
      }, 1000);
    } else {
      Swal.fire("Please Login First");
      ec.loadHomePage();
    }
  };

  ec.loadUserDashboard = function () {
    if (ec.username) {
      showLoadingSpinner();
      $ajaxUtils.sendGetRequest(userDashboardHtml, responseHandler);
      setTimeout(() => {
        $ajaxUtils.sendGetRequest(userDashboardFrontHtml, dashboardHandler);
      }, 200);
      fetch(serverUrl + "getRunningCases", {
        method: "get"
      })
        .then(res => res.json())
        .then(data => {
          document.getElementsByClassName("noOfCasesRunning")[0].innerHTML = data.ongoingCases;
        })
        .catch(error => {
          console.log(error);
        });
      fetch(serverUrl + "getClosedCases", {
        method: "get"
      })
        .then(res => res.json())
        .then(data => {
          document.getElementsByClassName("noOfCasesClosed")[0].innerHTML = data.closedCases;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (ec.lawyerUsername) {
      showLoadingSpinner();
      $ajaxUtils.sendGetRequest(lawyerDashboardHtml, responseHandler);
      setTimeout(() => {
        $ajaxUtils.sendGetRequest(lawyerDashboardFrontHtml, lawyerDashboardHandler);
      }, 100);
      ec.getLawyerFrontDashboardStatus();
    } else {
      Swal.fire("Please Login First");
      $ajaxUtils.sendGetRequest(homeHtml, responseHandler);
    }
  }

  ec.caseStatus = function () {
    $ajaxUtils.sendGetRequest(userDashboardFrontHtml, dashboardHandler);
    fetch(serverUrl + "getRunningCases", {
      method: "get"
    })
      .then(res => res.json())
      .then(data => {
        document.getElementsByClassName("noOfCasesRunning")[0].innerHTML = data.ongoingCases;
      })
      .catch(error => {
        console.log(error);
      });
    fetch(serverUrl + "getClosedCases", {
      method: "get"
    })
      .then(res => res.json())
      .then(data => {
        document.getElementsByClassName("noOfCasesClosed")[0].innerHTML = data.closedCases;
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.lawyerCaseStatus = function () {
    $ajaxUtils.sendGetRequest(lawyerDashboardFrontHtml, lawyerDashboardHandler);
    ec.getLawyerFrontDashboardStatus();
  }

  ec.getLawyerFrontDashboardStatus = () => {
    fetch(serverUrl + "lawyerGetRunningCases", {
      method: "get"
    })
      .then(res => res.json())
      .then((result) => {
        document.getElementsByClassName("lawyerRunningCases")[0].innerHTML = result.lawyerOngoingCases;
      }).catch((err) => {
        console.log(err);
      });
    fetch(serverUrl + "lawyerGetClosedCases", {
      method: "get"
    })
      .then(res => res.json())
      .then((result) => {
        document.getElementsByClassName("lawyerPreviousCases")[0].innerHTML = result.lawyerClosedCases;
      }).catch((err) => {
        console.log(err);
      });
  }

  ec.viewAllCases = function () {
    $.ajax({
      type: "get",
      url: serverUrl + "viewAllCases",
      success: function (response) {
        dashboardHandler(response);
      }
    });
  }

  ec.privacyPolicy = function () {
    // showLoadingSpinner();
    $ajaxUtils.sendGetRequest(privacyPolicyHtml, dashboardHandler);
  }

  function dashboardHandler(responseText) {
    insertHtml("#user-dashboard-content", responseText);
  }

  function lawyerDashboardHandler(responseText) {
    insertHtml("#lawyer-content", responseText);
  }

  ec.allLaws = function () {
    showLoadingSpinner();
    $.ajax({
      type: "GET",
      url: serverUrl + "laws",
      success: function (data) {
        insertHtml("#main-content", data);
      }
    });
  }

  ec.register = function (e) {
    e.preventDefault();

    var data = {
      fullName: $("#fullName").val(),
      dob: $("#dob").val(),
      gender: $("input[name='gender']:checked").val(),
      username: $("#email").val(),
      phoneNo: $("#phoneNo").val(),
      city: $("#city").val(),
      password: $("#pwd").val()
    };

    fetch(serverUrl + "signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Swal.fire(
            "Registered Successfully!",
            "You clicked the button!",
            "success"
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Why do I have this issue?</a>",
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.login = function (e) {
    e.preventDefault();
    var data = {};
    data.username = $("#username").val();
    data.password = $("#password").val();


    fetch(serverUrl + "login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.user == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Why do I have this issue?</a>",
          });
        } else if (data.user.admin === true) {
          sessionStorage.setItem("admin", true);
          location.replace(adminPanelUrl);
        } else if (data.user.admin === false) {
          ec.username = data.user.username;
          Swal.fire(
            "LoggedIn Successfully!",
            "You clicked the button!",
            "success"
          );
          $(".manipulated-text a.nav-link").text(data.user.username);
          $(".manipulated-text").removeClass("manipulated-text");
          $(".toggleDashboardOption").removeClass("toggleDashboardOption");
          $(".trigger-signin").addClass("toggleDashboardOption");
          ec.loadUserDashboard();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ec.authentication = function () {
    showLoadingSpinner();
    setTimeout(function () {
      $ajaxUtils.sendGetRequest(authenticationHtml, responseHandler);
    }, 1000)
  }

  ec.logout = function () {
    $.ajax({
      type: "get",
      url: serverUrl + "logout",
      success: function (data) {
        if (data.logout) {
          ec.username = "";
          $(".trigger-class a.nav-link").text("");
          $(".trigger-class").addClass("manipulated-text");
          $(".trigger-dashboard-option").addClass("toggleDashboardOption");
          $(".trigger-signin").removeClass("toggleDashboardOption");
          Swal.fire(
            "Logged Out Successfully!",
            "You clicked the button!",
            "success"
          );
          ec.loadHomePage();
        }
      }
    });
  }

  ec.addLawyerPersonalDetails = function () {
    showLoadingSpinner();
    setTimeout(() => {
      $ajaxUtils.sendGetRequest(addLawyerPersonalForm, responseHandler);
    }, 1000);
  }

  ec.addLawyerProfessionalDetails = function () {
    var data = {
      username: $("#email").val(),
      fullname: $("#firstName").val() + " " + $("#middleName").val() + " " + $("#lastName").val(),
      dob: $("#dob").val(),
      gender: $(".gender:checked").val(),
      mobile: $("#mobile").val(),
      state: $("#state").val(),
      city: $("#city").val()
    };
    showLoadingSpinner();
    setTimeout(() => {
      $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        url: serverUrl + "addLayerPersonal",
        success: function (data) {
          ec.lawyerUsername = data.lawyer.username;
          $ajaxUtils.sendGetRequest(addLawyerProfessionalForm, responseHandler);
        }
      });
    }, 1000);
  }

  ec.addLawyerAllInfo = function () {
    var speciality = [];
    $.each($("input[id='speciality']:checked"), function () {
      speciality.push($(this).val());
    });
    var file = document.getElementById("photo").files[0];
    var certificateFile = document.getElementById("certificate").files[0];
    var form = document.querySelector("form");
    var formData = new FormData(form);
    formData.append("imageFile", file);
    formData.append("certificateFile", certificateFile);
    var data = {
      username: ec.lawyerUsername,
      degreeCollege: $("#degreeCollege").val(),
      stateOfCollege: $("#statedegreeCollege").val(),
      yearOfPassing: $("#yop").val(),
      startPracticeDate: $("#dosp").val(),
      speciality: speciality
    };
    showLoadingSpinner();
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: serverUrl + "addLayerProfessional",
      success: function (data) {
        console.log("Success");
      }
    });

    fetch(serverUrl + 'saveImage', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        Swal.fire(
          "Registered " + ec.lawyerUsername + " lawyer successfully!",
          "Please Wait for our Approval!",
          "success"
        );
        $ajaxUtils.sendGetRequest(authenticationHtml, responseHandler);
      })
      .catch(error => {
        console.error(error);
      });
  }

  ec.toggleModal = function (lawyerFormId) {
    ec.lawyerId = lawyerFormId;
    fetch(serverUrl + "getUserDetails", {
      method: "get"
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById("email").value = data.foundUser.username;
        document.getElementById("email").disabled = true;
        document.getElementById("mobileNo").value = data.foundUser.phoneNo;
        document.getElementById("mobileNo").disabled = true;
      })
      .catch(error => console.log(error));
  }

  ec.contactLawyer = function () {
    var data = {
      username: ec.username,
      caseInfo: document.getElementsByClassName("caseInfo")[0].value,
      typeOfUser: document.querySelector("input[name='type']:checked").value,
      phoneNo: document.getElementsByClassName("phoneNo")[0].value,
      emailId: document.getElementsByClassName("emailId")[0].value,
      lawyerId: ec.lawyerId
    };
    showLoadingSpinner();
    fetch(serverUrl + "userAppointment", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire(
          "Booked Appointment Successfully",
          "Please Wait for Approval",
          "success"
        );
        ec.loadHomePage();
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.lawyerLogin = function () {
    var data = {
      lawyerUsername: $("#lawyerUsername").val(),
      lawyerPassword: $("#lawyerPassword").val()
    };
    showLoadingSpinner();
    fetch(serverUrl + "lawyerLogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.foundLawyer) {
          ec.lawyerUsername = data.foundLawyer.username;
          $(".manipulated-text a.nav-link").text(ec.lawyerUsername);
          $(".manipulated-text").removeClass("manipulated-text");
          $(".toggleDashboardOption").removeClass("toggleDashboardOption");
          $(".trigger-signin").addClass("toggleDashboardOption");
          ec.loadUserDashboard();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Why do I have this issue?</a>",
          });
          ec.authentication();
        }
      })
      .catch(error => console.log(error));
  }

  ec.lawyerCaseRequests = function () {
    fetch(serverUrl + "lawyerCaseRequests", {
      method: "get"
    })
      .then(res => res.text())
      .then(data => {
        insertHtml("#lawyer-content", data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.approveAction = function (id) {
    var fees = prompt("Enter Fess per hearing:");
    var data = {
      fees: fees,
      id: id
    }
    fetch(serverUrl + "lawyerApprovedUserCases", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.updatedData) {
          Swal.fire(
            "Approved Successfully",
            "Click Below Button",
            "success"
          );
          ec.lawyerCaseRequests();
        } else {
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.rejectAction = function (id) {
    var message = prompt("Reason for Rejection of Appointment");
    var data = {
      id: id,
      message: message
    };
    fetch(serverUrl + "lawyerRejectUserCases", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.removedUserAppointment) {
          ec.lawyerCaseRequests();
        } else {
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.approvedBylawyer = function () {
    fetch(serverUrl + "approvedByLawyer", {
      method: "get"
    })
      .then(res => res.text())
      .then(data => {
        dashboardHandler(data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.userApprovedCase = function (id) {
    var data = {
      id: id
    };
    console.log(data);
    fetch(serverUrl + "userApprovedCase", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          Swal.fire(
            "Approved Successfully",
            "Click the below button",
            "success"
          );
          ec.approvedBylawyer();
        } else {
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.userRejectCase = function (id) {
    var data = {
      id: id
    };
    fetch(serverUrl + "userRejectCase", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.removedDocument) {
          Swal.fire(
            "Rejected Successfully",
            "Click the below button",
            "success"
          );
          ec.approvedBylawyer();
        } else {

        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.allApprovedCasesByLawyerAndUser = function () {
    fetch(serverUrl + "allApprovedCasesByLawyerAndUser", {
      method: "get"
    })
      .then(res => res.text())
      .then(data => {
        dashboardHandler(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.caseApprovedByUsers = function () {
    fetch(serverUrl + "caseApprovedByUsers", {
      method: "get"
    })
      .then(res => res.text())
      .then(data => {
        lawyerDashboardHandler(data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.applyFilter = function () {
    var data = {
      city: document.getElementById("citydropdown").value,
      speciality: document.getElementById("expdropdown").value
    };
    showLoadingSpinner();
    fetch(serverUrl + "applyFilter", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(data => {
        insertHtml("#main-content", data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.forgotUserPassword = function () {
    var data = {
      userEmailId: document.getElementsByClassName("forgotPasswordEmailId")[0].value
    };
    fetch(serverUrl + "userForgotPassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Swal.fire({
            title: "Enter OTP sent to your EmailId",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: (otp) => {
              fetch(serverUrl + "verifyOtp", {
                method: "post",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ otp })
              })
                .then(res => res.json())
                .then((result) => {
                  if (result.verified == true) {
                    $ajaxUtils.sendGetRequest(forgotPasswordHtml, responseHandler);
                  } else if (result.verified == false) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Incorrect OTP!",
                    });
                  }
                }).catch((err) => {
                  console.log(err);
                });
            }
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User Doesn't Exists!",
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  ec.resetPassword = function () {
    var data = {
      password: document.getElementsByClassName("password")[0].value,
      confirmPassword: document.getElementsByClassName("confirmPassword")[0].value
    };
    if (data.password == data.confirmPassword) {
      fetch(serverUrl + "resetPassword", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success == true) {
            Swal.fire(
              "Password Changed Successfully",
              "Click the below Button",
              "success"
            );
            ec.authentication();
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and Confirm Password Must be Same!",
      });
    }
  }

  function responseHandler(responseText) {
    insertHtml("#main-content", responseText);
  }

  window.$ec = ec;
})(window);
