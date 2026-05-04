const initLoadingPhrases = function() {
  var phrasesContainer = document.getElementById('phrases');
  if (!phrasesContainer || phrasesContainer.dataset.ready) {
    return;
  }

  var checkmarkIdPrefix = 'loadingCheckSVG-';
  var checkmarkCircleIdPrefix = 'loadingCheckCircleSVG-';
  var verticalSpacing = 50;
  var phrases = [
    'Booting XYK Lab',
    'Loading CSAPP notes',
    'Indexing memory',
    'Warming up cache',
    'Linking symbols',
    'Tracing stack frames',
    'Parsing markdown',
    'Rendering thoughts',
    'Compiling stories',
    'Syncing archives',
    'Preparing sidebar',
    'Launching blog'
  ];

  function createSVG(tag, properties, optChildren) {
    var newElement = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(properties).forEach(function(prop) {
      newElement.setAttribute(prop, properties[prop]);
    });
    if (optChildren) {
      optChildren.forEach(function(child) {
        newElement.appendChild(child);
      });
    }
    return newElement;
  }

  function createPhraseSvg(phrase, yOffset) {
    var text = createSVG('text', {
      class: 'loading-phrase-text',
      x: 50,
      y: yOffset
    });
    text.appendChild(document.createTextNode(phrase + '...'));
    return text;
  }

  function createCheckSvg(yOffset, index) {
    var circle = createSVG('circle', {
      id: checkmarkCircleIdPrefix + index,
      class: 'loading-check-circle',
      cx: 16,
      cy: 16,
      r: 15
    });
    var check = createSVG('polygon', {
      id: checkmarkIdPrefix + index,
      class: 'loading-check-mark',
      points: '21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708'
    });
    var circleOutline = createSVG('path', {
      class: 'loading-check-outline',
      d: 'M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z'
    });
    return createSVG('g', {
      transform: 'translate(10 ' + (yOffset - 20) + ') scale(.9)'
    }, [circle, check, circleOutline]);
  }

  function easeInOut(time) {
    var period = 200;
    return (Math.sin(time / period + 100) + 1) / 2;
  }

  phrases.forEach(function(phrase, index) {
    var yOffset = 30 + verticalSpacing * index;
    phrasesContainer.appendChild(createPhraseSvg(phrase, yOffset));
    phrasesContainer.appendChild(createCheckSvg(yOffset, index));
  });

  var startTime = Date.now();
  var currentY = 0;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var checks = phrases.map(function(_, index) {
    return {
      check: document.getElementById(checkmarkIdPrefix + index),
      circle: document.getElementById(checkmarkCircleIdPrefix + index)
    };
  });

  phrasesContainer.dataset.ready = 'true';

  if (reducedMotion) {
    return;
  }

  function animateLoading() {
    var now = Date.now();
    phrasesContainer.setAttribute('transform', 'translate(0 ' + currentY + ')');
    currentY -= 1.35 * easeInOut(now);

    checks.forEach(function(item, index) {
      var boundary = -index * verticalSpacing + verticalSpacing + 15;
      if (currentY < boundary) {
        var alpha = Math.max(Math.min(1 - (currentY - boundary + 15) / 30, 1), 0);
        var checkColor = [
          Math.round(255 * (1 - alpha) + 120 * alpha),
          Math.round(255 * (1 - alpha) + 154 * alpha)
        ];
        item.circle.setAttribute('fill', 'rgba(255, 255, 255, ' + alpha + ')');
        item.check.setAttribute('fill', 'rgba(255, ' + checkColor[0] + ', ' + checkColor[1] + ', 1)');
      }
    });

    if (now - startTime < 30000 && currentY > -verticalSpacing * (phrases.length - 2)) {
      requestAnimationFrame(animateLoading);
    }
  }

  requestAnimationFrame(animateLoading);
};
