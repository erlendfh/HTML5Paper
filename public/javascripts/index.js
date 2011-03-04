(function () {
  // Galaxy: 499x657
  
function initApp(xml) {
    
  xml = $(xml);

  // Create a Carousel of Items
  var sections = xml.find("edition > section");
  var articlesBySection = [];

  var articleIndex = {};

  var frontpage = new no.bekk.html5paper.FrontpageView({
    frontpage: $(xml.find("edition > frontpage"))
  });

  var sectionWidgets = [frontpage];
  
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
    
    var articleCarousel = new Ext.Carousel({
        direction: 'horizontal',
        items: articleWidgets
    });
    
    articleCarousel.on('beforecardswitch', function (container, newCard, oldCard) {
      oldCard.fireEvent('beforecardswitchout');
      newCard.fireEvent('beforecardswitchin');
    });

    articleCarousel.on('cardswitch', function (container, newCard, oldCard) {
      oldCard.fireEvent('cardswitchout');
      newCard.fireEvent('cardswitchin');
    });

    articlesBySection.push(articleCarousel);
  }

  var sections = new Ext.Carousel({
    direction: 'horizontal',
    items: sectionWidgets
  });

  var app = new no.bekk.html5paper.AppView({
    sections: sections,
    articlesBySection: articlesBySection
  });
  
  $('.frontpageView .article, .sectionView .article').safeClick(function (e) {
    e.stopPropagation();
    e.preventDefault();
    el = $(this);
    el.css("background", "#ddd");
    setTimeout(function () {
      var id = el.attr("articleid");
      window.location.hash = "#article-" + id;
      app.showArticle(articleIndex[id]);
      el.css("background", "");
    }, 1);
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
          initApp(xmlData);
        }
      });      
    }
});


})();
