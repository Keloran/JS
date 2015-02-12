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
    
    <script>
      window.onload = function() {
        StormJS.Tabs.activate({
          tabHideClass: "tabs-hide",
          tabShowClass: "tabs-show"
        });
        StormJS.ToolTip.activate();
        StormJS.Predict.activate({
          searchURL: "/test.php"
        });
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
    <input type="text" id="search" placeholder="Search" />
    
  </body>
</html>