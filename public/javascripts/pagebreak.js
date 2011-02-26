(function ($) {
  $.fn.outer = function() {
    return $( $('<div></div>').html(this.clone()) ).html();
  }

  $.fn.pageBreak = function (columns, maxPages) {
    var ps = this.find("p");
    
    var columnIndex = 0;
    var lastTop = ps.first().offset().top;
    var pages = [];
    var currentPage = [];
    var lastPage;
    pages.push(currentPage);
    
    for (var i=0; i < ps.length; i++) {
      var p = $(ps[i]);
      var pos = p.offset();
      if (pos.top < lastTop && (!maxPages || maxPages > pages.length)) {
        columnIndex++;
        

        if (columnIndex % columns == 0) {
          lastPage = currentPage;
          currentPage = [];
          pages.push(currentPage);
          
          var lastParagraph = lastPage[lastPage.length-1];
          
          var redPs = splitParagraph(lastParagraph);
          var redP0 = $(redPs[0]);
          var redP1 = $(redPs[1]);
          redP0.after(redP1);
          
          lastPage[lastPage.length-1] = redP0;
          
          redPs.css("color", "red");
          redPs.first().css("color", "lightRed");
          redP1.addClass("continued");

          if (redP1.length && redP1.offset().top < redP0.offset().top) {
            currentPage.push(redP1);
          } else {
            lastPage.push(redP1);
          }
          
          var bluePs = splitParagraph(p);
          var blueP0 = $(bluePs[0]);
          var blueP1 = $(bluePs[1]);
          blueP0.after(blueP1);

          if (blueP0.offset().left == redP0.offset().left) {
            lastPage.push(blueP0);
          } else {
            currentPage.push(blueP0);
          }

          p = blueP1;
          p.addClass("continued");
          bluePs.css("color", "blue");
          bluePs.first().css("color", "lightBlue");
          
        }
      }

      lastTop = pos.top;

      currentPage.push(p);
    }
    
    return pages;
  }
  
  // Finds the exact word where a paragraph is split over two columns and converts it to two paragraphs
  function splitParagraph(p) {
    var text = splitNode(p);
    var firstP = $(text);
    p.replaceWith(firstP);
    
    var lastOffset = 0;    
    var children = firstP.find("span");
    for (var i=0; i < children.length; i++) {
      var el = $(children[i]);
      var top = el.offset().top;
      if (lastOffset > top) {
        el.before("%BREAK%");
        break;
      }
      
      lastOffset = top;
    }
    
    var secondP = $(splitHtml(firstP.outer(), "%BREAK%"));
    firstP.replaceWith(secondP[0]);
    return secondP;
  }
  

  // Wraps each word in a <span> tag
  function splitNode(node) {
      node = $(node);
      if (node.is("br")) return "<br />";
      
      var childNodes = node.attr("childNodes");
      if (childNodes) {
          var text = "";
          $(childNodes).each(function () {
              text += splitNode(this);
          });
          node.html(text);
          return node.outer();
      } else {
          return node.text().replace(/([^\s]+)/g, "<span>$1</span>");
      }
  }
  
  // Safely splits a string of html and balances opening and closing tags
  function splitHtml(html, breakpoint) {
    var parts = html.split(breakpoint);
    var left = parts[0],
        right = parts[1];
  
    if (!right) return left;
        
    var openingTagPattern = /<([^\/][^>\s]*)(?:\s[^>]+)*[^\/>]?>/g;
    var closingTagPattern = /<\/([^>\s]+)\s*>/g;
    var openingTags = [];
    var openingTag, closingTag;
    while (openingTag = openingTagPattern.exec(left)) {
      if (openingTag[1] != "br")
        openingTags.push(openingTag[1]);
    }
    
    while (closingTag = closingTagPattern.exec(left)) {
      openingTags.splice(openingTags.indexOf(closingTag[1]), 1);
    }
    
    if (openingTags) {
      right = "<" + openingTags.join("><") + ">" + right;
      left = left + "</" + openingTags.reverse().join("></") + ">";
    }
    
    return left + right;
  }
  
})(jQuery);