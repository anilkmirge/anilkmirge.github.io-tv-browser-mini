// API Docs at:
// http://www.tvmaze.com/api
const form = document.getElementById('search');
form.addEventListener('submit', function (event) {
	event.preventDefault();
	let showSelect = document.getElementById('show-select');
	showSelect.style.display = 'block';
	let title = document.getElementById('show-search').value;
	const url = `http://api.tvmaze.com/search/shows?q=${title}`;

	fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			console.log('success!', res);
			if (res && res.length > 0) {
				showSelect.removeChild(showSelect.options[0]); // this is to remove the original 'Select a show...' option from select
				let firstOption = document.createElement('option');
				firstOption.appendChild(
					document.createTextNode(`Shows matching ${title}...`)
				);
				firstOption.value = '';
				showSelect.appendChild(firstOption);
				for (let i = 0; i < res.length; i++) {
					let currentRow = res[i];
					let option = document.createElement('option');
					option.appendChild(document.createTextNode(currentRow.show.name));
					option.value = currentRow.show.id;
					showSelect.appendChild(option);
				}
			}
		})
		.catch((err) => {
			console.log('something went wrong...', err);
		});

	showSelect.addEventListener('change', function (event) {
		event.preventDefault();
		let showDetail = document.getElementById('show-detail');
		showDetail.innerHTML = '';
		let showId = event.target.value;
		const showUrl = `http://api.tvmaze.com/shows/${showId}`;
		fetch(showUrl)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log('success!', res);
				if (res) {
					let h2 = `<h2>${res.name}</h2>`
					let image = '';
					if (res.image) {
						image = `<img src="${res.image.original}" alt="${res.name}"></img>`;
                    } 
                    let summary = `<p>Summary not available</p>`;
					if (res.summary) {
						summary = res.summary;
                    }
                    let detail = h2 + image + summary;
                    showDetail.innerHTML = detail;
				}
			})
			.catch((err) => {
				console.log('something went wrong...', err);
			});
	});
});
