import PropTypes from 'prop-types'
import React from 'react'
import Accordion from './Accordion'
import useStyles from './useStyles'

/**
 * @param {object} props             The main Object
 * @param {object} props.innerBlocks The array of inner blocks to display.
 * @param {object} props.props       Remaining props on element
 * @return {Element}                 The Group component.
 */
function BlockAccordion({innerBlocks, ...props}) {
  const classes = useStyles(props)

  if (!innerBlocks?.length) {
    return null
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {innerBlocks.map((block) => (
          <Accordion key={block.attributes.id} {...block} />
        ))}
      </div>
    </div>
  )
}
BlockAccordion.propTypes = {
  innerBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      attributes: PropTypes.object
    })
  )
}

export default BlockAccordion
