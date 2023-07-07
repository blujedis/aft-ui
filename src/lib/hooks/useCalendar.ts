export function createCalendarMonth(year: number, oneBasedMonth: number) {
	/* month given to Date() starts at 0 = January */
	const month = oneBasedMonth - 1;

	const startDate = new Date(year, month, 1);

	/* 0 `day` gets last day of prior month */
	const endDate = new Date(year, month + 1, 0);

	/* result of getDay(): 0 means Sunday and 6 means Saturday */
	const startDay = startDate.getDay();

	/* last day number = total days in current month */
	const totalDays = endDate.getDate();
	const totalWeeks = Math.ceil((totalDays + startDay) / 7);

	const prevMonthEndDate = new Date(year, month, 0);
	const dates = [];
	let prevMonthDay = prevMonthEndDate.getDate() - startDay + 1;
	let nextMonthDay = 1;

	for (let i = 0; i < totalWeeks * 7; i += 1) {
		let date;

		/* Previous month dates (if month does not start on Sunday) */
		if (i < startDay) {
			date = new Date(year, month - 1, prevMonthDay);
			/* Next month dates (if month does not end on Saturday) */
			prevMonthDay = prevMonthDay + 1;
		} else if (i > totalDays + (startDay - 1)) {
			date = new Date(year, month + 1, nextMonthDay);
			/* Current month dates. */
			nextMonthDay = nextMonthDay + 1;
		} else {
			date = new Date(year, month, i - startDay + 1);
		}

		dates.push(date);
	}

	return {
		dates,
		month,
		startDate,
		endDate,
		startDay,
		totalWeeks,
		totalDays
	};
}
