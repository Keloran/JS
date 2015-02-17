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
    carouselScrollClass: "scrollClass",
    
    scrollLeftClass: "scrollLeft",
    scrollRightClass: "scrollRight",
    
    carouselButtonClass: "buttonClass",    
    carouselPipContainerClass: "pipContainer",
    carouselPipClass: "pip"
  },
  options: {},
  
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
    if (!this.options.carouselScrollClass) { this.options.carouselScrollClass = this.defaultOptions.carouselScrollClass; }
    
    if (!this.options.scrollLeftClass) { this.options.scrollLeftClass = this.defaultOptions.scrollLeftClass; }
    if (!this.options.scrollRightClass) { this.options.scrollRightClass = this.defaultOptions.scrollRightClass; }
    
    this.getScreenSettings();
    this.setMaxItems();
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
  
  getContainers: function() {
    var containers = StormJS.getElementsByAttribute(this.options.carouselContainerTag);
    var container;
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      container.id = (this.options.carouselPrefixID + this.carouselIncrement)
      
      this.carouselArray[this.carouselIncrement] = {
        items: 0,
        currentItems: []
      };
      this.carouselIncrement++;
    }
    
    return containers;
  },
  
  setMaxItems: function() {
    var screenX  = this.options.screenX;
    var maxWidth = this.options.itemMaxWidth;
    
    // max Items
    var maxItems = Math.floor(screenX / maxWidth);
    this.maxItems = maxItems;
  },
  
  resizeWindow: function() {
    StormJS.Carousel.getScreenSettings();
    StormJS.Carouse.setMaxItems();
    //StormJS.Carousel.createCarousel();
  },
  
  assignNumbers: function(containers) {
    var carouselArray = [];
    var items      = StormJS.getElementsByAttribute(this.options.carouselItemTag);
    var item;
    var itemIncrement;
    
    // Give the children numbers
    var itemNumber;
    for (i = 0; i < containers.length; i++) {
      itemIncrement = 0;
      
      for (var j = 0; j < items.length; j++) {
        item = items[j];     
        
        if (item.parentNode.id === (this.options.carouselPrefixID + i)) {
          item.setAttribute(this.options.carouselItemTag, itemIncrement);
          item.id = (this.options.carouselPrefixID + i + "_" + itemIncrement);
          itemIncrement++;
        }
      }
      
      carouselArray[i] = itemIncrement;
      this.carouselArray[i].items = itemIncrement;
    }
    
    return carouselArray;
  },
  
  createCarousel: function() {    
    var items      = StormJS.getElementsByAttribute(this.options.carouselItemTag);
    var item;
    var itemIncrement;
    
    var containers    = this.getContainers();
    var carouselArray = this.assignNumbers(containers);
    
    var itemsTotalWidth;
    for (i = 0; i < containers.length; i++) {      
      itemsTotalWidth = (carouselArray[i] * this.options.itemMaxWidth);
      if (itemsTotalWidth < this.options.screenX) { itemsTotalWidth = this.options.screenX; }
      
      // set the width so we can move it
      //containers[i].style.setProperty("width", itemsTotalWidth);
      containers[i].style.className = this.options.carouselContainer;
      containers[i].setAttribute("carouselWidth", itemsTotalWidth);
      containers[i].setAttribute("carouselNumber", i);
      
      if (itemsTotalWidth > this.options.screenX) {         
        this.createPagination(containers[i], carouselArray[i]);
        this.createModeButton(containers[i], carouselArray[i]);
      }
    }
  },
  
  createPagination: function(container, numberOfItems) {
    var i;
    var shownItems = 0;
    
    var carouselNumber = container.getAttribute("carouselNumber");
    
    var maxItemsForScreen = Math.floor(this.options.screenX / this.options.itemMaxWidth);
    container.style.className = this.options.carouselContainerClass;
    //container.style.setProperty("width", container.getAttribute("carouselWidth"));
    if (numberOfItems > maxItemsForScreen) {
      shownItems = maxItemsForScreen;
      
      var maxItem;
      for (i = maxItemsForScreen; i < numberOfItems; i++) {
        maxItem = document.getElementById(container.id + "_" + i);
        //maxItem.style.setProperty("display", "none");
      }
    } else {
      shownItems = numberOfItems;
    }
    
    var shownArray = [];
    for (i = 0; i < shownItems; i++) { shownArray[i] = i; }
    this.carouselArray[carouselNumber].currentItems = shownArray;
    
    // add scrollLeft
    var aScrollLeft = StormJS.getElementsByAttribute("div", "data-carousel-scroll-left", container);
    if (aScrollLeft.length < 1) {
      var scrollLeft = document.createElement("div");
      scrollLeft.className = this.options.scrollLeftClass;
      scrollLeft.setAttribute("data-carousel-scroll-left", container.id);
      scrollLeft.addEventListener("click", function(event) {
        StormJS.Carousel.scrollLeft(carouselNumber);
      });
      container.insertBefore(scrollLeft, container.firstChild);
    } else {
      aScrollLeft[0].style.setProperty("display", "block");
    }

    // add scrollright
    var aScrollRight = StormJS.getElementsByAttribute("div", "data-carousel-scroll-right", container);
    if (aScrollRight.length < 1) {
      var scrollRight = document.createElement("div");
      scrollRight.className = this.options.scrollRightClass;
      scrollRight.setAttribute("data-carousel-scroll-right", container.id);
      scrollRight.addEventListener("click", function(event) {        
        StormJS.Carousel.scrollRight(carouselNumber);
      });
      container.appendChild(scrollRight);
    } else {
      aScrollRight[0].style.setProperty("display", "block");
    }
  },
  
  scrollLeft: function(carouselNumber, item) {
    if (!item) { item = 0; }
    
    var currentItems = StormJS.Carousel.carouselArray[carouselNumber].currentItems;
    var totalItems = StormJS.Carousel.carouselArray[carouselNumber].items;
    
    var first = StormJS.Carousel.carouselArray[carouselNumber].currentItems[0];
    var last  = StormJS.Carousel.carouselArray[carouselNumber].currentItems[(currentItems.length - 1)];
    
    var newFirst = (first - 1);
    if (newFirst < 0) { newFirst = 0; }
    var firstItem = document.getElementById(StormJS.Carousel.options.carouselPrefixID + carouselNumber + "_" + newFirst);
    
    
    firstItem.style.setProperty("display", "block");
    currentItems[0] = newFirst;
    
    var newLast = (last - 1);
    if (newLast == totalItems) { newLast = (totalItems - 1); }
    currentItems[last] = newLast;
    var lastItem = document.getElementById(StormJS.Carousel.options.carouselPrefixID + carouselNumber + "_" - last);
    lastItem.style.setProperty("display", "none");
  },
  scrollRight: function(carouselNumber, item) {
    if (!item) { item = 5; }
    
    var currentItems = StormJS.Carousel.carouselArray[carouselNumber].currentItems;
    var totalItems = StormJS.Carousel.carouselArray[carouselNumber].items;
    
    var first = StormJS.Carousel.carouselArray[carouselNumber].currentItems[0];
    var last  = StormJS.Carousel.carouselArray[carouselNumber].currentItems[(currentItems.length - 1)];
    
    /**
      'transform': 'translate3d(-' + slide + 'px,0,0)',
      'transition': 'all 0.35s ease-out'
      */
    
    var firstItem = document.getElementById(StormJS.Carousel.options.carouselPrefixID + carouselNumber + "_" + first);
    //firstItems.style.setProperty("transform", "translate3d(-" + )
    
    firstItem.style.setProperty("display", "none");
    currentItems[0] = (first + 1);
    
    var newLast = (last + 1);
    if (newLast == totalItems) { newLast = (totalItems - 1); }
    currentItems[last] = newLast;
    var lastItem = document.getElementById(StormJS.Carousel.options.carouselPrefixID + carouselNumber + "_" + newLast);
    lastItem.style.setProperty("display", "block");
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
      
      var aScrollLeft = StormJS.getElementsByAttribute("div", "data-carousel-scroll-left", container);
      if (aScrollLeft.length >= 1) { aScrollLeft[0].style.setProperty("display", "none"); }
      var aScrollRight = StormJS.getElementsByAttribute("div", "data-carousel-scroll-right", container);
      if (aScrollRight.length >= 1) { aScrollRight[0].style.setProperty("display", "none"); }
      
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