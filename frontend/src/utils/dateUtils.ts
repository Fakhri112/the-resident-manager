const formatMonthYear = (dateString: string | Date): string => {
	const date = new Date(dateString);
	const month = date.toLocaleString("default", { month: "long" }); // Get full month name
	const year = date.getFullYear();
	return `${month} ${year}`;
};

const formatDate = (date: Date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month as it's 0-indexed
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};
const getMonthDifference = (startDate: Date, endDate: Date) => {
	const startYear = startDate.getFullYear();
	const startMonth = startDate.getMonth();
	const endYear = endDate.getFullYear();
	const endMonth = endDate.getMonth();
	const yearDiff = endYear - startYear;
	const monthDiff = endMonth - startMonth;
	return yearDiff * 12 + monthDiff;
};

export { getMonthDifference, formatDate, formatMonthYear };
