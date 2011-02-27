Ext.SectionView = Ext.extend(Ext.Panel, {
  cls: 'sectionView',
  initComponent: function() {
    var section = $(this.section);
    console.log("section", section);

    var articles = section.children("article");
    
    var mainArticles = "";
    for (var i=0; i < 3; i++) {
      mainArticles += this.buildArticleHtml($(articles[i]), i);
    }
    
    var sidebar = "";
    for (var i=3; i < articles.length; i++) {
      sidebar += this.buildArticleHtml($(articles[i]), i);
    }
    
    this.items = [{
      layout: 'vbox',
      html: '<h1><span>' + section.attr('typeName') + '</span></h1>' + mainArticles
        + '<div class="sidebar">' + sidebar + '</div>'
    }];
    
    Ext.SectionView.superclass.initComponent.call(this);
    
  },
  
  buildArticleHtml: function (article, index) {
    var image = article.children("images").children("image:first");
    return '<div class="article article' + index + '">'
        + '<div class="image">' + (image ? '<img src="' + image.attr('src') + '" />' : '') + '</div>'
        + '<h2>' + article.children('title').text() + '</h2>'
        + '<div class="leadText">' + article.children('leadText').text() + '</div>'
      + '</div>';
  },
  
  formatBody: function(text) {
    return "<p>" + text.replace(/\n\n/g, "</p><p>") + "</p>";
  }
});