import {Utils as _} from "../utils";
import {GridOptionsWrapper} from "../gridOptionsWrapper";
import {PopupService} from "../widgets/popupService";
import {ValueService} from "../valueService/valueService";
import {ColumnController} from "../columnController/columnController";
import {RowNode} from "../entities/rowNode";
import {Column} from "../entities/column";
import {TextFilter} from "./textFilter";
import {NumberFilter} from "./numberFilter";
import {Bean, PreDestroy, Autowired, PostConstruct, Context} from "../context/context";
import {IRowModel} from "../interfaces/iRowModel";
import {EventService} from "../eventService";
import {Events} from "../events";
import {IFilter, IFilterParams, IDoesFilterPassParams, IFilterComp} from "../interfaces/iFilter";
import {GetQuickFilterTextParams} from "../entities/colDef";
import {DateFilter} from "./dateFilter";
import {ComponentProvider} from "../componentProvider";

@Bean('filterManager')
export class FilterManager {

    @Autowired('$compile') private $compile: any;
    @Autowired('$scope') private $scope: any;
    @Autowired('gridOptionsWrapper') private gridOptionsWrapper: GridOptionsWrapper;
    @Autowired('gridCore') private gridCore: any;
    @Autowired('popupService') private popupService: PopupService;
    @Autowired('valueService') private valueService: ValueService;
    @Autowired('columnController') private columnController: ColumnController;
    @Autowired('rowModel') private rowModel: IRowModel;
    @Autowired('eventService') private eventService: EventService;
    @Autowired('enterprise') private enterprise: boolean;
    @Autowired('context') private context: Context;
    @Autowired('componentProvider') private componentProvider: ComponentProvider;

    public static QUICK_FILTER_SEPARATOR = '\n';

    private allFilters: any = {};
    private quickFilter: string = null;

    private advancedFilterPresent: boolean;
    private externalFilterPresent: boolean;

    private availableFilters: {[key: string]: any} = {
        'text': TextFilter,
        'number': NumberFilter,
        'date': DateFilter
    };

    @PostConstruct
    public init(): void {
        this.eventService.addEventListener(Events.EVENT_ROW_DATA_CHANGED, this.onNewRowsLoaded.bind(this));
        this.eventService.addEventListener(Events.EVENT_NEW_COLUMNS_LOADED, this.onNewColumnsLoaded.bind(this));

        this.quickFilter = this.parseQuickFilter(this.gridOptionsWrapper.getQuickFilterText());

        // check this here, in case there is a filter from the start
        this.checkExternalFilter();
    }

    public registerFilter(key: string, Filter: any): void {
        this.availableFilters[key] = Filter;
    }

    public setFilterModel(model: any) {
        if (model) {
            // mark the filters as we set them, so any active filters left over we stop
            let modelKeys = Object.keys(model);
            _.iterateObject(this.allFilters, (colId: string, filterWrapper: FilterWrapper) => {
                _.removeFromArray(modelKeys, colId);
                let newModel = model[colId];
                this.setModelOnFilterWrapper(filterWrapper.filter, newModel);
            });
            // at this point, processedFields contains data for which we don't have a filter working yet
            _.iterateArray(modelKeys, (colId) => {
                let column = this.columnController.getPrimaryColumn(colId);
                if (!column) {
                    console.warn('Warning ag-grid setFilterModel - no column found for colId ' + colId);
                    return;
                }
                let filterWrapper = this.getOrCreateFilterWrapper(column);
                this.setModelOnFilterWrapper(filterWrapper.filter, model[colId]);
            });
        } else {
            _.iterateObject(this.allFilters, (key, filterWrapper) => {
                this.setModelOnFilterWrapper(filterWrapper.filter, null);
            });
        }
        this.onFilterChanged();
    }

    private setModelOnFilterWrapper(filter: IFilterComp, newModel: any) {
        if (typeof filter.setModel !== 'function') {
            console.warn('Warning ag-grid - filter missing setModel method, which is needed for setFilterModel');
            return;
        }
        filter.setModel(newModel);
    }

    public getFilterModel() {
        let result = <any>{};
        _.iterateObject(this.allFilters, function (key: any, filterWrapper: any) {
            // because user can provide filters, we provide useful error checking and messages
            let filter: IFilterComp = filterWrapper.filter;
            if (typeof filter.getModel !== 'function') {
                console.warn('Warning ag-grid - filter API missing getModel method, which is needed for getFilterModel');
                return;
            }
            let model = filter.getModel();
            if (_.exists(model)) {
                result[key] = model;
            }
        });
        return result;
    }

    // returns true if any advanced filter (ie not quick filter) active
    public isAdvancedFilterPresent() {
        return this.advancedFilterPresent;
    }

    private setAdvancedFilterPresent() {
        let atLeastOneActive = false;

        _.iterateObject(this.allFilters, function (key, filterWrapper) {
            if (filterWrapper.filter.isFilterActive()) {
                atLeastOneActive = true;
            }
        });

        this.advancedFilterPresent = atLeastOneActive;
    }

    private updateFilterFlagInColumns(): void {
        _.iterateObject(this.allFilters, function (key, filterWrapper) {
            let filterActive = filterWrapper.filter.isFilterActive();
            filterWrapper.column.setFilterActive(filterActive);
        });
    }

    // returns true if quickFilter or advancedFilter
    public isAnyFilterPresent(): boolean {
        return this.isQuickFilterPresent() || this.advancedFilterPresent || this.externalFilterPresent;
    }

    private doesFilterPass(node: RowNode, filterToSkip?: any) {
        let data = node.data;
        let colKeys = Object.keys(this.allFilters);
        for (let i = 0, l = colKeys.length; i < l; i++) { // critical code, don't use functional programming
            let colId = colKeys[i];
            let filterWrapper = this.allFilters[colId];

            // if no filter, always pass
            if (filterWrapper === undefined) {
                continue;
            }

            if (filterWrapper.filter === filterToSkip) {
                continue
            }

            // don't bother with filters that are not active
            if (!filterWrapper.filter.isFilterActive()) {
                continue;
            }

            if (!filterWrapper.filter.doesFilterPass) { // because users can do custom filters, give nice error message
                console.error('Filter is missing method doesFilterPass');
            }
            let params: IDoesFilterPassParams = {
                node: node,
                data: data
            };
            if (!filterWrapper.filter.doesFilterPass(params)) {
                return false;
            }
        }
        // all filters passed
        return true;
    }

    private parseQuickFilter(newFilter: string): string {
        if (_.missing(newFilter) || newFilter === "") {
            return null;
        }

        if (this.gridOptionsWrapper.isRowModelInfinite()) {
            console.warn('ag-grid: cannot do quick filtering when doing virtual paging');
            return null;
        }

        return newFilter.toUpperCase();
    }

    // returns true if it has changed (not just same value again)
    public setQuickFilter(newFilter: any): void {
        let parsedFilter = this.parseQuickFilter(newFilter);
        if (this.quickFilter !== parsedFilter) {
            this.quickFilter = parsedFilter;
            this.onFilterChanged();
        }
    }

    private checkExternalFilter(): void {
        this.externalFilterPresent = this.gridOptionsWrapper.isExternalFilterPresent();
    }

    public onFilterChanged(): void {
        this.setAdvancedFilterPresent();
        this.updateFilterFlagInColumns();
        this.checkExternalFilter();

        _.iterateObject(this.allFilters, function (key, filterWrapper) {
            if (filterWrapper.filter.onAnyFilterChanged) {
                filterWrapper.filter.onAnyFilterChanged();
            }
        });

        this.eventService.dispatchEvent(Events.EVENT_FILTER_CHANGED);
    }

    public isQuickFilterPresent(): boolean {
        return this.quickFilter !== null;
    }

    public doesRowPassOtherFilters(filterToSkip: any, node: any): boolean {
        return this.doesRowPassFilter(node, filterToSkip);
    }

    private doesRowPassQuickFilterNoCache(node: RowNode): boolean {
        let columns = this.columnController.getAllPrimaryColumns();
        let filterPasses = false;
        columns.forEach( column => {
            if (filterPasses) { return; }
            let part = this.getQuickFilterTextForColumn(column, node);
            if (_.exists(part)) {
                if (part.indexOf(this.quickFilter)>=0) {
                    filterPasses = true;
                }
            }
        });
        return filterPasses;
    }

    private doesRowPassQuickFilterCache(node: any): boolean {
        if (!node.quickFilterAggregateText) {
            this.aggregateRowForQuickFilter(node);
        }
        let filterPasses = node.quickFilterAggregateText.indexOf(this.quickFilter) >= 0;
        return filterPasses;
    }

    private doesRowPassQuickFilter(node: any): boolean {
        let filterPasses: boolean;
        if (this.gridOptionsWrapper.isCacheQuickFilter()) {
            filterPasses = this.doesRowPassQuickFilterCache(node);
        } else {
            filterPasses = this.doesRowPassQuickFilterNoCache(node);
        }
        return filterPasses;
    }

    public doesRowPassFilter(node: any, filterToSkip?: any): boolean {

        // the row must pass ALL of the filters, so if any of them fail,
        // we return true. that means if a row passes the quick filter,
        // but fails the column filter, it fails overall

        // first up, check quick filter
        if (this.isQuickFilterPresent()) {
            if (!this.doesRowPassQuickFilter(node)) {
                return false;
            }
        }

        // secondly, give the client a chance to reject this row
        if (this.externalFilterPresent) {
            if (!this.gridOptionsWrapper.doesExternalFilterPass(node)) {
                return false;
            }
        }

        // lastly, check our internal advanced filter
        if (this.advancedFilterPresent) {
            if (!this.doesFilterPass(node, filterToSkip)) {
                return false;
            }
        }

        // got this far, all filters pass
        return true;
    }

    private getQuickFilterTextForColumn(column: Column, rowNode: RowNode): string {
        let value = this.valueService.getValue(column, rowNode);

        let valueAfterCallback: any;
        let colDef = column.getColDef();
        if (column.getColDef().getQuickFilterText) {
            let params: GetQuickFilterTextParams = {
                value: value,
                node: rowNode,
                data: rowNode.data,
                column: column,
                colDef: colDef
            };
            valueAfterCallback = column.getColDef().getQuickFilterText(params);
        } else {
            valueAfterCallback = value;
        }

        if (valueAfterCallback && valueAfterCallback !== '') {
            return valueAfterCallback.toString().toUpperCase();
        } else {
            return null;
        }
    }

    private aggregateRowForQuickFilter(node: RowNode) {
        let stringParts: string[] = [];
        let columns = this.columnController.getAllPrimaryColumns();
        columns.forEach( column => {
            let part = this.getQuickFilterTextForColumn(column, node);
            if (_.exists(part)) {
                stringParts.push(part);
            }
        });
        node.quickFilterAggregateText = stringParts.join(FilterManager.QUICK_FILTER_SEPARATOR);
    }

    private onNewRowsLoaded() {
        _.iterateObject(this.allFilters, function (key, filterWrapper) {
            if (filterWrapper.filter.onNewRowsLoaded) {
                filterWrapper.filter.onNewRowsLoaded();
            }
        });
        this.updateFilterFlagInColumns();
        this.setAdvancedFilterPresent();
    }

    private createValueGetter(column: Column) {
        let that = this;
        return function valueGetter(node: RowNode) {
            return that.valueService.getValue(column, node);
        };
    }

    public getFilterComponent(column: Column) {
        let filterWrapper = this.getOrCreateFilterWrapper(column);
        return filterWrapper.filter;
    }

    public getOrCreateFilterWrapper(column: Column): FilterWrapper {
        let filterWrapper = this.cachedFilter(column);

        if (!filterWrapper) {
            filterWrapper = this.createFilterWrapper(column);
            this.allFilters[column.getColId()] = filterWrapper;
        }

        return filterWrapper;
    }

    public cachedFilter (column: Column):FilterWrapper{
        return this.allFilters[column.getColId()];
    }

    private createFilterInstance(column: Column): IFilterComp {
        let filter = column.getFilter();
        let filterIsComponent = typeof filter === 'function';
        let filterIsName = _.missing(filter) || typeof filter === 'string';
        let FilterClass: {new():IFilterComp};
        if (filterIsComponent) {
            // if user provided a filter, just use it
            FilterClass = <{new(): IFilterComp}> filter;
            // now create filter (had to cast to any to get 'new' working)
            this.assertMethodHasNoParameters(FilterClass);
        } else if (filterIsName) {
            let filterName = <string> filter;
            FilterClass = this.getFilterFromCache(filterName);
        } else {
            console.error('ag-Grid: colDef.filter should be function or a string');
            return null;
        }

        let filterInstance = new FilterClass();
        this.checkFilterHasAllMandatoryMethods(filterInstance, column);
        this.context.wireBean(filterInstance);

        return filterInstance;
    }

    private checkFilterHasAllMandatoryMethods(filterInstance: IFilter, column: Column): void {
        // help the user, check the mandatory methods exist
        ['getGui','isFilterActive','doesFilterPass','getModel','setModel'].forEach( methodName => {
            let methodIsMissing = !(<any>filterInstance)[methodName];
            if (methodIsMissing) {
                throw `Filter for column ${column.getColId()} is missing method ${methodName}`;
            }
        });
    }

    private createParams(filterWrapper: FilterWrapper): IFilterParams {
        let filterChangedCallback = this.onFilterChanged.bind(this);
        let filterModifiedCallback = () => this.eventService.dispatchEvent(Events.EVENT_FILTER_MODIFIED);
        let doesRowPassOtherFilters = this.doesRowPassOtherFilters.bind(this, filterWrapper.filter);

        let colDef = filterWrapper.column.getColDef();

        let params: IFilterParams = {
            column: filterWrapper.column,
            colDef: colDef,
            rowModel: this.rowModel,
            filterChangedCallback: filterChangedCallback,
            filterModifiedCallback: filterModifiedCallback,
            valueGetter: this.createValueGetter(filterWrapper.column),
            doesRowPassOtherFilter: doesRowPassOtherFilters,
            context: this.gridOptionsWrapper.getContext(),
            $scope: filterWrapper.scope
        };

        if (colDef.filterParams) {
            _.assign(params, colDef.filterParams);
        }

        return params;
    }

    private createFilterWrapper(column: Column): FilterWrapper {
        let filterWrapper: FilterWrapper = {
            column: column,
            filter: <IFilterComp> null,
            scope: <any> null,
            gui: <HTMLElement> null
        };

        filterWrapper.filter = this.createFilterInstance(column);

        this.initialiseFilterAndPutIntoGui(filterWrapper);

        return filterWrapper;
    }

    private initialiseFilterAndPutIntoGui(filterWrapper: FilterWrapper): void {
        // first up, create child scope if needed
        if (this.gridOptionsWrapper.isAngularCompileFilters()) {
            filterWrapper.scope = this.$scope.$new();
            filterWrapper.scope.context = this.gridOptionsWrapper.getContext();
        }

        let params = this.createParams(filterWrapper);
        filterWrapper.filter.init(params);

        let eFilterGui = document.createElement('div');
        eFilterGui.className = 'ag-filter';
        let guiFromFilter = filterWrapper.filter.getGui();

        // for backwards compatibility with Angular 1 - we
        // used to allow providing back HTML from getGui().
        // once we move away from supporting Angular 1
        // directly, we can change this.
        if (typeof guiFromFilter === 'string') {
            guiFromFilter = _.loadTemplate(<string>guiFromFilter);
        }

        eFilterGui.appendChild(guiFromFilter);

        if (filterWrapper.scope) {
            filterWrapper.gui = this.$compile(eFilterGui)(filterWrapper.scope)[0];
        } else {
            filterWrapper.gui = eFilterGui;
        }
    }

    private getFilterFromCache(filterType: string): any {
        let defaultFilterType = this.enterprise ? 'set' : 'text';
        let defaultFilter = this.availableFilters[defaultFilterType];

        if (_.missing(filterType)) {
            return defaultFilter;
        }

        if (!this.enterprise && filterType==='set') {
            console.warn('ag-Grid: Set filter is only available in Enterprise ag-Grid');
            filterType = 'text';
        }

        if (this.availableFilters[filterType]) {
            return this.availableFilters[filterType];
        } else {
            console.error('ag-Grid: Could not find filter type ' + filterType);
            return this.availableFilters[defaultFilter];
        }
    }

    private onNewColumnsLoaded(): void {
        this.destroy();
    }

    // destroys the filter, so it not longer takes part
    public destroyFilter(column: Column): void {
        let filterWrapper = this.allFilters[column.getColId()];
        if (filterWrapper) {
            this.disposeFilterWrapper(filterWrapper);
            this.onFilterChanged();
        }
    }

    private disposeFilterWrapper(filterWrapper: FilterWrapper): void {
        filterWrapper.filter.setModel(null);
        if (filterWrapper.filter.destroy) {
            filterWrapper.filter.destroy();
        }
        filterWrapper.column.setFilterActive(false);
        delete this.allFilters[filterWrapper.column.getColId()];
    }

    @PreDestroy
    public destroy() {
        _.iterateObject(this.allFilters, (key: string, filterWrapper: any) => {
            this.disposeFilterWrapper(filterWrapper);
        });
    }

    private assertMethodHasNoParameters(theMethod: any) {
        let getRowsParams = _.getFunctionParameters(theMethod);
        if (getRowsParams.length > 0) {
            console.warn('ag-grid: It looks like your filter is of the old type and expecting parameters in the constructor.');
            console.warn('ag-grid: From ag-grid 1.14, the constructor should take no parameters and init() used instead.');
        }
    }

}

export interface FilterWrapper {
    column: Column,
    filter: IFilterComp,
    scope: any,
    gui: HTMLElement
}
