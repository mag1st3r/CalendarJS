	let Calendar = function(model, option, date) {

		this.Option = {
			Color: '',
			NavShow: true,
			SearchUse: true,
			NavLocation: '',
			DateTimeShow: true,
			DateTimeFormat: 'mmm, yyyy',
			DateTimeLocation: '',
			EventClick: '',
			EventTargetWholeDay: false,
			DisabledDays: [],
			ModelChange: model
		};

		model?this.Model=model:this.Model={};

		this.Today = new Date();
		this.Selected = this.Today;
		this.Today.Month = this.Today.getMonth();
		this.Today.Year = this.Today.getFullYear();

		if (date) {this.Selected =  date}

		this.Selected.Month = this.Selected.getMonth();
		this.Selected.Year = this.Selected.getFullYear();

		this.Selected.Days = new Date(this.Selected.Year,(this.Selected.Month + 1), 0 ).getDate();
		this.Selected.FirstDay = new Date(this.Selected.Year,(this.Selected.Month), 1 - 1).getDay();
		this.Selected.LastDay = new Date(this.Selected.Year,(this.Selected.Month + 1), 0 - 1).getDay();

		this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1	), 1);

		if (this.Selected.Month == 0) {
			this.Prev = this.Prev = new Date(this.Selected.Year - 1, 11, 1);
		}
		this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
	}

	function createCalendar(calendar, element, adjuster) {
	  if (typeof adjuster !== 'undefined') {
			let newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1 );
			calendar = new Calendar(calendar.Model, calendar.Option, newDate);
			element.innerHTML = '';

		} else {
		  for (let key in calendar.Option) {
		    typeof calendar.Option[key] != 'function' && typeof calendar.Option[key] != 'object' && calendar.Option[key] ? element.className += " " + key + "-" + calendar.Option[key]:0;
			}
		}
		
		const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

		const mainSection = document.createElement('div');
		mainSection.className += 'cld-main';

		element.appendChild(mainSection);
		
		function addDateTime() {
		  let dateTime = document.createElement('div');
		  dateTime.className += 'cld-datetime';

		  if (calendar.Option.NavShow) {
		  	let rwd = document.createElement('div');
		    rwd.className += " cld-rwd cld-nav";
		    rwd.addEventListener('click', function() {createCalendar(calendar, element, -1);} );
		 	  rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>'; 
		 	  dateTime.appendChild(rwd);
		  }

		  if (calendar.Option.NavShow) {
		  	var fwd = document.createElement('div');
        fwd.className += " cld-fwd cld-nav";
        fwd.addEventListener('click', function(){createCalendar(calendar, element, 1);} );
        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        dateTime.appendChild(fwd);
      }

      mainSection.appendChild(dateTime);

		  let today = document.createElement('div');
		  today.className += 'today';
		  today.innerHTML = months[calendar.Selected.Month] + "," + calendar.Selected.Year;
		  dateTime.appendChild(today);

		}

		let labelCalc = 0;

		function AddDays() {
			if (searchButton) {
				//createSearchEvents
				let days = document.createElement('div');
		  	days.className += 'cld-days';
		  	const main = document.getElementsByClassName('cld-main')[0];

		  	for (let i = 0; i < findIndex.length; i++) {
		  		let day = document.createElement('div');
		  	  day.className += 'cld-day currentMonth';
		  	  let date = document.createElement('div')
		  	  date.className = 'eventDate';

		  	  const month = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
		  	  let str = events[findIndex[i]].date1;
		  	  let stringDate = str[0]+ " " + month[str[1]- 1] + " "+ str[2] + " Года";
		  	  date.innerText = stringDate;

		  	  day.appendChild(date);
		  	  const note = document.createElement('div');

				 	const h6 = document.createElement('h6');

				 	note.className = 'note';
				 	h6.className = 'nameEvent';
				 	h6.innerText = events[findIndex[i]].nameEvent;
				 	note.appendChild(h6);

				 	const pEvent = document.createElement('p');
				 	pEvent.className = 'timeEvent';
				 	pEvent.innerText = events[findIndex[i]].timeEvent;
				 	note.appendChild(pEvent);

				 	const pTarget = document.createElement('p');
				 	pTarget.className = 'targetEvent';
				 	pTarget.innerText = events[findIndex[i]].targetEvent;
				 	note.appendChild(pTarget);

				 	const pDiscr = document.createElement('p');
				 	pDiscr.className = 'discription';
				 	pDiscr.innerText = events[findIndex[i]].discription;
				 	note.appendChild(pDiscr);
				 	day.appendChild(note);
				 	days.appendChild(day);
		  	}

		  	main.appendChild(days);
		  	searchButton = false;
		  	findIndex = [];

			} else {

		  function DayNumber(n) {
		  	let labelList = ["Понидельник, ", "Вторник, ", "Среда, ", "Четверг, ", "Пятница, ", "Субота, ", "Воскресенье, "];
		    let number = document.createElement('div');
		    if (labelCalc < 7) {
		    	number.className = 'cld-number';
		      number.innerHTML += labelList[labelCalc] + " " + n ;
		      labelCalc++;
		    } else {
		    	number.className = 'cld-number';
		      number.innerHTML += n;
		    }
		    return number;
		  }

		  let days = document.createElement('div');
		  days.className += 'cld-days';
      //prev Month
		  for (let i = 0; i < (calendar.Selected.FirstDay); i++) {
		  	let day = document.createElement('div');
		  	day.className += 'cld-day prevMonth';
		  	day.addEventListener('click', function(){ 
		  	const activeElement = document.getElementsByClassName('active');

		  	if(activeElement.length > 0 && !(day == activeElement[0]) ) {
		  	  activeElement[0].classList.remove('active');
		  	}
		  		day.classList.add("active");
		  	} );
      //disabled Days
		  	let d = i%7;
		  	for(let q = 0; q < calendar.Option.DisabledDays.length; q++){
		  		if(d==calendar.Option.DisabledDays[q]){
		  			day.className += " disableDay";
		  		}
		  	}

		  	let number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
	      day.appendChild(number);

	      days.appendChild(day);
	    }
		  	//Current Month
		  	for (let i = 0; i < calendar.Selected.Days; i++) {
		  		let day = document.createElement('div');
		  		day.className += "cld-day currentMonth";
		  		day.addEventListener('click', function(){ 
		  	const activeElement = document.getElementsByClassName('active');

		  	if (activeElement.length > 0) {
		  	  activeElement[0].classList.remove('active');
		  	}
		  		day.classList.toggle("active")
		  	} );
		  		//Disabled
		  		let d = (i + calendar.Selected.FirstDay)%7;
		  		for(let q = 0; q < calendar.Option.DisabledDays.length; q++){

		  			if (d==calendar.Option.DisabledDays[q]) {
		  				day.className += " disableDay";
		  			}
		  		}
		  		const number = DayNumber(i + 1);
		  		day.appendChild(number);

		  		for (let n = 0; n < calendar.Model.length; n++) {
		  			let evDate = calendar.Model[n].Date;
		  			let toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));

		        if (evDate.getTime() == toDate.getTime()) {
		        	const eventsValue = calendar.Model[n];
		        	const note = document.createElement('div');
						 	const h6 = document.createElement('h6');

						 	note.className = 'note';
						 	h6.className = 'nameEvent';
						 	h6.innerText = eventsValue.nameEvent;
						 	note.appendChild(h6);

						 	const pEvent = document.createElement('p');
						 	pEvent.className = 'timeEvent';
						 	pEvent.innerText = eventsValue.timeEvent;
						 	note.appendChild(pEvent);

						 	const pTarget = document.createElement('p');
						 	pTarget.className = 'targetEvent';
						 	pTarget.innerText = eventsValue.targetEvent;
						 	note.appendChild(pTarget);

						 	const pDiscr = document.createElement('p');
						 	pDiscr.className = 'discription';
						 	pDiscr.innerText = eventsValue.discription;
						 	note.appendChild(pDiscr);
						 	day.appendChild(note);
						        	//console.log('Поймал');
				  		}
				  	}
		  	
      // If Today..
      if ((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year) {
        day.className += " today";
      }
      days.appendChild(day);
		 }
      //Next Month days
		  let extraDays = 13;
		  if(days.children.length>35){
		  	extraDays = 6;
		  } else if (days.children.length < 29) {
		  	extraDays = 20;
		  }
		  for (let i = 0; i < (extraDays - calendar.Selected.LastDay); i++) {
		  	let day = document.createElement('div');
		  	day.className += 'cld-day nextMonth';
        day.addEventListener('click', function(){ 
		  	const activeElement = document.getElementsByClassName('active');
		  	if (activeElement.length > 0) {
		  	  activeElement[0].classList.remove('active');
		  	}
		  		day.classList.toggle("active")
		  	} );

		  	let d = (i + calendar.Selected.LastDay +1)%7;
		  	for (let q = 0; q < calendar.Option.DisabledDays.length; q++) {
		  		if (d==calendar.Option.DisabledDays[q]) {
		  			day.className += " disableDay";
		  		}
		  	}

          const number = DayNumber(i + 1);
          day.appendChild(number);
          days.appendChild(day);

		  }

		  mainSection.appendChild(days);

		 }
		}

		
		if (calendar.Option.DateTimeShow) {
			addDateTime();
		}

		AddDays();

	}

	function calendar(el, data, settings) {
		let obj = new Calendar(data, settings);
		createCalendar(obj, el);

	}

	function createEventForm(element) {
		const poppap = document.createElement('div');
		poppap.className = 'poppap';

		const form = document.createElement('form');
		form.className = 'addEventForm' ;

		const close = document.createElement('div');
		close.className = 'btn-close';
		form.appendChild(close);
		close.addEventListener('click', removeForm);
		const  placeholder = ['Событие', 'Время', 'Имена участников', 'Описание' ];

		for (let i = 0; i < 6; i++) {
			if (i < 3) {
        const p = document.createElement('p');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = '';
        input.placeholder = placeholder[i];

        p.appendChild(input);
        form.appendChild(p);
			}

			if (i == 3) {
				const p = document.createElement('p');
				const textarea = document.createElement('textarea');
				textarea.name = 'text';
				textarea.placeholder = placeholder[i];
				textarea.rows = '10';

				p.appendChild(textarea);
        form.appendChild(p);

			} else if (i > 4) {
				const divParentBtn = document.createElement('div');
				divParentBtn.className ='wrapper-btn';

				const btn1 = document.createElement('div');
				btn1.className = 'btn';
				btn1.innerText = 'Добавить'
				btn1.addEventListener('click', addingEvent);

				const btn2 = document.createElement('div');
				btn2.className = 'btn';
				btn2.innerText = 'Удалить';
				btn2.addEventListener('click', removeNote);

				divParentBtn.appendChild(btn1);
				divParentBtn.appendChild(btn2);

				form.appendChild(divParentBtn);

			}

		}
			poppap.appendChild(form);
			element.appendChild(poppap);
	}

	 function addEventToCalendar(eventsValue) {
	 	const activeElement = document.getElementsByClassName('active')[0];
	 	const findNote = activeElement.getElementsByClassName('note')[0];

	 	if (findNote) {
	 		const h6 = findNote.getElementsByClassName('nameEvent')[0];
	 		h6.innerText = eventsValue.nameEvent;

	 		const pEvent = findNote.getElementsByClassName('timeEvent')[0];
	 		pEvent.innerText = eventsValue.timeEvent;

	 		const pTarget = findNote.getElementsByClassName('targetEvent')[0];
	 		pTarget.innerText = eventsValue.targetEvent;

	 		const pDiscr = findNote.getElementsByClassName('discription')[0];
	 		pDiscr.innerText = eventsValue.discription;
	 	} else {
	 		const note = document.createElement('div');
		 	const h6 = document.createElement('h6');

		 	note.className = 'note';
		 	h6.className = 'nameEvent';
		 	h6.innerText = eventsValue.nameEvent;
		 	note.appendChild(h6);

		 	const pEvent = document.createElement('p');
		 	pEvent.className = 'timeEvent';
		 	pEvent.innerText = eventsValue.timeEvent;
		 	note.appendChild(pEvent);
		 	const pTarget = document.createElement('p');
		 	pTarget.className = 'targetEvent';
		 	pTarget.innerText = eventsValue.targetEvent;
		 	note.appendChild(pTarget);
		 	const pDiscr = document.createElement('p');
		 	pDiscr.className = 'discription';
		 	pDiscr.innerText = eventsValue.discription;
		 	note.appendChild(pDiscr);
		 	activeElement.appendChild(note);
	 	}
	 	removeForm(true);
	 }

	function addingEvent(event) {
		const poppap = event.target.parentNode.parentNode;
		
		function getEventDate() {
			let getDay = document.getElementsByClassName('active')[0].getElementsByClassName('cld-number')[0].innerText.split(',');
			if (getDay.length == 2) {
				getDay = getDay[1].replace(/\s/g, '');
			} else {
				getDay = getDay[0].replace(/\s/g, '');
			}
			
			const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
			const getMonthYear = document.getElementsByClassName('today')[0].innerHTML.split(",");
			let getMonth;
			const getYear = getMonthYear[1];
			for(let i = 0; i < months.length; i++){

				if (months[i] == getMonthYear[0]) {
					getMonth = i + 1;
				}
			}
			const currentMonthPrev = document.getElementsByClassName('active')[0].classList.contains('prevMonth');
			const currentMonthNext = document.getElementsByClassName('active')[0].classList.contains('nextMonth');

			if (currentMonthPrev) {
				getMonth--;
			}
			if (currentMonthNext){
				getMonth++;
			}
			const elementDate = [+getDay, getMonth, +getYear];
			return elementDate;
		}

		function EventValue(inputValue) {

			this.date1 = getEventDate();
			this.Date = new Date(this.date1[2], this.date1[1]- 1, this.date1[0]);
			this.nameEvent = inputValue[0].value;
			this.timeEvent = inputValue[1].value;
			this.targetEvent = inputValue[2].value;
			this.discription = inputValue[3].value;

		}

		let eventValue = new EventValue(poppap);
		events.push(eventValue);
		addEventToCalendar(eventValue);
		
	}
	function removeNote(event) {
		const element = document.getElementsByClassName('active')[0];
		const removeItem = element.getElementsByClassName('note')[0];
		if (event.target.innerText = 'Удалить') {
				element.removeChild(removeItem);
				removeForm();
			}
	}
	function removeForm(event) {
		const element = document.getElementsByClassName('active')[0];
		const poppapHide = element.getElementsByClassName('poppap')[0];
		if(event === true || poppapHide.classList.contains('show')){

			poppapHide.style.display = 'none';
			poppapHide.classList.add('hide');
			poppapHide.classList.remove('show');
		} else  {
			element.removeChild(event.target.parentNode.parentNode);
		}	
	}
	function showForm() {
		const element = document.getElementsByClassName('active')[0];
		if(element.classList.contains('prevMonth') || element.classList.contains('nextMonth') ) {
			alert('Добавляйте событие в текущий месяц пожалуйста!=)');
		}else {
			const poppapShow = element.getElementsByClassName('poppap')[0];
		if(poppapShow){
			poppapShow.classList.remove('hide');
			poppapShow.classList.add('show');
			poppapShow.style.display = 'block';
		}
		const findPoppap = element.getElementsByClassName('poppap')[0];
		if(!findPoppap){
			createEventForm(element);
		 }
		}
		
		}
	let findIndex = [];
	let searchButton = false;
	function searchElements(event) {
		let searchInfo = event.target.value;
		searchInfo = searchInfo.toLowerCase();
		function searchObj(obj, findElement) {
		  let result = false;
		  let props = '';
		  for (let i in obj) {
		  	if(findElement == ""){
		  		return false;
		  	}
		      props =  obj[i];
		      if(typeof props == 'string'){
		      	props = props.toLowerCase();
		      }
		      if(typeof props == 'string' &&  ( (props.indexOf(findElement)) !== -1) ){
		      	return result = true;
		      }
		  }

		  return result;
		}
		for(let j = 0; j < events.length; j++){
			if( (searchObj(events[j], searchInfo)) ) {
				findIndex.push(j);
			}
		}
		if(searchInfo !== ""){
			searchButton = true;
		}else {
			searchButton = false;
		}
	}
	const addButton = document.getElementsByClassName('add')[0];
	addButton.addEventListener('click', showForm);

	const searchInput = document.getElementsByClassName('searchInput')[0];
	searchInput.addEventListener('change', searchElements);

const refresh = document.getElementsByClassName('refresh')[0];
	refresh.addEventListener('click', function() {
		const badElement = element;
		badElement.innerHTML = "";
		calendar(element, events, settings);

	});

	const btnSearch = document.getElementsByClassName('search-btn')[0];
	    btnSearch.addEventListener('click', function() { 
	    	if(searchInput.value == ""){
	    		searchButton = false;
	    	}else {
	    		searchButton = true;
	    	}
	    	
	    	const badElement = element;
				badElement.innerHTML = "";
	    	calendar(element, events, settings); 
	    });
