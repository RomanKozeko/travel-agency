
function callApi(endpoint) {
  return fetch(endpoint)
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

export const fetchTours = () => callApi('/api/tours')
export const fetchLanguages = () => callApi('/api/languages')
export const fetchSettings = langPref => callApi(`/api/settings?lang=${langPref}`)