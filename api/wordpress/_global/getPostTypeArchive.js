import {initializeWpApollo} from '../connector'
import queryPostsArchive from '../posts/queryPostsArchive'
import {postTypes} from './postTypes'

/**
 * Retrieve post archive.
 *
 * @author WebDevStudios
 * @param  {string} postType WP post type.
 * @param  {string} orderBy  Order by: field.
 * @param  {string} order    Order by: direction.
 * @param  {string} cursor   Start/end cursor for pagination.
 * @param  {bool}   getNext  Whether to retrieve next set of posts (true) or previous set (false).
 * @param  {number} perPage  Number of posts per page.
 * @return {Object}          Object containing Apollo client instance and post archive data or error object.
 */
export default async function getPostTypeArchive(
  postType,
  orderBy = 'DATE',
  order = 'DESC',
  cursor = null,
  getNext = true,
  perPage = 10
) {
  // Define single post query based on post type.
  const postTypeQuery = {
    post: queryPostsArchive
  }

  // Retrieve post type query.
  const query = postTypeQuery?.[postType] ?? null

  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Set up return object.
  const response = {
    apolloClient,
    error: false,
    errorMessage: null
  }

  // If no query is set for given post type, return error message.
  if (!query) {
    return {
      apolloClient,
      error: true,
      errorMessage: `Post type \`${postType}\` archives are not supported.`
    }
  }

  // Determine query variables.
  const variables = {
    first: getNext ? perPage : null, // Only used for retrieving next set.
    last: getNext ? null : perPage, // Only used for retrieving previous set.
    after: getNext ? cursor : null, // Only used for retrieving next set.
    before: getNext ? null : cursor, // Only used for retrieving previous set.
    orderBy,
    order
  }

  // Execute query.
  response.posts = await apolloClient
    .query({query, variables})
    .then((posts) => {
      const pluralType = postTypes[postType] ?? postType

      // Set error props if data not found.
      if (!posts?.data?.[pluralType]?.edges) {
        response.error = true
        response.errorMessage = `An error occurred while trying to retrieve data for ${pluralType} archive.`

        return null
      }

      // Flatten posts array to include inner node post data.
      return posts.data[pluralType].edges.map((post) => post.node)
    })
    .catch((error) => {
      response.error = true
      response.errorMessage = error.message

      return null
    })

  return response
}