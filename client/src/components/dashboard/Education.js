import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const Education= ({ education }) => {

    const educations= education.map((edu) => {
        return (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td>
                    <Moment format='MMMM-YYYY'>{edu.from}</Moment> - {
                        edu.to === null ? 'Now' : <Moment format='MMMM-YYYY'>{edu.to}</Moment>
                    }
                </td>
                <td>
                    <button className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    })

    return (
        <>
         <h2 className='my-2'>Education Credentials</h2>
         <table className="table">
             <thead>
                 <tr>
                     <th>School</th>
                     <th className="hide-sm">Degree</th>
                     <th className="hide-sm">Years</th>
                     <th />
                 </tr>
             </thead>
             <tbody>{educations}</tbody>
         </table>
        </>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
}

export default Education

