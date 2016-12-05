/// <reference path="../dgluxjs/dgluxjs.d.ts" />
module example {
    export class ExampleWidget extends dgluxjs.Widget {

        contentDiv: HTMLDivElement;

        constructor(div: HTMLDivElement) {
            super(div);
            this.contentDiv = document.createElement('div');
            this.contentDiv.style.width = "100%";
            this.contentDiv.style.height = "100%";
            div.appendChild(this.contentDiv);
        }

        getDefinition(): dgluxjs.ParamsDefinition {
            return {
                "name": "",
                "variables": [{"t": "string", "n": "colorStr"}, {"t": "tabledata", "n": "table"}],
                "layout": {
                    "type": "vbox",
                    "children": ["colorStr", "table"]
                }
            };
        };

        static _blankPropMap: {[s: string]: (widget: ExampleWidget, value: any)=>void} = {
            "colorStr": function (widget: ExampleWidget, value: any) {
                widget.contentDiv.style.background = value;
            }
        };

        getPropMap(): {[s: string]: (widget: dgluxjs.Widget, value: any)=>void} {
            return ExampleWidget._blankPropMap;
        }
    }

    export function create(div: HTMLDivElement): dgluxjs.Widget {
        return new ExampleWidget(div);
    }
}