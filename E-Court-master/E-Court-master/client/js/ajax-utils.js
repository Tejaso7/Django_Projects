(function (window) {
  var ajaxUtils = {};
  function getRequestObject() {
    if (window.XMLHttpRequest) {
      return (new XMLHttpRequest());
    } else {
      window.alert("Your browser is not Compatible with our system");
    }
  }

  ajaxUtils.sendGetRequest = function (requestUrl, responseHandler) {
    var request = getRequestObject();
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status == 200) {
        responseHandler(request.responseText);
      }
    }
    request.open("GET", requestUrl, true);
    request.send(null);
  }
  window.$ajaxUtils = ajaxUtils;
})(window);