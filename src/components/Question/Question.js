import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useHistory } from 'react-router-dom';
const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSelect = (opt) => {
    if (selected === opt && selected === correct) return 'select';
    else if (selected === opt && selected !== correct) return 'wrong';
    else if (opt === correct) return 'select';
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };
  return (
    <div className='question'>
      Question {currQues + 1}
      <div className='singleQuestion'>
        <h2>{questions[currQues].question}</h2>

        <div className='options'>
          {error && <ErrorMessage>Please Fill all the fields</ErrorMessage>}
          {options &&
            options.map((opt) => (
              <button
                className={`singleOption  ${selected && handleSelect(opt)}`}
                key={opt}
                onClick={() => handleCheck(opt)}
                disabled={selected}
              >
                {opt}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
