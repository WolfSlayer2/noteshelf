import React from 'react'

function Noteitem(props) {
    const { note } = props;
    return (
        <div className='col-md-4'>
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="fa-regular fa-pen-to-square mx-2"></i>
                            <i className="fa-solid fa-eraser"></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem