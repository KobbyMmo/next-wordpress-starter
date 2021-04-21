import {gql} from '@apollo/client'
import archivePageInfo from '../_partials/archivePageInfo'
import defaultPageData from '../_partials/defaultPageData'
import featuredImagePostFields from '../_partials/featuredImagePostFields'
import globalPostFields from '../_partials/globalPostFields'
import seoPostFields from '../_partials/seoPostFields'

// Fragment: retrieve archive post fields.
export const archivePostFragment = gql`
  fragment ArchiveMythFields on Myth {
    ${globalPostFields}
    excerpt
    ${featuredImagePostFields}
  }
`

// Query partial: retrieve archive fields.
export const archivePosts = `
  myths(
    first: $first
    last: $last
    after: $after
    before: $before
    where: {orderby: {field: $orderBy, order: $order}}
  ) {
    ${archivePageInfo}
    edges {
      node {
        ...ArchiveMythFields
      }
    }
  }
`

// Query: retrieve posts archive.
const queryPostsArchive = gql`
  query GET_POSTS_ARCHIVE(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $orderBy: PostObjectsConnectionOrderbyEnum = DATE
    $order: OrderEnum = DESC
    $imageSize: MediaItemSizeEnum = THUMBNAIL
  ) {
    ${defaultPageData}
    homepageSettings {
      postsPage {
        ${seoPostFields}
      }
    }
    ${archivePosts}
  }
  ${archivePostFragment}
`

export default queryPostsArchive
