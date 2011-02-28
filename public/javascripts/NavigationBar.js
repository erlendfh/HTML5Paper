Ext.namespace('no.bekk.html5paper');

no.bekk.html5paper.NavigationBar = Ext.extend(Ext.Panel, {
  cls: 'navigationBar',
  initComponent: function() {
    this.backButton = new Ext.Button({
      cls: 'back',
      text: '&laquo; Tilbake',
      width: 100
    });
    
    this.backButton.on('tap', function () {
      this.fireEvent('back');
    }, this);
    
    this.items = [this.backButton];
    
    no.bekk.html5paper.NavigationBar.superclass.initComponent.call(this);
  }
});