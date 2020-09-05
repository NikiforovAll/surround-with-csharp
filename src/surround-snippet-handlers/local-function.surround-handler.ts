import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class LocalFunctionSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'local-function',
        description: 'Code snippet for: #local-function',
        documentation: "Wraps up a selected text into `local function declaration`.",
        snippet: new SnippetStringBuilder('${2:string} ${3:Method}(${4:string} ${5:parameter})')
            .wrapInBrackets()
    };

    provide(): vscode.CompletionItem {
        var ci = this.completionInfo;
        const completionItem = new vscode.CompletionItem(
            this.completionInfo.label,
            vscode.CompletionItemKind.Snippet);
        completionItem.sortText = `.${completionItem.label}`;
        completionItem.documentation = new vscode.MarkdownString(ci.documentation);
        completionItem.detail = ci.description;
        completionItem.insertText = ci.snippet;
        return completionItem;
    }

}
