import {gql} from '@apollo/client'
import authorPostFields from '../_partials/authorPostFields'
import defaultPageData from '../_partials/defaultPageData'
import featuredImagePostFields from '../_partials/featuredImagePostFields'
import globalPostFields from '../_partials/globalPostFields'
import seoPostFields from '../_partials/seoPostFields'

// Fragment: retrieve single post fields.
const singleMythFragment = gql`
  fragment SingleMythFields on Myth {
    ${globalPostFields}
    blocksJSON
    excerpt
    ${seoPostFields}
    ${authorPostFields}
    ${featuredImagePostFields}
  }
`
// ${tagsPostFields}
// ${categoriesPostFields}
// ${commentsPostFields}

// Query: retrieve post by specified identifier.
const queryPostById = gql`
  query GET_MYTH_BY_ID(
    $id: ID!
    $idType: MythIdType = SLUG
    $imageSize: MediaItemSizeEnum = LARGE
  ) {
    ${defaultPageData}
    myth(id: $id, idType: $idType) {
      ...SingleMythFields
    }
  }
  ${singleMythFragment}
`

export default queryPostById
