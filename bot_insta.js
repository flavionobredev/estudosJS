
/* observer configs */
var target = document.getElementsByTagName('article')[0].parentElement
var observer = new MutationObserver( handleMutationObserver );
var config = { childList: true };

/* articles */
var articles = []

/* scroll interval status */
var scrollInterval

/* times to stop */
var times = 25

/* count liked posts */
var count = 0

/* count posts viewed */
var viewedPosts = 0

/* liked comments total */
var likeAllCount = 0;

  
/**
* obsever's callback
*/
function handleMutationObserver(mutations){
//   mutations.forEach(function(mutation) {
//     console.log( mutation.type );
//   });
  scroll('stop')
  attArticles()
  like(articles)
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
	console.log('atualizei os articles')
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
	return new Promise(resolve => setTimeout(resolve, ms));
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
var like = (articles) => {
	if(count>=times){
		return finish()
	}
	var posts = Array.from(articles) 
	posts.forEach(async post => await new Promise(resolve => {
		// console.log('posts analisados >>> ', viewedPosts++ )
		
		var buttons = post.querySelectorAll('svg')
		var buttonsArray = Array.from(buttons)
		var findDeslikeButton = buttonsArray.find(button => button.getAttribute('aria-label')==="Descurtir") 
		var findLikeButton = buttonsArray.find(button => button.getAttribute('aria-label')==="Curtir")
		if(!findDeslikeButton && findLikeButton){
			// console.log(post)
			// console.log(findLikeButton)
			let ms = generateTime(3000, 6000)
			// // console.log('Publicação encontrada.')
			eventFire(findLikeButton, 'click')
			// // console.log('Publicação curtida.')
			count++
			console.debug('posts curtidos >>>> ', count )
			// // console.warn('Tempo para a próxima curtida: ' + ms + 'ms')
			// resolve(sleep(ms))		
		}
	}), Promise.resolve())
	scroll('start')
}


var likeAll = () => {
	var buttons = document.querySelectorAll('svg')
	var buttonsArray = Array.from(buttons)
	var likeButtonsArray = buttonsArray.filter(button => button.getAttribute('aria-label')==="Curtir")
	console.log("tamanho >>>>> ", likeButtonsArray.length)
	// var doNextPromise = (index) => {
	// 	const time = generateTime(3000, 5000)
	// 	console.log(index)
	// 	sleep(time).then(()=>{
	// 		console.log(likeButtonsArray[index])
	// 		index++
	// 		if(index < likeButtonsArray.length)
	// 			doNextPromise(index)
	// 		return console.log('finish')
	// 	})
	// }

	const doNextPromise = (index) => {
		sleep(generateTime(2000, 5000))
		  .then(() => {
			console.debug('[all-comments] curtindo comentário ', index);
			eventFire(likeButtonsArray[index], 'click')
			index++;
			likeAllCount++;
			if (index < likeButtonsArray.length){
				doNextPromise(index)
			}
			else{
				console.debug("[all-comments] finalizado.");
				console.debug('[all-comments] comentários curtidos hoje >>>>', likeAllCount )
			}
		  })
	  }
	console.debug(`[all-comments] ${likeButtonsArray.length} comentários para curtir. Iniciando...`)
	doNextPromise(0)
}

// var like = async () => {
// 	if(count>=times){
// 		return finish()
// 	}
// 	this.attArticles()
// 	articles.reduce( (p, _, i) => 
// 	    p.then(_ => new Promise(resolve =>
// 	        setTimeout(function () {
// 	            console.log(i);
// 	            resolve();
// 	        }, generateTime(2000))
// 	    ))
// 	, Promise.resolve() );
// 	scroll('start')
// }