var stormCarousel = {
  carouselIncrement: 0,
  carouselArray: [],
  maxItems: 0,
  
  carouselWidth: 0,
  gridWidth: 0,
  
  defaultOptions: {
    itemMaxWidth: 280,
    itemMaxHeight: 300,
    
    carouselPrefixID: "stormCarousel",
    carouselContainerTag: "data-carousel-container",
    carouselItemTag: "data-carousel-item",
    
    carouselContainerClass: "carouselContainer",
    carouselGridClass: "gridClass",
    
    scrollLeftClass: "scrollLeft",
    scrollRightClass: "scrollRight",
    
    carouselButtonClass: "buttonClass",    
    carouselPipContainerClass: "pipContainer",
    carouselPipClass: "pip"
  },
  options: {},
  
  resizeWindow: function() {
    this.setup();
    this.removeCarousel();
    this.createCarousel();
  },
  
  activate: function(options) {
    if (!this.options.itemMaxWidth) { this.options.itemMaxWidth = this.defaultOptions.itemMaxWidth; }
    if (!this.options.itemMaxHeight) { this.options.itemMaxHeight = this.defaultOptions.itemMaxHeight; }
    
    if (!this.options.carouselPrefixID) { this.options.carouselPrefixID = this.defaultOptions.carouselPrefixID; }
    
    if (!this.options.carouselContainerTag) { this.options.carouselContainerTag = this.defaultOptions.carouselContainerTag; }
    if (!this.options.carouselItemTag) { this.options.carouselItemTag = this.defaultOptions.carouselItemTag; }
    
    if (!this.options.carouselPipContainerClass) { this.options.carouselPipContainerClass = this.defaultOptions.carouselPipContainerClass; }
    if (!this.options.carouselPipClass) { this.options.carouselPipClass = this.defaultOptions.carouselPipClass; }
    if (!this.options.carouselButtonClass) { this.options.carouselButtonClass = this.defaultOptions.carouselButtonClass; }
    
    if (!this.options.carouselContainerClass) { this.options.carouselContainerClass = this.defaultOptions.carouselContainerClass; }
    if (!this.options.carouselGridClass) { this.options.carouselGridClass = this.defaultOptions.carouselGridClass; }
    
    if (!this.options.scrollLeftClass) { this.options.scrollLeftClass = this.defaultOptions.scrollLeftClass; }
    if (!this.options.scrollRightClass) { this.options.scrollRightClass = this.defaultOptions.scrollRightClass; }
    
    this.setup();
    this.createCarousel();
  },
  
  setup: function() {
    this.getScreenSettings();
    this.setMaxItems();
    this.getContainers();
  },
  
  getScreenSettings: function() {
    var body = document.getElementsByTagName("body")[0];
    var doc  = document.documentElement;
    
    var screenX = (window.innerWidth || doc.clientWidth || body.clientWidth);
    var screenY = (window.innerHeight || doc.clientHeight || body.clientHeight);
    
    this.options.screenX = (screenX - 10);
    this.options.screenY = (screenY - 10);
  },
  
  setMaxItems: function() {
    var screenX  = this.options.screenX;
    var maxWidth = this.options.itemMaxWidth;
    
    // max Items
    var maxItems = Math.floor((screenX - (maxWidth / 2)) / maxWidth);
    this.maxItems = maxItems;
  },
  
  removeCarousel: function() {
    var i;
    var j;
    
    var scrollWidth;
    
    var item;
    var items;
    
    var container;    
    var containers = this.carouselArray;
    for (i = 0; i < containers.length; i++) {      
      container = document.getElementById(containers[i].id);
      
      container.style.removeProperty("width");
      
      items = this.assignItems(container);
      for (j = 0; j < items.length; j++) {
        item = items[j];
        console.log(item);
      }
      
      var scrollLeft  = document.getElementById(container.id + "_scrollLeft");
      scrollLeft.parentNode.removeChild(scrollLeft);
      
      var scrollRight = document.getElementById(container.id + "_scrollRight");
      scrollRight.parentNode.removeChild(scrollRight);
      
      var button = document.getElementById(container.id + "_button");
      button.parentNode.removeChild(button);
    }
  },
  
  createCarousel: function() {    
    var i;
    var items;
    var scrollWidth;
    
    var container;    
    var containers = this.carouselArray;
    for (i = 0; i < containers.length; i++) {      
      container = document.getElementById(containers[i].id);
      container.className = this.options.carouselContainerClass;
      
      items       = this.assignItems(container);
      scrollWidth = (items * this.options.itemMaxWidth);
      
      container.style.setProperty("width", scrollWidth);
      this.carouselArray[container.getAttribute("carouselNumber")].scrollWidth = scrollWidth;
      
      if (items > this.maxItems) {
        this.addOptions(container);
        this.hideExtras(container);
      }
    }
  },
  
  assignItems: function(container) {
    var i;
    
    var item;
    var items = StormJS.getElementsByAttribute("*", this.options.carouselItemTag, container);
    if (container) {
      var containerNumber = container.getAttribute("carouselNumber");

      for (i = 0; i < items.length; i++) {
        item = items[i];

        item.setAttribute(this.options.carouselItemTag, i);
        item.id = (container.id + "_" + i);
      }

      this.carouselArray[containerNumber].items = i;
    }
    
    return i;
  },
  
  getContainers: function() {
    var container;
    var containers = StormJS.getElementsByAttribute(this.options.carouselContainerTag);
    
    var carouselArray = [];
    var carouselArrayItem = {
      items: 0,
      leftHidden: -1,
      scrollWidth: 0,
    };
    
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      container.id = (this.options.carouselPrefixID + this.carouselIncrement)
      container.setAttribute("carouselNumber", i);
      carouselArrayItem.id = container.id;
      
      carouselArray[i] = carouselArrayItem;
    }
    this.carouselArray = carouselArray;
    
    return containers;
  },
  
  addOptions: function(container) {
    this.createModeButton(container);
    this.addScrollers(container);
  },
  
  createModeButton: function(container) {
    var button = document.createElement("button");
    button.className = this.options.carouselButtonClass;
    button.setAttribute("buttonMode", "grid");
    button.id = (container.id + "_button");
    
    button.addEventListener("click", function(event) {
      if (button.getAttribute("buttonMode") == "grid") {
        button.setAttribute("buttonMode", "carousel");
        StormJS.Carousel.gridMode(container);
      } else {
        button.setAttribute("buttonMode", "grid");
        StormJS.Carousel.scrollMode(container);
      }
    });
    container.appendChild(button);
  },
  
  addScrollers: function(container) {
    var scrollLeft = document.createElement("div");
    scrollLeft.className = this.options.scrollLeftClass;
    scrollLeft.id = (container.id + "_scrollLeft")
    scrollLeft.addEventListener("click", function(event) {
      StormJS.Carousel.scrollLeft(container);
    });
    
    var scrollRight = document.createElement("div");
    scrollRight.className = this.options.scrollRightClass;
    scrollRight.id = (container.id + "_scrollRight");
    scrollRight.addEventListener("click", function(event) {
      StormJS.Carousel.scrollRight(container);
    });
    
    // Append them
    var leftItem = document.getElementById(container.id + "_0");
    container.insertBefore(scrollLeft, leftItem);
    container.appendChild(scrollRight);
  },
  
  gridMode: function(container) {    
    container.className = this.options.carouselGridClass;
    container.style.removeProperty("width");
    
    this.showExtras(container);
  },
  
  scrollMode: function(container) {
    container.style.className = this.options.carouselContainerClass;    
    container.style.setProperty("width", this.carouselArray[container.getAttribute("carouselNumber")].scrollWidth);
    this.hideExtras(container);
  },
  
  hideExtras: function(container) {
    var containerNumber = container.getAttribute("carouselNumber");
    
    var item
    var items = this.carouselArray[containerNumber].items;    
    for (var i = this.maxItems; i < items; i++) {
      item = document.getElementById(container.id + "_" + i);
      item.style.setProperty("display", "none");
    }
    
    var scrollLeft = document.getElementById(container.id + "_scrollLeft");
    if (scrollLeft) { scrollLeft.style.removeProperty("display"); }
    var scrollRight = document.getElementById(container.id + "_scrollRight");
    if (scrollRight) { scrollRight.style.removeProperty("display"); }
  },
  showExtras: function(container) {
    var containerNumber = container.getAttribute("carouselNumber");
    
    var item
    var items = this.carouselArray[containerNumber].items;
    
    for (var i = this.maxItems; i < items; i++) {
      item = document.getElementById(container.id + "_" + i);      
      item.style.removeProperty("display");
    }
    
    var scrollLeft = document.getElementById(container.id + "_scrollLeft");
    if (scrollLeft) { scrollLeft.style.setProperty("display", "none"); }
    var scrollRight = document.getElementById(container.id + "_scrollRight");
    if (scrollRight) { scrollRight.style.setProperty("display", "none"); }
  },
  
  scrollLeft: function(container) {
    var containerArray = this.carouselArray[container.getAttribute("carouselNumber")];
    var item;    
    var i;
    
    var moveLeft;
    if (container.leftHidden >= 1) {
      moveLeft = ((containerArray.leftHidden + 1) * this.options.itemMaxWidth);
      containerArray.leftHidden += 1;
    } else {
      moveLeft = ((containerArray.leftHidden + 2) * this.options.itemMaxWidth);
      moveLeft = 30;
      containerArray.leftHidden += 2;
    }
    
    // Move them
    for (i = 0; i < containerArray.items; i++) {
      item = document.getElementById(container.id + "_" + i);
      item.style.removeProperty("display");
      item.style.removeProperty("transform");
      item.style.removeProperty("transition");
      item.style.setProperty("transform", ("translate3d(" + moveLeft + "px,0,0)"));
      item.style.setProperty("transition", "all 0.35s ease-out");
    }
    
    // hide the larger ones
    item = document.getElementById(container.id + "_0");
    item.style.setProperty("display", "none");
    
    for (i = containerArray.leftHidden; i < (this.maxItems + containerArray.leftHidden); i++) {
      item = document.getElementById(container.id + "_" + i);
      item.style.setProperty("display", "none");
    }
    
    //for (var i = 0; i < containerArray.i)
  },
  scrollRight: function(container) {    
    var containerArray = this.carouselArray[container.getAttribute("carouselNumber")];
    var item;    
    var i;
    
    var moveLeft;
    if (container.leftHidden >= 1) {
      moveLeft = ((containerArray.leftHidden + 1) * this.options.itemMaxWidth);
      containerArray.leftHidden += 1;
    } else {
      moveLeft = ((containerArray.leftHidden + 2) * this.options.itemMaxWidth);
      //moveLeft = 50;
      containerArray.leftHidden += 2;
    }
    
    // Move them
    for (i = 0; i < containerArray.items; i++) {
      item = document.getElementById(container.id + "_" + i);
      item.style.removeProperty("display");
      item.style.setProperty("transform", ("translate3d(-" + moveLeft + "px,0,0)"));
      item.style.setProperty("transition", "all 0.35s ease-out");
    }
    
    // hide the larger ones
    item = document.getElementById(container.id + "_0");
    item.style.setProperty("display", "none");
    
    for (i = (this.maxItems + containerArray.leftHidden); i < containerArray.items; i++) {
      item = document.getElementById(container.id + "_" + i);
      item.style.setProperty("display", "none");
    }
  }
};

if (StormJS != "undefined") { 
  StormJS.Carousel = stormCarousel; 
} else {
  var StormJS = {
    Carousel: stormCarousel,
    removeChildren: null,
    getElementsByAttribute: null,
    getElementAttributes: null
  };
}