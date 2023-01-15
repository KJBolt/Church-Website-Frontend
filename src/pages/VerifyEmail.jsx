import React from 'react'

function VerifyEmail() {
  return (
    <div className='verifyEmail'>
        <div className="verify-wrapper">
            <div className="image">
                <img src={require('../assets/email.png')} alt="" />
            </div>
            <h3>Verify your email address</h3>
            <p>Check your gmail to verify your account</p>
        </div>
        
    </div>
  )
}

export default VerifyEmail