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
    var containers = document.getElementsByTagName(this.options.containerElement);
    
    var container;
    var containerAttributes;
    var containerAttributeName;
    var containerAttributeValue;
    var containerClassList
    
    for (var i = 0; i < containers.length; i++) {
      container            = containers[i];
      
      containerAttributes  = container.attributes;
      for (var j = 0; j < containerAttributes.length; j++) {
        containerAttributeName    = containerAttributes[j].name;
        containerAttributeValue   = containerAttributes[j].value;
        
        if (containerAttributeName == this.options.containerDataTag) {
          container.classList.add(this.options.containerClass + this.containerIncrement);
          this.containerIncrement += 1;
        }
      }
    }
  },
  
  doActivators: function() {
    // activator stuffs
    var activators   = document.getElementsByTagName(this.options.activatorElement);

    var activator;
    var activatorAttributes;
    var activatorAttributeName;
    var activatorAttributeValue;

    for (var i = 0; i < activators.length; i++) {
      activator           = activators[i];
      
      activatorAttributes = activator.attributes;
      for (var j = 0; j < activatorAttributes.length; j++) {
        activatorAttributeName   = activatorAttributes[j].name;
        activatorAttributeValue  = activatorAttributes[j].value;

        if (activatorAttributeName == this.options.activatorDataTag) {          
          activator.addEventListener("click", function(event) {
            stormTabs.doTabs(event.target)
          });
        }
      }
    }
  },
  
  doTabs: function(target) {
    var targetContainerClass = target.parentNode.parentNode.classList[0];
    
    //var targetParentClass  = target.
    var targetAttributes   = target.attributes;
    var activatorValue;
    var parentNode;
    
    for (var i = 0; i < targetAttributes.length; i++) {
      if (targetAttributes[i].name == this.options.activatorDataTag) {
        activatorValue = targetAttributes[i].value;
      }
    }
    
    var tabs = document.getElementsByTagName(this.options.tabElement);
    var tab;
    var tabAttributes;
    var tabAttributeName;
    var tabAttributeValue;
    var tabParentClass;
    
    for (var j = 0; j < tabs.length; j++) {
      tab            = tabs[j];
      tabAttributes  = tab.attributes;
      
      for (var k = 0; k < tabAttributes.length; k++) {
        tabAttributeName   = tabAttributes[k].name;
        tabAttributeValue  = tabAttributes[k].value;
        
        if (tabAttributeName == this.options.tabDataTag) {
          if (this.options.closeOtherTabs) {
            tab.classList.remove(this.options.tabShowClass);
            tab.classList.add(this.options.tabHideClass);
          }
          
          if (tabAttributeValue == activatorValue) {            
            tabParentClass = tab.parentNode.classList[0];            
            if (tabParentClass == targetContainerClass) {
              tab.classList.toggle(this.options.tabHideClass);
              tab.classList.toggle(this.options.tabShowClass);
            }
          }
        }
      }
    }
  }
};