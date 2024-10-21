import React from 'react';
import PropTypes from 'prop-types';
import '../styles/elements/Inputs.css'
import { useEffect, useRef, useState } from 'react';

export function TextInput({label, resetInputs, handleNewSubmit}){
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef();
    const onChangeText = (e)=>{
        handleNewSubmit()
        const newValue =e.target.value
        setInputValue(newValue)
    }

    useEffect(() => {
    if (resetInputs) {
      setInputValue('');
    }
  }, [resetInputs]);

    return (
        <label htmlFor={`${label.split(' ').join('').toLowerCase()}`} 
        id='label-text'
        className="appearance-none block w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
        >
            <input name={`${label.split(' ').join('').toLowerCase()}`} 
                id={`${label.split(' ').join('').toLowerCase()}`} 
                type="text" 
                className='border-2 border-transparent focus:border-orange-200 focus:outline-none transition-colors duration-300 ease-in-out' 
                ref={inputRef}
                required onChange={onChangeText} 
                value={inputValue}/>
            <span className={inputValue?'has-value':' '}>{label}</span>
        </label>
    )
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    resetInputs: PropTypes.bool.isRequired,
    handleNewSubmit: PropTypes.func
}

export function TextAreaInput({label, rowsNumber, resetInputs, handleNewSubmit}){
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef();
    const onChangeText = (e)=>{
        handleNewSubmit()
        const newValue =e.target.value
        setInputValue(newValue)
    }

    useEffect(() => {
    if (resetInputs) {
      setInputValue('');
    }
  }, [resetInputs]);
    return (
        <label htmlFor={`${label.split(' ').join('').toLowerCase()}`} 
        id='text-area-container' 
        className='w-full relative max-w-[750px]'>
            <textarea 
                name={`${label.split(' ').join('').toLowerCase()}`} 
                id={`${label.split(' ').join('').toLowerCase()}`} 
                className='border-2 border-transparent focus:border-orange-200 focus:outline-none transition-colors duration-300 ease-in-out' 
                ref={inputRef}
                rows={rowsNumber} 
                type="text" 
                required onChange={onChangeText} 
                value={inputValue}/>
            <span className={inputValue?'has-value':' '}>{label}</span>
        </label>
    )
}
TextAreaInput.propTypes = {
    label: PropTypes.string.isRequired,
    rowsNumber: PropTypes.number.isRequired,
    resetInputs: PropTypes.bool.isRequired,
    handleNewSubmit: PropTypes.func
}