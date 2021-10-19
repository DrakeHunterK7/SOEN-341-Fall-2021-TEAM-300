import PropTypes from "prop-types"

const QuestionPreview = ({text}) => {
    return (
        <header className= 'answer'>
            <b style = {headingStyle}  > {text} </b>
        </header>
    )
}

QuestionPreview.defaultProps = {
    text: "Default answer",
}

QuestionPreview.propTypes = {
    text: PropTypes.string.isRequired,
}

const headingStyle = {color: 'black'}

export default QuestionPreview