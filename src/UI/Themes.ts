// type OvoTheme = {
//     // name: string,
//     // description: string,
//     primary: string, // is for text and icons
//     secondary: string, // is for background
//     accent: string, // is for buttons
//     hint: string, // is for text that is not important
// }

type ThemeProp = {
    name?: string,
    description?: string,
    primary?: string,
    secondary?: string,
    accent?: string,
    accentText?: string,

    hint?: string,
}

class OVOTheme {
    readonly name: string;
    readonly description: string;
    readonly primary: string;
    readonly secondary: string;
    readonly accent: string;
    readonly accentText: string;
    readonly hint: string;

    constructor(props: ThemeProp) {
        if (props.name) {
            this.name = props.name;
        } else {
            this.name = "UNKNOWN";
        }

        if (props.description) {
            this.description = props.description;
        } else {
            this.description = "NO DESCRIPTION";
        }

        if (props.primary) {
            this.primary = props.primary;
        } else {
            this.primary = "#000000";
        }

        if (props.secondary) {
            this.secondary = props.secondary;
        } else {
            this.secondary = "#ffffff";
        }

        if (props.accent) {
            this.accent = props.accent;
        } else {
            this.accent = "#0000ff";
        }

        if (props.hint) {
            this.hint = props.hint;
        } else {
            this.hint = "#aaaaaa";
        }

        if (props.accentText) {
            this.accentText = props.accentText;
        } else {
            this.accentText = "#ffffff";
        }
    }

    get text(): string {
        return this.primary;
    }

    get icon(): string {
        return this.primary;
    }

    get background(): string {
        return this.secondary;
    }

    get buttonText(): string {
        return this.secondary;
    }

    get selected(): string {
        return this.accent;
    }

    get hover(): string {
        return this.hint;
    }

    get border(): string {
        return this.hint;
    }
}


export let currentTheme: OVOTheme = new OVOTheme({
    name: "Default",
    description: "The default theme",
    primary: "#3b3b3b",
    secondary: "#efefef",
    accent: "#c9c9c9",
    hint: "#dadada",
    accentText: "#000000",
});