import React from 'react';
import ChecklistsOnCard from './ChecklistsOnCard';
import CommentsOnCard from './CommentsOnCard';
import AttachmentsOnCard from './AttachmentsOnCard';

/**
 * @see https://github.com/norberteder/trello/blob/master/main.js
 */
class CardsOnList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.trello.getCardsOnList(this.props.list.id).then(cards =>{
      this.setState({"cards": cards});
    });
  }

  render() {
    return (
      <div>
        {this.state.cards && this.state.cards.map((card,id) =>{   
          //console.log(card);
          //console.log(this.props.trello.getCommentsOnCard(function(comment){console.log(comment.message);}));
          return (
            <div key={id}>
            <h4>{card.name}</h4>
            <p>{card.desc}</p>
            <CommentsOnCard  card={card} trello={this.props.trello} />
            <ChecklistsOnCard  card={card} trello={this.props.trello} />
            <AttachmentsOnCard  card={card} trello={this.props.trello} />
            </div>
          )
        }
        )
      }
      </div>
    );
  }
  
  }

export default CardsOnList;
