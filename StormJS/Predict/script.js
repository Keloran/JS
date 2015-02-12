var stormPredict = {
  defaultOptions: {
    element: "input",
    elementType: "text",
    elementID: "search",
    searchURL: "/",
    requestType: "GET"
  },
  options: {},
  
  activate: function(options) {
    if (options) { this.options = options; }
    
    if (!this.options.element) { this.options.element = this.defaultOptions.element; }
    if (!this.options.elementType) { this.options.elementType = this.defaultOptions.elementType; }
    if (!this.options.elementID) { this.options.elementID = this.defaultOptions.elementID; }
    if (!this.options.searchURL) { this.options.searchURL = this.defaultOptions.searchURL; }
    if (!this.options.requestType) { this.options.requestType = this.defaultOptions.requestType; }
    
    this.search();
  },
  
  search: function() {
    var element = document.getElementById(this.options.elementID);
    element.addEventListener("keyup", function(event) {
      stormPredict.searchAjax(event);
    });
  },
  
  results: function(results) {
    if (results.responseText) {
      
    }
  },
  
  searchAjax: function(event) {
    var searchValue = event.srcElement.value;
    if (searchValue.length >= 3) {
      if (stormNet) {
        stormNet.contentLoader(this.options.searchURL, stormPredict.results, null, {
          q: searchValue
        }, "GET");
      } else {
        console.log("Need StormNet");
      }
    }
  }
};