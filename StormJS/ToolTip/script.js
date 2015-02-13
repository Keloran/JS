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
    var element;
    var elements = StormJS.getElementsByAttribute("*", this.options.dataTag);
    for (var i = 0; i < elements.length; i++) {
      element = elements[i];
      element.addEventListener("mouseover", function(event) { StormJS.ToolTip.doToolTip(event); });
      element.addEventListener("mouseout", function(event) { StormJS.ToolTip.removeToolTip(event); });
      element.addEventListener("mousemove", function(event) {
        StormJS.ToolTip.removeToolTip(event);
        StormJS.ToolTip.doToolTip(event);
      });
    }
  },
  
  createDiv: function() {
    var div  = document.createElement("div");
    div.id   = this.options.cssId;
    
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
  },
  
  doToolTip: function(event) {
    var toolTipDiv   = document.getElementById(this.options.cssId);
    
    var hoverElement;
    if (event.srcElement) {
      hoverElement = event.srcElement;
    } else {
      hoverElement = event.originalTarget;
    }
    
    if (hoverElement) {
      var title        = hoverElement.getAttribute("title");      
      if (title) {
        var titleElem    = document.createTextNode(title);

        var left      = ((0 + (title.length + 5) + event.clientX) + "px");
        var top       = ((0 + 10 + event.clientY) + "px");

        toolTipDiv.style.setProperty("display", "block");
        toolTipDiv.style.setProperty("left", left);
        toolTipDiv.style.setProperty("top", top);
        toolTipDiv.style.setProperty("position", "absolute");

        toolTipDiv.appendChild(titleElem);
      }
    }
  },
  
  removeToolTip: function(event) {
    StormJS.removeChildren(this.options.cssId);
  }
};

if (StormJS != "undefined") { 
  StormJS.ToolTip = stormToolTip; 
} else {
  StormJS = {
    ToolTip: stormToolTip,
    removeChildren: null,
    getElementsByAttribute: null
  };
}