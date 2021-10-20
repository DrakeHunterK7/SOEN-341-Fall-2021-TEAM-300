import Question from "../components/QuestionTitle";
import Answer from "../components/QuestionPreview";

function index() {
  return (
    <div className="index">
      <Question title= "This is a question title!" />
      <Answer text = "This is a preview of the question" />
      <Question title= "This is a question title!" />
      <Answer text = "This is a preview of the question" />
      <Question title= "This is a question title!" />
      <Answer text = "This is a preview of the question" />
      <Question title= "This is a question title!" />
      <Answer text = "This is a preview of the question" />
      <Question title= "This is a question title!" />
      <Answer text = "This is a preview of the question" />
      <Question title= "This is a question title!" />
      <Answer text = "This is a preview of the question" />
    </div>
  );
}

export default index;
