// Debugging
if (!console) {
  var console = {
    log: function() {},
    info: function() {},
    error: function() {}
  };
}

// AJAX
var stormNet = {
  //Ready States
  READY_STATE_UNINITALIZED: 0,
  READY_STATE_LOADING: 1,
  READY_STATE_LOADED: 2,
  READY_STATE_INTERACTIVE: 3,
  READY_STATE_COMPLETE: 4,
  
  // Objects
  request: null,
  onLoad: null,
  onError: null,
  currentLoader: null,
  
  // Options
  defaultOptions: {
    requestMethod: "POST",
    onError: this.defaultError,
    onLoad: this.defaultOnLoad,
    contentType: "application/x-www-form-encoded",
    url: "/",
    params: ""
  },
  options: {},
  
  // State of readyness
  readyState: null,
  
  contentLoader: function(options) {
    this.request            = null;
    stormNet.currentLoader  = this;
    
    // Set the options
    if (options) { this.options = options; }
    
    // Use defaults
    if (!this.options.requestMethod) { this.options.requestMethod = this.defaultOptions.requestMethod; }
    if (!this.options.onError) { this.options.onError = this.defaultOptions.onError; }
    if (!this.options.onLoad) { this.options.onLoad = this.defaultOptions.onLoad; }
    if (!this.options.contentType) { this.options.contentType = this.defaultOptions.contentType; }
    if (!this.options.url) { this.options.url = this.defaultOptions.url; }
    if (!this.options.params) { this.options.params = this.defaultOptions.params; }
    
    // Load the content    
    this.parseParams();
    this.loadContent();
  },
  
  parseParams: function(params) {
    if (!params) { params = this.options.params; }
    
    // incase its post
    var returnParams = params;
    
    // its GET so needs to be sent as ?&
    if (this.requestMethod == "GET") {      
      var j = 0;
      for (var key in params) {
        var val = params[key];
        
        if (j === 0) {
          returnParams = ("?" + key + "=" + val);
        } else {
          returnParams += ("&" + key + "=" + val);
        }
        
        j++;
      }
    }
    
    this.options.params = returnParams;
    return returnParams;
  },
  
  loadContent: function() {    
    this.request = new XMLHttpRequest();
    try {
      var loader = this;
      if (typeof stormNet !== "undefined") {
        this.request.onreadystatechange = function(result) {
          loader.readyState = result.srcElement.readyState;
          loader.onReadyState(loader);
        }
      }
      
      // GET doesnt send params
      if (loader.options.requestMethod == "GET") {
        loader.request.open(loader.options.requestMethod, (loader.options.url + loader.options.params), true);
        loader.request.setRequestHeader("Content-Type", loader.options.contentType);
        loader.request.send();
      } else {
        loader.request.open(loader.options.requestMethod, loader.options.url, true);
        loader.request.setRequestHeader("Content-Type", loader.options.contentType);
        loader.request.send(loader.options.params);
      }
    } catch (error) {
      loader.options.onError(error);
    }
  },
  
  onReadyState: function(loader) {
    var request  = loader.request;
    var ready    = loader.readyState;
    if (ready == stormNet.READY_STATE_COMPLETE) {
      var httpStatus = request.status;
      if ((httpStatus == 200) || (httpStatus === 0)) {
        loader.options.onLoad(loader.request);
      } else {
        loader.options.onError(loader.request);
      }
    }
  },
  
  defaultOnLoad: function(response) {
    console.log("You need to set an onload");
  },
  
  defaultError: function(response) {
    console.log("ReadyState", this.request.readyState);
    console.log("Status", this.request.status);
    console.log("Headers", this.request.getAllResponseHeaders());
  }
};