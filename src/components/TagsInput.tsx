import React, {useEffect, useRef} from "react";
import {Chip, TextField, Button, Grid} from "@material-ui/core";

export default function TagsInput(props) {
  const { onSelectTags, tags, ...other } = props;
  const [ selectedItems, setSelectedItems ] = React.useState([]);
  useEffect(() => {
    const newArray = [];
    tags.map((item) => {
      newArray.push({
        email: item,
        isNew: false,
      });
    });
    setSelectedItems(newArray);
  }, [tags]);

  const handleDelete = (item) => () => {
    const newValue = [];
    selectedItems.map((email) => {
      if(email !== item){
        newValue.push(email);
      }
    });
    setSelectedItems(newValue);
    return item;
  };

  const [ inputValue, setInputValue ] = React.useState('');
  const [ error, setError ] = React.useState(false);
  const [ errorMsg, setErrorMsg ] = React.useState('');
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const update = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const newValue = selectedItems;
      if(inputValue.indexOf(';') >= 0){
        const arrayEmails = inputValue.split(';');
        arrayEmails.map((item) => {
          let isNew = true;
          if(validateEmail(item)){
            selectedItems.map((selected) => {
              if(selected.email === item){
                isNew = false;
              }
            });
            if(isNew){
              setError(false);
              newValue.push({
                email: item,
                isNew: true,
              });
            } else {
              setError(true);
              setErrorMsg('Esse e-mail já existe.')
            }
          } else {
            setError(true);
            setErrorMsg('Voce digitou corretamente o e-mail?')
          }
        });
        setSelectedItems(newValue);
        setInputValue('');
      } else {
        if(validateEmail(inputValue)){
          let isNew = true;
          setError(false);
          selectedItems.map((item) => {
            if(item.email === inputValue){
              isNew = false;
            }
          });
          if(isNew){
            newValue.push({
              email: inputValue,
              isNew: true,
            });
            setSelectedItems(newValue);
            setInputValue('');
          } else {
            setError(true);
            setErrorMsg('Esse e-mail já existe.')
          }
        } else {
          setError(true);
          setErrorMsg('Voce digitou corretamente o e-mail?')
        }
      }
    }
    if (e.key === 'Enter'){
      btnSubmit.current.click();
    }
  }

  const btnSubmit = useRef(null);

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
              InputProps={{
                startAdornment: selectedItems.map((item, index) => (
                    <Chip
                        key={`e${index}`}
                        tabIndex={-1}
                        label={item.email}
                        color={!item.isNew ? 'primary' : 'default'}
                        onDelete={handleDelete(item)}
                    />
                ))
              }}
              error={error}
              value={inputValue}
              onKeyDown={(e) => update(e)}
              onChange={(e) => setInputValue(e.target.value)}
              {...other}
          />
        </Grid>
        <Grid item xs={2}>
          <Button ref={btnSubmit} onClick={() => onSelectTags(selectedItems)} variant="contained" color="primary" size="large">
            Enviar
          </Button>
        </Grid>
      </Grid>
      {
        error &&
            <p className="alert">{errorMsg}</p>
      }
    </div>
  );
}
TagsInput.defaultProps = {
  tags: []
};
