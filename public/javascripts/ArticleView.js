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
      var size = this.body.getSize();
      console.log(size);
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
            currentPage[currentPage.length-1] = self.splitParagraph(currentPage[currentPage.length-1], size.height);
            
            currentPage = [];
            pages.push(currentPage);
          }
        }
        
        currentPage.push(p);
      });
            
      var self = this;
      $(pages).each(function () {
        var html = "";
        $(this).each(function () {
          html += $(this).outer();
        });
        self.add({
          html: html
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
  
  splitParagraph: function (p, maxOffset) {
    var text = this.splitNode(p);
    var newP = $(text);
    p.replaceWith(newP);

    newP.find("span").each(function () {
      console.log(maxOffset, this.offsetTop, this.innerHTML);
    });
    
    return newP;
  },
  

  splitNode: function (node) {
    var self = this;
      node = $(node);
      var childNodes = node.attr("childNodes");
      if (childNodes) {
          var text = "";
          $(childNodes).each(function () {
              text += self.splitNode(this);
          });
          node.html(text);
          return node.outer();
      } else {
          return node.text().replace(/([^\s]+)/g, "<span>$1</span>");
      }
  },
    
  formatBody: function(text) {
    return "<p>" + text.replace(/\n\n/g, "</p><p>") + "</p>";
  }
});

