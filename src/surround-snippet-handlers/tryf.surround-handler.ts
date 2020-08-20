import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";
import { EOL } from 'os';

export class TryFSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'tryf',
        description: 'Code snippet for: #tryf',
        documentation: "Wraps up a selected text into `tryf`.",
        //TODO: refactor this
        snippet: new SnippetStringBuilder('try')
            .wrapInBrackets()
            .appendText(EOL)
            .appendText('finally')
            .appendText(EOL)
            .appendText('{')
            .appendText(EOL)
            .appendText('}')


    };

    provide(): vscode.CompletionItem {
        var ci = this.completionInfo;
        const namespaceCompletionItem = new vscode.CompletionItem(
            this.completionInfo.label,
            vscode.CompletionItemKind.Snippet);
        namespaceCompletionItem.sortText = `.${namespaceCompletionItem.label}`;
        namespaceCompletionItem.documentation = new vscode.MarkdownString(ci.documentation);
        namespaceCompletionItem.detail = ci.description;
        namespaceCompletionItem.insertText = ci.snippet;
        return namespaceCompletionItem;
    }

}
