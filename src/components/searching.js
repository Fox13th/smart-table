import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(
        {skipEmptyTargetValues: true},
        rules.searchMultipleFields (searchField, ['date', 'customer', 'seller'], false)
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const searchValue = state[searchField];
        
        if (!searchValue || searchValue.trim() === '') {
            return data;
        }

        return data.filter(item => compare(item, searchValue));
    }
}