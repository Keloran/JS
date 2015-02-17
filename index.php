<html>
  <head>    
    <script type="text/javascript" src="StormJS/Storm.js"></script>
    
    <link rel="stylesheet" href="StormJS/Tabs/style.css" />
    <script type="text/javascript" src="StormJS/Tabs/script.js"></script>
    
    <link rel="stylesheet" href="StormJS/ToolTip/style.css" />
    <script type="text/javascript" src="StormJS/ToolTip/script.js"></script>
    
    <link rel="stylesheet" href="StormJS/Predict/style.css" />
    <script type="text/javascript" src="StormJS/Predict/script.js"></script>
    
    <script type="text/javascript" src="StormJS/Net/script.js"></script>
    
    <link rel="stylesheet" href="StormJS/Carousel/style.css" />
    <!--<script type="text/javascript" src="StormJS/Carousel/script.js"></script>-->
    <script type="text/javascript" src="StormJS/Carousel/script2.js"></script>
    
    <style>
      body {
        width: 100%;
        overflow: hidden;
      }
    </style>
    
    <script>
      window.onresize = function() { 
        StormJS.Carousel.resizeWindow();
      }
      
      window.onload = function() {
        StormJS.Tabs.activate({
          tabHideClass: "tabs-hide",
          tabShowClass: "tabs-show"
        });
        
        StormJS.ToolTip.activate();
        
        StormJS.Predict.activate({
          searchURL: "/test.php"
        });
        
        StormJS.Carousel.activate();
      }      
    </script>
  </head>
  <body>
    <div data-tabs-container>
      <ul>
        <li data-tabs-activator="1">Activator 1</li>
        <li data-tabs-activator="2">Activator 2</li>
      </ul>
      <div data-tabs-tab="1" class="tabs-hide">Tab 1</div>
      <div data-tabs-tab="2" class="tabs-hide">Tab 2</div>
    </div>
    
    <div data-tabs-container>
      <ul>
        <li data-tabs-activator="1">Activator 1</li>
        <li data-tabs-activator="2">Activator 2</li>
      </ul>
      <div data-tabs-tab="1" class="tabs-hide">Tab 1</div>
      <div data-tabs-tab="2" class="tabs-hide">Tab 2</div>
    </div>
    
    <div data-tabs-container>
      <ul>
        <li data-tabs-activator="1">Activator 1</li>
        <li data-tabs-activator="2">Activator 2</li>
      </ul>
      <div data-tabs-tab="1" class="tabs-hide">Tab 1</div>
      <div data-tabs-tab="2" class="tabs-hide">Tab 2</div>
    </div>
    
    <hr />
    <a href="#" title="tooltip madness 1" data-tooltip>Hover Me</a><br />
    <a href="#" title="tooltip madness 2" data-tooltip>Hover Me</a><br />
    <a href="#" title="tooltip madness 3 " data-tooltip>Hover Me</a><br />
    <a href="#" title="tooltip madness 4" data-tooltip>Hover Me</a><br />
    <a href="#" title="tooltip madness 5" data-tooltip>Hover Me</a><br />
    
    <hr />
    <input type="text" id="search" placeholder="Search" data-search-input />
    <div data-search-results></div>
    
    <hr />
    <div id="carouselContainer" data-carousel-container>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product"title="Bob 1" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 1
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 2" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 2
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 3" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 3
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 4" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 4
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 5" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 5
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 6" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 6
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 7" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 7
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 8" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 8
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 9" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 8
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 10" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 10
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 111" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 11
        </div>
      </div>
      <div class="item" itemscope="" itemtype="http://schema.org/Product" data-carousel-item>
        <div class="sc-img" style="max-height: 200px; max-width: 200px; overflow: hidden">
          <a href="http://api.ning.com/files/HQ4UqYkp3R0n9Y2pLknD*1OICq9l31HikB*PJ8rVVQ9VagOZpN-C837b0VGn-yOD2J2wLMhNiHOwBB1dgdMQX023LcBhDAcn/BobMarley.jpg" property="url" title="Previous 1 2 3 … 5 Next › Page"><img src="http://ts2.mm.bing.net/th?id=HN.607994076231827653&amp;pid=15.1" alt="Product" title="Bob 12" data-tooltip></a>
        </div>
        <div class="sc-data">
          Bob Marley 12
        </div>
      </div>
    </div>
  </body>
</html>