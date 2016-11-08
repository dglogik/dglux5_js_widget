module dgluxjs {
    let onAddWidget: (type: string)=> void;

    let getDgModelValue: (model: any, field: string)=> any;

    let setDgModelValue: (model: any, field: string, value: any)=> void;

    let updateDgModelValue: (model: any, field: string, value: any)=> void;

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

    let dgJsWidgets: {[s: string]: WidgetType} = {};

    export function registerWidget(typeId: string, widgetType: WidgetType) {
        dgJsWidgets[typeId] = widgetType;
        if (onAddWidget != null) {
            onAddWidget(typeId);
        }
    }

    export function setDgJsCallback(onAddWidgetCallback: any,
                                    getModelValueCallback: any,
                                    setModelValueCallback: any,
                                    updateModelValueCallback: any): void {
        onAddWidget = onAddWidgetCallback;
        getDgModelValue = getModelValueCallback;
        setDgModelValue = setModelValueCallback;
        updateDgModelValue = updateModelValueCallback;
        for (let name in dgJsWidgets) {
            onAddWidget(name);
        }
    }

    export function newDgJsWidget(typeId: string, div: HTMLDivElement): Widget {
        if (dgJsWidgets.hasOwnProperty(typeId)) {
            return new dgJsWidgets[typeId](div);
        }
        return null;
    }

}