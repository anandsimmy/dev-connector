import React from 'react'
import { connect } from 'react-redux'

const Alert= ({ alerts }) => {
    return (
        <>
        {
            alerts.map(({ msg, alertType }) => {
                return (
                    <div className={`alert alert-${alertType}`}>
                        {msg}
                    </div>)
            })
        }
       </>
    )
}

const mapStateToProps= ({ alert }) => ({
    alerts: alert
})

export default connect(mapStateToProps)(Alert)