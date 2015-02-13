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
    
    predictInputTag: "data-search-input",
    predictResultTag: "data-search-result",
    predictResultListTag: "data-search-result-value"
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
    
    if (!this.options.predictInputTag) { this.options.predictInputTag = this.defaultOptions.predictInputTag; }
    if (!this.options.predictResultTag) { this.options.predictResultTag = this.defaultOptions.predictResultTag; }
    if (!this.options.predictResultListTag) { this.options.predictResultListTag = this.defaultOptions.predictResultListTag; }
    
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
    
    var elems = StormJS.getElementsByAttribute("li", this.options.predictResultTag);    
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
          item.classList.add(StormJS.Predict.options.highlightSelect);
        }
      }
    }
  },
  highlightPrevious: function() {
    var item;
    var itemAttributes;
    var attrib;
    
    var elems = StormJS.getElementsByAttribute("li", this.options.predictResultTag);    
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
          item.classList.add(StormJS.Predict.options.highlightSelect);
        }
      }
    }
  },
  
  addBoxEvent: function(element) {    
    element.addEventListener("keyup", function(event) {        
      // Chrome sensible
      if (event.keyIdentifier) {
        if (event.keyIdentifier == "Down") {
          StormJS.Predict.highlightNext();
        } else if (event.keyIdentifier == "Up") {
          StormJS.Predict.highlightPrevious();
        } else if (event.keyIdentifier == "Enter") {
          if (StormJS.Predict.currentHighlight === 0) {
            StormJS.Predict.gotoSearch();
          } else {
            StormJS.Predict.changeSearch();
          }
        } else {       
          if (event.keyIdentifier.substring(0, 1) == "U") {
            StormJS.Predict.searchAjax();
          }
        }
      } else {
        if ((event.key == "Down") || (event.key == "ArrowDown")) {       
          StormJS.Predict.highlightNext();
        } else if ((event.key == "Up") || (event.key == "ArrowUp")) {          
          StormJS.Predict.highlightPrevious();       
        } else if (event.key == "Enter") {
          if (StormJS.Predict.currentHighlight === 0) {
            StormJS.Predict.gotoSearch();
          } else {
            StormJS.Predict.changeSearch();
          }
        } else {
          if (event.shiftKey || event.altKey || event.ctrlKey) {
            if (event.key.length == 1) {
              StormJS.Predict.searchAjax();
            }
          } else {
            if (event.key.length == 1) {
              StormJS.Predict.searchAjax();
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
        if (attributes[i].name == StormJS.Predict.options.predictResultListTag) {
          StormJS.Predict.changeSearch(attributes[i].value);
          var search = document.getElementById(StormJS.Predict.options.elementID);
          search.focus();
        }
      }
    });
    element.addEventListener("mousemove", function(event) {
      element.classList.add(StormJS.Predict.options.highlightSelect);
    });
    element.addEventListener("mouseleave", function(event) {
      element.classList.remove(StormJS.Predict.options.highlightSelect);
    });
  },
  
  search: function() {
    var search = StormJS.getElementsByAttribute("input", this.options.predictInputTag)[0];
    this.addBoxEvent(search);
  },
  
  gotoSearch: function() {
    var search = StormJS.getElementsByAttribute("input", this.options.predictInputTag)[0];
    window.location = (this.options.searchURL + "?q=" + search.value);
  },
  
  changeSearch: function(value) {
    var search = StormJS.getElementsByAttribute("input", this.options.predictInputTag)[0];
    
    if (value) {
      search.value = value;
    } else {
      var attributes;
      var attrib;
      var elem;
      var elems = StormJS.getElementsByAttribute("li", StormJS.Predict.options.predictResultTag);      
      var bFound = false;
      for (var i = 0; i < elems.length; i++) {
        bFound     = false;
        elem       = elems[i];
        attributes = StormJS.getElementAttributes(elem);        
        for (var j = 0; j < attributes.length; j++) {
          attrib = attributes[j];
          
          if (parseInt(attrib.value) === StormJS.Predict.currentHighlight) { 
            bFound = true; 
          }
          if (bFound) {
            if (attrib.name === this.options.predictResultListTag) {
              search.value = attrib.value;
            }
          }
        }
      }
    }
    
    search.focus();
    StormJS.Predict.removeOldResults();
    StormJS.Predict.currentHighlight = 0;
  },
  
  results: function(results) {   
    var parsedResults = JSON.parse(results.response);
    if (!parsedResults) { parsedResults = JSON.parse(results.responseText); }

    if (!parsedResults) {
      console.log("Not JSON response");
    } else {
      StormJS.Predict.parseResults(parsedResults);
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
      li.setAttribute(this.options.predictResultTag, this.resultIncrement);
      li.setAttribute(this.options.predictResultListTag, results[i]);
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
    var searchValue = StormJS.getElementsByAttribute("input", this.options.predictInputTag)[0].value;
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

if (StormJS != "undefined") { 
  StormJS.Predict = stormPredict; 
} else {
  StormJS = {
    Predict: stormPredict,
    getElementsByAttribute: null,
    getElementAttributes: null,
    Net: null
  };
}