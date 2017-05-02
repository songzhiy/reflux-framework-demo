/**
 * Created by songzhiyang on 2017/4/25.
 */
import React, {Component, PropTypes} from 'react';
import {
    ListView, View, Text,
} from 'react-native';
import {styles as StyleContainer} from "../styles/StyleContainer";
import ListDataStore from "../store/ListDataStore";

export default class ChooseListView extends Component {
    ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    });

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.data),
        }
        this._chooseOrJump = this._chooseOrJump.bind(this);
        this._loadData = this._loadData.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    componentDidMount() {
        console.log('inner componentDidMount');
        this._loadData();
    }

    componentWillUnmount() {
        console.log('inner componentWillUnmount');
    }

    updateData(data) {
        this.setState({
                dataSource: this.ds.cloneWithRows(data),
            }
        );
    }

    async _loadData() {
        let response = await this.props.fetchData();
    }

    _chooseOrJump(rowData) {
        this.props.jumpPage(rowData);
    }

    _onPressItem(rowData) {
        this._chooseOrJump(rowData);
    }

    _getRenderRow(rowData) {
        return (
            <View>
                <Text style={[StyleContainer.centerTextStyle, StyleContainer.font14]}
                      onPress={() => this._onPressItem(rowData)}>{rowData.name}</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <Text style={[StyleContainer.centerTextStyle, StyleContainer.font20]}>{this.props.title}</Text>
                <ListView enableEmptySections={true} renderRow={(rowData) => this._getRenderRow(rowData)}
                          dataSource={this.state.dataSource} />
            </View>
        )
    }
}

ChooseListView.propTypes = {
    ...View.propTypes,
    title: PropTypes.string,
    data: PropTypes.array,
    jumpPage:PropTypes.func,
    fetchData:PropTypes.func,
};

ChooseListView.defaultProps = {
    title: '请选择',
    data: [],
};