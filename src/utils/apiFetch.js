export async function apiFetch(apiUrl, options = {}) {
  try {
    let apiResp = await fetch(apiUrl, {
      ...options,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    let apiData = await apiResp.json()
    if (!apiResp.ok)
      throw apiData
    return apiData
  } catch (e) {
    throw e
  }
}
