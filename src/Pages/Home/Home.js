import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@material-ui/core';
import Categories from '../../Data/Categories';
import Difficulty from '../../Data/Difficulty';
import './Home.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !difficulty || !name.trim()) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push('/quiz');
    }
  };
  return (
    <div className='content'>
      <div className='settings'>
        <span style={{ fontSize: 30 }}>Quiz Settings</span>

        <div className='settings__select'>
          {error && <ErrorMessage>Please Fill all the fields</ErrorMessage>}
          <TextField
            label='Enter Your Name'
            variant='outlined'
            style={{ marginBottom: 25 }}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            select
            label='Select Category'
            variant='outlined'
            style={{ marginBottom: 30 }}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {' '}
                {cat.category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label='Select Difficulty'
            variant='outlined'
            style={{ marginBottom: 30 }}
            onChange={(e) => setDifficulty(e.target.value)}
            valu={difficulty}
          >
            {Difficulty.map((diff) => (
              <MenuItem key={diff.difficulty} value={diff.value}>
                {' '}
                {diff.difficulty}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src='./quiz.svg' className='banner' alt='quiz img' />
    </div>
  );
};

export default Home;
