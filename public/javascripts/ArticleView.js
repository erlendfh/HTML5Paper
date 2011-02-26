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
    
    this.on("afterlayout", function() {
      if (completed) return;
      completed = true;
      this.breakPages();
    });
    
    this.items = [{
      html: "<h1>" + this.article.title + "</h1>" + "<div>" + this.formatBody(this.article.body) + "</div>"
    }];
    
    Ext.ArticleView.superclass.initComponent.call(this);
  },
  
  formatBody: function(text) {
    return "<p>" + text.replace(/\n\n/g, "</p><p>") + "</p>";
  },
  
  breakPages: function() {
    var self = this;
    var size = this.body.getSize();

    var firstPage = $(this.body.dom).find(".x-carousel-item:first");
    var pages = firstPage.pageBreak(this.columns);
    
    for (var i = 1; i < pages.length; i++) {
      var html = "";
      // convert paragraphs to html
      $(pages[i]).each(function () {
        var p = $(this);
        html += p.outer();
        p.remove();
      });
      
      if (html) {
        var res = this.add({
          html: html
        });
      }        
    }
    
    this.doLayout();    
  }
});

