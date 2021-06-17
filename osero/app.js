
window.onload = () => {

	let currentColor = 'black'

	const rows = Array.from({length: 8}, (v,k) => k+1)
	const columns = Array.from({length: 8}, (v,k) => k+1)
	for (row of rows) {
		for (column of columns) {
			document.querySelector('.grid-container').insertAdjacentHTML (
				'beforeend',
				'<div class="grid-item" data-row="${row}" data-column="${column}"></div>'
			)
		}
	}

	Array.from(document.getElementsByClassName('grid-item')).forEach(element => {
		element.addEventListener('click', (e) => {
			e.target.dataset.color = currentColor;

			const row = Number(e.target.dataset.row)
			const column = Number(e.target.dataset.column)

			const functionList = [
				getUpLine,
				getRightLine,
				// getDownLine,
				// getLeftLine,
				getUpRightLine,
				// getDownRightLine,
				// getUpLeftLine,
				// getDownLeftLine,
			]

			for (const fn of functionList) {
			// 上方向のひっくり返し
			squares = fn(row, column);

			// 本当にひっくりかえしたいマス目の配列
			squaresToBeReversed = getTarget(squares);

			// ひっくろ返す
			squaresToBeReversed.forEach(el => {el.dataset.color = currentColor})
			}

			currentColor = enemyColor();
		})
	})

	const enemyColor = () => {
		return (currentColor == 'black')?'white':'black';
	}

	/**
	 *
	 * @param {integer} row
	 * @param {integer} column
	 * @return {array}
	 */

	 const getUpLine = (row, column) => {
		 result = []
		 for (i = row -1; i > 0; i--) {
			 result.push(document.querySelector('[data-row="${i}"][data-column="${column}"]'))
		 }
		 return result;
	 };

	const getRightLine = (row, column) => {
		result = []
		for (i = column + 1; i < 9; i++) {
			result.push(document.querySelector('[data-row="${row}"][data-column="${i}"]'))
		}
		return result;
	};

	const getUpRightLine = (row, column) => {
		result = []
		let r = row, c = column;
		while(r > 0 && c < 9) {
			r -= 1;
			c += 1;
			result.push(document.querySelector('[data-row="${r}"][data-column="${c}"]'))
		}
		return result;
	};

	 const getTarget = (squares) => {
		 result = []
		 for (const square of squares) {
			 const color = square.dataset.color;

			 if (color == enemyColor()) {
				 result.push(square)
			 } else if (color == currentColor) {
				 return result;
			 } else {
				 return [];
			 }
		 }
		 return [];
	 }
}

