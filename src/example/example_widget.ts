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
                "variables": [{"t": "string", "n": "colorStr"}],
                "layout": {
                    "type": "vbox",
                    "children": ["colorStr"]
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
    dgluxjs.registerWidget('example', ExampleWidget);
}