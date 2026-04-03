export async function apiFetch(apiUrl, options = {}, retries = 2) {
  try {
    let apiResp = await fetch(apiUrl, {
      ...options,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    let apiData = await apiResp.json()
    if (!apiResp.ok) throw apiData
    return apiData
  } catch (e) {
    if (retries > 0) return apiFetch(apiUrl, options, retries - 1)
    throw e
  }
}