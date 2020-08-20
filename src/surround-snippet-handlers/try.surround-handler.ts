import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";
import { EOL } from 'os';

export class TrySurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'try',
        description: 'Code snippet for: #try',
        documentation: "Wraps up a selected text into `try`.",
        //TODO: refactor this
        snippet: new SnippetStringBuilder('try')
            .wrapInBrackets()
            .appendText(EOL)
            .appendText('catch (').appendPlaceholder('System.Exception').appendText(')')
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
