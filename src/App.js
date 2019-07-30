import React from 'react';
import './App.css';
import Trello from 'trello';
import ListsOnBoard from './ListsOnBoard';

//Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
 
//expect config json to have: config.apiKey, config.token and config.memberId
import config from './.env.local.json';


/**
 * @see https://github.com/norberteder/trello/blob/master/main.js
 * @see https://developers.trello.com/docs/api-introduction
 */
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiKey: config.apiKey,
      token: config.token,
      memberId: config.memberId,
    };

    //Set Material UI Styles 
    this.useStyles = makeStyles(theme => ({
      container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      button: {
        minWidth: 1,
      },
      dense: {
        marginTop: 19,
      },
      menu: {
        width: 200,
      },
    }));


    this.classes = this.useStyles.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getBoards = this.getBoards.bind(this);
  }

  handleInputChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  }

  getBoards () {
    var trello;
    if (this.state.trello) {
      trello = this.state.trello;
    } else {
      trello = new Trello(this.state.apiKey, this.state.token);
    }
    trello.getBoards(this.state.memberId).then(boards => {
      this.setState({
        "boards": boards,
        "trello": trello
      });
    });
  }

  render () {
    return (
      <Container maxWidth="lg">
        <Typography variant="h1" component="h1" gutterBottom>
          Extract from Trello
        </Typography>
        <div>
          
        <Typography variant="h2" component="h2" gutterBottom>
          Configuration
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>Complete or correct the API key, access token and your member ID from Trello.  
          When the "Get Boards" button is clicked, Boards and their content will be retreived 
          from Trello and built into an in-line document below.  
          Then simply copy/paste into your preferred target environment.</Typography>
          <form className={this.classes.container} noValidate autoComplete="off">
            <TextField
              fullWidth
              id="apiKey"
              label="API Key"
              className={this.classes.textField}
              defaultValue={this.state.apiKey}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="token"
              label="Token"
              className={this.classes.textField}
              defaultValue={this.state.token}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="memberId"
              label="Member ID"
              className={this.classes.textField}
              defaultValue={this.state.memberId}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={this.getBoards} 
                className={this.classes.button}>
              Get Boards
            </Button>
          </form>
        </div>
        <hr />
        <div>
          {this.state.boards && this.state.boards.map((board, id) => {
            return (
              <div key={id}>
                <Typography variant="h2" component="h2" gutterBottom>
                  {board.name}
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  {board.desc}
                </Typography>
                <ListsOnBoard board={board} trello={this.state.trello} />
              </div>
            )
          }
          )
          }
        </div>
      </Container>
    );
  }

}

export default App;
