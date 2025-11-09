window.onload = function() {
  var here = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('nav a');

  for (var i = 0; i < links.length; i++) {
    var target = links[i].getAttribute('href');
    if (here === target) {
      links[i].classList.add('active');
    }
  }
};