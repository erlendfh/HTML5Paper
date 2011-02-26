jQuery.fn.outer = function() {
  return $( $('<div></div>').html(this.clone()) ).html();
}


Ext.ArticleView = Ext.extend(Ext.Carousel, {
  defaults: {
    cls: "article"
  },
  columns: 2,
  
  initComponent: function() {
    var completed = false;
    var laidOutPages = 0;
    
    this.on("afterlayout", function() {
      if (!completed)
        completed = this.breakPages(laidOutPages);
    });
    var image = this.article.images ? this.article.images.image.length ? this.article.images.image[0] : this.article.images.image : null;
    this.items = [{
      html: '<div class="header"><h1>' + this.article.title + '</h1>' + (image ? '<img class="mainImage" src="' + image["@attributes"].src + '" />' : '') + '</div><div class="body">' + this.formatBody(this.article.body) + "</div>"
    }];
    
    Ext.ArticleView.superclass.initComponent.call(this);
  },
  
  formatBody: function(text) {
    return "<p>" + text.replace(/\n\n/g, "</p><p>") + "</p>";
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
          html: '<div class="body">' + html + '</div>'
        });
      }        
    }

    laidOutPages++;
    
    this.doLayout();
    return false;
  }
});

