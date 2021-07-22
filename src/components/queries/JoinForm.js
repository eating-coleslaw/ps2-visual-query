import React, { useState } from 'react';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import ForwardIcon from '@material-ui/icons/Forward';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import CollectionSelector from './CollectionSelector';
import FieldsEntryForm from './FieldsEntryForm';
import ConditionArgumentForm from './ConditionArgumentForm';
import BinarySelector from '../BinarySelector';
import BooleanSelector from '../shared/BooleanSelector';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  gridRow: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  textButton: {
    marginTop: -4,
    marginBottom: theme.spacing(1),
  },
  footer: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
}));

export default function JoinForm({ joinData, onChange, onDelete, onAddNewJoin }) {
  const classes = useStyles();
  
  const [joinChanges, setJoinChanges] = useState(joinData);
 
  // isList(bool)
  // isOuterJoin(bool)
  // showFields(array): See the 'Show certain fields' section above
  // hideFields(array): See the 'Hide certain fields' section above
  // onField(string)
  // toField(string)
  // injectAt(string)
  // where(string): See the 'Defining a condition' section above
  // joinService(string): Returns another join object for sub joining

  function handleFormSubmit(event) {
    event.preventDefault();
    handleSaveChanges();
  }

  function handleSaveChanges() {
    onChange(joinChanges);
  }

  function handleDeleteJoin() {
    onDelete(joinData.id);
  }

  function handleSimplePropertyChange(propertyName, value) {
    setJoinChanges({ ...joinChanges, ...{ [propertyName]: value } } );
  }

  function handleCollectionChange(value) {
    if (!!value) {
      handleSimplePropertyChange("collection", value);
    }
  }

  function handleOnFieldChange(event) {
    const value = event.target.value;
    handleSimplePropertyChange("onField", value);
  }
  
  function handleToFieldChange(event) {
    const value = event.target.value;
    handleSimplePropertyChange("toField", value);
  }

  function handleAddSubJoin() {
    const newJoin = {
      id: uuidv4(),
      parentId: joinData.id,
      collection: "",
      isList: false, //0 if joined data is not a list, 1 if it is a list. Defaults to 0- not a list.
      filterType: "show",
      filterFields: [],
      injectAt: "",
      terms: [], // aka Conditions
      isOuterJoin: false,
      joins: [],
    };

    const updatedJoins = [ ...joinData.joins, newJoin ];
    handleSimplePropertyChange("joins", updatedJoins);
  }

  function handleDeleteSubJoin(id) {
    const updatedJoins = joinData.joins.filter((join) => {
      return join.id !== id;
    });

    setJoinChanges({ ...joinData, ...{ joins: updatedJoins} });
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleFormSubmit}>
      <Grid container spacing={1} alignItems="center" className={classes.gridRow}>
        <Grid item xs={12} sm={8}>
          <CollectionSelector collection={joinChanges.collection} onChange={handleCollectionChange} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="inject-at"
            label="Inject At"
            margin="dense"
            variant="outlined"
            name="inject-at"
            onChange={(event) => handleSimplePropertyChange("injectAt", event.target.value)}
            value={joinChanges.injectAt}
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={1} alignItems="center" className={classes.gridRow}>
        
        <Grid item xs={6} sm={3}>
          <BooleanSelector label="Join Type" value={joinChanges.isOuterJoin} trueLabel="Outer" falseLabel="Inner" onChange={(value) => handleSimplePropertyChange("isOuterJoin", value)} />
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="join-on-field"
            label="On Field"
            margin="dense"
            variant="outlined"
            name="join-on-field"
            onChange={handleOnFieldChange}
            value={joinChanges.onField}
          />
        </Grid>
        
        <Grid item xs={1} style={{ textAlign: "center" }}>
          <ForwardIcon style={{ marginTop: 8 }}/>
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="join-to-field"
            label="To Field"
            margin="dense"
            variant="outlined"
            name="join-to-field"
            onChange={handleToFieldChange}
            value={joinChanges.toField}
          />
        </Grid>
      </Grid>

      {/* <Grid container spacing={1} alignItems="center" className={classes.gridRow}>
        <Grid item xs={3}>
          <BooleanSelector label="Is List" value={joinChanges.isList} onChange={(value) => handleSimplePropertyChange("isList", value)} />
        </Grid>
        <Grid item xs={3}>
          <BinarySelector label="Filter Type" value={joinChanges.filterType} optionA="Show" optionB="Hide" onChange={(value) => handleSimplePropertyChange("filterType", value)} />
        </Grid>
      </Grid> */}

      <Grid 
        container
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
        className={classes.footer}
      >
        <Grid item container xs={6} alignItems="center" justifyContent="flex-start">
          <Grid item xs={3}>
            <BooleanSelector label="Is List" value={joinChanges.isList} onChange={(value) => handleSimplePropertyChange("isList", value)} />
          </Grid>
          {/* <Grid item>
            <Button 
              color="primary"
              startIcon={<AddIcon fontSize="small" />}
              size="small"
              onClick={handleAddSubJoin}
            >
              Sub Join
            </Button>
          </Grid> */}

        </Grid>
        
        <Grid item container xs={6} spacing={2} alignItems="center" justifyContent="flex-end">
          <Grid item>
            <Button 
              color="default"
              startIcon={<DeleteIcon fontSize="small" />}
              size="small"
              onClick={handleDeleteJoin}
            >
              Delete
            </Button>
          </Grid>

          <Grid item>
            <Button 
              type="submit"
              color="primary"
              variant="outlined"
              startIcon={<SaveIcon fontSize="small" />}
              size="small"
              onClick={handleSaveChanges}
            >
              Save
            </Button>
          </Grid>
          
        </Grid>
      </Grid>
      </form>

      { joinData.joins.length > 0 &&
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          className={classes.gridRow}
        >
          {joinData.joins.map((join) => {
            return (
              <JoinForm
                key={join.id}
                joinData={join}
                onDataChange={handleSimplePropertyChange}
                onDelete={handleDeleteJoin}
              />
            );
          })}
        </Grid>
      }
     
    </Paper>
  );
}
