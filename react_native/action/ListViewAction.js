/**
 * Created by songzhiyang on 2017/4/28.
 */

import AppDispatcher from '../dispatcher/AppDispatcher';

export default class ListViewAction {
    static action_load_data_province(rowData) {
        AppDispatcher.getDispatcher().dispatch({
            actionType:'loadDataProvince',
            rowData:rowData,
        });
    }

    static action_load_data_cities(rowData) {
        AppDispatcher.getDispatcher().dispatch({
            actionType:'loadDataCities',
            rowData:rowData,
        });
    }

    static action_load_data_countries(rowData) {
        AppDispatcher.getDispatcher().dispatch({
            actionType:'loadDataCountries',
            rowData:rowData,
        });
    }
}