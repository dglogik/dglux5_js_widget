module dgluxjs {
    let getDgModelValue: (model: any, field: string)=> any;
    let setDgModelValue: (model: any, field: string, value: any)=> void;
    let updateDgModelValue: (model: any, field: string, value: any)=> void;
    let updateDgModelTable: (model: any, field: string, columns: Array<string>, rows: Array<Array<any>>)=> void;
    let getDgTableRows: (table: any)=> Array<Array<any>>;
    let getDgTableColumns: (table: any)=> Array<string>;
    let getDgResourceUrl: (model: any, string: any)=> string;
    let getDgObjectType: (value: any) => string;

    export function getObjectType(value: any): string {
        let result = typeof value;
        if (result == 'object') {
            if (getDgObjectType != null) {
                return getDgObjectType(value);
            }
        }
        return result;
    }

    export function getTableRows(value: any): Array<Array<any>> {
        return getDgTableRows(value);
    }

    export function getTableColumns(value: any): Array<string> {
        return getDgTableColumns(value);
    }

    export class Widget {

        getDefinition(): dgluxjs.ParamsDefinition {
            return {
                "name": "",
                "variables": [],
                "layout": {
                    "type": "vbox",
                    "children": []
                }
            };
        };

        _model: any;
        parentDiv: HTMLDivElement;

        constructor(div: HTMLDivElement, model: any) {
            this.parentDiv = div;
            this._model = model;
        }

        setModel(model: any): void {
            this._model = model;
        }

        getModelValue(field: string): any {
            return getDgModelValue(this._model, field)
        }

        setModelValue(field: string, value: any): void {
            setDgModelValue(this._model, field, value);
        }

        updateModelValue(field: string, value: any): void {
            updateDgModelValue(this._model, field, value);
        }

        updateModelTable(field: string, columns: Array<string>, rows: Array<Array<any>>): void {
            updateDgModelTable(this._model, field, columns, rows);
        }

        getResourceUrl(value: string): string {
            return getDgResourceUrl(this._model, value);
        }

        static _blankPropMap: {[s: string]: (widget: Widget, value: any)=>void} = {};

        getPropMap(): {[s: string]: (widget: Widget, value: any)=>void} {
            return Widget._blankPropMap;
        }

        commitProperties(changes: string[]) {
            let map = this.getPropMap();
            if (changes == null) {
                for (let key in map) {
                    map[key](this, this.getModelValue(key));
                }

            } else {
                for (let i in changes) {
                    let key: string = changes[i];
                    let callback = map[key];
                    if (callback != null) {
                        callback(this, this.getModelValue(key));
                    }
                }
            }
        }

        /* will be called when definition.size == 'sensor' */
        onResize(): void {

        }

        destroyed: boolean = false;

        destroy(): void {

        }
    }

    export type WidgetType = new (div: HTMLDivElement)=>Widget;

    export function setDgJsCallback(requireCallback: any,
                                    defineCallback: any,
                                    getModelValueCallback: any,
                                    setModelValueCallback: any,
                                    updateModelValueCallback: any,
                                    updateModelTableCallback: any,
                                    getTableRowsCallback: any,
                                    getTableColumnsCallback: any,
                                    getResourceUrlCallback: any,
                                    getObjectTypeCallback: any): void {
        (window as any)['require'] = requireCallback;
        (window as any)['define'] = defineCallback;
        getDgModelValue = getModelValueCallback;
        setDgModelValue = setModelValueCallback;
        updateDgModelValue = updateModelValueCallback;
        updateDgModelTable = updateModelTableCallback;
        getDgTableRows = getTableRowsCallback;
        getDgTableColumns = getTableColumnsCallback;
        getDgResourceUrl = getResourceUrlCallback;
        getDgObjectType = getObjectTypeCallback;

    }

    export function callJsFunction(func: any, args: any[]): any {
        return (func as (...args: any[])=>any).apply(null, args);
    }

    export function newDgJsWidget(module: any, div: HTMLDivElement, model: any): Widget {
        if (module.hasOwnProperty("dgNewWidget")) {
            return module["dgNewWidget"](div, model);
        }
        return null;
    }

}