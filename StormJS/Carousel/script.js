var stormCarousel = {
  carouselIncrement: 0,
  
  defaultOptions: {
    itemMaxWidth: 280,
    itemMaxHeight: 300,
    
    carouselContainerTag: "data-carousel-container",
    carouselItemTag: "data-carousel-item",
    
    carouselGridClass: "gridClass",
    carouselScrollClass: "scrollClass",
    
    carouselButtonClass: "buttonClass",
    carouselPipContainerClass: "pipContainer",
    carouselPipClass: "pip"
  },
  options: {},
  
  activate: function(options) {
    if (!this.options.itemMaxWidth) { this.options.itemMaxWidth = this.defaultOptions.itemMaxWidth; }
    if (!this.options.itemMaxHeight) { this.options.itemMaxHeight = this.defaultOptions.itemMaxHeight; }
    
    if (!this.options.carouselContainerTag) { this.options.carouselContainerTag = this.defaultOptions.carouselContainerTag; }
    if (!this.options.carouselItemTag) { this.options.carouselItemTag = this.defaultOptions.carouselItemTag; }
    
    if (!this.options.carouselPipContainerClass) { this.options.carouselPipContainerClass = this.defaultOptions.carouselPipContainerClass; }
    if (!this.options.carouselPipClass) { this.options.carouselPipClass = this.defaultOptions.carouselPipClass; }
    if (!this.options.carouselButtonClass) { this.options.carouselButtonClass = this.defaultOptions.carouselButtonClass; }
    
    if (!this.options.carouselGridClass) { this.options.carouselGridClass = this.defaultOptions.carouselGridClass; }
    if (!this.options.carouselScrollClass) { this.options.carouselScrollClass = this.defaultOptions.carouselScrollClass; }
    
    this.getScreenSettings();
    this.createCarousel();
  },
  
  getScreenSettings: function() {
    var body = document.getElementsByTagName("body")[0];
    var doc  = document.documentElement;
    
    var screenX = (window.innerWidth || doc.clientWidth || body.clientWidth);
    var screenY = (window.innerHeight || doc.clientHeight || body.clientHeight);
    
    this.options.screenX = (screenX - 10);
    this.options.screenY = (screenY - 10);
  },
  
  createCarousel: function() {
    var carouselArray = [];
    
    var items      = StormJS.getElementsByAttribute("*", this.options.carouselItemTag);
    var item;
    var itemIncrement;
    
    var containers = StormJS.getElementsByAttribute("*", this.options.carouselContainerTag);
    var container;
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      container.id = ("stormCarousel" + this.carouselIncrement)
      this.carouselIncrement++;
    }
    
    // Give the children numbers
    var itemNumber;
    for (i = 0; i < containers.length; i++) {
      itemIncrement = 0;
      
      for (var j = 0; j < items.length; j++) {
        item = items[j];     
        
        if (item.parentNode.id === ("stormCarousel" + i)) {
          item.setAttribute(this.options.carouselItemTag, itemIncrement);
          item.id = ("stormCarousel" + i + "_" + itemIncrement);
          itemIncrement++;
        }
      }
      
      carouselArray[i] = itemIncrement;
    }
    
    var itemsTotalWidth;
    for (i = 0; i < containers.length; i++) {      
      itemsTotalWidth = (carouselArray[i] * this.options.itemMaxWidth);
      if (itemsTotalWidth < this.options.screenX) { itemsTotalWidth = this.options.screenX; }
      
      // set the width so we can move it
      containers[i].style.setProperty("width", itemsTotalWidth);
      containers[i].style.className = this.options.carouselScrollClass;
      
      if (itemsTotalWidth > this.options.screenX) { 
        this.createPagination(containers[i], carouselArray[i]);
        this.createModeButton(containers[i], carouselArray[i]);
      }
    }
  },
  
  createPagination: function(container, numberOfItems) {
    var maxItemsForScreen = Math.floor(this.options.screenX / this.options.itemMaxWidth);
    if (numberOfItems > maxItemsForScreen) {
      var maxItem;
      for (var i = maxItemsForScreen; i < numberOfItems; i++) {
        maxItem = document.getElementById(container.id + "_" + i);
        maxItem.style.setProperty("display", "none");
      }
    }
  },
  
  createModeButton: function(container, numberOfItems) {
    var button = document.createElement("button");
    button.className = this.options.carouselButtonClass;
    button.setAttribute("carouselItems", numberOfItems);
    
    button.addEventListener("click", function(event) {
      if (button.getAttribute("buttonMode") == "grid") {
        button.setAttribute("buttonMode", "carousel");
      } else {
        button.setAttribute("buttonMode", "grid");
      }
      
      StormJS.Carousel.changeMode(container, button);
    });
    container.appendChild(button);
  },
  
  changeMode: function(container, button) {
    var numberOfItems = button.getAttribute("carouselItems");
    
    if (button.getAttribute("buttonMode") == "grid") {
      container.style.className = this.options.carouselGridClass;
      container.style.setProperty("width", this.options.screenX);
      
      var item;
      for (var i = 0; i < numberOfItems; i++) {
        item = document.getElementById(container.id + "_" + i);
        item.style.setProperty("display", "block");
      }
    } else {
      this.createPagination(container, numberOfItems);
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