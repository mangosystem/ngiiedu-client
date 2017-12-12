import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { cyan500, limeA100 } from 'material-ui/styles/colors';
import MapsView from './MapsView';
import EditorPanel from './EditorPanel';

import StorySetting from './StorySetting';
import CreateItems from './CreateItems';
import DeleteItems from './DeleteItems';

class StoryTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorMode: true,
            maps: {},
            items: [],
            itemMode: 'map',
            itemOpen: false,
            deleteOpen: false,
            layerId: '',
            itemTitle: ''
        };
    }

    addContent() {
        const div = document.createElement('div');
    
        div.innerHTML = '컨텐츠추가됨';
        $('#content').append(div);
    }

    componentWillMount() {

        let items = this.props.maps.items;

        if (items.length >= 2) {
            let sortingField = 'id';

            items.sort(function(a, b) { // 오름차순
                return a[sortingField] - b[sortingField];
            });
        }

        this.setState({
            maps: this.props.maps,
            items: this.props.maps.items,
            tempTitle: this.props.maps.items[0].title,
            itemIndex: 0
        });
    }

    addItems(item) {
        this.setState({
            items: this.state.items.concat(item)
        });
    }

    modifyItems(item) {
        let { items, itemIndex } = this.state;
        items[itemIndex] = item;

        this.setState({
            items: items
        });
    }

    changeItemTitle(itemTitle) {
        this.setState({
            itemTitle
        });
    }

    changeLayerId(layerId) {
        this.setState({
            layerId
        });
    }

    itemHandle() {
        this.setState({
            itemOpen: !this.state.itemOpen
        });
    }

    deleteItemHandle() {
        this.setState({
            deleteOpen: !this.state.deleteOpen
        });
    }

    deleteItem() {

        const { maps, itemIndex, items } = this.state;

        const mapsId = maps.mapsId;
        const itemId = items[itemIndex].id;

        ajaxJson(
            ['DELETE', apiSvr + '/coursesWork/maps/' + mapsId + "/item/" + itemId + '.json'],
            null,
            function (data) {
                
            }.bind(this),
            function (xhr, status, err) {
              alert('Error');
            }.bind(this)
        );

        items.splice(itemIndex, 1);

        this.setState({
            items
        });

    }

    changeItemModeToEdit() {

        const { items, itemIndex } = this.state;

        this.setState({
            itemMode: 'edit',
            itemOpen: true,
            itemTitle: items[itemIndex].title,
            layerId: items[itemIndex].pinoLayer
        });
    }

    changeItemModeToAdd() {
        this.setState({
            itemMode: 'add',
            itemOpen: true,
            itemTitle: '',
            layerId: this.state.items[0].pinoLayer
        });
    }

    render() {

        let { itemIndex } = this.state;

        return (
            <div>
                <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 60, backgroundColor: cyan500 }}>
                    <div style={{display: 'flex', height: 60}}>        
                        <div style={{display: 'flex', marginLeft: 10, alignItems: 'flex-end'}}>
                            {this.state.items.map((item, index) => (
                                <RaisedButton 
                                    key={item.id}
                                    label={item.title}
                                    onClick={() => this.setState({ itemIndex: index, tempTitle: item.title })}
                                    backgroundColor={itemIndex == index ? limeA100 : null}
                                />
                            ))}
                        </div>
            
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: 30}}>
                            <RaisedButton
                                label="추가"
                                onClick={this.changeItemModeToAdd.bind(this)}
                            />&nbsp;&nbsp;
                            <RaisedButton
                                label="편집"
                                onClick={this.changeItemModeToEdit.bind(this)}
                            />&nbsp;&nbsp;
                            <RaisedButton
                                label="삭제"
                                onClick={() => this.setState({ deleteOpen: true })}
                            />&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: 120, bottom: 0, left: 0, right: 0 }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 300 }}>
                        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-around'}}>
                            <FlatButton
                                label="컨텐츠 추가"
                                backgroundColor={cyan500}
                                style={{color: 'white'}}
                                onClick={this.addContent.bind(this)}
                            />
                            <FlatButton
                                label="그래프 추가"
                                backgroundColor={cyan500}
                                style={{color: 'white'}}
                            />
                        </div>
                        <div id="content" style={{margin: '15px 0', textAlign: 'center'}}>
                            여기에 컨텐츠가 추가
                            <EditorPanel
                                editorMode={this.state.editorMode}
                            />
                        </div>
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 300, right: 0 }}>
                        <MapsView
                            onChangeEditMode={this.onChangeEditMode}
                            maps={this.state.maps}
                            itemIndex={this.state.itemIndex}
                        />
                    </div>
                </div>
                <div>
                    <CreateItems 
                        open={this.state.itemOpen}
                        mode={this.state.itemMode}
                        itemHandle={this.itemHandle.bind(this)}
                        itemTitle={this.state.itemTitle}
                        item={this.state.items[itemIndex]}
                        changeItemTitle={this.changeItemTitle.bind(this)}
                        layerId={this.state.layerId}
                        changeLayerId={this.changeLayerId.bind(this)}
                        mapsId={this.state.maps.mapsId}
                        addItems={this.addItems.bind(this)}
                        modifyItems={this.modifyItems.bind(this)}
                    />
                    <DeleteItems
                        open={this.state.deleteOpen}
                        deleteItemHandle={this.deleteItemHandle.bind(this)}
                        title={this.state.tempTitle}
                        deleteItem={this.deleteItem.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default StoryTab;