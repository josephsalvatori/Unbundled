import {
	GOOGLE_SHEETS_DOC_ID,
	GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL,
	GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY
} from "$env/static/private";

import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

// const prerender = true;

/** @type {import('@sveltejs/kit').Get} */
export async function GET({url}) {

	const CATEGORY_SHEET_NAME = "Categories";
	const CATEGORY_COLUMN_HEADERS = [
		"Name",
		"Sort_Key",
		"Description",
		"Color_Background",
		"Color_Font"
	];

	let json = [];

	try {

		const SCOPES = [
			"https://www.googleapis.com/auth/spreadsheets",
			"https://www.googleapis.com/auth/drive.file",
		];

		const jwt = new JWT({
			email: GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL,
			key: GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY,
			scopes: SCOPES
		});

		const SHEET = new GoogleSpreadsheet(GOOGLE_SHEETS_DOC_ID, jwt);

		await SHEET.loadInfo(); // loads document properties and worksheets

		let categories = SHEET.sheetsByTitle[CATEGORY_SHEET_NAME];
		let categoryData = await categories.getRows();

		for(let i = 0; i < categoryData.length; i++) {

			let obj = {};
			let cat = categoryData[i].toObject();

			CATEGORY_COLUMN_HEADERS.forEach((h) => {

				if(!cat[h]) return;

				if(h === "Sort_Key") {
					obj["sortKey"] = (cat[h] ? parseInt(cat[h]) : null);
					return;
				}

				obj[h.toLowerCase()] = cat[h];
			});

			json.push(obj);
		}

	} catch(err) {
		console.error(err);
	}

	return new Response((JSON.stringify(json)).trim(),
		{
			headers: {
				"Content-Type": "application/json",
				"Sec-Fetch-Site": "same-origin"
			}
		}
	);
}