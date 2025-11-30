window.addEventListener('DOMContentLoaded', function () {

  //nav bar active link highlighting
  var here = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('nav a');

  for (var i = 0; i < links.length; i++) {
    var target = links[i].getAttribute('href');
    if (here === target) {
      links[i].classList.add('active');
    }
  }

  //contact page interactivibility
  var contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    return;
  }

  //fields
  var nameField = document.getElementById('name');
  var emailField = document.getElementById('email');
  var topicSelect = document.getElementById('topic');
  var messageField = document.getElementById('message');
  var topicHelp = document.getElementById('topic-help');
  var messageCounter = document.getElementById('message-counter');
  var statusBox = document.getElementById('form-status');

  //char limit
  var MAX_MESSAGE = 1000;

  //error
  function setError(id, message) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = message || '';
    }
  }

  //error clearing
  function clearErrors() {
    setError('name-error', '');
    setError('email-error', '');
    setError('message-error', '');
    statusBox.textContent = '';
    statusBox.classList.remove('is-success', 'is-error');
  }

  //valid check
  function isValidEmail(value) {
    var emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailPattern.test(value);
  }

  // live character counter
  function updateCounter() {
    var length = messageField.value.length;
    messageCounter.textContent = length + ' / ' + MAX_MESSAGE + ' characters';

    messageCounter.classList.remove('is-warning', 'is-over');
    if (length > MAX_MESSAGE) {
      messageCounter.classList.add('is-over');
    } else if (length > MAX_MESSAGE * 0.8) {
      messageCounter.classList.add('is-warning');
    }
  }

  messageField.addEventListener('input', updateCounter);
  updateCounter();

  //change 
  topicSelect.addEventListener('change', function () {
    var value = topicSelect.value;
    var text = '';

    if (value === 'collaboration') {
      text =
        'Please share a brief summary of your project, your institution, and any timelines or funding details.';
    } else if (value === 'research') {
      text =
        'Tell me what aspect of my research you are interested in and any specific questions you have.';
    } else if (value === 'media') {
      text =
        'Add your organization, audience, and preferred dates for interviews or talks.';
    } else if (value === 'other') {
      text = 'Share as much detail as you can so I can respond effectively.';
    }

    topicHelp.textContent = text;
  });

  //submit
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors();

    var isValid = true;

    var nameValue = nameField.value.trim();
    if (!nameValue) {
      setError('name-error', 'Please enter your name.');
      isValid = false;
    }

    var emailValue = emailField.value.trim();
    if (!emailValue) {
      setError('email-error', 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      setError('email-error', 'Please enter a valid email address (example@email.com).');
      isValid = false;
    }

    var messageValue = messageField.value.trim();
    if (!messageValue) {
      setError('message-error', 'Please include a short message.');
      isValid = false;
    } else if (messageValue.length > MAX_MESSAGE) {
      setError('message-error', 'Please shorten your message to ' + MAX_MESSAGE + ' characters or fewer.');
      isValid = false;
    }

    if (!isValid) {
      statusBox.textContent = 'Please fix the fields highlighted above and try again.';
      statusBox.classList.add('is-error');
      return;
    }

    //success message
    statusBox.textContent = 'Thank you, ' + nameValue + '! Your message has been recorded. I will follow up at ' + emailValue + ' as soon as possible.';
    statusBox.classList.add('is-success');

    contactForm.reset();
    updateCounter();
    topicHelp.textContent = '';
  });
});