$(document).ready(function() {
  FloatTabs.tabsManager = new FloatTab('tabs_manager', 'Abas Agrupadas', 150);
  FloatTabs.tabsManager.hide();
});

var FloatTabs = {
  tabsManager: null,
  tabs: [],
  tabPrefix: 'floatTab_',
  lastTriggeredWidth: 0,
  adjustTabs: function () {
    var nextRight = 0;
    var windowSize = $(window).width();
    var elementsWidth = 0;

    for(tab in this.tabs) {
      var element = this.tabs[tab].getTabElement();

      if(element.size() > 0) {
        if(this.tabsManager == null || (this.tabsManager !== null && !element[0].isEqualNode(this.tabsManager.getTabElement()[0]))) {
          if(element.is(':visible')) {
            this.tabs[tab].width = element.find('.tabContent').width();
          }

          elementsWidth += this.tabs[tab].width + 15;
        }

        if(element.is(':visible')) {
          element.css('right', nextRight);
          nextRight += parseInt(element.css('width')) + 15;

          if(parseInt(element.offset().top) < 0) {
            element.find('.tabContent').css('height', (parseInt(element.css('height')) + parseInt(element.offset().top)) - parseInt(element.find('.tabTitle').css('height')));
            element.find('.tabContent').css('overflow-y', 'auto');
            element.find('.tabContent').css('overflow-x', 'hidden');
          } else {
            element.find('.tabContent').css('height', 'auto');
            element.find('.tabContent').css('overflow-y', 'hidden');
            element.find('.tabContent').css('overflow-x', 'hidden');
          }
        }
      }
    }



    if($('.floatTab').filter(':visible:last').size() > 0) {
      elementsWidth += parseInt($('.floatTabs').css('margin-right'));
      console.log($('.floatTab').filter(':visible:first').offset().left, elementsWidth);
    }

    if(this.tabsManager !== null) {
      if ($('.floatTab').last().offset().left < 0) {
        if(this.tabsManager.getTabElement().is(':hidden')) {
          this.lastTriggeredWidth = elementsWidth;
          this.enableTabsManager();
        }
      } else if(this.lastTriggeredWidth < elementsWidth) {
        if(this.tabsManager.getTabElement().is(':visible')) {
          this.disableTabsManager();
        }
      }
    }
  },
  enableTabsManager: function () {
    var tabBody = '';

    for(tab in this.tabs) {
      var element = this.tabs[tab].getTabElement();

      if(element.size() > 0) {
        if(!element[0].isEqualNode($('#floatTab_tabs_manager')[0])) {
          tabBody += this.tabs[tab].getName()+'<br />';
//          element.find('.tabContent').hide();
          element.hide();
        }
      }
    }

    this.tabsManager.setContent(tabBody);
    this.tabsManager.show();
  },
  disableTabsManager: function() {
    for(tab in this.tabs) {
      var element = this.tabs[tab].getTabElement();

      if(element.size() > 0) {
        if(!element[0].isEqualNode($('#floatTab_tabs_manager')[0])) {
          element.show();
        }
      }
    }

    this.tabsManager.hide();
  },
  findTab: function(tabName) {
    var findEle = $('#'+ FloatTabs.tabPrefix + tabName);

    if(findEle.size() > 0) {
      return findEle;
    } else {
      return false;
    }
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

    FloatTabs.tabs[tabName] = this;

    this.applyDefaultEvents();
    FloatTabs.adjustTabs();
  } else {
    console.log('O nome da aba é obrigatório');
  }
}

FloatTab.prototype = {
  id: null,
  name: null,
  width: 0,
  height: 0,
  getTabElement: function () {
    return $('#' + this.id);
  },
  setId: function (name) {
    this.name = name;
    this.id = FloatTabs.tabPrefix + name;
  },
  getId: function () {
    return this.id;
  },
  setName: function(newName) {
    this.name = newName;
  },
  getName: function() {
    return this.name;
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
    delete FloatTabs.tabs[this.getName()];
  },
  hide: function() {
    this.getTabElement().hide();
    FloatTabs.adjustTabs();
  },
  show: function() {
    this.getTabElement().show();
    FloatTabs.adjustTabs();
  }
}