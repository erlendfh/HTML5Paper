Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        // Create a Carousel of Items
        var carousel1 = new Ext.Carousel({
          direction: 'vertical',
            defaults: {
                cls: 'card'
            },
            items: [{
                html: data.edition.section[0].article[0].body
            },
            {
                title: 'Tab 1.2',
                html: '1.2'
            },
            {
                title: 'Tab 1.3',
                html: '1.3'
            }]
        });

        var carousel2 = new Ext.Carousel({
          direction: 'vertical',
            defaults: {
                cls: 'card'
            },
            items: [{
                html: '2.1'
            },
            {
                title: 'Tab 2.2',
                html: '2.2'
            },
            {
                title: 'Tab 2.3',
                html: '2.3'
            }]
        });
        
        var carousel3 = new Ext.Carousel({
            direction: 'horizontal',
            ui: 'light',
            activeItem: 0,
            defaults: {
                cls: 'card'
            },
            items: [carousel1, carousel2]
        });

        new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [carousel3]
        });
    }
});