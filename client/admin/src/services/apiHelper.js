// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, options) {
  return fetch(endpoint, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
    .then(
      response => (response),
      error => ({error: error.message || 'Something bad happened'})
    )
}

export const loginUserRequest = (creds) =>
  callApi('/login', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(creds)
  });

export const getMeRequest = () =>
	callApi('/getMe', {
		method: "GET",
		headers: {'Content-Type': 'application/json', 'authorization': window.localStorage.token},
	});
