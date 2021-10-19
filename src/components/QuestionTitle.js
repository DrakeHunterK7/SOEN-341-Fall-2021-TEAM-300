import PropTypes from "prop-types"

const QuestionTitle = ({title}) => {
    return (
        <header className= 'header'>
            <h2 style = {headingStyle}  > {title} </h2>
        </header>
    )
}

QuestionTitle.defaultProps = {
    title: "Tast Tracker"
}

QuestionTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

const headingStyle = {color: 'black'}

export default QuestionTitle 