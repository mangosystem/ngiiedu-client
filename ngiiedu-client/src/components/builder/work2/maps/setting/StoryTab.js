import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { cyan500, limeA100 } from 'material-ui/styles/colors';
import MapsView from './MapsView';
import EditorPanel from './EditorPanel';
import StorySetting from './StorySetting';
import CreateItems from './CreateItems';
import DeleteItems from './DeleteItems';

import IconButton from 'material-ui/IconButton';
import IconAddBox from 'material-ui/svg-icons/content/add-box';
import IconEdit from 'material-ui/svg-icons/image/edit';
import IconDelete from 'material-ui/svg-icons/action/delete';

import ItemSort from './ItemSort';

class StoryTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maps: {},
            items: [{}],
            itemMode: 'map',
            itemOpen: false,
            deleteOpen: false,
            layerId: '',
            itemTitle: '',
            itemIndex: 0,
            isMount: false
        };
    }

    componentDidMount() {

        let items = this.props.maps.items;

        if (items.length >= 2) {
            let sortingField = 'priority';

            items.sort(function(a, b) { // 오름차순
                return a[sortingField] - b[sortingField];
            });
        }

        this.setState({
            maps: this.props.maps,
            items,
            tempTitle: items[0].title,
            itemIndex: 0,
            description: items[0].description,
            isMount: true
        });
    }

    setDefaultLayerId(defaultLayerId) {
        this.setState({
            defaultLayerId
        });
    }

    changeItemIndex(newIndex) {
        
        let { items, itemIndex, maps } = this.state;
        let newItem = [];

        for (let i=0; i<newIndex.length; i++) {
            for (let j=0; j<items.length; j++) {
                if (newIndex[i] == items[j].id) {
                    newItem.push(items[j]);
                }
            }
        }

        this.setState({
            items: newItem,
            description: newItem[itemIndex].description
        });

        let priority = [];

        for (let i=0; i<newItem.length; i++) {
            priority.push({
                itemId: newItem[i].id,
                priority: i+1
            });
        }
        priority = JSON.stringify(priority);
        ajaxJson(
            ['PUT', apiSvr + '/coursesWork/maps/' + maps.mapsId + '/itemOrder.json'],
            { priority },
            function (data) {
                console.log(data);
            }.bind(this),
            function (xhr, status, err) {
              alert('Error');
            }.bind(this)
        );

    }

    addItems(item) {

        this.setState({
            items: this.state.items.concat(item),
            itemIndex: this.state.items.length,
            description: ""
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
            items,
            description: items[itemIndex].description
        });

    }

    modifyDescription(description) {

        let { itemIndex, items } = this.state;
        let newItems = items;
        newItems[itemIndex].description = description;

        this.setState({
            description,
            items: newItems
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
            layerId: this.state.defaultLayerId
        });
    }

    render() {

        let { itemIndex } = this.state;

        let style = {

            seletedTab: {
                backgroundColor: '#3e81f6',
                borderRadius: '15px',
                color: 'white',
                marginLeft: '10px'
            },

            unSelectedTab: {
                backgroundColor: null,
                borderRadius: '15px',
                color: 'white',
                marginLeft: '10px',
                border: '1.5px solid white'
            }
        }

        return (
            <div>
                <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 40, backgroundColor: '#43444c' }}>
                    <div style={{display: 'flex', height: 40}}>        
                        <div style={{display: 'flex'}}>
                            {this.state.isMount ?
                            this.state.items.map((item, index) => (
                                <FlatButton 
                                    id={item.id}
                                    key={item.id}
                                    label={item.title}
                                    onClick={() => this.setState({ itemIndex: index, tempTitle: item.title, description: item.description })}
                                    style={itemIndex == index ? style.seletedTab : style.unSelectedTab}
                                >
                                </FlatButton>
                            )):null}
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: 30}}>
                            <IconButton 
                                //style={{width: 40, height: 30}}
                                onClick={this.changeItemModeToAdd.bind(this)}
                                tooltip="추가"
                                >
                                <IconAddBox
                                    color='white'                                    
                                />
                            </IconButton>                            
                            &nbsp;&nbsp;
                            <IconButton 
                                //style={{width: 40, height: 30}}
                                onClick={this.changeItemModeToEdit.bind(this)}
                                tooltip="편집"
                                >
                                <IconEdit
                                    color='white'                                    
                                />
                            </IconButton>                            
                            &nbsp;&nbsp;
                            <IconButton 
                                //style={{width: 40, height: 30}}
                                onClick={() => this.setState({ deleteOpen: true })}
                                tooltip="삭제"
                                >
                                <IconDelete
                                    color='white'                                    
                                />
                            </IconButton>
                            &nbsp;&nbsp;
                        </div>
                    </div>
                </div>
                {this.state.isMount && 
                    this.state.items[this.state.itemIndex].pinoLayer != '' ? 
                <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 400, height: '100%' }}>
                        <EditorPanel
                            description={this.state.description}
                            modifyDescription={this.modifyDescription.bind(this)}
                            mapsId={this.state.maps.mapsId}
                            itemId={this.state.items[this.state.itemIndex].id}
                            pinoLayer={this.state.items[this.state.itemIndex].pinoLayer}
                        />                      
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 400, right: 0 }}>
                        <MapsView
                            maps={this.state.maps}
                            items={this.state.items}
                            itemIndex={this.state.itemIndex}
                        />
                    </div>
                </div>
                :
                this.state.isMount ?
                <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
                    <EditorPanel
                        description={this.state.description}
                        modifyDescription={this.modifyDescription.bind(this)}
                        mapsId={this.state.maps.mapsId}
                        itemId={this.state.items[this.state.itemIndex].id}
                        pinoLayer=""
                    />
                </div>
                : null }
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
                        setDefaultLayerId={this.setDefaultLayerId.bind(this)}
                    />
                    <DeleteItems
                        open={this.state.deleteOpen}
                        deleteItemHandle={this.deleteItemHandle.bind(this)}
                        title={this.state.tempTitle}
                        deleteItem={this.deleteItem.bind(this)}
                    />
                    <ItemSort
                        open={this.props.open}
                        sortingHandle={this.props.sortingHandle.bind(this)}
                        items={this.state.items}
                        changeItemIndex={this.changeItemIndex.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default StoryTab;