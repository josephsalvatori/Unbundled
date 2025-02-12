import { loadFlash } from "sveltekit-flash-message/server";

export const trailingSlash = "never";

/** @type {import('./$types').LayoutServerLoad} */
export const load = loadFlash(async (event) => {

	return {
		uid: event.locals.uid,
		user: event.locals.user,
	}
});