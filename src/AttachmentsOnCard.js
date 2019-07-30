import React from 'react';

/**
 * @see https://github.com/norberteder/trello/blob/master/main.js
 */
class AttachmentsOnCard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.trello.getAttachmentsOnCard(this.props.card.id).then(attachments =>{
      this.setState({"attachments": attachments});
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
    //console.log(this.state.attachments);
    return (
      <ul>
        {this.state.attachments && this.state.attachments.map((attachment,id) =>{   
          //console.log(attachment);
          //console.log(this.props.trello.getCommentsOnCard(function(comment){console.log(comment.message);}));
          return (
            <li key={id}>
            <a href={attachment.url}>{attachment.name}</a>
            </li>
          )
        }
        )
      }
      </ul>
    );
  }
  
  }

export default AttachmentsOnCard;
