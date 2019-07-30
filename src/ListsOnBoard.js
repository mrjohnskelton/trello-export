import React from 'react';
import CardsOnList from './CardsOnList';

/**
 * @see https://github.com/norberteder/trello/blob/master/main.js
 */
class ListsOnBoard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.trello.getListsOnBoard(this.props.board.id).then(lists =>{
      this.setState({"lists": lists});
    });
  }

  render() {
    return (
      <div>
        {this.state.lists && this.state.lists.map((list,id) =>{
          return (
            <div key={id}>
            <h2>{list.name}</h2>
            <p>{list.desc}</p>
            <CardsOnList list={list} trello={this.props.trello} />
            </div>
          )
        }
        )
      }
      </div>
    );
  }
  
  }

export default ListsOnBoard;
