import React from 'react'

const Alert = (props) => {
    const capitalize = (s)=>{
        let a = s.charAt(0).toUpperCase();
        return a + s.substring(1, s.length);
    }
    return (
        <div className='container my-1' style={{height: '40px'}}>
            {props.alert && <div
                className={`alert alert-${props.alert.type} alert-dismissible fade show`}
                role="alert"
                style={{
                    fontSize: "0.875rem",
                    padding: "0.5rem",
                    marginBottom: "0.5rem"
                }}
            >
                <strong>{capitalize(props.alert.type)}!!</strong> {props.alert.message}
            </div>}
        </div>

    )
}

export default Alert
