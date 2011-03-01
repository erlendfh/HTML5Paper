Ext.namespace('no.bekk.html5paper');

no.bekk.html5paper.AppView = Ext.extend(Ext.Panel, {
  fullscreen: true,
  cls: 'appView',
  ui: 'light',
  layout: {
      type: 'vbox',
      align: 'stretch'
  },
  
  initComponent: function() {
    this.navigationBar = new no.bekk.html5paper.NavigationBar({
      height: 50
    });
    
    this.navigationBar.on('back', function () {
      this.contentView.setActiveItem(0, 'fade');
    }, this);
    
    this.contentView = new Ext.Panel({
      flex: 1,
      layout: {
          type: 'card',
          align: 'stretch'
      },
      items: [this.sections].concat(this.articlesBySection)
    });
    
    this.items = [
      this.navigationBar,
      this.contentView
    ];
    
    no.bekk.html5paper.AppView.superclass.initComponent.call(this);
  },
  
  showArticle: function (articlePosition) {
    this.contentView.setActiveItem(articlePosition.section + 1, 'fade');
    this.articlesBySection[articlePosition.section].setActiveItem(articlePosition.article);
  },
  
  showSection: function (section) {
    this.contentView.setActiveItem(0, 'fade');
    this.sections.setActiveItem(section);
  }
  
});