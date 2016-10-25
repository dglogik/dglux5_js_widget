module dgluxjs {

    export interface ParamDefinition {

        /** name */
        n: string;

        /** type */
        t: string;

        minimum?: number;
        maximum?: number;
        precision?: number;

        enums?: string[];
    }
    export type LayoutType = "vbox" | "hbox" | "section";

    export interface LayoutDefinition {
        type: LayoutType;
        children: (LayoutDefinition|string)[];
        label?: string;
    }

    export interface ParamsDefinition {
        name: string;
        "!var": ParamDefinition[];
        "!layout": LayoutDefinition;
    }
}