// API Docs at:
// https://www.tvmaze.com/api
const form = document.getElementById('search');
form.addEventListener('submit', function (event) {
	event.preventDefault();
	let showSelect = document.getElementById('show-select');
	showSelect.style.display = 'block';
	let title = document.getElementById('show-search').value;
	let showDetail = document.getElementById('show-detail');
	showDetail.innerHTML = '';
	const url = `https://api.tvmaze.com/search/shows?q=${title}`;

	fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			console.log('success!', res);
			if (res && res.length > 0) {
				let selectOptions = `<option value=''>Shows matching ${title}...</option>`;
				for (let i = 0; i < res.length; i++) {
					let currentRow = res[i];
					selectOptions =
						selectOptions +
						`<option value="${currentRow.show.id}">${currentRow.show.name}</option>`;
				}
				showSelect.innerHTML = selectOptions;
			}
		})
		.catch((err) => {
			console.log('something went wrong...', err);
		});

	showSelect.addEventListener('change', function (event) {
		event.preventDefault();
		showDetail.innerHTML = '';
		let showId = event.target.value;
		const showUrl = `https://api.tvmaze.com/shows/${showId}`;
		fetch(showUrl)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log('success!', res);
				if (res) {
					let h2 = `<h2>${res.name}</h2>`;
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
