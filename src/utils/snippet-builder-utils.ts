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
}

function wrapInBrackets(builder: vscode.SnippetString) {
    return builder.appendText(EOL)
        .appendText('{')
        .appendText(EOL)
        .appendText(' '.repeat(vscode.window.activeTextEditor?.options.tabSize as number || 4))
        .appendVariable('TM_SELECTED_TEXT', '')
        .appendTabstop()
        .appendText(EOL)
        .appendText('}');
}
