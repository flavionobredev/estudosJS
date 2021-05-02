
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
 * @param {NodeList} articles articles to verify and like
 */
var like = (articles) => {

	/* verifica se o maximo de curtidas ja foi excedido */
	if(count>=times){
		return finish()
	}
	var posts = Array.from(articles)

	/**
	 * executa de forma sequencial as promises de sleep
	 * @param {Number} index 
	 */
	const doNextPromise = (index) => {
		/* processo para encontrar os botoes de descurtir e curtir */
		var buttons = posts[index].querySelectorAll('svg')
		var buttonsArray = Array.from(buttons)
		var findDeslikeButton = buttonsArray.find(button => button.getAttribute('aria-label')==="Descurtir") 
		var findLikeButton = buttonsArray.find(button => button.getAttribute('aria-label')==="Curtir")


		
		/* verifica se não existe uma publicação já curtida e se há botão de like  */
		if (!findDeslikeButton && findLikeButton){
			/* busca saber de quem é a postagem */
			var usernameContent = posts[index].querySelector("[data-testid=post-comment-root]") 
			var postBy = usernameContent ? usernameContent.querySelector('a').getAttribute('title') : "sem nome de usuário."
			console.debug('[like-post] curtindo a publicação de ', postBy);
			eventFire(findLikeButton, 'click')
			count++

			sleep(generateTime(1000, 5000))
			.then(() => {
				
	
				/* incrementa o index */
				index++;
	
				if (index < posts.length){
					doNextPromise(index)
				}
				else{
					console.debug("[like-post] finalizado.");
					console.debug('[like-post] posts curtidos hoje >>>>', count )
					scroll('start')
				}
			})
		} else {

			/* incrementa o index */
			index++;
	
			if (index < posts.length){
				doNextPromise(index)
			}
			else{
				console.debug("[like-post] finalizado.");
				console.debug('[like-post] posts curtidos hoje >>>>', count )
				scroll('start')
			}
		}
	  }
	  
	console.debug(`[like-post] ${posts.length} posts encontrados. Iniciando...`)

	/* inicia funcao recursiva para curtidas */
	doNextPromise(0)
}

/**
 * Method: like this firsts comments in the post
 */
var likeAll = () => {
	var buttons = document.querySelectorAll('svg')
	var buttonsArray = Array.from(buttons)
	var likeButtonsArray = buttonsArray.filter(button => button.getAttribute('aria-label')==="Curtir")
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


/**
 * Method: like a random post in the profile
 */
var profileLike = () => {
	var posts = document.querySelectorAll('article')[0].querySelectorAll('img')
	var randomPost = Math.floor(Math.random()*posts.length)
	eventFire(posts[randomPost], 'click')
	
	/* fica em um interval até que o post seja carregado na tela */
	var interval = setInterval(()=> {
		var deslikeButton = document.querySelector('svg[aria-label=Descurtir]')
		if(!deslikeButton){
			var likeButton = document.querySelector('svg[aria-label=Curtir]')
			if(likeButton){
				eventFire(likeButton, 'click')
				clearInterval(interval)
			}
		}
	}, 500)
}