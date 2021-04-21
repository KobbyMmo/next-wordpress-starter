import Blocks from '@/components/molecules/Blocks'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import useStyles from './useStyles'

/**
 * @param {object} props             The main Object
 * @param {object} props.attributes  The components attributes
 * @param {object} props.innerBlocks The array of inner blocks to display.
 * @param {object} props.props       Remaining props on element
 * @return {Element}                 The Group component.
 */
function AccordionPanel({attributes, innerBlocks, ...props}) {
  const classes = useStyles(props)
  const [expanded, setExpanded] = useState(attributes.initialOpen)

  /**
   *
   */
  function handleChange() {
    setExpanded((prev) => !prev)
  }

  return (
    <Accordion
      {...props}
      elevation={0}
      expanded={expanded}
      onChange={handleChange}
      classes={{root: classes.accordion, expanded: classes.accordionExpanded}}
    >
      <AccordionSummary
        // expandIcon={expanded ? <MinusIcon /> : <PlusIcon />}
        classes={{
          root: classes.accordionSummary,
          content: classes.accordionSummaryContent
        }}
      >
        <Typography variant="h4">{attributes.title}</Typography>
      </AccordionSummary>
      <AccordionDetails classes={{root: classes.accordionDetails}}>
        {!!innerBlocks?.length && <Blocks blocks={innerBlocks} />}
      </AccordionDetails>
    </Accordion>
  )
}
AccordionPanel.propTypes = {
  attributes: PropTypes.object,
  innerBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      attributes: PropTypes.object
    })
  )
}

AccordionPanel.defaultProps = {
  expanded: false
}

export default AccordionPanel
