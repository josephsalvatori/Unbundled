import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

/** @type {import('@sveltejs/kit').Handle} */
const mainHandler = async ({ event, resolve }) => {

	const uid = event.cookies.get("uid");
	const date = new Date();

	event.locals.startTimer = date.now();

	if(!uid) {

		date.setFullYear(date.getFullYear() + 1);

		event.locals.uid = crypto.randomUUID();
		event.locals.user = null;
		event.locals.session = null;

		event.cookies.set("uid", event.locals.uid, {
			httpOnly: true,
			path: "/",
			expires: date
		});

		return resolve(event);
	}

	/** Login system would go here */

	/** End ~ Login system */

	if(event.route.id?.startsWith("/(private)")) {

		if(!event.locals.user) redirect(302, "/login");
		if(!event.locals.user?.verified) redirect(302, "/auth/verify/email");
	}

	return resolve(event);
};

/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = ({ error, event, status, message }) => {

	const errorId = crypto.randomUUID();

	console.log({
		errorId,
		error,
		event,
		status,
		message
	});

	const errorReport = {
		id: errorId,
		code: status || 500,
		message: error.message || "An unexpected error occured.",
		name: error.name || "ServerError",
		location: error.loc || null,
		frame: error.frame || null,
		pluginCode: error.pluginCode || null,
		path: event.url.origin + event.url.pathname,
		stack: error.stack || null,
	}

	return errorReport;
};