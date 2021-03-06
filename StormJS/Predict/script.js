var stormPredict = {
  initalHighlight: 0,
  maxHighlight: 0,
  currentHighlight: 0,
  resultIncrement: 1,
  
  defaultOptions: {
    listElement: "li",
    listContainerElement: "ul",
    
    element: "input",
    elementType: "text",    
    elementID: "search",
    
    searchURL: "/",
    queryURL: "?q=",
    requestType: "GET",
    
    predictResult: "predictResult",
    highlightSelect: "highlightItem",
    
    predictInputTag: "data-search-input",
    predictResultContainer: "data-search-results",
    predictResultTag: "data-search-result",
    predictResultListTag: "data-search-result-value"
  },
  options: {},
  
  activate: function(options) {
    if (options) { this.options = options; }
    
    if (!this.options.listElement) { this.options.listElement = this.defaultOptions.listElement; }
    if (!this.options.listContainerElement) { this.options.listContainerElement = this.defaultOptions.listContainerElement; }
    
    if (!this.options.element) { this.options.element = this.defaultOptions.element; }
    if (!this.options.elementType) { this.options.elementType = this.defaultOptions.elementType; }
    if (!this.options.elementID) { this.options.elementID = this.defaultOptions.elementID; }
    
    if (!this.options.searchURL) { this.options.searchURL = this.defaultOptions.searchURL; }
    if (!this.options.queryURL) { this.options.queryURL = this.defaultOptions.queryURL; }    
    if (!this.options.requestType) { this.options.requestType = this.defaultOptions.requestType; }
    
    if (!this.options.predictResult) { this.options.predictResult = this.defaultOptions.predictResult; }
    if (!this.options.highlightSelect) { this.options.highlightSelect = this.defaultOptions.highlightSelect; }
    
    if (!this.options.predictInputTag) { this.options.predictInputTag = this.defaultOptions.predictInputTag; }
    if (!this.options.predictResultContainer) { this.options.predictResultContainer = this.defaultOptions.predictResultContainer; }    
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
    
    var elems = StormJS.getElementsByAttribute(this.options.listElement, this.options.predictResultTag);    
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
    
    var elems = StormJS.getElementsByAttribute(this.options.listElement, this.options.predictResultTag);    
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
      // Down
      if (StormJS.doKeyEvent(event, "Down")) { 
        StormJS.Predict.highlightNext(); 
      } else if (StormJS.doKeyEvent(event, "ArrowDown")) {
        StormJS.Predict.highlightNext();
      } else if (StormJS.doKeyEvent(event, "Up")) {
        StormJS.Predict.highlightPrevious();
      } else if (StormJS.doKeyEvent(event, "ArrowUp")) {
        StormJS.Predict.highlightPrevious();
      } else if (StormJS.doKeyEvent(event, "Enter")) {
        if (StormJS.Predict.currentHighlight === 0) {
          StormJS.Predict.gotoSearch();
        } else {
          StormJS.Predict.changeSearch();
        }
      } else {
        if (StormJS.doKeyEvent(event, "Shift")) {
        } else if (StormJS.doKeyEvent(event, "Control")) {
        } else if (StormJS.doKeyEvent(event, "Alt")) {
        } else if (StormJS.doKeyEvent(event, "OS")) {
        } else if (StormJS.doKeyEvent(event, "Meta")) {
        } else if (StormJS.doKeyEvent(event, "Left")) {
        } else if (StormJS.doKeyEvent(event, "ArrowLeft")) {
        } else if (StormJS.doKeyEvent(event, "Right")) {
        } else if (StormJS.doKeyEvent(event, "ArrowRight")) {
        } else {
          StormJS.Predict.searchAjax();
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
    var search;
    var searches = StormJS.getElementsByAttribute(this.options.element, this.options.predictInputTag);
    for (var i = 0; i < searches.length; i++) {
      search = searches[i];
      this.addBoxEvent(search);
    }
  },
  
  gotoSearch: function() {
    var search = StormJS.getElementsByAttribute(this.options.element, this.options.predictInputTag)[0];
    window.location = (StormJS.Predict.options.searchURL + StormJS.Predict.options.queryURL + search.value);
  },
  
  changeSearch: function(value) {
    var search = StormJS.getElementsByAttribute(this.options.element, this.options.predictInputTag)[0];
    
    if (value) {
      search.value = value;
    } else {
      var attributes;
      var attrib;
      var elem;
      var elems = StormJS.getElementsByAttribute(StormJS.Predict.options.listElement, StormJS.Predict.options.predictResultTag);      
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
            if (attrib.name === StormJS.Predict.options.predictResultListTag) {
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
      list       = document.createElement(this.options.listContainerElement);
      list.id    = this.options.predictResult;
    }
    
    if (results.length < 1) { this.removeOldResults(); }
    
    // do the results
    for (var i = 0; i < results.length; i++) {
      var li = document.createElement(this.options.listElement);
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
    
    // Results
    var resultsContainer = StormJS.getElementsByAttribute(this.options.predictResultContainer);
    if (resultsContainer.length >= 1) {
      resultsContainer[0].appendChild(list);
    } else {
      body.appendChild(list);
    }
  },
  
  removeOldResults: function() {
    StormJS.removeChildren(this.options.predictResult);
    this.resultIncrement = 1;
  },
  
  searchAjax: function() {
    var searchValue = StormJS.getElementsByAttribute(StormJS.Predict.options.element, StormJS.Predict.options.predictInputTag)[0].value;
    StormJS.Predict.removeOldResults();
    
    if (searchValue.length >= 3) {
      if (StormJS.Net) {
        StormJS.Net.contentLoader({
          url: StormJS.Predict.options.searchURL,
          onLoad: stormPredict.results,
          params: {
            q: searchValue
          },
          requestMethod: StormJS.Predict.options.requestType
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
