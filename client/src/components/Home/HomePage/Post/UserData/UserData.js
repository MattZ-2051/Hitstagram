import React from 'react'

const UserData = ({ data }) => {


    return (
        <div className='user'>
            {data.fullName}
        </div>
    )
}

export default UserData
