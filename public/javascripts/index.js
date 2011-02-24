function createArticleView(article) {
  var articleView = new Ext.ArticleView({
    article: article,
    direction: 'vertical'
  });
  
  return articleView;
}

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        // Create a Carousel of Items
        var articles = data.edition.section[0].article;
        var articleWidgets = [];
        
        for (var i=0; i < articles.length; i++) {
          articleWidgets.push(createArticleView(data.edition.section[0].article[i]));
        }
        
        var articles = new Ext.Carousel({
            direction: 'horizontal',
            ui: 'light',
            activeItem: 0,
            defaults: {
                cls: 'section'
            },
            items: articleWidgets
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
});