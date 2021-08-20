import React, {useEffect, useState} from 'react';
import TagsInput from './components/TagsInput';
import { Container } from '@material-ui/core';

const App: React.FC = () => {
  function handleSelecetedTags(items) {
    const patchValue = [];
    items.map((item) => {
      patchValue.push(item.email);
    });
    const options = {
      method: 'PATCH',
      headers: {
        "token": uuid,
      },
      body: JSON.stringify(patchValue),
    };
    fetch(` http://127.0.0.1:4010/mailing-lists/${uuid}`,options)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setTags(res.emails)
        })
  }
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  const [uuid, setUuid] = useState<string>(uuidv4());

  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        "token": uuid,
      },
    };

    fetch(` http://localhost:4010/mailing-lists/${uuid}`,options)
        .then((res) => {
         return res.json();
        })
        .then((res) => {
          setTags(res.emails)
        })
  }, [uuid]);

  return (
    <div className="app">
      <Container>
        <div className="container">
          <h1 className="titulo">Quais e-mails tu pretendes manter/adicionar?</h1>
          <p className="info">Pressione <strong className="tab">Tab</strong> para adicionar a tag/e-mail e <strong className="tab">Enter</strong> para submeter as informações.</p>
          <TagsInput
            onSelectTags={handleSelecetedTags}
            fullWidth
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="add Tags"
            label="tags"
            tags={tags}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;