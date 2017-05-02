/**
 * Created by songzhiyang on 2017/4/28.
 */

import LoadDataUsecase from "../usecase/LoadDataUsecase";
const EventEmitter = require('events').EventEmitter;

export default class ListDataStore extends EventEmitter {
    static items = [];
    static listDataStore = null;

    constructor(props) {
        super(props);
        this.getAll = this.getAll.bind(this);
        this.loadProvinceData = this.loadProvinceData.bind(this);
        this.emitProviceChange = this.emitProviceChange.bind(this);
        this.emitCityChange = this.emitCityChange.bind(this);
        this.emitCountryChange = this.emitCountryChange.bind(this);
        this.addOnProvinceChangeListener = this.addOnProvinceChangeListener.bind(this);
        this.removeOnProvinceChangeListener = this.removeOnProvinceChangeListener.bind(this);
        this.addOnCityChangeListener = this.addOnCityChangeListener.bind(this);
        this.removeOnCityChangeListener = this.removeOnCityChangeListener.bind(this);
        this.addOnCountryChangeListener = this.addOnCountryChangeListener.bind(this);
        this.removeOnCountryChangeListener = this.removeOnCountryChangeListener.bind(this);
        this.loadCitiesData = this.loadCitiesData.bind(this);
        this.loadCountriesData = this.loadCountriesData.bind(this);
    }

    static getListDataStore() {
        if (this.listDataStore === null) {
            this.listDataStore = new ListDataStore();
        }
        return this.listDataStore;
    }

    getAll() {
        return this.items;
    }

    async loadProvinceData(rowData) {
        this.items = await LoadDataUsecase.loadProvinceData(rowData);
        this.emitProviceChange();
    }

    async loadCitiesData(rowData) {
        this.items = await LoadDataUsecase.loadCitiesData(rowData);
        this.emitCityChange();
    }

    async loadCountriesData(rowData) {
        this.items = await LoadDataUsecase.loadCountriesData(rowData);
        this.emitCountryChange();
    }

    emitProviceChange() {
        this.emit('onProvinceChange');
    }

    emitCityChange() {
        this.emit('onCityChange');
    }

    emitCountryChange() {
        this.emit('onCountryChange');
    }

    addOnProvinceChangeListener(callback) {
        this.on('onProvinceChange',callback);
    }

    removeOnProvinceChangeListener(callback) {
        this.removeListener('onProvinceChange',callback);
    }

    addOnCityChangeListener(callback) {
        this.on('onCityChange',callback);
    }

    removeOnCityChangeListener(callback) {
        this.removeListener('onCityChange',callback);
    }

    addOnCountryChangeListener(callback) {
        this.on('onCountryChange',callback);
    }

    removeOnCountryChangeListener(callback) {
        this.removeListener('onCountryChange',callback);
    }
}