import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import uuid from 'uuid'; //gera ids pra simular um backend
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types'; //serve para descobrir as propriedades que um componente precisa


class ShoppingList extends Component {


static propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
}


  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

    render() {
        const { items } = this.props.item; //destruturação no react. Utilizando a palavra em {  } estamos pegando do state
        return (
          <Container>
            <ListGroup>
              <TransitionGroup className="shopping-list">
                {items.map(({ _id, name }) => (
                  <CSSTransition
                    key={_id}
                    timeout={500}
                    classNames="fade"
                  >
                    <ListGroupItem>
                      {this.props.isAuthenticated ? (
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                      ) : null}

                      {name}
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          </Container>
        );
    }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);//connect é do redux