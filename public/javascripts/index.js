(function () {
  
function initApp(xml) {
  xml = $(xml);
  console.log("frontpage", xml.find("edition > frontpage"));
  // Create a Carousel of Items
  var sections = xml.find("edition > section");
  var articles = $(sections).first().children("article");
  
  var articleWidgets = [];
  
  for (var i=0; i < articles.length; i++) {
    articleWidgets.push(new Ext.ArticleView({
      article: articles[i],
      direction: 'vertical'
    }));
  }
  
  var articles = new Ext.Carousel({
      direction: 'horizontal',
      ui: 'light',
      activeItem: 0,
      items: articleWidgets
  });

  var sectionWidgets = [];
  for (var i=0; i < sections.length; i++) {
    sectionWidgets.push(new Ext.SectionView({
      section: sections[i]
    }));
  }

  var sections = new Ext.Carousel({
    direction: 'horizontal',
    ui: 'light',
    activeItem: 0,
    items: sectionWidgets
  });

  new Ext.Panel({
      fullscreen: true,
      layout: {
          type: 'vbox',
          align: 'stretch'
      },
      defaults: {
          flex: 1
      },
      items: [articles]
  });
}

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
      
      
        $.ajax({
          url: '/data/edition',
          dataType: 'xml',
          success: function (xmlData) {
            console.log("result", xmlData);
            initApp(xmlData);
          }
        });      
    }
});

})();
