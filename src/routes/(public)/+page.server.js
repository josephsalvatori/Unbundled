import {
	GOOGLE_SHEETS_DOC_ID,
	GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL,
	GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY
} from "$env/static/private";
import { error, fail, redirect } from "@sveltejs/kit";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

	const CATEGORY_SHEET_NAME = "Categories";
	const COMPANY_SHEET_NAME = "Companies";
	const COMPANY_COLUMN_HEADERS = [
		"Name",
		// "Sort_Key",
		"Description",
		"Categories",
		"Color_Background",
		"Color_Font",
		"Icon",
		"Status",
		"Date_Updated",
		"Tag_1",
		"Tag_2",
		"Tag_3",
		"Source_1_Name",
		"Source_1_URL",
		"Source_2_Name",
		"Source_2_URL",
		"Source_3_Name",
		"Source_3_URL",
	];

	let companies = [];

	// potentially include sort keys for companies

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

		let companiesSheet = SHEET.sheetsByTitle[COMPANY_SHEET_NAME];
		let companyData = await companiesSheet.getRows();

		for(let i = 0; i < companyData.length; i++) {

			let obj = {
				tags: []
			};
			let com = companyData[i].toObject();

			COMPANY_COLUMN_HEADERS.forEach((h) => {

				if(!com[h]) return;

				if(h === "Categories") {
					obj[h.toLowerCase()] = com[h].split(",").map((c) => c.trim());
					return;
				}

				if(h === "Tag_1" || h === "Tag_2" || h === "Tag_3") {
					if(com[h]) {
						obj.tags.push(com[h]);
					}
					return;
				}

				obj[h.toLowerCase()] = com[h];
			});

			companies.push(obj);
		}

	} catch(err) {
		console.error(err);
	}

	// apply sort here?
	if(companies.length > 0) {
		// console.log("apply sort or filter");
	}

	// now get companies
	let categoryRequest = await event.fetch("/utility/categories.json");
	let categories = await categoryRequest.json();

	// sort categories by sort key
	categories.sort((a, b) => a.sort_key - b.sort_key);

	return {
		companies,
		categories
	};
};