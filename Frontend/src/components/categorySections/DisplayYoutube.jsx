import PropTypes from 'prop-types';
/**
 * 
 * @param {string} 
 * videoSrc: id del video que se quiere mostrar en el reproductor 
 * @returns 
 */
export default function DisplayYoutube({videoSrc}) {
    
    const url = "http://www.youtube.com/embed/"+videoSrc+"?autoplay=0"
    return(
        <div id='reproductor' className='w-full bg-blue-400'>
            <iframe id="ytplayer" className='w-full' title='xd' type="text/html" width="300" height="500" src={url} frameBorder="0"/>
        </div>
    )
}

DisplayYoutube.propTypes = {
    videoSrc: PropTypes.string.isRequired,
}