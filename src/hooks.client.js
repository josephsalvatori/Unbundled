/** @type {import('@sveltejs/kit').HandleClientError} */
export const handleError = async ({ error, event, status, message }) => {

	const errorId = crypto.randomUUID();

	console.log({
		errorId,
		error,
		event,
		status,
		message
	});

	return {
		message: "An unexpected error occured.",
		code: 500,
		errorId
	};
};