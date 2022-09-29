const axios = require('axios')

const TIMEOUT_IN_MILLIS = 60000

export const axiosCore = axios.create({
  timeout: TIMEOUT_IN_MILLIS
}) // end of axiosCore

// Interceptor used to return custom error when request timed out
axiosCore.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.message?.toLowerCase().includes('timeout')) {
      return await Promise.reject(
        new Error('Dependency exceeded timeout')
      )
    }

    // This will be translated to a ServerError
    return await Promise.reject(error)
  }
) // end of axiosCore.interceptors.response.use timeout
