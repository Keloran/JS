var stormTabs = {
  containerIncrement: 1,  
  
  defaultOptions: {
    containerElement: "*",
    activatorElement: "*",
    tabElement: "*",
    
    tabHideClass: "tabsHide",
    tabShowClass: "tabsShow",
    containerClass: "tabContainer",
    
    containerDataTag: "data-tabs-container",
    activatorDataTag: "data-tabs-activator",
    tabDataTag: "data-tabs-tab",
    
    closeOtherTabs: false,
  },
  options: {},
  
  activate: function(options) {
    if (options) { this.options = options; }
    
    // Setup the options
    if (!this.options.containerElement) { this.options.containerElement = this.defaultOptions.containerElement; }
    if (!this.options.activatorElement) { this.options.activatorElement = this.defaultOptions.activatorElement; }
    if (!this.options.tabElement) { this.options.tabElement = this.defaultOptions.tabElement; }
    
    if (!this.options.tabHideClass) { this.options.tabHideClass = this.defaultOptions.tabHideClass; }
    if (!this.options.tabShowClass) { this.options.tabShowClass = this.defaultOptions.tabShowClass; }
    if (!this.options.containerClass) { this.options.containerClass = this.defaultOptions.containerClass; }
    
    if (!this.options.containerDataTag) { this.options.containerDataTag = this.defaultOptions.containerDataTag; }
    if (!this.options.activatorDataTag) { this.options.activatorDataTag = this.defaultOptions.activatorDataTag; }
    if (!this.options.tabDataTag) { this.options.tabDataTag = this.defaultOptions.tabDataTag; }
    
    if (!this.options.closeOtherTabs) { this.options.closeOtherTabs = this.defaultOptions.closeOtherTabs; }
    
    this.addIdentifiers();
    this.doActivators();
  },
  
  addIdentifiers: function() {
    var container;
    var containers = StormJS.getElementsByAttribute(this.options.containerElement, this.options.containerDataTag);
    
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      container.classList.add(this.options.containerClass + this.containerIncrement);
      this.containerIncrement += 1;
    }
  },
  
  doActivators: function() {
    // activator stuffs
    var activator;
    var activators = StormJS.getElementsByAttribute(this.options.activatorElement, this.options.activatorDataTag);
    for (var i = 0; i < activators.length; i++) {
      activator = activators[i];
      activator.addEventListener("click", function(event) {
        stormTabs.doTabs(event.target);
      });
    }
  },
  
  doTabs: function(target) {
    var targetContainerClass = target.parentNode.parentNode.classList[0];
    
    //var targetParentClass  = target.
    var targetAttributes   = StormJS.getElementAttributes(target);
    var activatorValue;
    var parentNode;
    
    for (var i = 0; i < targetAttributes.length; i++) {
      if (targetAttributes[i].name == this.options.activatorDataTag) {
        activatorValue = targetAttributes[i].value;
      }
    }
    
    var tabContainerClass;
    var parent
    var tabAttributes;
    var tab;
    var tabs = StormJS.getElementsByAttribute(this.options.tabElement, this.options.tabDataTag);
    for (var j = 0; j < tabs.length; j++) {
      tab = tabs[j];
      
      // Hide the other tabs
      if (this.options.closeOtherTabs) {
        tab.classList.remove(this.options.tabShowClass);
        tab.classList.add(this.options.tabClassHide);
      }
      
      tabAttributes = StormJS.getElementAttributes(tab);
      for (var k = 0; k < tabAttributes.length; k++) {
        if (tabAttributes[k].value == activatorValue) {
          tabContainerClass = tab.parentNode.classList[0];
          
          if (tabContainerClass == targetContainerClass) {
            tab.classList.toggle(this.options.tabHideClass);
            tab.classList.toggle(this.options.tabShowClass);
          }
        }
      }
    }
  }
};

if (StormJS) {
  StormJS.Tabs = stormTabs;
}