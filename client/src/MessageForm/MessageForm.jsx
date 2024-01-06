import React, { useState } from 'react'

import './style.scss';

const MessageForm = ({sendMessage}) => {
  const [text, setText] = useState();

  const clickHandler = () => {
    sendMessage(text);
    setText('');
  }

  return (
    <div className='MessageForm_wrapper'>
      <div>
        <div>Введите сообщение</div>
        <input 
          type='text'
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <button onClick={clickHandler}>Отправить</button>
      </div>
    </div>
  )
}

export default MessageForm