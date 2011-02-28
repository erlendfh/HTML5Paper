Ext.namespace('no.bekk.html5paper');

no.bekk.html5paper.ArticleView = Ext.extend(Ext.Carousel, {
  cls: "articleView",
  columns: 2,
  
  initComponent: function() {
    var completed = false;
    var laidOutPages = 0;
    
    this.on("afterlayout", function() {
      if (!completed) {
        completed = this.breakPages(laidOutPages);
      }
      if (completed) {
        $('.mainImage.video img', this.body.dom).click(function () {
          $(this).hide();
          var video = $(this).siblings("video");
          video.show();
          video[0].play();
        });
      }
    });

    var article = $(this.article);
    this.id = 'article-' + article.attr("id");

    this.items = [{
      cls: 'page',
      html: this.buildArticleHtml(article)
    }];
    
    
    no.bekk.html5paper.ArticleView.superclass.initComponent.call(this);
  },
  
  buildArticleHtml: function (article) {
    var image = this.buildImage(article);
    var byline = article.children('byline').text();
    
    return '<div class="header">'
        + image
        + '</div>'
        + '<div class="body">'
        + '<h1>' + article.children('title').text() + '</h1>'
        +   '<p class="leadText">' + article.children('leadText').text() + '</p>'
        +  (byline ? '<p class="byline">' + byline + '</p>' : '')
        + this.formatBody(article.children('body').text())
         + '</div>'
      + '</div>';
  },
  
  formatBody: function(text) {
    return "<p>" + text.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br />") + "</p>";
  },
  
  buildImage: function (article) {
    var video = article.children("videos").children("video:first");
    var image = video.children("image:first");
    if (image.length) {      
      return '<div class="mainImage video"><img src="' + image.attr('src') + '" /><video poster="' + image.attr('src') + '" src="' + video.attr('movieUrl') + '" controls="controls"></video></div>';
    }

    var image = article.children("images").children("image:first");
    if (image.length) {
      var html =  '<div class="mainImage">' + (image.length ? '<img src="' + image.attr('src') + '" />' : '') + '</div>'
      return html;
    }
    
    
    return "";
  },
  
  breakPages: function(laidOutPages) {
    var self = this;
    var size = this.body.getSize();

    var lastPage = $($(this.body.dom).find(".x-carousel-item:last"));
    var pages = lastPage.pageBreak(this.columns, 2);
    
    if (pages.length == 1) return true;
    
    for (var i = laidOutPages == 0 ? 1 : 0; i < pages.length; i++) {
      var html = "";
      // convert paragraphs to html
      $(pages[i]).each(function () {
        var p = $(this);
        html += p.outer();
        p.remove();
      });
      
      if (html) {
        var res = this.add({
          cls: 'page',
          html: '<div class="body">' + html + '</div>'
        });
      }        
    }

    laidOutPages++;
    
    this.doLayout();
    return false;
  }
});

