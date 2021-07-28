import { useState } from 'react';
import { Button } from '@material-ui/core';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useHistory } from 'react-router-dom';
import './Question.css';
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

  const handleCheck = (opt) => {
    setSelected(opt);
    if (opt === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currQues > 8) {
      history.push('/result');
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError('Please select an option first');
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
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

        <div className='controls'>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            style={{ width: 185 }}
            href='/'
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant='contained'
            color='primary'
            size='large'
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? 'Submit' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
