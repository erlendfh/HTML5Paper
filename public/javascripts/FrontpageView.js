Ext.namespace('no.bekk.html5paper');

no.bekk.html5paper.FrontpageView = Ext.extend(Ext.Panel, {
  cls: 'frontpageView',
  
  initComponent: function() {
    var frontpage = $(this.frontpage);

    var articles = frontpage.children("articles").children("article");
    
    var mainArticle = this.buildArticleHtml($(articles[0]), 0);
    
    var sectionArticles = "";
    for (var i=1; i < 4; i++) {
      sectionArticles += this.buildArticleHtml($(articles[i]), i);
    }
    
    var leder = this.buildArticleHtml($(articles[4]), 4);
    
    this.items = [{
      layout: 'vbox',
      html: mainArticle + '<div class="sectionArticles">' + sectionArticles + '</div>'
        + '<div class="leder">' + leder + '</div>' + '<div class="sidebar"><h2>Siste Nytt</h2></div>'
    }];
    
    no.bekk.html5paper.FrontpageView.superclass.initComponent.call(this);    
  },
  
  buildArticleHtml: function (article, index) {
    var image = this.findImage(article);
    var useThumb = index > 0;
    var id = article.attr("id");
    return '<div class="article article' + index + '" articleid="' + id + '">'
        + '<div class="image">' + (image ? '<img src="' + (useThumb ? image.attr('thSource') : image.attr('src')) + '" />' : '') + '</div>'
        + '<h2>' + article.children('title').text() + '</h2>'
        + '<div class="leadText">' + article.children('leadText').text() + '</div>'
      + '</div>';
  },

  findImage: function (article) {
    var image = article.children("images").children("image:first");
    if (image.length) return image;
    
    image = article.children("videos").children("video:first").children("image:first");
    return image;
  },
  
  formatBody: function(text) {
    return "<p>" + text.replace(/\n\n/g, "</p><p>") + "</p>";
  }
});