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
        <label htmlFor={`${label.split(' ').join('').toLowerCase()}`} className="label-text">
            <input name={`${label.split(' ').join('').toLowerCase()}`} 
                id={`${label.split(' ').join('').toLowerCase()}`} type="text" 
                className="input-text"
                ref={inputRef}
                required onChange={onChangeText} value={inputValue}/>
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
        <label htmlFor={`${label.split(' ').join('').toLowerCase()}`} className='text-area-container'>
            <textarea 
                name={`${label.split(' ').join('').toLowerCase()}`} 
                id={`${label.split(' ').join('').toLowerCase()}`} 
                className='text-area-input' 
                ref={inputRef}
                rows={rowsNumber} type="text" required onChange={onChangeText} value={inputValue}/>
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