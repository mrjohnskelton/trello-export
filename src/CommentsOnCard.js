import React from 'react';

/**
 * @see https://github.com/norberteder/trello/blob/master/main.js
 */
class CommentsOnCard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.trello.getCommentsOnCard(this.props.card.id).then(actions =>{
      //console.log(actions);
      this.setState({"actions": actions});
    });
  }

  render() {
    return (
      <ul>
        {this.state.actions && this.state.actions.map((action,id) =>{
          return (
            <li key={id}>
            {action.data.text}
            </li>
          )
        }
        )
      }
      </ul>
    );
  }
  
  }

export default CommentsOnCard;
