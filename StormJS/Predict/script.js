var stormPredict = {
  initalHighlight: 0,
  maxHighlight: 0,
  currentHighlight: 0,
  resultIncrement: 1,
  
  defaultOptions: {
    element: "input",
    elementType: "text",
    elementID: "search",
    searchURL: "/",
    requestType: "GET",
    predictResult: "predictResult",
    highlightSelect: "highlightItem",
    dataTag: "data-search-result",
    dataTagResult: "data-search-result-value"
  },
  options: {},
  
  activate: function(options) {
    if (options) { this.options = options; }
    
    if (!this.options.element) { this.options.element = this.defaultOptions.element; }
    if (!this.options.elementType) { this.options.elementType = this.defaultOptions.elementType; }
    if (!this.options.elementID) { this.options.elementID = this.defaultOptions.elementID; }
    if (!this.options.searchURL) { this.options.searchURL = this.defaultOptions.searchURL; }
    if (!this.options.requestType) { this.options.requestType = this.defaultOptions.requestType; }
    if (!this.options.predictResult) { this.options.predictResult = this.defaultOptions.predictResult; }
    if (!this.options.highlightSelect) { this.options.highlightSelect = this.defaultOptions.highlightSelect; }
    if (!this.options.dataTag) { this.options.dataTag = this.defaultOptions.dataTag; }
    if (!this.options.dataTagResult) { this.options.dataTagResult = this.defaultOptions.dataTagResult; }
    
    this.search();
  },
  
  removeClasses: function(elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].classList.remove(this.options.highlightSelect);
    }
  },
  
  highlightNext: function() {
    var item;
    var itemAttributes;
    var attrib;
    var highlightValue = this.highlightIncrement;
    if (isNaN(highlightValue)) { highlightValue = 1; }
    
    var elems = StormJS.getElementsByAttribute("li", this.options.dataTag);    
    this.removeClasses(elems);
    
    // set to the first one
    this.currentHighlight++;
    if (this.currentHighlight > this.maxHighlight) { this.currentHighlight = 1; }
    
    // add the highlight
    for (var j = 0; j < elems.length; j++) {
      item = elems[j];
      itemAttributes = StormJS.getElementAttributes(item);
      for (var k = 0; k < itemAttributes.length; k++) {
        attrib = itemAttributes[k];        
        if (attrib.value == this.currentHighlight) {
          item.classList.toggle(this.options.highlightSelect);
        }
      }
    }
  },
  highlightPrevious: function() {
    var item;
    var itemAttributes;
    var attrib;
    var highlightValue = this.highlightIncrement;
    if (isNaN(highlightValue)) { highlightValue = 1; }
    
    var elems = StormJS.getElementsByAttribute("li", this.options.dataTag);    
    this.removeClasses(elems);
    
    // set to the first one
    this.currentHighlight--;
    if (this.currentHighlight === 0) { this.currentHighlight = 1; }
    
    // add the highlight
    for (var j = 0; j < elems.length; j++) {
      item = elems[j];      
      itemAttributes = StormJS.getElementAttributes(item);
      for (var k = 0; k < itemAttributes.length; k++) {
        attrib = itemAttributes[k];        
        if (attrib.value == this.currentHighlight) {
          item.classList.toggle(this.options.highlightSelect);
        }
      }
    }
  },
  
  addBoxEvent: function(element) {    
    element.addEventListener("keyup", function(event) {  
      // Chrome sensible
      if (event.keyIdentifier) {
        if (event.keyIdentifier == "Down") {
          stormPredict.highlightNext();
        } else if (event.keyIdentifier == "Up") {
          stormPredict.highlightPrevious();
        } else if (event.keyIdentifier == "Enter") {
          stormPredict.gotoSearch();
        } else {       
          if (event.keyIdentifier.substring(0, 1) == "U") {
            stormPredict.searchAjax();
          }
        }
      } else {
        if ((event.key == "Down") || (event.key == "ArrowDown")) {          
          stormPredict.highlightNext();
        } else if ((event.key == "Up") || (event.key == "ArrowUp")) {          
          stormPredict.highlightPrevious();       
        } else if (event.key == "Enter") {
          if (stormPredict.currentHighlight === 0) {
            stormPredict.gotoSearch();
          } else {
            stormPredict.changeSearch();
          }
        } else {
          if (event.shiftKey || event.altKey || event.ctrlKey) {
            if (event.key.length == 1) {
              stormPredict.searchAjax();
            }
          } else {
            if (event.key.length == 1) {
              stormPredict.searchAjax();
            }
          }
        }
      }
    });
  },
  
  addItemEvent: function(element) {
    element.addEventListener("mousedown", function(event) {
      var attributes = StormJS.getElementAttributes(element);
      for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].name == stormPredict.options.dataTagResult) {
          changeSearch(attributes[i].value);
        }
      }
    });
    element.addEventListener("mousemove", function(event) {
      element.classList.add(stormPredict.options.highlightSelect);
    });
    element.addEventListener("mouseleave", function(event) {
      element.classList.remove(stormPredict.options.highlightSelect);
    });
  },
  
  search: function() {
    var element = document.getElementById(this.options.elementID);
    this.addBoxEvent(element);
  },
  
  gotoSearch: function() {
    
  },
  
  changeSearch: function(value) {
    if (value) {
      
    }
  },
  
  results: function(results) {   
    var parsedResults = JSON.parse(results.response);
    if (!parsedResults) { parsedResults = JSON.parse(results.responseText); }

    if (!parsedResults) {
      console.log("Not JSON response");
    } else {
      stormPredict.parseResults(parsedResults);
    }
  },
  
  parseResults: function(results) {
    var body       = document.getElementsByTagName("body")[0];
    var list       = document.getElementById(this.options.predictResult);
    if (!list) {
      list       = document.createElement("ul");
      list.id    = this.options.predictResult;
    }
    
    if (results.length < 1) { this.removeOldResults(); }
    
    // do the results
    for (var i = 0; i < results.length; i++) {
      var li = document.createElement("li");
      li.setAttribute(this.options.dataTag, this.resultIncrement);
      li.setAttribute(this.options.dataTagResult, results[i]);
      var liContent = document.createTextNode(results[i]);
      li.appendChild(liContent);
      this.addItemEvent(li);
      
      list.appendChild(li);
      this.resultIncrement++;
    }
    this.maxHighlight = i;
    
    list.style.setProperty("display", "block");
    body.appendChild(list);
  },
  
  removeOldResults: function() {
    StormJS.removeChildren(this.options.predictResult);
    this.resultIncrement = 1;
  },
  
  searchAjax: function() {
    var searchValue = document.getElementById(this.options.elementID).value;    
    this.removeOldResults();
    
    if (searchValue.length >= 3) {
      if (StormJS.Net) {
        StormJS.Net.contentLoader({
          url: this.options.searchURL,
          onLoad: stormPredict.results,
          params: {
            q: searchValue
          },
          requestMethod: "GET"
        });
      }
    }
  }
};

if (StormJS) {
  StormJS.Predict = stormPredict;
}