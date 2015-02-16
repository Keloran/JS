// Debugging
if (!console) {
  var console = {
    log: function() {},
    info: function() {},
    error: function() {}
  };
}

var StormJS = {  
  getElementsByAttribute: function(nodeType, attributeName) {
    var returnElements = [];
    var i = 0;

    var elementAttributes;
    var element;
    
    // Only specified the attribute
    if (!attributeName) {
      attributeName = nodeType;
      nodeType = "*";
    }

    // get the elements
    var elements = document.getElementsByTagName(nodeType);
    for (var j = 0; j < elements.length; j++) {
      element            = elements[j];

      elementAttributes  = element.attributes;
      for (var k = 0; k < elementAttributes.length; k++) {
        if (elementAttributes[k].name == attributeName) {
          returnElements[i] = element;
          i++;
        }
      }
    }

    return returnElements;
  },
  
  getElementAttributes: function(element) {    
    var attributes = element.attributes;
    return attributes;
  },
  
  removeChildren: function(elementId, keepVisible) {
    var element = document.getElementById(elementId);
    if (element) {
      // Hide the element
      if (!keepVisible) { element.style.display = "none"; }
    
      // remove all the child nodes
      while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
      }
    }
  }
};