import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alert= ({ alerts }) => 
    alerts!==null && alerts.length>0 && alerts.map(({ id, msg, alertType }) => (
        <div key={id} className={`alert alert-${alertType}`}>
            {msg}
        </div>)
    )

Alert.propTypes= {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps= ({ alert }) => ({
    alerts: alert
})

export default connect(mapStateToProps)(Alert)