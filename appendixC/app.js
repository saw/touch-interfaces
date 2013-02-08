(function(){
	

	
	var homeTemplate = Handlebars.compile(document.getElementById('t-home').innerHTML);
	var quizTemplate = Handlebars.compile(document.getElementById('t-quiz').innerHTML);

	router.addRoute(/\/index\.html/, homePage, homePage);
	router.addRoute(/\/quiz\.html/, quizPage, quizPage);
	
	var homeView = null;
	var quizView = null;
	
	var scoreBoard = new Model({
		headline: 'Welcome to the Bird Quiz!'
	});
	
	scoreBoard.load = function(){
		
		var score = parseInt(localStorage.getItem('score'), 10);
		var total = parseInt(localStorage.getItem('total'), 10);
		
		if(score){
			this.set('score', score);
		}
		
		if(total) {
			this.set('total', total);
		}
		
		//nothing listens to this at the moment, 
		//but I think it is always good to have an event
		//for all interesting momements, and load is a very interesting 
		//moment
		this.fire('load');
		
	};
	
	//reset the values locally and in localStorage
	scoreBoard.reset = function() {
		
		this.setData({
			score: null,
			total: null
		});

		localStorage.removeItem('score');
		localStorage.removeItem('total');
	}
	
	//If increment is negative that's a wrong answer
	scoreBoard.incScore = function(inc) {
		var score = this.get('score');
		var total = this.get('total');


		if(!score) {
			score = 0;
		}
		
		if(!total) {
			total = 0;
		}
		
		total += Math.abs(inc);
		score += inc;
		
		if(score < 0) {
			score = 0;
		}
		this.setData({
			score: score,
			total: total
		});

		this.save();
		
	}
	
	scoreBoard.save = function(){
		var score = this.get('score');
		var total = this.get('total');
		
		
		localStorage.setItem('score', score);
		localStorage.setItem('total', total);
	}
	
	scoreBoard.load();

	

	var quizModel = new Model({
		headline: 'Quiz',
		birds: []
	});
	
	quizModel.scoreBoard = scoreBoard;
	
	quizModel.load = function() {
		ajax.makeRequest('birds.json', function(xhr){
			var data = JSON.parse(xhr.responseText);
			this.set('birds', data);
			this.fire('load');
		}, this);
	}
	
	quizModel.checkAnswer = function(id) {
		
		var score = this.scoreBoard.get('score');
		if(id === this.get('question').id) {
			this.scoreBoard.incScore(1);
			return true;
		}else {
			this.scoreBoard.incScore(-1);
		}
		
		return false;
	};
	
	quizModel.getRandomBird = function() {
		
		var birds = this.get('birds'),
		    len = birds.length,
			index = Math.floor(Math.random() * len);
		
		//this is to clone the object
		//so that modifications don't show up
		//on the next question
		function Bird(){};
		Bird.prototype = birds[index];
		return new Bird();
		
	};
	
	quizModel.setUpQuestion = function() {
		
		var that, thisBird, list, wrong1, wrong2;

		that = this;
		thisBird = this.getRandomBird();
		wrong1 = this.getRandomBird();
		wrong2 = this.getRandomBird();
		
		//make sure both wrong answers are not the same
		while (wrong1.id === wrong2.id) {
			wrong2 = this.getRandomBird();
		}
		
		
		var list = [wrong1, wrong2, thisBird];
		
		list.sort(function(){
			return (Math.round(Math.random())-0.5);
		});
		
		birdData.fetchPhotos(thisBird.latin, function(photo){
			console.log(photo);
			that.set('question', {
				image: photo[Math.round(Math.random() * photo.length)],
				name: thisBird.name,
				latin: thisBird.latin,
				id: thisBird.id,
				wrong : list
			})
		})
	}
	
	quizModel.load();
	
	
	//the scoreboard view is on every page
	var scoreBoardView = new View({
		model: scoreBoard,
		container: 'header.hd',
		init: function() {
			var that = this;
			this.model.on('change', function(){
				that.render();
			});
		}
	});
	
	scoreBoardView.render = function() {
		//only bind events, no need for anything else
		var c = this.getContainer();
		
		var score = this.model.get('score');
		var total = this.model.get('total');
		
		var scoreEl = document.getElementById('score');
		var totalEl = document.getElementById('total')
		
		scoreEl.innerHTML = score ? score : 0;
		totalEl.innerHTML = total ? total : 0;
		
	}
	
	scoreBoardView.render();
	
	/* --- Quiz Page Route and View -- */
	function quizPage(path){
		
		
		if(homeView) {
			homeView.hide();
		}
		
		if(quizView) {
			quizView.show();
			return;
		}
		
		quizView = new View({
			template: quizTemplate,

			container: '#quiz',

			model: quizModel,

			events: {
				'.submit' : {
					
					click: function(e) {
						var answer, answers, question, list, i, len;
				
						question = this.model.get('question');
						
						//gather all the radio buttons to see which one is 
						answers = document.querySelectorAll('.answer input');
						for (i=0, len = answers.length; i < len; i++) {
							
							if(answers[i].checked) {
								answer = answers[i];
							}
							
						}
						
						list = question.wrong;
						
						// update model to identify the right answer 
						// and the answer chosen by the user
						if(this.model.checkAnswer(answer.value)) {
							
							question.rightAnswer = true;
							for (var i=0, len = list.length; i < len; i++) {
								if(list[i].id == answer.value) {
									list[i].right = true;
								}
							}
							
						} else{
							
							question.wrongAnswer = true;
							
							for (var i=0, len = list.length; i < len; i++) {
								if(list[i].id == answer.value) {
									list[i].wrong = true;
								} 
								
								if(list[i].id == question.id) {
									list[i].right = true;
								}
							}
						}
						
						question.answered = true;
						
						this.render();

					}
				},
				
				'.next' : {
					click: function(e) {
						this.containerNode.innerHTML = 
								'<div class="loading spinner"></div>';
						this.model.setUpQuestion();
					}
					
				},
				
				'.answers input' : {
					change: function(e) {
						var b = this.containerNode.querySelector('.button');
						b.className = b.className.replace('hidden', '');
						b.scrollIntoView(false);
					}
				}
			},

			init: function() {

				var that = this;
				
				this.model.on('change', function(){

					that.render();
				});
				
				// this.model.load();

			}

		});
		
		quizView.render();
		quizView.show();
		
		
	}
	/* --- end Quiz Page Route and View -- */
	
	/* -- home page -- */
	
	function homePage(path){
		
		if(quizView) {
			quizView.hide();
		}

		if(homeView) {
			homeView.show();
			return;
		}
		
		
		homeView = new View({
			template: homeTemplate,

			container: '#home',

			model: scoreBoard,

			events: {
				'#go' : {
					click: function(e) {
						e.preventDefault();
						router.handleRoute('/quiz.html');
					}
				},
				
				'#reset' : {
					click: function(e) {
						e.preventDefault();
						this.model.reset();
					}
				}
			},

			init: function() {

				var that = this;

				this.model.on('change', function(){
					that.render();
				});

			}

		});

		homeView.render();
		homeView.show();
	}
	
	window.setTimeout(function(){
		window.scrollTo(1,0);
	},100)
	
	
})();