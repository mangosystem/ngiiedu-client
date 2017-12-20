import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import Sortable from './Sortable';

import '../main/Maps.css';

class ItemSort extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: []
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            items: nextProps.items
        });
    }

    componentDidMount() {    
   
    }

    componentWillMount() {
        this.setState({
            items: this.props.items
        });
    }

    handleOnChange(event, ui) {
        // Attach any custom behavior here
        //console.log(event.target.children);

        if (this.state.children) {
            this.setState({
                old: this.state.children
            });
        } else {
            this.setState({
                old: this.state.items
            });
        }

        this.setState({
            children: event.target.children
        });
    }

    sortItem() {
        let { children } = this.state;

        if (!children) {
            this.props.sortingHandle();
            return;
        }

        let index = [];

        for (let i=0; i<children.length; i++) {
            index.push(children[i].id);
        }

        this.props.changeItemIndex(index);
        this.props.sortingHandle();
    }

    cancel() {

        if (this.state.old) {
            this.setState({
                children: this.state.old
            });
        }

        this.props.sortingHandle();
    }

    render() {

        const actions = [
            <FlatButton
                label="취소"
                onClick={this.cancel.bind(this)}
            />,
            <FlatButton
                label="변경"
                backgroundColor={cyan500}
                style={{color: 'white'}}
                onClick={this.sortItem.bind(this)}
            />
        ];

        return (
            <Dialog
                title="순서 변경"
                actions={actions}
                open={this.props.open}
                autoScrollBodyContent={false}
                contentStyle={{width: '35%'}}
            >
                <Sortable
                    opacity={0.8}
                    data={this.state.items}
                    onChange={this.handleOnChange.bind(this)} 
                />
            </Dialog>
        );
    }
}

export default ItemSort;