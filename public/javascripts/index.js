(function () {
  
function initApp(xml) {
  xml = $(xml);
  console.log("frontpage", xml.find("edition > frontpage"));
  // Create a Carousel of Items
  var sections = xml.find("edition > section");
  var articlesBySection = [];

  var articleIndex = {};

  var sectionWidgets = [];
  for (var i=0; i < sections.length; i++) {
    sectionWidgets.push(new no.bekk.html5paper.SectionView({
      section: sections[i]
    }));
    
    var articles = $(sections[i]).children("article");
    var articleWidgets = [];

    for (var j=0; j < articles.length; j++) {
      var article = $(articles[j]);
      articleIndex[article.attr("id")] = {
        section: i,
        article: j
      };
      
      articleWidgets.push(new no.bekk.html5paper.ArticleView({
        article: article,
        direction: 'vertical'
      }));
    }
    
    articlesBySection.push(new Ext.Carousel({
        direction: 'horizontal',
        items: articleWidgets
    }));
  }


  var sections = new Ext.Carousel({
    direction: 'horizontal',
    items: sectionWidgets
  });

  var app = new no.bekk.html5paper.AppView({
    sections: sections,
    articlesBySection: articlesBySection
  });
  
  $('.sectionView .article').click(function () {
    var id = $(this).attr("articleid");
    window.location.hash = "#article-" + id;
    app.showArticle(articleIndex[id]);
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
