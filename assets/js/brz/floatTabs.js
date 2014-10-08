var FloatTabs = {
  tabsManager: null,
  adjustTabs: function () {
    var nextRight = 0;

    $('.floatTabs').find('.floatTab').each(function () {
      if($(this).is(':visible')) {
        $(this).css('right', nextRight);
        nextRight += parseInt($(this).css('width')) + 15;

        if(parseInt($(this).offset().top) < 0) {
          $(this).find('.tabContent').css('height', (parseInt($(this).css('height')) + parseInt($(this).offset().top)) - parseInt($(this).find('.tabTitle').css('height')));
          $(this).find('.tabContent').css('overflow-y', 'auto');
          $(this).find('.tabContent').css('overflow-x', 'hidden');
        } else {
          $(this).find('.tabContent').css('height', 'auto');
          $(this).find('.tabContent').css('overflow-y', 'hidden');
          $(this).find('.tabContent').css('overflow-x', 'hidden');
        }
      }
    });

    if ($('.floatTab').last().offset().left <= 0) {
      if(this.tabsManager == null) {
        alert(this.tabsManager);
        this.enableTabsManager();
      }
    }
  },
  enableTabsManager: function () {
    if(this.tabsManager == null) {
      this.tabsManager = new FloatTab('tabs_manager', 'Abas Agrupadas');
    }

    var tabBody = '';
    $('.floatTabs').find('.floatTab').not($('#floatTab_tabs_manager')).not(webchat_tab.getTabElement()).each(function(index, element){
      tabBody += $(element).find('.tabTitle').text()+'<br />';
      $(element).hide();
    });

    this.tabsManager.setContent(tabBody);
    this.adjustTabs();
  }
}

function FloatTab(tabName, title, width) {
  if (tabName) {
    var parent = this;

    this.setId(tabName);

    var ele = $('<div></div>')
      .addClass('floatTab')
      .click(function () {
        parent.hideNotifications();
        FloatTabs.adjustTabs();
      })
      .attr({id: this.getId()})
      .css({width: (width) ? width : 'auto'})
      .append(
        $('<div></div>')
          .addClass('tabTitle')
          .append(
            $('<span></span>')
              .addClass('notifications')
              .append('0')
          )
          .click(function () {
            var floatTab = $(this).parent('div');
            var tabContent = parent.getTabElement().find('.tabContent');

            if (tabContent.is(':hidden')) {
              parent.hideNotifications();
              tabContent.show();
            } else {
              parent.showNotifications();
              tabContent.hide();
            }
          })
          .append(' ' + title)
      )
      .append(
        $('<div></div>')
          .addClass('tabContent')
      )

    $('.floatTabs').append(ele);

    this.applyDefaultEvents();

    FloatTabs.adjustTabs();
  } else {
    console.log('O nome da aba é obrigatório');
  }
}

FloatTab.prototype = {
  tabPrefix: 'floatTab_',
  id: null,
  getTabElement: function () {
    return $('#' + this.id);
  },
  setId: function (id) {
    this.id = this.tabPrefix + id;
  },
  getId: function () {
    return this.id;
  },
  hideNotifications: function () {
    this.getTabElement().find('.tabTitle .notifications').hide();
    this.getTabElement().find('.tabTitle').stopFlash();
    this.getTabElement().find('.tabTitle .notifications').html('0');
  },
  setClasses: function(arr_classes) {
    for(_class in arr_classes) {
      this.getTabElement().addClass(arr_classes[_class]);
    }
  },
  showNotifications: function () {
    if (this.getNotifications() > 0) {
      this.getTabElement().find('.tabTitle .notifications').show();
    }
  },
  setNotifications: function (val) {
    var notificationElement = this.getTabElement().find('.tabTitle .notifications');
    var parentContent = this.getTabElement().find('.tabContent');

    if (val > 0) {
      if (val > 99) {
        val = '99+';
      }

      notificationElement.html(val);

      if (parentContent.is(':hidden')) {
        notificationElement.show();

        this.getTabElement().find('.tabTitle').flash(1500);
      }
    } else {
      this.hideNotifications();
    }
  },
  getNotifications: function () {
    var notificationElement = this.getTabElement().find('.tabTitle .notifications');
    var notifications = parseInt(notificationElement.html());

    return notifications;
  },
  setContent: function (content) {
    this.getTabElement().find('.tabContent').html(content);
  },
  applyDefaultEvents: function () {
    this.getTabElement().click(function () {
      FloatTabs.adjustTabs();
    });
  },
  applyEvent: function (event, element, callback) {
    if (!element) {
      this.getTabElement().live(event, callback);
    } else {
      var element_to_apply_event = this.getTabElement().find(element);
      element_to_apply_event.livequery(function() {$(this).on(event, callback)});
    }
  },
  destroy: function() {
    this.getTabElement().remove();
  }
}