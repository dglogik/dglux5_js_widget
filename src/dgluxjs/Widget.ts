module dgluxjs {
    let getDgModelValue: (model: any, field: string)=> any;

    let setDgModelValue: (model: any, field: string, value: any)=> void;

    let updateDgModelValue: (model: any, field: string, value: any)=> void;

    let getDgTableRows: (table: any)=> Array<Array<any>>;

    let getDgTableColumns: (table: any)=> Array<string>;

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

    export class Widget {

        getDefinition(): ParamsDefinition {
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

        constructor(div: HTMLDivElement) {
            this.parentDiv = div;
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

        destroy(): void {

        }
    }

    export type WidgetType = new (div: HTMLDivElement)=>Widget;

    export function setDgJsCallback(requireCallback: any,
                                    defineCallback: any,
                                    getModelValueCallback: any,
                                    setModelValueCallback: any,
                                    updateModelValueCallback: any,
                                    getTableRowsCallback: any,
                                    getTableColumnsCallback: any,
                                    getObjectTypeCallback: any): void {
        (window as any)['require'] = requireCallback;
        (window as any)['define'] = defineCallback;
        getDgModelValue = getModelValueCallback;
        setDgModelValue = setModelValueCallback;
        updateDgModelValue = updateModelValueCallback;
        getDgTableRows = getTableRowsCallback;
        getDgTableColumns = getTableColumnsCallback;
        getDgObjectType = getObjectTypeCallback;

    }

    export function callJsFunction(func: any, args: any[]): any {
        return (func as (...args: any[])=>any).call(null, args);
    }

    export function newDgJsWidget(module: any, div: HTMLDivElement): Widget {
        if (module.hasOwnProperty("create")) {
            return module["create"](div);
        }
        return null;
    }

}