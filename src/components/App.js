import { useState } from 'react';
import { TextField } from '@material-ui/core';
import '../styles/App.css';

const dbgcensus = require('dbgcensus');

function App() {
  dbgcensus.SetGlobalNamespace('ps2:v2');
  
  const [serviceKey, setServiceKey] = useState('example');


  const onSubmitQuery = (formServiceKey) => {
    dbgcensus.SetGlobalServiceKey(formServiceKey);
    
    setServiceKey(formServiceKey);

    console.log(dbgcensus.serviceKey);
  }

  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField id="service-key" label="Service Key" required onChange={onSubmitQuery} placeholder="example" value={serviceKey}/>
        <TextField id="other-field" label="Other Field" required onChange={() => {return null}}/>
        {/* <Button onClick={onSubmitQuery} */}
      </form>
    </div>
  );
}

export default App;
