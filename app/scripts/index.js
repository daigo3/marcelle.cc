import m from 'mithril';

const home = {
  controller: function() {
  },
  view: function() {
    return m("div", 'hello');
  }
};

const contact = {
  controller: function() {
  },
  view: function() {
    return m("div", 'contact');
  }
};

m.route.mode = 'hash';
m.route(document.body, '/', {
  '/': home,
  '/contact': contact
});
