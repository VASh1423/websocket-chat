import { useState } from 'react';

import './style.scss';

const ConnectForm = ({connect}) => {
  const [username, setUsername] = useState();
  const clickHandler = () => {
    connect(username)
    setUsername('')
  }

  return (
    <div className="ConnectForm_wrapper">
      <div>Подклчение</div>
      
      <div>
        <div>Введите имя</div>
        <input 
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      
      <button onClick={clickHandler}>Подключиться</button>
    </div>
  )
}

export default ConnectForm