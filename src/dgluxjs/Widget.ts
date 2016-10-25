module dgluxjs {
    export class Widget {
        getDefinition(): ParamsDefinition {
            return {
                "name": "",
                "!var": [],
                "!layout": {
                    "type": "vbox",
                    "children": []
                }
            };
        };

        _model: any;

        setModel(model: any): void {
            this._model = model;
        }

        getModelValue(key: string) {
            //TODO
        }

        updateModelValue(key: string, value: any) {
            //TODO
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
                for (let key in changes) {
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
}