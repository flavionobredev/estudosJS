
/* observer configs */
var target = document.getElementsByTagName('article')[0].parentElement
var observer = new MutationObserver( handleMutationObserver );
var config = { childList: true };

/* articles */
var articles

/* scroll interval status */
var scrollInterval

/* times to stop */
var times = 25

/* count liked posts */
var count = 0

  
/**
* obsever's callback
*/
function handleMutationObserver(mutations){
  mutations.forEach(function(mutation) {
    console.log( mutation.type );
  });
  scroll('stop')
  like()
}

/**
 * Init bot function
 */
var init = () => {
	console.warn('[BOT INSTA] O bot iniciou :)\n\n')
	observer.observe( target, config );
	attArticles()
	scroll('start')
}

/**
 * Finish bot function
 */
var finish = () => {
	observer.disconnect();
	scroll('stop');
	count = 0;
	console.warn('\n\n[BOT INSTA] O bot encerrou.')
}

/**
 * Update current articles
 */
var attArticles = () => {
	articles = document.querySelectorAll('article')
}


/**
 * Scroll manager
 * @param {String} flag string that decides whether to stop or continue
 */
var scroll = (flag) => {
	if(flag==='start' && !scrollInterval){
		console.warn('Rolagem automática iniciada.')
		scrollInterval = window.setInterval(() => {
			window.scrollBy({
			  top: 600,
			  behavior: 'smooth'
			});
		}, generateTime(2000, 4000))
	} else {	
		console.warn('Rolagem automática pausada.')
	    clearInterval(scrollInterval)
	    scrollInterval = 0
	}
}


/* helpers */

/**
 * generate a random time
 * @param {Number} min start time 
 * @param {Number} max end time
 * @returns 
 */
var generateTime = (min, max) => Math.floor(Math.random() * (max - min)) + min

/**
 * sleep for a x milliseconds
 * @param {Number} ms time to sleep
 */
var sleep = function(ms){
	return new Promise(async (resolve) => await setTimeout(resolve, ms));
}

/**
 * fire an event
 * @param {Element} el element to add listener
 * @param {String} etype event type for add
 */
var eventFire = function(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

/**
 * Main function
 */
var like = async () => {
	if(count>=times){
		return finish()
	}
	this.attArticles()
	await articles.forEach( async (article) => {
		var button = article.querySelectorAll('svg')[1]
	    var buttonStatus = button.getAttribute('aria-label')
	    if(buttonStatus === 'Curtir') {
	    	let ms = generateTime(3000, 6000)
	    	console.warn('Publicação para curtir encontrada. Tempo para curtir: ' + ms + 'ms')
	    	console.log('Preparando-se para curtir...')
	    	await sleep(ms)
	    	eventFire(button, 'click')
	    	count++
	    	console.log('Publicação curtida.')
	    }
	})
	scroll('start')
}