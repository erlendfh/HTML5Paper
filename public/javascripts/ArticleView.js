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
      var self = this;
      
      console.log("size", this.body.getSize());
      var firstPage = $(this.body.dom).find(".x-carousel-item:first");
      var ps = firstPage.find("p");
        
      var columnIndex = 0;
      var columnLeft = ps.first().position().left;
      var pages = [];
      var currentPage = [];
      
      ps.each(function () {
        var p = $(this);
        var pos = p.position();
        
        if (pos.left > columnLeft) {
          columnIndex++;
          columnLeft = pos.left;

          if (columnIndex % self.columns == 0) {
            currentPage = [];
            pages.push(currentPage);
          }
        }
                
        currentPage.push(this);
      });
      
      console.log("pages", pages);
      
      var self = this;
      $(pages).each(function () {
        console.log($(this).outer());
        self.add({
          html: $(this).outer()
        });        
      });
      
      self.doLayout();

      console.log("done");
    });
    
    this.items = [{
      html: "<h1>" + this.article.title + "</h1>" + "<div>" + this.formatBody(this.article.body) + "</div>"
    }];
    
    Ext.ArticleView.superclass.initComponent.call(this);
  },
  
  formatBody: function(text) {
    return "<p>" + text.replace(/\n\n/g, "</p><p>") + "</p>";
  }
});

