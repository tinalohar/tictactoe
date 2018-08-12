export const serverUrl: string = "http://localhost:3000";

interface IHttpConfig {
    method: string;
    mode: string;
    headers: any;
    cache: string;
    credentials: string;
    redirect: string;
    referrer: string;
}

export const httpConfig: IHttpConfig = {
	method: "POST", // *GET, POST, PUT, DELETE, etc.
	mode: "cors", // no-cors, cors, *same-origin
	headers: {
			'Accept': 'application/json',
			  'Content-Type': 'application/json'
	},
	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	credentials: "same-origin", // include, same-origin, *omit
	redirect: "follow", // manual, *follow, error
	referrer: "no-referrer" // no-referrer, *client
}