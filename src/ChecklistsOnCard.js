import React from 'react';

/**
 * @see https://github.com/norberteder/trello/blob/master/main.js
 */
class ChecklistsOnCard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.trello.getChecklistsOnCard(this.props.card.id).then(checklists =>{
      this.setState({"checklists": checklists});
    });
  }

  listCheckItems(items){
    //console.log(items);
    return (
      <ul>
        {items.map((element) => {
          return (<li key={element.id}>{element.name}</li>)
        })}
      </ul>
    )
  }

  render() {
    return (
      <ul>
        {this.state.checklists && this.state.checklists.map((checklist,id) =>{
          //Needs to use function to insert sub list
          return (
            <li key={id}>{checklist.name}
            <ul>
            {checklist.checkItems && this.listCheckItems(checklist.checkItems)}
            </ul></li>
          )
        }
        )
      }
      </ul>
    );
  }
  
  }

export default ChecklistsOnCard;
