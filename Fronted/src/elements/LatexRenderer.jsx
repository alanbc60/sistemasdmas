import PropTypes from 'prop-types';
import 'katex/dist/katex.min.css';
import {InlineMath} from 'react-katex';

export default function LatexRenderer({ content }) {
    const text = `${content}`;

    return (
        <p className='ver-text'>
            {text.split('$$').map((part, index)=>{
                if(index % 2==0){
                    return <span key={index}>{part}</span>;
                }else{
                    return <InlineMath key={index}>{part}</InlineMath>;
                }
            })}
        </p>
    )
}

LatexRenderer.propTypes = {
    content: PropTypes.string.isRequired,
};