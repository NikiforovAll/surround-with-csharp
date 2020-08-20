import * as vscode from 'vscode';
import { EOL } from 'os';


export class SnippetStringBuilder extends vscode.SnippetString {
    wrapInBrackets(): SnippetStringBuilder {
        wrapInBrackets(this);
        return this;
    }

    addPlaceholder(placeholder: string) {
        this.appendPlaceholder(placeholder);
        return this;
    }

    addSelectedText() {
        this.appendText(EOL)
            .appendText(' '.repeat(vscode.window.activeTextEditor?.options.tabSize as number || 4))
            .appendVariable('TM_SELECTED_TEXT', '')
            .appendTabstop(0)
            .appendText(EOL);
        return this;
    }
}

function wrapInBrackets(builder: SnippetStringBuilder) {
    builder.appendText(EOL)
        .appendText('{');
    // TODO: refactor this
    builder.addSelectedText()

        .appendText('}');
    return builder;
}
