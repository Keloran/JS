var stormToolTip = {
  tooltipIncrement: 1,
  
  defaultOptions: {
    cssClass: "tooltip",
    cssId: "generatedStormToolTip",
    dataTag: "data-tooltip"
  },
  options: {},
  
  activate: function(options) {
    if (options) { this.options = options; }
    
    if (!this.options.cssClass) { this.options.cssClass = this.defaultOptions.cssClass; }
    if (!this.options.dataTag) { this.options.dataTag = this.defaultOptions.dataTag; }
    if (!this.options.cssId) { this.options.cssId = this.defaultOptions.cssId; }
    
    this.addActivators();
    this.createDiv();
  },
  
  addActivators: function() {
    var elements = document.getElementsByTagName("*");
    var element;
    var elementAttributes;
    var elementAttributeName;
    var elementAttributeValue;
    
    for (var i = 0; i < elements.length; i++) {
      element            = elements[i];
      elementAttributes  = element.attributes;
      
      for (var j = 0; j < elementAttributes.length; j++) {
        elementAttributeName   = elementAttributes[j].name;
        elementAttributeValue  = elementAttributes[j].value;
        
        if (elementAttributeName == "data-tooltip") {
          element.addEventListener("mouseover", function(event) {
            stormToolTip.doToolTip(event);
          });
          element.addEventListener("mouseout", function(event) {
            stormToolTip.removeToolTip(event);
          });
          element.addEventListener("mousemove", function(event) {
            stormToolTip.removeToolTip(event);
            stormToolTip.doToolTip(event);
          });
          
          element.classList.toggle(this.options.cssClass + this.tooltipIncrement);
          this.tooltipIncrement += 1;
        }
      }
    }
  },
  
  createDiv: function() {
    var body = document.getElementsByTagName("body")[0];
    
    var div             = document.createElement("div");
    div.id              = this.options.cssId;
    
    body.appendChild(div);
  },
  
  doToolTip: function(event) {
    var toolTipDiv   = document.getElementById(this.options.cssId);
    
    var hoverElement = event.srcElement;
    var title        = hoverElement.getAttribute("title");
    var titleElem    = document.createTextNode(title);
    
    var left      = ((0 + (title.length + 5) + event.clientX) + "px");
    var top       = ((0 + 10 + event.clientY) + "px");
    
    toolTipDiv.style.setProperty("display", "block");
    toolTipDiv.style.setProperty("left", left);
    toolTipDiv.style.setProperty("top", top);
    toolTipDiv.style.setProperty("position", "absolute");
    
    toolTipDiv.appendChild(titleElem);
  },
  
  removeToolTip: function(event) {
    var div = document.getElementById(this.options.cssId);
    div.style.display = "none";
    
    // remove all the child nodes
    while (div.hasChildNodes()) {
      div.removeChild(div.lastChild);
    }
  }
};